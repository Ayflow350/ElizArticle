import { NextResponse } from "next/server";
import { getPayPalAccessToken } from "@/app/libs/paypal";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  // Log the incoming request for debugging
  console.log(`${request.method} ${request.url}`);

  const body = await request.json();
  console.log("Request Body:", body);

  const { userId, subscriptionId } = body;

  // Check if the subscriptionId is provided and valid
  if (!subscriptionId) {
    return NextResponse.json(
      { error: "Subscription ID is required" },
      { status: 400 }
    );
  }

  // Retrieve the subscription from the database
  const userSubscription = await prisma.subscription.findUnique({
    where: {
      paypalSubscriptionId: subscriptionId,
    },
  });

  if (!userSubscription) {
    return NextResponse.json(
      { error: "Subscription not found" },
      { status: 404 }
    );
  }

  // Check if the subscription belongs to the specified user
  if (userSubscription.userId !== userId) {
    return NextResponse.json(
      { error: "Unauthorized request to cancel subscription" },
      { status: 403 }
    );
  }

  // Get PayPal access token
  const accessToken = await getPayPalAccessToken();
  console.log("Access Token:", accessToken);

  if (!accessToken) {
    console.error("Failed to get PayPal access token");
    return NextResponse.json(
      { error: "Unable to authenticate with PayPal" },
      { status: 500 }
    );
  }

  try {
    // Send request to PayPal to cancel the subscription
    const response = await fetch(
      `${process.env.PAYPAL_API}/v1/billing/subscriptions/${subscriptionId}/cancel`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reason: "User requested cancellation", // You can change this as needed
        }),
      }
    );

    const cancellationData = await response.json();
    console.log("PayPal Cancellation Response:", cancellationData);

    if (!response.ok) {
      console.error("Error canceling subscription:", cancellationData);
      return NextResponse.json(
        { error: "Failed to cancel subscription" },
        { status: 500 }
      );
    }

    // Update the subscription status in the database to 'CANCELLED'
    const updatedSubscription = await prisma.subscription.update({
      where: {
        id: userSubscription.id,
      },
      data: {
        status: "CANCELLED",
        endDate: new Date(), // You can set the cancellation date here
      },
    });

    console.log("Subscription cancelled successfully:", updatedSubscription);

    // Optionally, update the user's subscription status
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hasActiveSubscription: false,
      },
    });

    console.log("User subscription status updated:", updatedUser);

    // Return the successful response
    return NextResponse.json({
      message: "Subscription cancelled successfully",
      subscription: updatedSubscription,
    });
  } catch (error) {
    console.error("Error during subscription cancellation process:", error);
    return NextResponse.json(
      { error: "Error occurred while canceling the subscription" },
      { status: 500 }
    );
  }
}
