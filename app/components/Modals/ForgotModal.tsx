"use client";

import axios from "axios"; // For API calls
import { useState } from "react";
import Input from "../inputs/input";
import toast, { Toaster } from "react-hot-toast"; // For notifications
import Button from "../Button";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useForgotModal from "@/app/hooks/useForgotModal";
import useVerifyModal from "@/app/hooks/useVerifyModal";
import Modal from "./Modal";

const ForgotModal = () => {
  const forgotModal = useForgotModal();
  const verifyModal = useVerifyModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
    },
  });

  const handleVerifyModal = (email: string) => {
    forgotModal.onClose();
    verifyModal.onOpen(email); // Pass the email to VerifyModal
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      // Make API call to send reset code
      const response = await axios.post("/api/forgotPassword", {
        email: data.email,
      });

      // Notify success
      toast.success(response.data.message);

      // Open the Verify Modal with email
      handleVerifyModal(data.email);
    } catch (error: any) {
      // Notify failure
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <>
      <Toaster /> {/* Notification Component */}
      <Modal
        title="Reset your password"
        paragraph="We’ll email you an OTP to reset the password for your account."
        disabled={isLoading}
        isOpen={forgotModal.isOpen}
        onClose={forgotModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel="Get code"
        body={bodyContent}
        isLoading={isLoading}
      />
    </>
  );
};

export default ForgotModal;
