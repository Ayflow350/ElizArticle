"use client"; // Mark this as a client component

import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast from "react-hot-toast";

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
        const errorData = await response.json();
        console.error("Failed to save subscription to server:", errorData);
        toast.error("Failed to save subscription to the server.");
        return;
      }

      toast.success("Subscription details saved successfully!");
    } catch (error) {
      console.error("Error sending subscription details to the server:", error);
      toast.error("An error occurred while saving the subscription.");
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
      toast.success("Subscription successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/Payments";
      }, 2000);
    } catch (error) {
      console.error("Error capturing subscription:", error);
      toast.error("An error occurred while capturing the subscription.");
    }
  };

  return (
    <>
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
              toast.error("An error occurred during PayPal checkout.");
            }}
          />
        </div>
      </PayPalScriptProvider>
    </>
  );
};

export default PaypalSubscriptionButton;
