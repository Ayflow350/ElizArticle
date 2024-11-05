"use client";

import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import { QueryClient, QueryClientProvider } from "react-query";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <div className="h-full">
      {/* <Sidebar /> */}

      <div className="md:pl-56 pt-[80px] h-full">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </div>
    </div>
  );
};

export default DashboardLayout;
