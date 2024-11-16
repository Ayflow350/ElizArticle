import { NextResponse } from "next/server";
import { getPayPalAccessToken } from "@/app/libs/paypal";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  console.log(`${request.method} ${request.url}`);

  const body = await request.json();
  console.log("Received request body:", body);

  const { userId, name, description, amount, currency, paypalSubscriptionId } =
    body;

  // Plan type is now always "monthly"
  const planType = "monthly";
  const frequency = "MONTH"; // Hardcoded as "MONTH" for monthly
  const intervalCount = 1;

  try {
    // Step 1: Get PayPal access token
    const accessToken = await getPayPalAccessToken();
    if (!accessToken) {
      console.error("Failed to get PayPal access token");
      return NextResponse.json(
        { error: "Unable to authenticate with PayPal" },
        { status: 500 }
      );
    }

    // Step 2: Create PayPal plan
    const planResponse = await fetch(
      `${process.env.PAYPAL_API}/v1/billing/plans`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: "PROD-2621363682433132H", // Replace with your product ID
          name,
          description,
          billing_cycles: [
            {
              frequency: {
                interval_unit: frequency,
                interval_count: intervalCount,
              },
              tenure_type: "REGULAR",
              sequence: 1,
              total_cycles: 0,
              pricing_scheme: {
                fixed_price: {
                  value: amount,
                  currency_code: currency || "USD",
                },
              },
            },
          ],
          payment_preferences: {
            auto_bill_outstanding: true,
            setup_fee_failure_action: "CONTINUE",
            payment_failure_threshold: 3,
          },
        }),
      }
    );

    const planData = await planResponse.json();
    if (!planResponse.ok || !planData.id) {
      console.error("Error creating PayPal plan:", planData);
      return NextResponse.json(
        { error: "Failed to create PayPal plan" },
        { status: 500 }
      );
    }

    console.log("PayPal Plan created successfully:", planData.id);

    // Step 3: Save subscription details in the database
    const newSubscription = await prisma.subscription.create({
      data: {
        user: { connect: { id: userId } },
        paypalPlanId: planData.id,
        paypalSubscriptionId: paypalSubscriptionId || null,
        planType,
        startDate: new Date(),
        status: paypalSubscriptionId ? "ACTIVE" : "PENDING", // Status depends on paypalSubscriptionId
        nextPaymentDate: new Date(
          new Date().setMonth(new Date().getMonth() + 1)
        ), // Always set to monthly
        autoRenew: true,
      },
    });

    console.log("Subscription saved in database:", newSubscription);

    // Step 4: Update user subscription status in the user table
    await prisma.user.update({
      where: { id: userId },
      data: { hasActiveSubscription: true },
    });

    console.log(
      `User with ID ${userId} has been updated with active subscription`
    );

    // Return success response
    return NextResponse.json({
      success: true,
      message: paypalSubscriptionId
        ? "Subscription created and activated successfully."
        : "Subscription created and pending activation.",
      subscription: newSubscription,
    });
  } catch (error) {
    console.error(
      "Error during PayPal plan creation or database operation:",
      error
    );
    return NextResponse.json(
      { error: "Failed to create plan or save subscription" },
      { status: 500 }
    );
  }
}
