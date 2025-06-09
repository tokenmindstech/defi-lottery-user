"use client";

import { Separator } from "@/components/ui/separator";
import { Clock, Trophy } from "@phosphor-icons/react/dist/ssr";
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
                    }).format(claimStats.data.totalEarnings)}
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
                    {claimStats.data.totalClaimable}
                  </p>
                </div>
              </div>
            </div>

            <ClaimRewardButton
              totalClaimable={claimStats.data.totalClaimable}
            />
          </div>
        )
      )}

      <div className="flex flex-col w-full h-full space-y-5 bg-bgtext-950 p-5 rounded-xl">
        <QuerySearch page={page} />
        {claimHistoryLoading ? (
          <PrizeHistorySkeleton />
        ) : (
          claimHistory !== undefined &&
          claimHistory !== null && (
            <Fragment>
              <PrizeHistoryTable histories={claimHistory.data.claimHistory} />
              <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 w-full h-fit items-center justify-between mt-5">
                <p className="text-bgtext-500 text-sm">
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
