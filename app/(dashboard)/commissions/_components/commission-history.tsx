"use client";

import ResultDisplay from "@/components/shared/result-display";
import { fetchProxy } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import SkeletonCommissionHistory from "./skeleton-commission-history";
import { CommissionHistoryTable } from "./commission-history-list";
import PagePagination from "@/components/shared/page-pagination";
import QuerySearch from "@/components/shared/query-search";

const CommissionHistory = () => {
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
    data: commissionHistory,
    isLoading,
    error,
  } = useQuery<APIQueryCommissionHistoryResponseDTO>({
    queryKey: ["commission-history", userSession?.user.id, page, limit, search],
    queryFn: async () =>
      fetchProxy({
        method: "GET",
        url: `commission?page=${page}&limit=${limit}&search=${search || ""}`,
        auth: true,
      }),
    enabled: !!userSession?.user.id,
  });

  return (
    <ResultDisplay
      isLoading={isLoading}
      error={error}
      data={commissionHistory}
      loadingComponent={<SkeletonCommissionHistory />}
      dataErrorMessage="An error occurred while fetching commission history."
      loadingErrorMessage="Failed to load commission history. Please try again later."
    >
      {(commissionHistory) => (
        <div className="flex flex-col w-full h-full p-5 space-y-5 bg-bgtext-950 rounded-xl">
          <QuerySearch page={page} />
          <CommissionHistoryTable
            histories={commissionHistory.data.commissions}
          />
          <div className="flex flex-col items-center justify-between w-full mt-5 space-y-5 md:flex-row md:space-y-0 h-fit">
            <p className="text-sm text-bgtext-500">
              Showing {commissionHistory?.metadata?.totalCount || 0} results of{" "}
              {commissionHistory?.metadata?.totalCount || 0}
            </p>
            <PagePagination
              currentPage={page}
              totalPages={commissionHistory?.metadata?.totalPage || 1}
            />
          </div>
        </div>
      )}
    </ResultDisplay>
  );
};

export default CommissionHistory;
