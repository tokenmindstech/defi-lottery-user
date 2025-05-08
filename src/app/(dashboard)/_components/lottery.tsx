import React from "react";
import { CreditCard, Medal, Ticket } from "@phosphor-icons/react/dist/ssr";
import LotteryStats from "@/components/shared/lottery-stats";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";

const DashboardLottery = () => {
  return (
    <Card className="bg-bgtext-950 border border-bgtext-800">
      <CardHeader className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-col">
          <CardTitle className="text-bgtext-100 font-inter text-xl font-semibold">
            Lottery Stats
          </CardTitle>
          <CardDescription className="text-bgtext-600 font-inter text-sm font-normal">
            View you lottery ticket statistics
          </CardDescription>
        </div>
        <Link href={"/dashboard/stats"}>
          <Button className="bg-gradient-to-b from-linprimary-start to-linprimary-end text-bgtext-100 hover:bg-gradient-to-b border-2 border-bgtext-800 hover:from-linprimary-start hover:to-linprimary-end/50 rounded-lg cursor-pointer ease-out transition-all duration-300">
            View Details
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <LotteryStats
          variant="checkerboard"
          className="md:col-span-2 lg:col-span-1"
        >
          <div className="flex flex-col w-full h-full">
            <div className="flex flex-row items-center justify-between">
              <p className="text-bgtext-600 font-inter text-xs">Rewards Earn</p>

              <div className="flex p-1.5 rounded-lg bg-gradient-to-b from-linblack-start via-30% via-linblack-via to-linblack-end">
                <CreditCard className="size-5 text-bgtext-100" />
              </div>
            </div>

            <p className="text-bgtext-100 font-inter text-4xl font-semibold mt-2">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(150)}
            </p>
          </div>
        </LotteryStats>
        <LotteryStats>
          <div className="flex flex-col w-full h-full">
            <div className="flex flex-row items-center justify-between">
              <p className="text-bgtext-600 font-inter text-xs">
                Total Tickets
              </p>

              <div className="flex p-1.5 rounded-lg bg-gradient-to-b from-linblack-start via-30% via-linblack-via to-linblack-end">
                <Ticket className="size-5 text-bgtext-100" />
              </div>
            </div>

            <p className="text-bgtext-100 font-inter text-4xl font-semibold mt-2">
              50
            </p>
          </div>
        </LotteryStats>
        <LotteryStats>
          <div className="flex flex-col w-full h-full">
            <div className="flex flex-row items-center justify-between">
              <p className="text-bgtext-600 font-inter text-xs">Wins</p>

              <div className="flex p-1.5 rounded-lg bg-gradient-to-b from-linblack-start via-30% via-linblack-via to-linblack-end">
                <Medal className="size-5 text-bgtext-100" />
              </div>
            </div>

            <p className="text-bgtext-100 font-inter text-4xl font-semibold mt-2">
              3
            </p>
          </div>
        </LotteryStats>
      </CardContent>
    </Card>
  );
};

export default DashboardLottery;
