import { NextResponse } from "next/server";
import { getPayPalAccessToken } from "@/app/libs/paypal";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const accessToken = await getPayPalAccessToken();
  if (!accessToken) {
    return NextResponse.json(
      { error: "Unable to authenticate with PayPal" },
      { status: 500 }
    );
  }

  const body = await request.json();
  const { userId, subscriptionId } = body;

  try {
    // Fetch subscription details from PayPal
    const response = await fetch(
      `${process.env.PAYPAL_API}/v1/billing/subscriptions/${subscriptionId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();
    if (!response.ok || !data) {
      console.error("Error fetching subscription details:", data);
      return NextResponse.json(
        { error: "Failed to fetch subscription details" },
        { status: 500 }
      );
    }

    const { subscriber } = data;
    const userFirstName = subscriber?.name?.given_name || "";
    const userLastName = subscriber?.name?.surname || "";
    const userEmail = subscriber?.email_address || "";
    const planId = data.plan_id;

    // Assuming you have logic to determine the amount and due date
    const amount = data.billing_info?.last_payment?.amount?.value || 0; // Fetch the last payment amount
    const currency =
      data.billing_info?.last_payment?.amount?.currency_code || "USD"; // Default currency
    const dueDate = new Date(); // Set your logic for due date

    // Create the invoice with subscription details
    const invoice = await prisma.invoice.create({
      data: {
        userId,
        subscriptionId, // Use the subscriptionId to reference the Subscription model
        paypalInvoiceId: "", // Placeholder if you have an invoice ID from PayPal
        amount,
        currency,
        paymentStatus: "unpaid", // Set as unpaid initially
        dueDate, // Set according to your billing cycle
        userFirstName,
        userLastName,
        userEmail,
      },
    });

    return NextResponse.json({ success: true, invoice });
  } catch (error) {
    console.error("Error creating PayPal subscription:", error);
    return NextResponse.json(
      { error: "Failed to create invoice" },
      { status: 500 }
    );
  }
}
