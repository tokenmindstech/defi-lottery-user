import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import React from "react";
import Image from "next/image";

const Setup2FAForm = () => {
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
          Two-factor Authentication
        </CardTitle>
        <CardDescription className="hidden">
          Deploy your new project in one-click.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-5"></CardContent>
    </Card>
  );
};

export default Setup2FAForm;
