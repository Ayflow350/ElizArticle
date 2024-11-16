import React from "react";
import Container from "@/app/components/Container";
import PaypalSubscriptionButton from "@/app/components/PaypalSubscriptionButton";
import { twMerge } from "tailwind-merge";
import { FcCheckmark } from "react-icons/fc";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Link from "next/link";
import Image from "next/image";
import Lock from "@/assets/lock.png";
import Footer from "@/app/components/Footer";

export const dynamic = "force-dynamic";

interface PricingTier {
  title: string;
  monthlyPrice: number;
  duration: string;
  planId: string;
  buttonText: string;
  popular: boolean;
  inverse: boolean;
  features: string[];
  planType: string;
  name: string;
  description: string;
}

const PaymentPage = async () => {
  const currentUser = await getCurrentUser();

  // Log the current user data
  console.log(currentUser);

  // If no user, show login prompt and signup button
  if (!currentUser) {
    return (
      <Container>
        <div className="flex flex-col justify-center items-center min-h-screen">
          <Image src={Lock} alt="" className=" w-60 h-60  mb-0" />
          <h2 className=" mb-2 text-center text-3xl font-bold">
            You need to be logged in to access this page.
          </h2>
          <p className="text-center text-lg">
            Please log in to view pricing plans.
          </p>
          <div className="text-center mt-4">
            {/* Directly use the Link component */}
            <Link
              href="/signup"
              className="text-white bg-black  py-3 px-6 rounded-lg"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  const pricingTiers: PricingTier[] = [
    {
      title: "Monthly",
      monthlyPrice: 12,
      duration: "month",
      planId: "P-12V23304WY318440JM4UGEVI",
      buttonText: "Sign up now",
      popular: false,
      inverse: true,
      planType: "recurring",
      name: "Monthly Plan",
      description: "This is the monthly subscription plan",
      features: [
        "Up to 50 project members",
        "Unlimited tasks and projects",
        "50GB storage",
        "Integrations",
      ],
    },
    {
      title: "Yearly",
      monthlyPrice: 144,
      duration: "year",
      planId: "P-3301733910084232XM4UMAEQ",
      buttonText: "Sign up now",
      popular: true,
      inverse: false,
      planType: "recurring",
      name: "Yearly Plan",
      description: "This is the yearly subscription plan",
      features: [
        "Up to 5 project members",
        "Unlimited tasks and projects",
        "200GB storage",
        "Dedicated account manager",
        "Custom fields",
      ],
    },
  ];

  return (
    <Container>
      <h2 className="mt-5 mb-2 text-center text-3xl font-bold">Pricing</h2>
      <p className="text-center text-lg">
        Upgrade for unlimited reads, better security, and exclusive features
      </p>
      <div className="flex flex-col lg:flex-row gap-6 justify-center mt-10 items-center">
        {pricingTiers.map(
          ({
            title,
            monthlyPrice,
            duration,
            planId,
            buttonText,
            popular,
            inverse,
            features,
            planType,
            name,
            description,
          }) => (
            <div
              key={title}
              className={twMerge(
                "p-10 border-[#F1F1F1] bg-white text-black rounded-3xl shadow-md max-w-sm w-full",
                inverse && "border-black bg-black text-white"
              )}
            >
              <div className="flex justify-between">
                <h3
                  className={twMerge(
                    "text-lg font-bold",
                    inverse ? "text-white" : "text-black"
                  )}
                >
                  {title}
                </h3>
                {popular && (
                  <div className="inline-flex text-sm px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-500 to-orange-500 text-transparent bg-clip-text">
                    Popular
                  </div>
                )}
              </div>

              <div className="flex items-baseline gap-1 mt-6 mb-4">
                <span className="text-4xl font-bold">${monthlyPrice}</span>
                <span className="font-bold">{`/${duration}`}</span>
              </div>

              {/* PayPal Button */}
              <PaypalSubscriptionButton
                planId={planId}
                userId={currentUser.id}
                amount={monthlyPrice.toString()}
                currency="USD"
                planType={planType}
                name={name}
                description={description}
              />

              <ul className="flex flex-col gap-5 mt-6">
                {features.map((feature) => (
                  <li key={feature} className="text-sm flex items-center gap-4">
                    <FcCheckmark className="h-6 w-6" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>
      <Footer />
    </Container>
  );
};

export default PaymentPage;
