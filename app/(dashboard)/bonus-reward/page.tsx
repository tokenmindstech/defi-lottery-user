"use client";

import React, { Fragment } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { fetchProxy } from "@/lib/utils";
import PagePagination from "@/components/shared/page-pagination";
import ItemBonus from "./_components/item";
import SkeletonBonusReward from "./_components/skeleton-bonus-reward";
import ResultDisplay from "@/components/shared/result-display";

const BonusPage = () => {
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

  const {
    data: bonuses,
    isLoading,
    error,
  } = useQuery<APIQueryBonusResponseDTO>({
    queryKey: ["bonus", page, limit],
    queryFn: async () =>
      fetchProxy({
        url: `bonus?page=${page}&limit=${limit}`,
        method: "GET",
        auth: true,
      }),
    enabled: !!userSession,
  });

  return (
    <section className="flex flex-col w-full h-full space-y-10">
      <h2 className="text-3xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
        Available Bonus Reward
      </h2>

      <div className="flex flex-col w-full h-full space-y-5">
        <ResultDisplay
          isLoading={isLoading}
          error={error}
          data={bonuses}
          loadingComponent={<SkeletonBonusReward />}
          dataErrorMessage="An error occurred while fetching bonus data."
          loadingErrorMessage="Failed to load bonus data. Please try again later."
        >
          {(bonuses) => (
            <Fragment>
              {bonuses.data.bonuses.length === 0 && (
                <div className="items-center justify-center w-full h-full py-5 text-sm font-medium text-center text-bgtext-100">
                  No data available
                </div>
              )}
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
                {bonuses.data.bonuses.map((bonus, idx) => (
                  <ItemBonus key={idx} bonus={bonus} />
                ))}
              </div>
              <div className="flex flex-col items-center justify-between w-full mt-5 space-y-5 md:flex-row md:space-y-0 h-fit">
                <p className="text-sm text-bgtext-500">
                  Showing {bonuses?.metadata?.totalCount || 0} results of{" "}
                  {bonuses?.metadata?.totalCount || 0}
                </p>
                <PagePagination
                  currentPage={page}
                  totalPages={bonuses?.metadata?.totalPage || 1}
                />
              </div>
            </Fragment>
          )}
        </ResultDisplay>
      </div>
    </section>
  );
};

export default BonusPage;
