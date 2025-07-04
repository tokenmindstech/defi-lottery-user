import { censorString } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import RotatingText from "@/components/ui/rotating-text";

interface WinnerBannerProps {
  perks: Perks;
}

const WinnerBanner = ({ perks }: WinnerBannerProps) => {
  return (
    <div className="relative flex flex-row items-center justify-between space-x-5 w-full h-full p-4 bg-gradient-to-b from-linprimary-start to-linprimary-end/50 text-bgtext-100 hover:bg-gradient-to-b border-2 border-bgtext-800 rounded-2xl ease-out transition-all duration-300 overflow-visible">
      <div className="flex flex-row space-x-2 items-center relative">
        <p className="text-sm font-inter font-light whitespace-nowrap">
          Congratulations to{" "}
        </p>
        <RotatingText
          texts={perks.perkWinners.map((winner) => censorString(winner.name))}
          mainClassName="text-bgtext-100 font-bold"
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

      <div className="flex flex-row items-center relative">
        <p className="hidden lg:block text-sm font-inter font-medium whitespace-nowrap">
          You&apos;ve won this week&apos;s bonus reward:{" "}
        </p>

        <div className="relative w-[60px]">
          <Image
            src={perks.imageUrl}
            alt={perks.name}
            width={60}
            height={60}
            className="object-cover rounded-lg absolute -top-13 right-0 z-10 shadow-lg"
            draggable={false}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default WinnerBanner;
