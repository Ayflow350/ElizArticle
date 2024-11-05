// components/paypalButton.tsx

import { PayPalButtons } from "@paypal/react-paypal-js";

interface PaypalSubscriptionButtonProps {
  userId: string;
}

const PaypalSubscriptionButton = ({
  userId,
}: PaypalSubscriptionButtonProps) => {
  const handleApprove = async (
    data: Record<string, any>,
    actions: any
  ): Promise<void> => {
    console.log("Subscription approved for user:", userId);
    // You could add further processing here if necessary
  };

  const handleError = (error: unknown) => {
    console.error("PayPal subscription error:", error);
  };

  return (
    <PayPalButtons
      style={{ layout: "vertical" }}
      createSubscription={(data, actions) => {
        return actions.subscription.create({
          plan_id: "P-PLAN_ID", // Replace with actual PayPal plan ID
        });
      }}
      onApprove={handleApprove}
      onError={handleError}
    />
  );
};

export default PaypalSubscriptionButton;
