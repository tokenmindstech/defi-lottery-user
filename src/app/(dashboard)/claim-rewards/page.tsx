import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, Gift, Trophy } from "@phosphor-icons/react/dist/ssr";
import React from "react";
import HistoryClaimReward from "./_components/history";

const ClaimRewardsPage = () => {
  return (
    <section className="flex flex-col w-full h-full space-y-10">
      <h2 className="text-3xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
        My Prizes Overview
      </h2>

      <div className="flex w-full h-full flex-col md:flex-row space-y-5 md:space-y-0 items-start justify-between bg-bgtext-900 border border-bgtext-800 rounded-xl p-5">
        <div className="flex flex-row w-full space-x-5 items-center justify-start">
          <div className="flex flex-row space-x-3 items-center justify-start bg-gradient-to-b from-linprimary-start to-linprimary-end  p-5 rounded-xl">
            <div className="flex flex-col w-full h-full relative rounded-xl">
              <div className="flex flex-row space-x-10 items-center justify-between">
                <p className="text-bgtext-100 font-inter text-xs">
                  Total Prize Won
                </p>
                <div className="flex bg-bgtext-900 rounded-full p-1.5">
                  <Trophy className="size-5 text-bgtext-100" />
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
          </div>

          <Separator
            className="data-[orientation=vertical]:h-[100px] bg-bgtext-700"
            orientation="vertical"
          />

          <div className="flex flex-row space-x-3 items-center justify-start bg-transparent p-5 rounded-xl">
            <div className="flex flex-col w-full h-full relative rounded-xl">
              <div className="flex flex-row space-x-10 items-center justify-between">
                <p className="text-bgtext-100 font-inter text-xs">
                  Prizes Pending Claim
                </p>
                <div className="flex bg-bgtext-900 rounded-full p-1.5">
                  <Clock className="size-5 text-bgtext-100" />
                </div>
              </div>
              <p className="text-bgtext-100 font-inter text-4xl font-semibold mt-2">
                3
              </p>
            </div>
          </div>
        </div>

        <Button className="bg-gradient-to-b p-5 from-linprimary-start to-linprimary-end border-2 border-bgtext-800 hover:bg-gradient-to-b hover:from-linprimary-start hover:to-linprimary-end/50 rounded-xl cursor-pointer ease-out transition-all duration-300">
          <div className="flex flex-row space-x-3 items-center justify-start">
            <Gift className="size-5 text-bgtext-100" />
            <p className="text-bgtext-100 font-inter font-medium text-sm py-4 whitespace-nowrap">
              Claim Reward
            </p>
          </div>
        </Button>
      </div>

      <HistoryClaimReward />
    </section>
  );
};

export default ClaimRewardsPage;
