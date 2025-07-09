"use client";

import { Separator } from "@/components/ui/separator";
import { ClockIcon, TrophyIcon } from "@phosphor-icons/react/dist/ssr";
import React, { Fragment } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { fetchProxy } from "@/lib/utils";
import PrizeStatsSkeleton from "./_components/prize-stats-skeleton";
import PrizeHistorySkeleton from "./_components/prize-history-skeleton";
import ClaimRewardButton from "./_components/claim-reward-button";
import { useSearchParams } from "next/navigation";
import { PrizeHistoryTable } from "./_components/prize-history-list";
import QuerySearch from "@/components/shared/query-search";
import PagePagination from "@/components/shared/page-pagination";
import { CURRENCY_FRACTION } from "@/constant/common";

const ClaimRewardsPage = () => {
  const { data: userSession } = useSession();
  const searchParams = useSearchParams();

  const page =
    searchParams.get("page") &&
    !Number.isNaN(parseInt(searchParams.get("page") as string))
      ? parseInt(searchParams.get("page") as string)
      : 1;
  const limit =
    searchParams.get("limit") &&
    !Number.isNaN(parseInt(searchParams.get("limit") as string))
      ? parseInt(searchParams.get("limit") as string)
      : 10;
  const search =
    searchParams.get("q") && searchParams.get("q") !== "undefined"
      ? searchParams.get("q")
      : undefined;

  const { data: claimStats, isLoading: claimStatsLoading } =
    useQuery<APIGetUnclaimedStatisticsResponseDTO>({
      queryKey: ["claim-rewards-stats", userSession?.user.id],
      queryFn: async () =>
        fetchProxy({
          method: "GET",
          url: "draw-ticket/unclaimed",
          auth: true,
        }),
      enabled: !!userSession?.user.id,
    });

  const { data: claimHistory, isLoading: claimHistoryLoading } =
    useQuery<APIQueryClaimRewardsResponseDTO>({
      queryKey: [
        "claim-rewards-history",
        userSession?.user.id,
        page,
        limit,
        search,
      ],
      queryFn: async () =>
        fetchProxy({
          method: "GET",
          url: `claim-history?page=${page}&limit=${limit}&search=${
            search || ""
          }`,
          auth: true,
        }),
      enabled: !!userSession?.user.id,
    });

  return (
    <section className="flex flex-col w-full h-full space-y-10">
      <h2 className="text-3xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
        My Prizes Overview
      </h2>

      {claimStatsLoading ? (
        <PrizeStatsSkeleton />
      ) : (
        claimStats !== undefined &&
        claimStats !== null && (
          <div className="flex flex-col items-start justify-between w-full h-full p-5 space-y-5 border md:flex-row md:space-y-0 bg-bgtext-900 border-bgtext-800 rounded-xl">
            <div className="flex flex-row items-center justify-start w-full space-x-5">
              <div className="flex flex-row items-center justify-start p-5 space-x-3 bg-gradient-to-b from-linprimary-start to-linprimary-end rounded-xl">
                <div className="relative flex flex-col w-full h-full rounded-xl">
                  <div className="flex flex-row items-center justify-between space-x-10">
                    <p className="text-xs text-bgtext-100 font-inter">
                      Total Prize Won
                    </p>
                    <div className="flex bg-bgtext-900 rounded-full p-1.5">
                      <TrophyIcon className="size-5 text-bgtext-100" />
                    </div>
                  </div>
                  <p className="mt-2 text-4xl font-semibold text-bgtext-100 font-inter">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: CURRENCY_FRACTION.MINIMUM,
                      maximumFractionDigits: CURRENCY_FRACTION.MAXIMUM,
                    }).format(claimStats.data.totalEarnings)}
                  </p>
                </div>
              </div>

              <Separator
                className="data-[orientation=vertical]:h-[100px] bg-bgtext-700"
                orientation="vertical"
              />

              <div className="flex flex-row items-center justify-start p-5 space-x-3 bg-transparent rounded-xl">
                <div className="relative flex flex-col w-full h-full rounded-xl">
                  <div className="flex flex-row items-center justify-between space-x-10">
                    <p className="text-xs text-bgtext-100 font-inter">
                      Prizes Pending Claim
                    </p>
                    <div className="flex bg-bgtext-900 rounded-full p-1.5">
                      <ClockIcon className="size-5 text-bgtext-100" />
                    </div>
                  </div>
                  <p className="mt-2 text-4xl font-semibold text-bgtext-100 font-inter">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(claimStats.data.totalClaimable)}
                  </p>
                </div>
              </div>
            </div>

            <ClaimRewardButton totalClaimable={10} />
          </div>
        )
      )}

      <div className="flex flex-col w-full h-full p-5 space-y-5 bg-bgtext-950 rounded-xl">
        <QuerySearch page={page} />
        {claimHistoryLoading ? (
          <PrizeHistorySkeleton />
        ) : (
          claimHistory !== undefined &&
          claimHistory !== null && (
            <Fragment>
              <PrizeHistoryTable histories={claimHistory.data.claimHistory} />
              <div className="flex flex-col items-center justify-between w-full mt-5 space-y-5 md:flex-row md:space-y-0 h-fit">
                <p className="text-sm text-bgtext-500">
                  Showing {claimHistory?.metadata?.totalCount || 0} results of{" "}
                  {claimHistory?.metadata?.totalCount || 0}
                </p>
                <PagePagination
                  currentPage={page}
                  totalPages={claimHistory?.metadata?.totalPage || 1}
                />
              </div>
            </Fragment>
          )
        )}
      </div>
    </section>
  );
};

export default ClaimRewardsPage;
