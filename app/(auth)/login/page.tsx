"use client";

import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import Banner from "@/assets/banner.png";
import Google from "@/assets/google.svg";
import Container from "@/app/components/Container";
import { useCallback, useState } from "react";

import useForgotModal from "@/app/hooks/useForgotModal";
import Input from "../../components/inputs/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { ScaleLoader } from "react-spinners"; // Import ScaleLoader
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

const SignUp = () => {
  const forgotModal = useForgotModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

  const handleForgotPassword = () => {
    forgotModal.onOpen();
  };
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged in");
        router.push("/Account");
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  return (
    <Container>
      <div className="flex justify-center items-center  md:justify-between mt-3 pt-2 md:pt-5 px-4">
        {/* text */}
        <div className="flex flex-1 items-center text-center flex-col">
          <h1 className="font-bold text-[32px] text-[#22221F] my-3">
            Log in to your account
          </h1>
          <h2 className="text-[#666666] font-normal max-w-[400px]  text-[20px]">
            Subscribe now to get full access to my research articles.
          </h2>
          <h2 className="text-[#666666] font-normal text-[20px]">
            The subscription is a fee of 12€/month
          </h2>
          <button className="bg-white rounded-full border mt-8 mb-3 flex border-black gap-x-4 px-20 py-4">
            <Image src={Google} alt="google-button" />
            <span className="font-extrabold bg-white">Login with Google</span>
          </button>
          <div className="flex items-center justify-center mt-4 w-[500px]">
            <div className="h-[1px] bg-gray-300 flex-grow mr-3"></div>
            <span className="text-[#112211] text-base">Or login with</span>
            <div className="h-[1px] bg-gray-300 flex-grow ml-3"></div>
          </div>
          <div className="gap-y-5 flex mt-10 flex-col">
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
            <div className="flex flex-row items-center gap-x-2 text-left">
              <button onClick={handleForgotPassword}>
                Forgot your Password?
              </button>
            </div>
          </div>
          <button
            onClick={handleSubmit(onSubmit)}
            className="rounded-full mx-auto border mt-8  w-[300px] md:w-[400px] text-center mb-3 flex justify-center items-center border-black bg-black text-white px-10 py-4 self-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <ScaleLoader color="#ffffff" height={15} width={2} />
            ) : (
              "Submit"
            )}
          </button>
          <Link className="flex items-center gap-x-1" href="/signup">
            <h1 className="text-neutral-500">Already have an account?</h1>{" "}
            <span className="text-black text-lg">Sign Up</span>
          </Link>
        </div>

        {/* picture */}
        <div className="flex-1 hidden lg:flex">
          <Image src={Banner} alt="Banner" />
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
