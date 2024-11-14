"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import Input from "../inputs/input";
import toast, { Toaster } from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";
import useForgotModal from "@/app/hooks/useForgotModal";
import Modal from "./Modal";

import { useRouter } from "next/navigation";

const LoginModal = () => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const forgotModal = useForgotModal();
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = () => {
    loginModal.onClose();
    forgotModal.onOpen();
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

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged in");
        router.push("/Payment");
        loginModal.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
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

      <Input
        id="password"
        type="password"
        label="Password"
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
      title="Login to your account"
      paragraph="Dive into your account and stay connected to us"
      actionLabel="Login"
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      isLoading={isLoading} // Pass isLoading as a prop to Modal
    />
  );
};

export default LoginModal;
