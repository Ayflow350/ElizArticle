import React from "react";
import getAllSubscribers from "@/app/actions/getSubscribers";
import PaymentTable from "../_components/PaymentTable"; // Import the Client Component

export default async function PaymentPage() {
  const subscribers = await getAllSubscribers();

  return (
    <div className="p-6 text-black rounded-lg h-full w-full mx-auto">
      <h1 className="text-2xl mb-4">Users Subscription</h1>
      <PaymentTable subscribers={subscribers} />
    </div>
  );
}
