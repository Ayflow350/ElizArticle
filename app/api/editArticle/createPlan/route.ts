import { NextResponse } from "next/server";
import { getPayPalAccessToken } from "@/app/libs/paypal";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  // Manual logging to simulate morgan
  console.log(`${request.method} ${request.url}`);

  const body = await request.json();
  console.log("Request Body:", body);

  const accessToken = await getPayPalAccessToken();
  console.log("Access Token:", accessToken);

  if (!accessToken) {
    console.error("Failed to get PayPal access token");
    return NextResponse.json(
      { error: "Unable to authenticate with PayPal" },
      { status: 500 }
    );
  }

  const { userId, planType, name, description, amount, currency } = body;
  const frequency = planType === "monthly" ? "MONTH" : "YEAR";
  const intervalCount = 1;

  try {
    // Create PayPal plan
    const response = await fetch(`${process.env.PAYPAL_API}/v1/billing/plans`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: "PROD-2621363682433132H",
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
    });

    const planData = await response.json();
    console.log("PayPal Plan Response:", planData);

    if (!response.ok) {
      console.error("Error creating PayPal plan:", planData);
      return NextResponse.json(
        { error: "Failed to create plan" },
        { status: 500 }
      );
    }

    // Save the created plan to the database
    const newSubscription = await prisma.subscription.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        paypalPlanId: planData.id,
        paypalSubscriptionId: "",
        planType,
        startDate: new Date(),
        endDate: null,
        status: "ACTIVE",
        nextPaymentDate:
          frequency === "MONTH"
            ? new Date(new Date().setMonth(new Date().getMonth() + 1))
            : new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        lastPaymentDate: null,
        autoRenew: true,
        invoices: { create: [] },
      },
    });

    console.log("Subscription created successfully:", newSubscription);

    // Update user's hasActiveSubscription to true
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hasActiveSubscription: true,
      },
    });

    console.log("User subscription status updated:", updatedUser);

    return NextResponse.json(newSubscription);
  } catch (error) {
    console.error("Error during PayPal plan creation process:", error);
    return NextResponse.json(
      { error: "Failed to create plan" },
      { status: 500 }
    );
  }
}
