"use client";

import CircleShadowIcon from "@/components/icons/circle-shadow";
import Image from "next/image";
import React, { Fragment } from "react";
import CountDownDraw from "./_components/count-down";
import HistoryDraw from "./_components/history";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { fetchProxy } from "@/lib/utils";
import LuckyDrawSkeleton from "./_components/lucky-draw-skeleton";

const LuckyDrawPage = () => {
  const { data: userSession } = useSession();
  const { data: rewardDraw, isLoading } =
    useQuery<APIGetTodaysRewardDrawResponseDTO>({
      queryKey: ["reward-draw", userSession?.user.id],
      queryFn: async () =>
        fetchProxy({
          url: "reward-draw",
          method: "GET",
          auth: true,
        }),
      enabled: !!userSession,
    });

  return (
    <section className="flex flex-col w-full h-full space-y-10">
      <h2 className="text-3xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
        Lucky Draw
      </h2>

      {isLoading ? (
        <LuckyDrawSkeleton />
      ) : (
        rewardDraw !== undefined &&
        rewardDraw !== null && (
          <Fragment>
            <div className="w-full h-full grid grid-cols-1 xl:grid-cols-3 gap-5">
              <div className="flex w-full relative h-40 xl:col-span-2 bg-bgtext-900 border border-bgtext-800 rounded-xl">
                <div className="absolute z-20 flex flex-row items-center justify-between w-full h-full">
                  <div className="flex flex-col w-1/2 items-start justify-center p-5">
                    <p className="text-base text-bgtext-100 font-inter uppercase">
                      Prize Pool
                    </p>
                    <p className="text-bgtext-100 font-inter text-4xl font-semibold mt-2">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(rewardDraw.data?.prizePool || 1000)}
                    </p>
                  </div>

                  <div className="relative w-1/2 h-full">
                    <Image
                      src="/assets/images/lottery.png"
                      alt="lottery"
                      className="object-contain"
                      priority
                      fill
                      sizes="100%"
                    />
                  </div>
                </div>
                <CircleShadowIcon className="absolute z-10 left-0 top-0" />
              </div>

              <div className="flex flex-col space-y-2 w-full h-full bg-bgtext-900 border border-bgtext-800 rounded-xl p-5">
                <p className="text-base text-bgtext-100 font-inter">
                  Next Draw In
                </p>
                <CountDownDraw />
              </div>
            </div>

            <div className="w-full grid grid-cols-1 place-items-center gap-5">
              <div className="flex flex-col space-y-3 items-center justify-center w-full">
                <p className="text-xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
                  5/36 Winning Numbers
                </p>

                <div className="w-full flex justify-center">
                  <div className="flex gap-2 justify-center">
                    {rewardDraw.data === null
                      ? "? ? ? ? ?".split(" ").map((number, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-center w-12 h-12 bg-gradient-to-b from-linblue-start to-transparent rounded-lg border border-bgtext-800"
                          >
                            <span className="text-bgtext-100 text-xl font-bold">
                              {number}
                            </span>
                          </div>
                        ))
                      : rewardDraw.data.drawNumbers
                          ?.split(" ")
                          .map((number, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-center w-12 h-12 bg-gradient-to-b from-linblue-start to-transparent rounded-lg border border-bgtext-800"
                            >
                              <span className="text-bgtext-100 text-xl font-bold">
                                {number}
                              </span>
                            </div>
                          ))}
                  </div>
                </div>
              </div>
            </div>

            <HistoryDraw />
          </Fragment>
        )
      )}
    </section>
  );
};

export default LuckyDrawPage;
