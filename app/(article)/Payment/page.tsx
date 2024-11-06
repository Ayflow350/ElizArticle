// Use this as a Server Component (No need for "use client")
import React from "react";
import Container from "@/app/components/Container";
import PaypalSubscriptionButton from "@/app/components/PaypalSubscriptionButton";
import { twMerge } from "tailwind-merge";
import { FcCheckmark } from "react-icons/fc";
import getCurrentUser from "@/app/actions/getCurrentUser";
export const dynamic = "force-dynamic";

interface PricingTier {
  title: string;
  monthlyPrice: number;
  duration: string;
  buttonText: string;
  popular: boolean;
  inverse: boolean;
  features: string[];
}

const PaymentPage = async () => {
  // Redirect to login or show a message if the user is not authenticated

  const pricingTiers: PricingTier[] = [
    {
      title: "Monthly",
      monthlyPrice: 12,
      duration: "month",
      buttonText: "Sign up now",
      popular: false,
      inverse: true,
      features: [
        "Up to 50 project members",
        "Unlimited tasks and projects",
        "50GB storage",
        "Integrations",
        "Priority support",
        "Advanced support",
        "Export support",
      ],
    },
    {
      title: "Yearly",
      monthlyPrice: 144,
      duration: "year",
      buttonText: "Sign up now",
      popular: true,
      inverse: false,
      features: [
        "Up to 5 project members",
        "Unlimited tasks and projects",
        "200GB storage",
        "Integrations",
        "Dedicated account manager",
        "Custom fields",
        "Advanced analytics",
        "Export capabilities",
        "API access",
        "Advanced security features",
      ],
    },
  ];

  return (
    <Container>
      <h2 className="mt-5 mb-2 text-center text-3xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter bg-gradient-to-b from-black to-[#000] text-transparent bg-clip-text">
        Pricing
      </h2>
      <p className="text-center text-[22px] leading-[30px] tracking-tight">
        Upgrade for unlimited reads, better security, and exclusive features
      </p>
      <div className="flex flex-col lg:flex-row lg:items-end gap-6 justify-center mt-10 items-center">
        {pricingTiers.map(
          ({
            title,
            monthlyPrice,
            duration,
            popular,
            inverse,
            features,
            buttonText,
          }) => (
            <div
              key={title}
              className={twMerge(
                "p-10 border-[#F1F1F1] bg-white text-black rounded-3xl shadow-[0_7px_14px_#EAEAEA] max-w-sm w-full",
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
                  <div
                    className={twMerge(
                      "inline-flex text-sm px-4 py-1.5 rounded-xl",
                      "border-black border-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-transparent bg-clip-text font-medium"
                    )}
                  >
                    Popular
                  </div>
                )}
              </div>

              <div className="flex items-baseline gap-1 mt-[30px] mb-4">
                <span className="text-4xl font-bold tracking-tighter leading-none">
                  ${monthlyPrice}
                </span>{" "}
                <span
                  className={twMerge(
                    "tracking-tight font-bold",
                    inverse ? "text-white" : "text-black"
                  )}
                >
                  /{duration}
                </span>
              </div>
              {/* <PaypalSubscriptionButton
                userId={currentUser.id}
                planType="monthly" // or "yearly" based on your preference
                name="Premium Subscription"
                description="Access to premium features"
                amount="24.00" // Adjust the amount as needed
                currency="USD"
              /> */}
              <ul className="flex flex-col gap-5 mt-8">
                {features.map((feature) => (
                  <li key={feature} className="text-sm flex items-center gap-4">
                    <FcCheckmark
                      className={twMerge(
                        "h-6 w-6",
                        inverse ? "text-black" : "text-white"
                      )}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-4">
                {popular ? "Most Popular" : "Select Plan"}
              </button>
            </div>
          )
        )}
      </div>
    </Container>
  );
};

export default PaymentPage;
