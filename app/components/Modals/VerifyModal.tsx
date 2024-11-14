"use client";

import React, { useState } from "react";
import axios from "axios";
import Input from "../inputs/input";
import OtpInput from "react-otp-input";
import Button from "../Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useVerifyModal from "@/app/hooks/useVerifyModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import { useRouter } from "next/navigation";

const VerifyModal: React.FC = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string>("");

  const verifyModal = useVerifyModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  const handleBack = () => {
    verifyModal.onClose();
    loginModal.onOpen();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    // Add the signIn or verification logic here
  };

  const bodyContent = (
    <div className="flex flex-col items-center justify-center text-center gap-4">
      <div className="p-4">
        {" "}
        {/* Adjust padding as needed */}
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
                  width: window.innerWidth < 640 ? "3rem" : "4rem", // Smaller for mobile
                  height: window.innerWidth < 640 ? "3rem" : "4rem", // Smaller for mobile
                  fontSize: window.innerWidth < 640 ? "1rem" : "1.5rem", // Adjust font size
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
      <div className=" max-w-auto mr-4">
        <Input
          id="password"
          type="password"
          label="New Password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    </div>
  );

  const footer = (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end mt-2">
        <button
          type="button"
          onClick={handleBack}
          className="text-black-500 text-base font-medium"
        >
          Back
        </button>
      </div>
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
    />
  );
};

export default VerifyModal;
