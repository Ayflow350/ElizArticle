"use client";

import axios from "axios";

import { useState } from "react";
import Input from "../inputs/input";
import toast, { Toaster } from "react-hot-toast";
import Button from "../Button";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useModalBlock from "@/app/hooks/useModalBlock";
import useVerifyModal from "@/app/hooks/useVerifyModal";
import Modal from "./ModalBlocking";

import { useRouter } from "next/navigation";

const ModalBlock = () => {
  const router = useRouter();

  const modalBlock = useModalBlock();

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
    modalBlock.onClose();
    verifyModal.onOpen();
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    console.log(data); // This will log the data submitted by the user
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
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
    </div>
  );

  const footer = (
    <div className="flex flex-col   gap-4">
      <div className="flex justify-end mt-2 "></div>
    </div>
  );

  return (
    <Modal
      title="Export of Article is not allowed"
      paragraph="Agree to the terms of the website to continue reading this article"
      disabled={isLoading}
      isOpen={modalBlock.isOpen}
      onClose={verifyModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Get code"
      body={bodyContent}
      footer={footer}
    />
  );
};

export default ModalBlock;
