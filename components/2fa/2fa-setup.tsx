"use client";

import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchProxy } from "@/lib/utils";
import ResultDisplay from "@/components/shared/result-display";
import Skeleton2FA from "./skeleton-2fa";
import CopySecret from "./copy-secret";
import Setup2FAForm from "./setup-2fa-form";

const TwoFaSetup = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const {
    data: twoFA,
    isLoading,
    error,
  } = useQuery<APIGenerate2FAResponseDTO>({
    queryKey: ["generate-2fa"],
    queryFn: async () =>
      fetchProxy({
        method: "GET",
        url: "two-factor/generate",
        auth: true,
      }),
  });

  return (
    <ResultDisplay
      isLoading={isLoading}
      error={error}
      data={twoFA}
      loadingComponent={<Skeleton2FA />}
      dataErrorMessage="An error occurred while generating 2FA."
      loadingErrorMessage="Failed to load 2FA setup. Please try again later."
    >
      {(twoFA) => (
        <div className="relative flex flex-col items-center z-20">
          {/* Barcode */}
          <div className="relative size-72 rounded-xl bg-bgtext-900">
            <Image
              src={twoFA.data.qrCode}
              alt="DeFi Lottery Solutions"
              fill
              className="object-cover object-center p-4 rounded-xl"
              sizes="100%"
            />
          </div>

          {/* Instructions & Input */}
          <div className="grid w-full h-full grid-cols-7 gap-y-8 mt-8">
            {/* #1 */}
            <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-gradient-to-b from-linprimary-start to-transparent border-bgtext-800">
              <span className="text-lg font-bold text-bgtext-100">1</span>
            </div>
            <div className="flex flex-col h-full col-span-6 space-y-2">
              <p className="text-sm font-normal text-left text-bgtext-100 font-inter">
                Scan the QR or enter the following code using any authentication
                application on your phone (e.g. Google Authenticator, Duo
                Mobile, Authy)
              </p>
              <CopySecret secret={twoFA.data.secret} />
            </div>

            {/* #2 & OTP Input */}
            <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-gradient-to-b from-linprimary-start to-transparent border-bgtext-800">
              <span className="text-lg font-bold text-bgtext-100">2</span>
            </div>
            <div className="flex flex-col h-full col-span-6 space-y-2">
              <p className="text-sm font-normal text-left text-bgtext-100 font-inter">
                Enter the code shown on the app:
              </p>
              <Setup2FAForm
                setOpen={setOpen}
                qrCode={twoFA.data.qrCode}
                secret={twoFA.data.secret}
              />
            </div>
          </div>
        </div>
      )}
    </ResultDisplay>
  );
};

export default TwoFaSetup;
