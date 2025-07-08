"use client";

import React, { Fragment } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { fetchProxy } from "@/lib/utils";
import PagePagination from "@/components/shared/page-pagination";
import { useSearchParams } from "next/navigation";
import BonusRewardSkeleton from "./bonus-reward-skeleton";
import { BonusRewardTable } from "./bonus-reward-list";

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

  const { data: historyDraw, isLoading } =
    useQuery<APIGetHistoryDrawResponseDTO>({
      queryKey: ["draw-ticket", page, limit],
      queryFn: async () =>
        fetchProxy({
          url: `draw-ticket?page=${page}&limit=${limit}`,
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
          {isLoading ? (
            <BonusRewardSkeleton />
          ) : (
            historyDraw !== undefined &&
            historyDraw !== null && (
              <Fragment>
                <BonusRewardTable
                  bonuses={
                    [
                      // {
                      //   id: "1",
                      //   imageUrl: "/assets/images/iphone.png",
                      //   name: "iPhone 14 Pro Max",
                      //   description: "Win an iPhone 14 Pro Max",
                      //   category: ["electronics", "mobile"],
                      //   numberOfWinners: 1,
                      //   createdAt: new Date().toISOString(),
                      //   validAt: new Date(
                      //     Date.now() + 7 * 24 * 60 * 60 * 1000
                      //   ).toISOString(),
                      //   bonusWinners: [
                      //     {
                      //       id: "1",
                      //       name: "John Doe",
                      //     },
                      //     {
                      //       id: "2",
                      //       name: "Jane Smith",
                      //     },
                      //     {
                      //       id: "3",
                      //       name: "Alice Johnson",
                      //     },
                      //   ],
                      // },
                    ]
                  }
                />

                <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 w-full h-fit items-center justify-between mt-5">
                  <p className="text-bgtext-500 text-sm">
                    Showing{" "}
                    {(historyDraw?.metadata?.limit ?? 0) *
                      (historyDraw?.metadata?.page ?? 0) || 0}{" "}
                    results of {historyDraw?.metadata?.totalCount || 0}
                  </p>
                  <PagePagination
                    currentPage={page}
                    totalPages={historyDraw?.metadata?.totalPage || 1}
                  />
                </div>
              </Fragment>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default BonusRewardHistory;
