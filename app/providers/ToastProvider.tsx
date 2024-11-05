"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <div className="bg-transparent">
      <Toaster />
    </div>
  );
};

export default ToasterProvider;
