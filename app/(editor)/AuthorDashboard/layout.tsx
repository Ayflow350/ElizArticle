"use client";

import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import { QueryClient, QueryClientProvider } from "react-query";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <div className="mt-[100px]">
      {/* <Sidebar /> */}

      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </div>
  );
};

export default DashboardLayout;
