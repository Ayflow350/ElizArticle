// pages/api/paypal/create-plan.ts

import { NextResponse } from "next/server";
import { getPayPalAccessToken } from "@/app/libs/paypal";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  console.log("Starting PayPal plan creation..."); // Step 1: Check if the function is invoked

  const accessToken = await getPayPalAccessToken();
  console.log("Access Token:", accessToken); // Step 2: Log the access token

  if (!accessToken) {
    console.error("Failed to get PayPal access token");
    return NextResponse.json(
      { error: "Unable to authenticate with PayPal" },
      { status: 500 }
    );
  }

  const body = await request.json();
  const { userId, planType, name, description, amount, currency } = body;
  console.log("Request Body:", body); // Step 3: Log request payload

  const frequency = planType === "monthly" ? "MONTH" : "YEAR";
  const intervalCount = 1;

  try {
    // Create PayPal plan
    console.log("Attempting to create PayPal plan...");
    const response = await fetch(`${process.env.PAYPAL_API}/v1/billing/plans`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: "PROD-2621363682433132H", // Replace with a valid PayPal product ID
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
            total_cycles: 0, // 0 for indefinite recurrence
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
    console.log("PayPal Plan Response:", planData); // Step 4: Log the PayPal API response

    if (!response.ok) {
      console.error("Error creating PayPal plan:", planData);
      return NextResponse.json(
        { error: "Failed to create plan" },
        { status: 500 }
      );
    }

    // Save the created plan to the database
    console.log("Saving subscription to the database...");
    const newSubscription = await prisma.subscription.create({
      data: {
        user: {
          connect: {
            id: userId, // Assuming `userId` is the correct user ID passed to this function
          },
        },
        paypalPlanId: planData.id, // PayPal's plan ID
        paypalSubscriptionId: "", // Placeholder until the actual ID is available
        planType,
        startDate: new Date(),
        status: "active",
        nextPaymentDate:
          frequency === "MONTH"
            ? new Date(new Date().setMonth(new Date().getMonth() + 1))
            : new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        lastPaymentDate: null,
        autoRenew: true,

        invoices: { create: [] }, // Empty for now
      },
    });

    console.log("Subscription created successfully:", newSubscription); // Step 5: Log successful database save
    return NextResponse.json(newSubscription);
  } catch (error) {
    console.error("Error during PayPal plan creation process:", error);
    return NextResponse.json(
      { error: "Failed to create plan" },
      { status: 500 }
    );
  }
}
