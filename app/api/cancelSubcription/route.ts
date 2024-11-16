import { NextResponse } from "next/server";
import { getPayPalAccessToken } from "@/app/libs/paypal";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  console.log(`${request.method} ${request.url}`);

  const body = await request.json();
  const { userId, subscriptionId } = body;

  console.log("Received request body:", body);

  // Get PayPal access token
  const accessToken = await getPayPalAccessToken();
  if (!accessToken) {
    console.error("Failed to get PayPal access token");
    return NextResponse.json(
      { error: "Unable to authenticate with PayPal" },
      { status: 500 }
    );
  }

  try {
    // Cancel the PayPal subscription

    const cancelResponse = await fetch(
      `${process.env.PAYPAL_API}/v1/billing/subscriptions/${subscriptionId}/cancel`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reason: "User requested cancellation", // Optional cancellation reason
        }),
      }
    );

    if (!cancelResponse.ok) {
      const errorData = await cancelResponse.json();
      console.error("Error cancelling PayPal subscription:", errorData);
      return NextResponse.json(
        { error: "Failed to cancel PayPal subscription" },
        { status: 500 }
      );
    }

    // Update the subscription status in your database to "CANCELED"
    const updatedSubscription = await prisma.subscription.update({
      where: { paypalSubscriptionId: subscriptionId },
      data: { status: "CANCELED" },
    });

    console.log("Subscription canceled successfully:", updatedSubscription);

    return NextResponse.json({
      message: "Subscription canceled successfully",
    });
  } catch (error) {
    console.error("Error during subscription cancellation:", error);
    return NextResponse.json(
      { error: "Failed to cancel subscription" },
      { status: 500 }
    );
  }
}
