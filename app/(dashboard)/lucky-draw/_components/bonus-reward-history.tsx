"use client";

import React, { Fragment } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { fetchProxy } from "@/lib/utils";
import PagePagination from "@/components/shared/page-pagination";
import { useSearchParams } from "next/navigation";
import BonusRewardSkeleton from "./bonus-reward-skeleton";
import { BonusRewardTable } from "./bonus-reward-list";
import ResultDisplay from "@/components/shared/result-display";

const BonusRewardHistory = () => {
  const searchParams = useSearchParams();
  const { data: userSession } = useSession();

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

  const {
    data: bonusWinners,
    isLoading,
    error,
  } = useQuery<APIQueryHistoryBonusWinnersResponseDTO>({
    queryKey: ["bonus-winners", page, limit],
    queryFn: async () =>
      fetchProxy({
        url: `bonus/winners?page=${page}&limit=${limit}`,
        method: "GET",
        auth: true,
      }),
    enabled: !!userSession,
  });

  return (
    <div className="flex flex-col w-full h-full space-y-10">
      <div className="flex flex-col w-full h-full space-y-5">
        <h2 className="text-xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
          Bonus Reward Winners
        </h2>

        <div className="flex flex-col w-full h-full space-y-5">
          <ResultDisplay
            isLoading={isLoading}
            error={error}
            data={bonusWinners}
            loadingComponent={<BonusRewardSkeleton />}
            dataErrorMessage="An error occurred while fetching bonus winners."
            loadingErrorMessage="Failed to load bonus winners. Please try again later."
          >
            {(bonusWinners) => (
              <Fragment>
                <BonusRewardTable winners={bonusWinners.data.bonusWinners} />

                <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 w-full h-fit items-center justify-between mt-5">
                  <p className="text-bgtext-500 text-sm">
                    Showing{" "}
                    {(bonusWinners?.metadata?.limit ?? 0) *
                      (bonusWinners?.metadata?.page ?? 0) || 0}{" "}
                    results of {bonusWinners?.metadata?.totalCount || 0}
                  </p>
                  <PagePagination
                    currentPage={page}
                    totalPages={bonusWinners?.metadata?.totalPage || 1}
                  />
                </div>
              </Fragment>
            )}
          </ResultDisplay>
        </div>
      </div>
    </div>
  );
};

export default BonusRewardHistory;
