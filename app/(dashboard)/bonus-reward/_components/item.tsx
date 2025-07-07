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
import BlueShadow from "@/components/icons/blue-shadow";
import RotatingText from "@/components/ui/rotating-text";
import { truncateString } from "@/lib/utils";
// import SeaShadow from "@/components/icons/sea-shadow";

interface ItemPersksProps {
  perks: Perks;
}

const ItemPerks = ({ perks }: ItemPersksProps) => {
  return (
    <Card className="bg-bgtext-900 border border-bgtext-800 rounded-xl gap-3 px-4 py-4">
      <CardHeader className="relative px-0 py-0">
        <div className="absolute top-0 left-0 z-20 flex w-fit px-2 py-1 bg-linprimary-start rounded-br-2xl">
          <RotatingText
            texts={perks.category}
            mainClassName="text-bgtext-100 text-sm"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={4000}
          />
        </div>
        <div className="flex w-full h-[250px] items-center justify-center relative rounded-xl">
          <div className="flex w-full h-[180px] absolute rounded-xl z-40">
            <Image
              src={perks.imageUrl}
              alt={perks.name}
              fill
              className="object-contain rounded-xl"
              sizes="100%"
            />
          </div>
          <BlueShadow className="absolute inset-0 z-10 rounded-xl" />
          {/* <SeaShadow className="absolute inset-0 z-10 rounded-xl" /> */}
        </div>
        <CardDescription className="hidden"></CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <p className="pt-2 font-inter text-sm text-bgtext-600">
          VIP Event Access
        </p>
        <h4 className="text-bgtext-100 font-inter font-medium text-base text-left">
          {truncateString(perks.name, 25)}
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
