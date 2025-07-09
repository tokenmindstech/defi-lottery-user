"use client";

import QuerySearch from "@/components/shared/query-search";
import ResultDisplay from "@/components/shared/result-display";
import { fetchProxy } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React from "react";
import SkeletonPrizeHistory from "./skeleton-prize-history";
import { PrizeHistoryTable } from "./prize-history-list";
import PagePagination from "@/components/shared/page-pagination";

const ClaimHistory = () => {
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

  const {
    data: claimHistory,
    isLoading,
    error,
  } = useQuery<APIQueryClaimRewardsResponseDTO>({
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
        url: `claim-history?page=${page}&limit=${limit}&search=${search || ""}`,
        auth: true,
      }),
    enabled: !!userSession?.user.id,
  });

  return (
    <ResultDisplay
      isLoading={isLoading}
      error={error}
      data={claimHistory}
      loadingComponent={<SkeletonPrizeHistory />}
      dataErrorMessage="An error occurred while fetching claim history."
      loadingErrorMessage="Failed to load claim history. Please try again later."
    >
      {(claimHistory) => (
        <div className="flex flex-col w-full h-full p-5 space-y-5 bg-bgtext-950 rounded-xl">
          <QuerySearch page={page} />
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
        </div>
      )}
    </ResultDisplay>
  );
};

export default ClaimHistory;
