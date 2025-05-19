import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ItemPerks = () => {
  return (
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
      <CardFooter className="px-0">
        <Link href="/perks/1" className="w-full">
          <Button className="w-full bg-bgtext-800  border border-bgtext-700 hover:bg-bgtext-700 rounded-xl cursor-pointer">
            <p className="text-bgtext-100 font-inter font-medium text-sm py-4">
              Claim Now
            </p>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ItemPerks;
