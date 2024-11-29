"use client";

import React, { useState } from "react";
import axios from "axios";
import OtpInput from "react-otp-input";
import Input from "../inputs/input";
import Button from "../Button";
import Modal from "./Modal";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import useVerifyModal from "@/app/hooks/useVerifyModal";
import usePasswordResetModal from "@/app/hooks/usePasswordResetModal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const VerifyModal: React.FC = () => {
  const router = useRouter();
  const verifyModal = useVerifyModal();
  const passwordResetModal = usePasswordResetModal();

  const [otp, setOtp] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      password: "",
    },
  });

  const handleOtpChange = (value: string) => {
    console.log("OTP changed:", value); // Log the OTP value when it's updated
    setOtp(value);
  };

  const handleBack = () => {
    console.log("Email received in VerifyModal:", verifyModal.email); // Log the email to make sure it's correctly passed

    if (verifyModal.email) {
      console.log("Email exists, proceeding with modal transition...");
      verifyModal.onClose();
      passwordResetModal.onOpen(verifyModal.email); // Pass email only if it is not null or undefined
    } else {
      toast.error("No email found. Please try again.");
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Submit data:", data); // Log the form data being submitted
    console.log("OTP value on submit:", otp); // Log the OTP value being submitted

    setIsLoading(true);

    if (!verifyModal.email) {
      toast.error("Email is missing. Please try again.");
      console.log("No email found. Aborting submission.");
      return;
    }

    try {
      console.log("Making API request with email:", verifyModal.email);
      const response = await axios.post("/api/verifyPassword", {
        email: verifyModal.email, // Email from the modal state
        resetCode: otp, // Send `resetCode` instead of `otp`
        password: data.password,
      });

      console.log("API response:", response); // Log the API response to inspect the result

      toast.success(response.data.message || "Password reset successful!");

      reset(); // Clear the form fields
      console.log("Form reset: ", { otp, isLoading }); // Log the state of OTP and loading after resetting the form

      // Close the current modal and trigger the back function
      console.log("Closing verify modal...");
      verifyModal.onClose();
      console.log(
        "Opening password reset modal with email:",
        verifyModal.email
      );
      passwordResetModal.onOpen(verifyModal.email);
    } catch (error: any) {
      console.error("API error:", error); // Log any error from the API call
      toast.error(
        error.response?.data?.message || "Failed to reset password. Try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col items-center justify-center text-center gap-4">
      <div className="p-4">
        <h1 className="mb-3 text-lg font-bold">Enter your 6-digit code</h1>
        <OtpInput
          value={otp}
          onChange={handleOtpChange}
          numInputs={6}
          shouldAutoFocus
          renderInput={(props) => (
            <div className="inline-flex" style={{ marginRight: "10px" }}>
              <input
                {...props}
                style={{
                  width: window.innerWidth < 640 ? "3rem" : "4rem",
                  height: window.innerWidth < 640 ? "3rem" : "4rem",
                  fontSize: window.innerWidth < 640 ? "1rem" : "1.5rem",
                  textAlign: "center",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "5px",
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.border = "1px solid black")}
                onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
              />
            </div>
          )}
        />
      </div>
    </div>
  );

  const footer = (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end mt-2"></div>
    </div>
  );

  return (
    <Modal
      title="Verify Your Reset Code"
      paragraph="Your journey back to seamless access starts here."
      disabled={isLoading}
      isOpen={verifyModal.isOpen}
      onClose={verifyModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Confirm & Reset"
      body={bodyContent}
      footer={footer}
      isLoading={isLoading}
    />
  );
};

export default VerifyModal;
