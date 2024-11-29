"use client";

import axios from "axios";
import { useState } from "react";
import Input from "../inputs/input";
import toast from "react-hot-toast";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useLoginModal from "@/app/hooks/useLoginModal";
import usePasswordResetModal from "@/app/hooks/usePasswordResetModal";
import Modal from "./Modal";

const ForgotPasswordModal: React.FC = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const passwordResetModal = usePasswordResetModal(); // Hook to manage the modal state
  const [isLoading, setIsLoading] = useState(false);

  // Close the reset modal and open the login modal on "Forgot Password?" click
  const handleForgotPassword = () => {
    passwordResetModal.onClose();
    loginModal.onOpen();
  };

  // Form handling using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Add reset function here
  } = useForm<FieldValues>({
    defaultValues: {
      email: passwordResetModal.email, // Pre-fill the email from the modal hook state
      password: "",
      confirmPassword: "",
    },
  });

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      // Example API call to reset the password
      const response = await axios.post("/api/changePassword", {
        email: passwordResetModal.email, // Use the email from the modal state
        newPassword: data.password,
      });

      toast.success(response.data.message || "Password reset successfully!");

      // Reset form on success
      reset(); // Clear the form fields

      // Close the password reset modal and route to login page
      passwordResetModal.onClose();

      // Redirect to the login page
      router.push("/login"); // Assuming the login page route is '/login'
    } catch (error: unknown) {
      // Type guard to narrow down the error type to handle it safely
      if (axios.isAxiosError(error) && error.response) {
        toast.error(
          error.response?.data?.message || "Failed to reset password"
        );
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        id="password"
        label="New Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="confirmPassword"
        label="Confirm New Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <div className="flex justify-end mt-2">
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-black-500 text-base font-medium"
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );

  return (
    <Modal
      title="Reset your password"
      paragraph="Enter a new password for your account"
      actionLabel="Reset"
      disabled={isLoading}
      isOpen={passwordResetModal.isOpen}
      onClose={passwordResetModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      isLoading={isLoading} // Pass isLoading as a prop to Modal
    />
  );
};

export default ForgotPasswordModal;
