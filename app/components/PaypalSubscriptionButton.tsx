"use client"; // Mark this as a client component

import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query"; // Import useMutation and useQueryClient

// Define the interface for the subscription response
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
  const queryClient = useQueryClient(); // Initialize queryClient to manage the cache

  // Define the mutation to send subscription details to the server
  const { mutate: sendSubscriptionDetailsToServer, isLoading: isSubmitting } =
    useMutation(
      async (details: any) => {
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
          throw new Error(errorData.message || "Failed to save subscription.");
        }

        return response.json();
      },
      {
        onSuccess: (data) => {
          // Update the query cache on success
          queryClient.invalidateQueries(["subscriptions", userId]); // Refetch subscriptions for the user
          queryClient.setQueryData(
            ["subscriptions", userId],
            (oldData: any) => ({
              ...oldData,
              ...data, // Merge new subscription data
            })
          );

          toast.success("Subscription details saved successfully!");
        },
        onError: (error: unknown) => {
          // Narrow the error type to `Error`
          const err = error as Error;
          toast.error(err.message || "Failed to save subscription.");
        },
      }
    );

  // Function to handle the approval of the subscription
  const handleApprove = async (data: any, actions: any) => {
    try {
      const details = await actions.subscription.get();
      console.log("Subscription successful for:", details.id);

      // Mutate (send) subscription details to server using useMutation
      sendSubscriptionDetailsToServer(details);

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
