import React from "react";
import WinnerBanner from "./_components/winner-banner";
import Image from "next/image";
import BlueShadow from "@/components/icons/blue-shadow";
import CountDownBonusDraw from "./_components/count-down-bonus";
import BonusRewardHistory from "./_components/bonus-reward-history";

const PerksPage = () => {
  return (
    <section className="flex flex-col w-full h-full space-y-10">
      <h2 className="text-3xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
        Lucky Draw
      </h2>

      <WinnerBanner
        perks={{
          id: "1",
          imageUrl: "/assets/images/iphone.png",
          name: "iPhone 14 Pro Max",
          description: "Win an iPhone 14 Pro Max",
          category: ["Electronics"],
          numberOfWinners: 1,
          createdAt: new Date().toISOString(),
          validAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          perkWinners: [
            {
              id: "1",
              name: "John Doe",
            },
            {
              id: "2",
              name: "Jane Smith",
            },
            {
              id: "3",
              name: "Alice Johnson",
            },
          ],
        }}
      />

      <div className="w-full h-full grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="flex w-full relative h-40 xl:col-span-2 bg-bgtext-900 border border-bgtext-800 rounded-xl">
          <div className="absolute z-20 flex flex-row items-center justify-between w-full h-full">
            <div className="flex flex-col w-1/2 items-start justify-center p-5">
              <p className="text-base text-bgtext-100 font-inter">
                Bonus Reward
              </p>
              <h3 className="text-2xl font-bold text-bgtext-100 font-inter">
                Win an iPhone 14 Pro Max
              </h3>
            </div>

            <div className="relative w-1/2 h-full">
              <Image
                src="/assets/images/iphone.png"
                alt="lottery"
                className="object-contain"
                priority
                fill
                sizes="100%"
              />
            </div>
          </div>
          <BlueShadow className="absolute z-10 left-0 top-0" />
        </div>

        <div className="flex flex-col space-y-2 w-full h-full bg-bgtext-900 border border-bgtext-800 rounded-xl p-5">
          <p className="text-base text-bgtext-100 font-inter">Next Draw In</p>
          <CountDownBonusDraw />
        </div>
      </div>

      <BonusRewardHistory />
    </section>
  );
};

export default PerksPage;
