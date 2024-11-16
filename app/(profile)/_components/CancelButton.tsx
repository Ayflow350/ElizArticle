"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

interface CancelButtonProps {
  subscriptionId: string;
  userId: string;
}

const CancelButton: React.FC<CancelButtonProps> = ({
  subscriptionId,
  userId,
}) => {
  const [loading, setLoading] = useState(false);

  const cancelSubscription = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/cancelSubcription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, subscriptionId }),
      });

      if (response.ok) {
        toast.success("Subscription canceled successfully.");
      } else {
        throw new Error("Failed to cancel subscription.");
      }
    } catch (error) {
      toast.error("Error canceling subscription.");
      console.error("Cancellation Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={cancelSubscription}
      disabled={loading}
      className="text-white py-2 px-6 items-center border-black rounded-md bg-black border flex gap-x-2"
    >
      {loading ? <ClipLoader size={20} color="#fff" /> : "Cancel Subscription"}
    </button>
  );
};

export default CancelButton;
