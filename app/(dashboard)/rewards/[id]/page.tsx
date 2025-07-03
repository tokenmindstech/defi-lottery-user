import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import React from "react";
import Image from "next/image";

const PerksDetailPage = () => {
  return (
    <section className="flex flex-col w-fit h-full space-y-10">
      <h2 className="text-3xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
        Available Perks
      </h2>

      <Card className="bg-bgtext-900 border border-bgtext-800 rounded-xl px-4 py-4">
        <CardHeader className="px-0 py-0">
          <CardTitle className="w-full text-bgtext-100 font-inter text-xl font-semibold px-0">
            <div className="flex w-full h-[300px] relative rounded-xl">
              <Image
                src="/assets/images/rewards.jpg"
                alt="Perks"
                fill
                className="object-cover rounded-xl"
                sizes="100%"
              />
            </div>
          </CardTitle>
          <CardDescription className="hidden"></CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <p className="pt-2 font-inter text-sm text-bgtext-600">
            VIP Event Access
          </p>
          <h4 className="text-bgtext-100 font-inter font-medium text-base text-left">
            Rewards Program
          </h4>
        </CardContent>
      </Card>
    </section>
  );
};

export default PerksDetailPage;
