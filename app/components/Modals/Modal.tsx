"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import modalLogo from "@/assets/modal-logo.png";
import Button from "../Button";
export const dynamic = "force-dynamic";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  paragraph?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  isLoading?: boolean; // Add isLoading prop
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  paragraph,
  body,
  footer,
  actionLabel,
  disabled,
  isLoading, // Destructure isLoading
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden fixed overflow-y-auto inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative bg-transparent w-full  md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto bg-[#fffbf0]">
          <div
            className={`translate duration-300 rounded-lg h-full bg-[#fffbf0] ${
              showModal ? "translate-y-0" : "translate-y-full"
            } ${showModal ? "opacity-100" : "opacity-0"}`}
          >
            <div className="translate h-full justify-center lg:h-auto md:h-auto border-0 shadow-lg relative flex flex-col w-full outline-none focus:outline-none rounded-lg">
              <div className="flex flex-col rounded-lg items-center p-6 rounded-t justify-center relative border-b-[1px]">
                <div>
                  <button
                    onClick={handleClose}
                    className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                  >
                    <IoMdClose size={18} />
                  </button>
                </div>

                <div>
                  <Image src={modalLogo} alt="logo" width={60} height={60} />
                </div>
                <h1 className="text-xl font-bold">{title}</h1>
                <h1 className="text-base font-normal text-center">
                  {paragraph}
                </h1>
              </div>
              <div className="flex justify-center flex-col items-center mb-6">
                <div className="relative p-6">{body}</div>

                <Button
                  onClick={handleSubmit}
                  label={actionLabel}
                  isLoading={isLoading} // Pass isLoading to Button
                />
                <div>{footer}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
