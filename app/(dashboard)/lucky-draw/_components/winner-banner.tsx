import { censorString } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";

interface WinnerBannerProps {
  perks: Perks;
}

const WinnerBanner = ({ perks }: WinnerBannerProps) => {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-linprimary-start to-linprimary-end/50 text-bgtext-100 hover:bg-gradient-to-b border-2 border-bgtext-800 rounded-2xl ease-out transition-all duration-300">
      <div className="relative overflow-visible">
        <Marquee
          direction="left"
          speed={30}
          gradient={false}
          className="flex flex-row items-center space-x-5 p-4 overflow-x-hidden "
        >
          <p className="text-sm font-inter font-light whitespace-nowrap pr-3">
            Congratulations to{" "}
            {perks.perkWinners.map((winner, index) => (
              <span key={winner.id} className="font-medium">
                {censorString(winner.name)}
                {index < perks.perkWinners.length - 1
                  ? index === perks.perkWinners.length - 2
                    ? " and "
                    : ", "
                  : ""}
              </span>
            ))}
          </p>

          <div className="flex flex-row items-center relative">
            <p className="text-sm font-inter font-medium whitespace-nowrap mr-2">
              You&apos;ve won this week&apos;s bonus reward:{" "}
            </p>

            <div className="relative w-[70px]">
              <Image
                src={perks.imageUrl}
                alt={perks.name}
                width={80}
                height={80}
                className="absolute object-cover rounded-lg shadow-2xl transform -translate-y-8 scale-110 rotate-3 hover:scale-125 hover:-translate-y-10 transition-all duration-300 z-50"
                draggable={false}
                loading="lazy"
                style={{
                  filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
                  transformOrigin: "center bottom",
                }}
              />
            </div>
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default WinnerBanner;
