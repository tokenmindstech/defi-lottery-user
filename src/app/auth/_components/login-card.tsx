import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GoogleLogo, TelegramLogo } from "@phosphor-icons/react/dist/ssr";

export function LoginCardForm() {
  return (
    <Card className="w-full z-20 max-w-sm md:max-w-md lg:max-w-lg bg-bgtext-950 border border-bgtext-800">
      <CardHeader className="flex flex-col items-center justify-center space-y-2">
        <div className="relative h-25 w-25 bg-gradient-to-b from-linprimary-start to-linprimary-end rounded-xl">
          <Image
            src="/assets/icons/536.svg"
            alt="DeFi Lottery Solutions"
            fill
            className="object-cover object-center rounded-tl-xl rounded-tr-xl"
            sizes="100%"
          />
        </div>
        <CardTitle className="text-3xl lg:text-4xl font-inter font-medium text-bgtext-100 text-center">
          Web3Auth DeFi Lottery
        </CardTitle>
        <CardDescription className="hidden">
          Deploy your new project in one-click.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-5">
        <Button className="w-full flex flex-row items-center justify-center bg-bgtext-800 border py-6 border-bgtext-700 hover:bg-bgtext-700 rounded-xl cursor-pointer">
          <GoogleLogo weight="fill" className="size-6 fill-bgtext-100" />
          <p className="text-bgtext-100 font-inter font-medium text-base">
            Login with Google
          </p>
        </Button>
        <Button className="w-full flex flex-row items-center justify-center bg-bgtext-800 border py-6 border-bgtext-700 hover:bg-bgtext-700 rounded-xl cursor-pointer">
          <TelegramLogo weight="fill" className="size-6 fill-bgtext-100" />
          <p className="text-bgtext-100 font-inter font-medium text-base">
            Login with Telegram
          </p>
        </Button>
      </CardContent>
    </Card>
  );
}
