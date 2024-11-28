"use client";

import React, { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import Modal from "@/app/components/Modals/Modal";
import Input from "@/app/components/inputs/input";

interface CancelButtonProps {
  userId: string;
  subscriptionId: string;
  currentUser: { name: string }; // Add currentUser prop
  nextPaymentDate: string;
}

const CancelButton: React.FC<CancelButtonProps> = ({
  userId,
  subscriptionId,
  currentUser, // Destructure currentUser
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [nextPaymentDate, setNextPaymentDate] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCancelSubscription = async (data: FieldValues) => {
    const cancellationReason = data.cancellationReason;

    try {
      // Replace with your actual cancellation API call
      const response = await fetch(`/api/cancelSubcription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, subscriptionId, cancellationReason }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const { nextPaymentDate } = responseData;

        // Update state with the next payment date and show success modal
        setNextPaymentDate(nextPaymentDate);
        setIsModalOpen(false);
        setSuccessModalOpen(true);
      } else {
        console.error("Failed to cancel subscription");
      }
    } catch (error) {
      console.error("Error canceling subscription:", error);
    }
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Cancel Subscription
      </button>

      {/* Cancellation Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit(handleCancelSubscription)}
        title="Cancel Subscription"
        paragraph="Please provide a reason for cancellation."
        body={
          <Input
            id="cancellationReason"
            label="Reason for Cancellation"
            register={register}
            required={true}
            errors={errors}
          />
        }
        actionLabel="Confirm Cancel"
      />

      {/* Success Modal */}
      <Modal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        title="Subscription Canceled"
        paragraph={`Dear ${currentUser.name}, your subscription has been successfully canceled. It will remain active until ${nextPaymentDate}.`}
        body={<div />} // or any content you want in the body
        actionLabel="Close"
        onSubmit={() => {
          // Close the success modal
          setSuccessModalOpen(false);

          // Reload the page after submission
          window.location.reload();
        }}
      />
    </>
  );
};

export default CancelButton;
