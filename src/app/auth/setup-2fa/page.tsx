import BlueShadowIcon from "@/components/icons/blue-shadow";
import React from "react";
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

const Setup2FAPage = () => {
  return (
    <section
      className={
        "flex w-full h-screen rounded-xl bg-gradient-to-t from-linblue-start to-black"
      }
    >
      <div className="flex items-center justify-center w-full h-full bg-[url(/assets/images/checkboard-transparent.png)] bg-no-repeat bg-bottom bg-cover rounded-xl">
        <Card className="w-full z-20 max-w-sm md:max-w-md lg:max-w-lg bg-bgtext-950 border border-bgtext-800">
          <CardHeader className="flex flex-col items-center justify-center space-y-2">
            <CardTitle className="text-3xl lg:text-4xl font-inter font-medium text-bgtext-100 text-center">
              Two-factor Authentication
            </CardTitle>
            <CardDescription className="hidden">
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-5">
            <div className="relative w-[150px] h-[150px] rounded-xl bg-bgtext-900">
              <Image
                src="/assets/images/rewards.jpg"
                alt="DeFi Lottery Solutions"
                fill
                className="object-cover object-center rounded-xl p-4"
                sizes="100%"
              />
            </div>

            <div className="w-full h-full grid grid-cols-6 gap-y-5">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-b from-linprimary-start to-transparent rounded-full border border-bgtext-800">
                <span className="text-bgtext-100 text-lg font-bold">1</span>
              </div>
              <div className="flex flex-col space-y-2 col-span-5 h-full">
                <p className="text-bgtext-100 text-sm font-inter font-normal text-left">
                  Scan the QR code using any authentication application on your
                  phone(e.g. Google Authenticator, Duo Mobile, Authy) or enter
                  the following code
                </p>
                <CopySecret secret="I5BEYII7BQOVKKZZ" />
              </div>

              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-b from-linprimary-start to-transparent rounded-full border border-bgtext-800">
                <span className="text-bgtext-100 text-lg font-bold">2</span>
              </div>
              <div className="flex flex-col space-y-2 col-span-5 h-full">
                <p className="text-bgtext-100 text-sm font-inter font-normal text-left">
                  Enter the 6 confirmation code shown on the app:
                </p>
                <Setup2FAForm />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <BlueShadowIcon className="absolute h-full z-10 inset-0 mask-t-from-10%" />
    </section>
  );
};

export default Setup2FAPage;
