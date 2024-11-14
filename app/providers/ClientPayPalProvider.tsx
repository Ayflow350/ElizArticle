// app/components/ClientPayPalProvider.tsx

"use client"; // Mark this as a client component

import React from "react";
import dynamic from "next/dynamic";

const PayPalScriptProvider = dynamic(
  () =>
    import("@paypal/react-paypal-js").then((mod) => mod.PayPalScriptProvider),
  { ssr: false } // Disable server-side rendering for this component
);

interface ClientPayPalProviderProps {
  children: React.ReactNode; // Explicitly typing the children prop
}

// Use an arrow function properly with React.FC
const ClientPayPalProvider: React.FC<ClientPayPalProviderProps> = ({
  children,
}) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: "YOUR_CLIENT_ID",
        components: "buttons",
        intent: "subscription",
        vault: true,
      }}
    >
      {children}
    </PayPalScriptProvider>
  );
};

export default ClientPayPalProvider;
