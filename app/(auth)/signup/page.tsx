"use client";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import Banner from "@/assets/banner.png";
import Google from "@/assets/google.svg";
import Container from "@/app/components/Container";
import { useCallback, useState } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import Input from "../../components/inputs/input";

export const dynamic = "force-dynamic";

export const dynamicParams = true;

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const SignUp = () => {
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    console.log(data);

    axios
      .post("/api/register", data)

      .then(() => {
        console.log("done");
        toast.success("success");
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error("Something Wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Container>
      <div className="flex justify-between mt-3  pt-2 md:pt-5  px-4 ">
        {/* text */}
        <div className="flex flex-1 items-center text-center flex-col">
          <h1 className="font-bold text-[32px] text-[#22221F] my-3">
            Create your account
          </h1>
          <h2 className="text-[#666666] font-normal text-[20px] ">
            Subscribe now to get full access to my research <br /> articles.
          </h2>
          <h2 className="text-[#666666] font-normal text-[20px] ">
            The subscription is a fee of 12€/month
          </h2>
          <button
            onClick={loginModal.onOpen}
            className="bg-white rounded-full border mt-8  mb-3 flex border-black  gap-x-4 px-20 py-4"
          >
            <Image src={Google} alt="google-button" />
            <span className="font-extrabold bg-white">Login with Google</span>
          </button>
          <div className="flex items-center justify-center mt-4 w-[500px]">
            <div className="h-[1px] bg-gray-300 flex-grow mr-3"></div>
            <span className="text-[#112211] text-base">Or login with</span>
            <div className="h-[1px] bg-gray-300 flex-grow ml-3"></div>
          </div>
          <div className="gap-y-5 flex  mt-10 flex-col">
            <Input
              id="email"
              label="Email"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="name"
              label="Name"
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
            <div className="flex flex-row  items-center gap-x-2 text-left">
              <input type="checkbox" />
              <h1>I agree to all Terms & Privacy Policy</h1>
            </div>
          </div>
          <button
            onClick={handleSubmit(onSubmit)}
            className="rounded-full  mx-auto border mt-8 w-full md:w-[400px] text-center mb-3 flex justify-center items-center border-black bg-black text-white px-10 py-4 self-center"
          >
            Submit
          </button>
          <button
            className="flex items-center gap-x-1"
            onClick={loginModal.onOpen}
          >
            <h1 className="text-neutral-500">Already Have an account?</h1>{" "}
            <span className="text-black text-lg">Log in</span>
          </button>
        </div>

        {/* picture */}
        <div className="flex-1 hidden lg:flex">
          <Image src={Banner} className="" alt="Banner" />
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
