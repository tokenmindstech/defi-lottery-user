"use client";

import React, { Fragment } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import CopySecret from "./_components/copy-secret";
import Setup2FAForm from "./_components/setup-2fa-form";
import { useQuery } from "@tanstack/react-query";
import { fetchProxy } from "@/lib/utils";
import { redirect, useSearchParams } from "next/navigation";
import BlueShadowBottom from "@/components/icons/blue-shadow-bottom";
import Skeleton2FA from "./_components/skeleton-2fa";
import ResultDisplay from "@/components/shared/result-display";

const TwoFASetupPage = () => {
  const searchParams = useSearchParams();
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
        customHeaders: {
          Authorization: `Bearer ${searchParams.get("token")}`,
        },
      }),
    enabled: !!searchParams.get("token"),
  });

  if (searchParams.get("token") === null) {
    redirect("/auth");
  }

  return (
    <section
      className={
        "flex w-full h-screen rounded-xl bg-gradient-to-t from-linblue-start to-black"
      }
    >
      <div className="flex items-center justify-center w-full h-full bg-[url(/assets/images/checkboard-transparent.png)] bg-no-repeat bg-bottom bg-cover rounded-xl">
        <Card className="z-20 w-full max-w-md border md:max-w-md lg:max-w-xl bg-bgtext-950 border-bgtext-800">
          <CardHeader className="flex flex-col items-center justify-center space-y-2">
            <CardTitle className="text-3xl font-medium text-center lg:text-4xl font-inter text-bgtext-100">
              Two-factor Authentication
            </CardTitle>
            <CardDescription className="hidden">
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-5">
            <ResultDisplay
              isLoading={isLoading}
              error={error}
              data={twoFA}
              loadingComponent={<Skeleton2FA />}
              dataErrorMessage="An error occurred while generating 2FA."
              loadingErrorMessage="Failed to load 2FA setup. Please try again later."
            >
              {(twoFA) => (
                <Fragment>
                  <div className="relative size-72 rounded-xl bg-bgtext-900">
                    <Image
                      src={twoFA.data.qrCode}
                      alt="DeFi Lottery Solutions"
                      fill
                      className="object-cover object-center p-4 rounded-xl"
                      sizes="100%"
                    />
                  </div>

                  <div className="grid w-full h-full grid-cols-6 gap-y-5">
                    <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-gradient-to-b from-linprimary-start to-transparent border-bgtext-800">
                      <span className="text-lg font-bold text-bgtext-100">
                        1
                      </span>
                    </div>
                    <div className="flex flex-col h-full col-span-5 space-y-2">
                      <p className="text-sm font-normal text-left text-bgtext-100 font-inter">
                        Scan the QR code using any authentication application on
                        your phone(e.g. Google Authenticator, Duo Mobile, Authy)
                        or enter the following code
                      </p>
                      <CopySecret secret={twoFA.data.secret} />
                    </div>

                    <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-gradient-to-b from-linprimary-start to-transparent border-bgtext-800">
                      <span className="text-lg font-bold text-bgtext-100">
                        2
                      </span>
                    </div>
                    <div className="flex flex-col h-full col-span-5 space-y-2">
                      <p className="text-sm font-normal text-left text-bgtext-100 font-inter">
                        Enter the code shown on the app:
                      </p>
                      <Setup2FAForm
                        qrCode={twoFA.data.qrCode}
                        secret={twoFA.data.secret}
                        token={searchParams.get("token") as string}
                      />
                    </div>
                  </div>
                </Fragment>
              )}
            </ResultDisplay>
          </CardContent>
        </Card>
      </div>
      <BlueShadowBottom className="absolute h-full z-10 inset-0 mask-t-from-10%" />
    </section>
  );
};

export default TwoFASetupPage;
