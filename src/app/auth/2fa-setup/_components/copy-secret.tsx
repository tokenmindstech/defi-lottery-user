"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "@phosphor-icons/react/dist/ssr";
import toast from "react-hot-toast";

interface CopySecretProps {
  secret: string;
}

const CopySecret = ({ secret }: CopySecretProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(secret);
    toast.success("Copied to clipboard");
  };
  return (
    <div className="flex flex-row items-center justify-between w-full bg-bgtext-900 rounded-lg p-4">
      <p className="text-bgtext-100 text-base font-inter tracking-wider font-medium">
        {secret}
      </p>
      <Button
        size={"icon"}
        variant={"ghost"}
        className="cursor-pointer hover:bg-bgtext-100"
        onClick={handleCopy}
      >
        <Copy className="size-6 text-bgtext-500" />
      </Button>
    </div>
  );
};

export default CopySecret;
