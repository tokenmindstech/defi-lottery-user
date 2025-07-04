import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ItemPerks = () => {
  return (
    <Card className="bg-bgtext-900 border border-bgtext-800 rounded-xl px-4 py-4">
      <CardHeader className="px-0 py-0">
        <div className="flex w-full h-[200px] relative rounded-xl bg-linblue-start">
          <Image
            src="/assets/images/iphone.png"
            alt="Perks"
            fill
            className="object-contain rounded-xl"
            sizes="100%"
          />
        </div>
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
        <Link href="/bonus-reward/1" className="w-full">
          <Button className="w-full bg-bgtext-800  border border-bgtext-700 hover:bg-bgtext-700 rounded-xl cursor-pointer">
            <p className="text-bgtext-100 font-inter font-medium text-sm py-4">
              More Details
            </p>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ItemPerks;
