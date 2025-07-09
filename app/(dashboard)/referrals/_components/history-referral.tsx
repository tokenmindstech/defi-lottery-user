"use client";

import QuerySearch from "@/components/shared/query-search";
import ResultDisplay from "@/components/shared/result-display";
import { fetchProxy } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { ReferralsTable } from "./referral-list";
import PagePagination from "@/components/shared/page-pagination";
import SkeletonReferralList from "./skeleton-referral-list";

const HistoryReferrals = () => {
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
    data: referredUsers,
    isLoading,
    error,
  } = useQuery<APIQueryReferredUsersResponseDTO>({
    queryKey: ["referred-users", userSession?.user.id, page, limit, search],
    queryFn: async () =>
      fetchProxy({
        method: "GET",
        url: `referrals?page=${page}&limit=${limit}&search=${search || ""}`,
        auth: true,
      }),
    enabled: !!userSession?.user.id,
  });

  return (
    <ResultDisplay
      isLoading={isLoading}
      error={error}
      data={referredUsers}
      loadingComponent={<SkeletonReferralList />}
      dataErrorMessage="An error occurred while fetching referred users."
      loadingErrorMessage="Failed to load referred users. Please try again later."
    >
      {(referredUsers) => (
        <div className="flex flex-col w-full h-full p-5 space-y-5 bg-bgtext-950 rounded-xl">
          <QuerySearch page={page} />
          <ReferralsTable referredUsers={referredUsers.data.referredUsers} />
          <div className="flex flex-col items-center justify-between w-full mt-5 space-y-5 md:flex-row md:space-y-0 h-fit">
            <p className="text-sm text-bgtext-500">
              Showing {referredUsers?.metadata?.totalCount || 0} results of{" "}
              {referredUsers?.metadata?.totalCount || 0}
            </p>
            <PagePagination
              currentPage={page}
              totalPages={referredUsers?.metadata?.totalPage || 1}
            />
          </div>
        </div>
      )}
    </ResultDisplay>
  );
};

export default HistoryReferrals;
