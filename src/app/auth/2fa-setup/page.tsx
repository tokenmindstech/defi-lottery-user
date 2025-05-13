"use client";

import BlueShadowIcon from "@/components/icons/blue-shadow";
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
import SkeletonForm from "./_components/skeleton-form";
import { useQuery } from "@tanstack/react-query";
import { fetchProxy } from "@/lib/utils";
import { redirect, useSearchParams } from "next/navigation";

const TwoFASetupPage = () => {
  const searchParams = useSearchParams();
  const { data: twoFA, isLoading } = useQuery<APIGenerate2FAResponseDTO>({
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
        <Card className="w-full z-20 max-w-md md:max-w-md lg:max-w-xl bg-bgtext-950 border border-bgtext-800">
          <CardHeader className="flex flex-col items-center justify-center space-y-2">
            <CardTitle className="text-3xl lg:text-4xl font-inter font-medium text-bgtext-100 text-center">
              Two-factor Authentication
            </CardTitle>
            <CardDescription className="hidden">
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-5">
            {isLoading ? (
              <SkeletonForm />
            ) : (
              twoFA !== undefined &&
              twoFA !== null && (
                <Fragment>
                  <div className="relative size-72 rounded-xl bg-bgtext-900">
                    <Image
                      src={twoFA.data.qrCode}
                      alt="DeFi Lottery Solutions"
                      fill
                      className="object-cover object-center rounded-xl p-4"
                      sizes="100%"
                    />
                  </div>

                  <div className="w-full h-full grid grid-cols-6 gap-y-5">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-b from-linprimary-start to-transparent rounded-full border border-bgtext-800">
                      <span className="text-bgtext-100 text-lg font-bold">
                        1
                      </span>
                    </div>
                    <div className="flex flex-col space-y-2 col-span-5 h-full">
                      <p className="text-bgtext-100 text-sm font-inter font-normal text-left">
                        Scan the QR code using any authentication application on
                        your phone(e.g. Google Authenticator, Duo Mobile, Authy)
                        or enter the following code
                      </p>
                      <CopySecret secret={twoFA.data.secret} />
                    </div>

                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-b from-linprimary-start to-transparent rounded-full border border-bgtext-800">
                      <span className="text-bgtext-100 text-lg font-bold">
                        2
                      </span>
                    </div>
                    <div className="flex flex-col space-y-2 col-span-5 h-full">
                      <p className="text-bgtext-100 text-sm font-inter font-normal text-left">
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
              )
            )}
          </CardContent>
        </Card>
      </div>
      <BlueShadowIcon className="absolute h-full z-10 inset-0 mask-t-from-10%" />
    </section>
  );
};

export default TwoFASetupPage;
