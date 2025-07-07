"use client";

import React, { Fragment } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { fetchProxy } from "@/lib/utils";
import BonusRewardSkeleton from "./_components/bonus-reward-skeleton";
import PagePagination from "@/components/shared/page-pagination";
import ItemBonus from "./_components/item";

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

  const { data: bonuses, isLoading } = useQuery<APIQueryBonusResponseDTO>({
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
        {isLoading ? (
          <BonusRewardSkeleton />
        ) : (
          bonuses !== undefined &&
          bonuses !== null && (
            <Fragment>
              {bonuses.data.bonuses.length === 0 && (
                <div className="w-full h-full items-center justify-center py-5 text-center text-sm font-medium text-bgtext-100">
                  No data available
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10">
                {bonuses.data.bonuses.map((bonus, idx) => (
                  <ItemBonus key={idx} bonus={bonus} />
                ))}
              </div>
              <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 w-full h-fit items-center justify-between mt-5">
                <p className="text-bgtext-500 text-sm">
                  Showing {bonuses?.metadata?.totalCount || 0} results of{" "}
                  {bonuses?.metadata?.totalCount || 0}
                </p>
                <PagePagination
                  currentPage={page}
                  totalPages={bonuses?.metadata?.totalPage || 1}
                />
              </div>
            </Fragment>
          )
        )}
      </div>
    </section>
  );
};

export default BonusPage;
