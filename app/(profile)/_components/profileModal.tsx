"use client";

import { AiOutlineMenu } from "react-icons/ai";

import { useCallback, useState } from "react";

import { signOut } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";

const UserMenu = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3 "></div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm ">
          <div className="flex flex-col cursor-pointer "></div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
