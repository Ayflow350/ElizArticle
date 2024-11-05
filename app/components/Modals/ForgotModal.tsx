"use client";

import axios from "axios";

import { useState } from "react";
import Input from "../inputs/input";
import toast, { Toaster } from "react-hot-toast";
import Button from "../Button";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useForgotModal from "@/app/hooks/useForgotModal";
import useVerifyModal from "@/app/hooks/useVerifyModal";
import Modal from "./Modal";

import { useRouter } from "next/navigation";

const LoginModal = () => {
  const router = useRouter();

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
      password: "",
    },
  });

  const handleVerifyModal = () => {
    forgotModal.onClose();
    verifyModal.onOpen();
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    console.log(data); // This will log the data submitted by the user

    axios
      .post("/api/forgotPassword", data)
      .then((response) => {
        console.log("done", response); // Log the response for debugging
        toast.success(
          "Check your email for instructions to reset your password."
        );
        forgotModal.onClose();
        verifyModal.onOpen();
      })
      .catch((error) => {
        console.error("Error:", error); // Log the error for debugging
        toast.error("Something went wrong. Please try again."); // Show error toast
      })
      .finally(() => {
        setIsLoading(false); // Reset loading state
      });
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

  const footer = (
    <div className="flex flex-col   gap-4">
      <div className="flex justify-end mt-2 ">
        <button
          type="button"
          onClick={handleVerifyModal}
          className="text-black-500 text-base font-medium "
        >
          Verify the code
        </button>
      </div>
    </div>
  );

  return (
    <Modal
      title="Reset your password"
      paragraph="We’ll email you a secure link to reset the password for your account."
      disabled={isLoading}
      isOpen={forgotModal.isOpen}
      onClose={forgotModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Get code"
      body={bodyContent}
      footer={footer}
    />
  );
};

export default LoginModal;
