"use client"; // Mark this as a client component

import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
export const dynamic = "force-dynamic";

interface PaypalSubscriptionButtonProps {
  userId: string;
  planType: string;
  name: string;
  description: string;
  amount: string;
  currency: string;
  planId: string;
}

const PaypalSubscriptionButton: React.FC<PaypalSubscriptionButtonProps> = ({
  userId,
  planType,
  name,
  description,
  amount,
  currency,
  planId,
}) => {
  console.log(
    "userId",
    userId,
    "planType",
    planType,
    "name",
    name,
    description,
    amount,
    currency
  );

  // Function to send subscription details to the server after approval
  const sendSubscriptionDetailsToServer = async (details: any) => {
    try {
      const response = await fetch("/api/createPlan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          planType,
          name,
          description,
          amount,
          currency,
          paypalSubscriptionId: details.id, // Use the subscription ID captured from PayPal
        }),
      });

      if (!response.ok) {
        console.error("Failed to save subscription to server");
      } else {
        console.log("Subscription details saved successfully");
      }
    } catch (error) {
      console.error("Error sending subscription details to server:", error);
    }
  };

  // Handle approval and send details to the server
  const handleApprove = async (data: any, actions: any) => {
    try {
      const details = await actions.subscription.get();
      console.log("Subscription successful for:", details.id);

      // Send subscription details to server with the captured subscription ID
      await sendSubscriptionDetailsToServer(details);

      // Show success message and redirect
      alert("Subscription successful! Redirecting to the home page...");
      setTimeout(() => {
        window.location.href = "/Article"; // Redirect to the home page
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Error capturing subscription:", error);
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AZir1pZfj7zgKFGUplvEXt4akiNkP6WHiJ48TgSvEUbR4-dMuiN2lVi9hUU4hY7_XGx-KzLzXp9IAPsn",
        components: "buttons",
        intent: "subscription",
        vault: true,
      }}
    >
      <div className="cursor-pointer">
        <PayPalButtons
          createSubscription={(data, actions) => {
            return actions.subscription.create({
              plan_id: planId, // Replace with your actual PayPal subscription plan ID
            });
          }}
          onApprove={handleApprove}
          onError={(err) => {
            console.error("PayPal Checkout onError", err);
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PaypalSubscriptionButton;
