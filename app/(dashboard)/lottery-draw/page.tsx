"use client";

import BlueShadow from "@/components/icons/blue-shadow";
import Image from "next/image";
import React from "react";
import HistoryDraw from "./_components/history";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { fetchProxy } from "@/lib/utils";
import SkeletonLuckyDrawPool from "./_components/skeleton-lucky-draw-pool";
import DailyWinningNumber from "./_components/daily-winning-number";
import SeaShadow from "@/components/icons/sea-shadow";
import DailyCountDown from "./_components/daily-count-down";
import WeeklyCountDown from "./_components/weekly-count-down";
import { CURRENCY_FRACTION } from "@/constant/common";
import ResultDisplay from "@/components/shared/result-display";
import RotatingText from "@/components/ui/rotating-text";

const LuckyDrawPage = () => {
  const { data: userSession } = useSession();
  const {
    data: prizePool,
    isLoading,
    error,
  } = useQuery<APIGetTodaysPrizePoolResponseDTO>({
    queryKey: ["prize-pool", userSession?.user.id],
    queryFn: async () =>
      fetchProxy({
        url: "prize-pool",
        method: "GET",
        auth: true,
      }),
    enabled: !!userSession,
  });

  return (
    <section className="flex flex-col w-full h-full space-y-10">
      <h2 className="text-3xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
        Lottery Draw
      </h2>

      <ResultDisplay
        isLoading={isLoading}
        error={error}
        data={prizePool}
        loadingComponent={<SkeletonLuckyDrawPool />}
        dataErrorMessage="An error occurred while fetching the prize pool."
        loadingErrorMessage="Failed to load the prize pool. Please try again later."
      >
        {(prizePool) => (
          <div className="flex flex-col w-full h-full space-y-5">
            <div className="grid w-full h-full grid-cols-1 gap-5 xl:grid-cols-3">
              <div className="relative flex w-full h-40 border xl:col-span-2 bg-bgtext-900 border-bgtext-800 rounded-xl">
                <div className="absolute z-20 flex flex-row items-center justify-between w-full h-full">
                  <div className="flex flex-col items-start justify-center w-1/2 p-5">
                    <p className="text-base text-bgtext-100 font-inter">
                      Sunday Jackpot Prize Pool
                    </p>
                    <p className="mt-2 text-4xl font-semibold text-bgtext-100 font-inter">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: CURRENCY_FRACTION.MINIMUM,
                        maximumFractionDigits: CURRENCY_FRACTION.MAXIMUM,
                      }).format(
                        prizePool.data.filter((item) => item.id === "WEEKLY")[0]
                          .amount || 0
                      )}
                    </p>
                  </div>

                  <div className="relative w-1/2 h-full">
                    <Image
                      src="/assets/images/lottery.png"
                      alt="lottery"
                      className="object-contain transform translate-x-4 translate-y-[-16px] scale-120 hover:translate-x-4 hover:translate-y-[-28px] hover:scale-135 transition-all duration-300 ease-out"
                      priority
                      fill
                      sizes="100%"
                    />
                  </div>
                </div>
                <BlueShadow className="absolute top-0 left-0 z-10" />
              </div>

              <div className="flex flex-col w-full h-full p-5 space-y-2 border bg-bgtext-900 border-bgtext-800 rounded-xl">
                <p className="text-base text-bgtext-100 font-inter">
                  Next Draw In
                </p>
                <WeeklyCountDown />
              </div>
            </div>

            <div className="grid w-full h-full grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="relative flex w-full border h-28 bg-bgtext-900 border-bgtext-800 rounded-xl">
                <div className="absolute z-20 flex flex-row items-center justify-between w-full h-full">
                  <div className="flex flex-col items-start justify-center w-1/2 p-5">
                    <div className="flex flex-col items-start justify-center w-full">
                      <div className="flex flex-row items-center justify-start space-x-2">
                        <p className="text-base text-bgtext-100 font-inter">
                          Daily
                        </p>
                        <RotatingText
                          texts={["BASIC", "PREMIUM"]}
                          mainClassName="text-bgtext-100 text-lg font-inter font-bold -translate-x-1 translate-y-0.5"
                          staggerFrom={"last"}
                          initial={{ y: "100%" }}
                          animate={{ y: 0 }}
                          exit={{ y: "-120%" }}
                          staggerDuration={0.025}
                          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                          transition={{
                            type: "spring",
                            damping: 30,
                            stiffness: 400,
                          }}
                          rotationInterval={6000}
                        />
                      </div>
                      <p className="text-base text-bgtext-100 font-inter">
                        Jackpot Prize Pool
                      </p>
                    </div>
                  </div>

                  <RotatingText
                    texts={[
                      new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: CURRENCY_FRACTION.MINIMUM,
                        maximumFractionDigits: CURRENCY_FRACTION.MAXIMUM,
                      }).format(
                        prizePool.data.filter(
                          (item) => item.id === "DAILY_BASIC"
                        )[0].amount || 0
                      ),
                      new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: CURRENCY_FRACTION.MINIMUM,
                        maximumFractionDigits: CURRENCY_FRACTION.MAXIMUM,
                      }).format(
                        prizePool.data.filter(
                          (item) => item.id === "DAILY_PREMIUM"
                        )[0].amount || 0
                      ),
                    ]}
                    mainClassName="pr-5 mt-2 text-4xl font-semibold text-bgtext-100 font-inter"
                    staggerFrom={"last"}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                    transition={{
                      type: "spring",
                      damping: 30,
                      stiffness: 400,
                    }}
                    rotationInterval={6000}
                  />
                </div>
                <SeaShadow className="absolute top-0 left-0 z-10 rounded-xl" />
              </div>

              <div className="flex flex-row items-center justify-between w-full h-full p-5 space-x-2 border bg-bgtext-900 border-bgtext-800 rounded-xl">
                <p className="text-base text-bgtext-100 font-inter">
                  Next Daily
                  <br />
                  Jackpot Draw in
                </p>
                <DailyCountDown />
              </div>
            </div>
          </div>
        )}
      </ResultDisplay>
      <DailyWinningNumber />
      <HistoryDraw />
    </section>
  );
};

export default LuckyDrawPage;
