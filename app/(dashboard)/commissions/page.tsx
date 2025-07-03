"use client";

import { Trophy, Clock } from "@phosphor-icons/react/dist/ssr";
import { Separator } from "@/components/ui/separator";
import ClaimCommissionButton from "./_components/claim-commission-button";
import QuerySearch from "@/components/shared/query-search";
import { Fragment } from "react";
import { CommissionHistoryTable } from "./_components/commission-history-list";
import PagePagination from "@/components/shared/page-pagination";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { fetchProxy } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import ComissionStatsSkeleton from "./_components/commission-stats-skeleton";
import ComissionHistorySkeleton from "./_components/commission-history-skeleton";

const EarningsPage = () => {
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

  const { data: commissionStats, isLoading: isCommissionStatsLoading } =
    useQuery<APIGetCommissionStatisticsResponseDTO>({
      queryKey: ["commission-stats", userSession?.user.id],
      queryFn: async () =>
        fetchProxy({
          method: "GET",
          url: "commission/stats",
          auth: true,
        }),
      enabled: !!userSession?.user.id,
    });

  const { data: commissionHistory, isLoading: isCommissionHistoryLoading } =
    useQuery<APIQueryCommissionHistoryResponseDTO>({
      queryKey: [
        "commission-history",
        userSession?.user.id,
        page,
        limit,
        search,
      ],
      queryFn: async () =>
        fetchProxy({
          method: "GET",
          url: `commission?page=${page}&limit=${limit}&search=${search || ""}`,
          auth: true,
        }),
      enabled: !!userSession?.user.id,
    });

  return (
    <section className="flex flex-col w-full h-full space-y-6">
      <h2 className="text-3xl font-medium text-bgtext-100 font-inter">
        My Earnings
      </h2>

      {isCommissionStatsLoading ? (
        <ComissionStatsSkeleton />
      ) : (
        commissionStats !== undefined &&
        commissionStats !== null && (
          <div className="flex w-full h-full flex-col md:flex-row space-y-5 md:space-y-0 items-start justify-between bg-bgtext-900 border border-bgtext-800 rounded-xl p-5">
            <div className="flex flex-row w-full space-x-5 items-center justify-start">
              <div className="flex flex-row space-x-3 items-center justify-start bg-gradient-to-b from-linprimary-start to-linprimary-end  p-5 rounded-xl">
                <div className="flex flex-col w-full h-full relative rounded-xl">
                  <div className="flex flex-row space-x-10 items-center justify-between">
                    <p className="text-bgtext-100 font-inter text-xs">
                      Total Earnings
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
                    }).format(commissionStats.data.totalEarnings)}
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
                      Pending Claimable
                    </p>
                    <div className="flex bg-bgtext-900 rounded-full p-1.5">
                      <Clock className="size-5 text-bgtext-100" />
                    </div>
                  </div>
                  <p className="text-bgtext-100 font-inter text-4xl font-semibold mt-2">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(commissionStats.data.unclaimedEarnings)}
                  </p>
                </div>
              </div>
            </div>

            <ClaimCommissionButton totalClaimable={0} />
          </div>
        )
      )}

      <div className="flex flex-col w-full h-full space-y-5 bg-bgtext-950 p-5 rounded-xl">
        <QuerySearch page={1} />

        {isCommissionHistoryLoading ? (
          <ComissionHistorySkeleton />
        ) : (
          commissionHistory !== undefined &&
          commissionHistory !== null && (
            <Fragment>
              <CommissionHistoryTable
                histories={commissionHistory.data.commissions}
              />
              <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 w-full h-fit items-center justify-between mt-5">
                <p className="text-bgtext-500 text-sm">
                  Showing {commissionHistory?.metadata?.totalCount || 0} results
                  of {commissionHistory?.metadata?.totalCount || 0}
                </p>
                <PagePagination
                  currentPage={page}
                  totalPages={commissionHistory?.metadata?.totalPage || 1}
                />
              </div>
            </Fragment>
          )
        )}
      </div>
    </section>
  );
};

export default EarningsPage;
