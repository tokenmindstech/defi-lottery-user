import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import SubscriptionForm from "./_components/subscription-form";
import BlueShadowBottom from "@/components/icons/blue-shadow-bottom";

const SubscriptionOffersPage = () => {
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
              Subscription
            </CardTitle>
            <CardDescription className="text-sm text-bgtext-500 font-inter font-normal text-center">
              Choose a plan to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-5">
            <SubscriptionForm />
          </CardContent>
        </Card>
      </div>
      <BlueShadowBottom className="absolute h-full z-10 inset-0 mask-t-from-10%" />
    </section>
  );
};

export default SubscriptionOffersPage;
