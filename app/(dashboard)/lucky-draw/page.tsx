"use client";

import React, { Fragment } from "react";
import WinnerBanner from "./_components/winner-banner";
import Image from "next/image";
import BlueShadow from "@/components/icons/blue-shadow";
import CountDownBonusDraw from "./_components/count-down-bonus";
import BonusRewardHistory from "./_components/bonus-reward-history";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { fetchProxy } from "@/lib/utils";
import SkeletonLuckyDraw from "./_components/skeleton-lucky-draw";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import ErrorInfo from "@/components/shared/error-info";
import ResultDisplay from "@/components/shared/result-display";

// Configure dayjs to use plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const LuckyDrawPage = () => {
  const { data: userSession } = useSession();

  const {
    data: weeklyBonus,
    isLoading: isLoadingWeeklyBonus,
    error: errorWeeklyBonus,
  } = useQuery<APIGetWeeklyBonusResponseDTO>({
    queryKey: ["weekly-bonus"],
    queryFn: async () =>
      fetchProxy({
        method: "GET",
        url: "bonus/weekly",
        auth: true,
      }),
    enabled: !!userSession?.user.id,
  });
  return (
    <section className="flex flex-col w-full h-full space-y-10">
      <h2 className="text-3xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
        Lucky Draw
      </h2>

      <WinnerBanner />

      <div className="flex flex-col w-full h-full space-y-5">
        <ResultDisplay
          isLoading={isLoadingWeeklyBonus}
          error={errorWeeklyBonus}
          data={weeklyBonus}
          loadingComponent={<SkeletonLuckyDraw />}
          dataErrorMessage="An error occurred while fetching weekly bonus."
          loadingErrorMessage="Failed to load weekly bonus. Please try again later."
        >
          {(weeklyBonus) => (
            <Fragment>
              {weeklyBonus.data === null ? (
                <div className="w-full h-full flex items-center justify-center">
                  <ErrorInfo
                    errorMessage="Oops! No weekly bonus available at the moment."
                    showIcon={false}
                    textClassName="text-bgtext-100 font-inter text-base text-center"
                  />
                </div>
              ) : (
                <div className="w-full h-full grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <div className="flex w-full relative h-40 xl:col-span-2 bg-bgtext-900 border border-bgtext-800 rounded-xl">
                    <div className="absolute z-20 flex flex-row items-center justify-between w-full h-full">
                      <div className="flex flex-col w-1/2 items-start justify-center p-5">
                        <p className="text-base text-bgtext-100 font-inter">
                          Bonus Reward
                        </p>
                        <h3 className="text-2xl font-bold text-bgtext-100 font-inter">
                          Win {weeklyBonus.data.name}
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
                    <p className="text-base text-bgtext-100 font-inter">
                      Next Draw In
                    </p>
                    <CountDownBonusDraw />
                  </div>
                </div>
              )}
            </Fragment>
          )}
        </ResultDisplay>
      </div>

      <BonusRewardHistory />
    </section>
  );
};

export default LuckyDrawPage;
