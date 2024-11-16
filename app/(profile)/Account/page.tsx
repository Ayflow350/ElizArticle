import React from "react";
import Container from "@/app/components/Container";
import Banner from "@/assets/userbanner.svg";
import Image from "next/image";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { TbEdit } from "react-icons/tb";
import Link from "next/link";
import Footer from "@/app/components/Footer";

export const dynamic = "force-dynamic";

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: string | null;
  image: string | null;
  createdAt: string;
  role: string;
  hasActiveSubscription: boolean;
}

const Account = async () => {
  const currentUser = await getCurrentUser();

  // If no user, show login prompt
  if (!currentUser) {
    return (
      <Container>
        <h2 className="mt-5 mb-2 text-center text-3xl font-bold">
          User not found. Please log in.
        </h2>
        <p className="text-center text-lg">
          Please log in to view your account details.
        </p>
        <a href="/login" className="text-blue-500 underline">
          Go to Login
        </a>
      </Container>
    );
  }

  // Extract and capitalize the first letter of the user's first name
  const firstInitial = currentUser.name?.charAt(0).toUpperCase();

  return (
    <Container>
      <div className="justify-center flex mt-10 relative">
        <Image src={Banner} alt="Banner" />
      </div>
      <div className="justify-center flex mt-10 relative">
        {currentUser.image ? (
          <Image
            src={currentUser.image}
            alt="User avatar"
            className="justify-center flex -mt-40 rounded-full w-24 h-24 object-cover"
            width={96}
            height={96}
          />
        ) : (
          <div className=" -mt-28 rounded-full w-32 h-32 bg-gray-500 text-white flex items-center justify-center text-5xl font-bold">
            {firstInitial}
          </div>
        )}
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-6">Account</h1>

        <div className="rounded-md shadow-xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold">Name</h1>
              <p>{currentUser.name}</p>
            </div>
            <button className="text-white py-2 px-6 items-center border-black rounded-md bg-black border flex gap-x-2">
              Edit
              <TbEdit />
            </button>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold">Email</h1>
              <p>{currentUser.email}</p>
            </div>
            <button className="text-white py-2 px-6 items-center border-black rounded-md bg-black border flex gap-x-2">
              Edit
              <TbEdit />
            </button>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold">Member Since</h1>
              <p>
                {new Date(currentUser.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </p>
            </div>
            <button className="text-white py-2 px-6 items-center border-black rounded-md bg-black border flex gap-x-2">
              Edit
              <TbEdit />
            </button>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold">Subscription</h1>
              <p>{currentUser.hasActiveSubscription ? "Active" : "Inactive"}</p>
            </div>
            <Link
              href="/Payment"
              className="text-white py-2 px-6 items-center border-black rounded-md bg-black border flex gap-x-2"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </Container>
  );
};

export default Account;
