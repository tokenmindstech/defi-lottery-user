"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import Verify2FAForm from "./_components/verify-2fa-form";
import BlueShadowBottom from "@/components/icons/blue-shadow-bottom";

const TwoFAChallengePage = () => {
  const searchParams = useSearchParams();
  return (
    <section
      className={
        "flex w-full h-screen rounded-xl bg-gradient-to-t from-linblue-start to-black"
      }
    >
      <div className="flex items-center justify-center w-full h-full bg-[url(/assets/images/checkboard-transparent.png)] bg-no-repeat bg-bottom bg-cover rounded-xl">
        <Card className="w-full z-20 max-w-md md:max-w-md lg:max-w-xl bg-bgtext-950 border border-bgtext-800">
          <CardHeader className="flex flex-col items-center justify-center space-y-2">
            <CardTitle className="text-3xl lg:text-4xl font-inter font-medium text-bgtext-100 text-center">
              Two-Factor Authentication
            </CardTitle>
            <CardDescription className="hidden">
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-5">
            <div className="flex flex-col space-y-2 col-span-5 h-full">
              <p className="text-bgtext-100 text-sm font-inter font-normal text-left">
                Enter the code shown on the app:
              </p>
              <Verify2FAForm token={searchParams.get("token") as string} />
            </div>
          </CardContent>
        </Card>
      </div>
      <BlueShadowBottom className="absolute h-full z-10 inset-0 mask-t-from-10%" />
    </section>
  );
};

export default TwoFAChallengePage;
