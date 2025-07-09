"use client";

import { Button } from "@/components/ui/button";
import React from "react";

const GlobalError = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen space-y-5 bg-bgtext-950">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-bgtext-100">We&apos;re sorry</h1>
        <p className="mt-4 text-lg text-bgtext-300">
          Something went wrong with our platform.
        </p>
        <p className="mt-2 text-lg text-bgtext-300">
          Our team has been notified and is working to resolve this issue.
        </p>
      </div>
      <Button
        onClick={() => window.location.reload()}
        className="transition-all duration-300 ease-out border-2 rounded-lg cursor-pointer w-fit bg-gradient-to-b from-linprimary-start to-linprimary-end text-bgtext-100 hover:bg-gradient-to-b border-bgtext-800 hover:from-linprimary-start hover:to-linprimary-end/50"
      >
        Refresh Page
      </Button>
    </div>
  );
};

export default GlobalError;
