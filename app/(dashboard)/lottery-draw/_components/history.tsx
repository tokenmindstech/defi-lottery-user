"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { fetchProxy } from "@/lib/utils";
import PagePagination from "@/components/shared/page-pagination";
import { DrawTicketTable } from "./draw-ticket-list";
import { useSearchParams } from "next/navigation";
import SkeletonHistoryDraw from "./skeleton-history-draw";
import ResultDisplay from "@/components/shared/result-display";

const HistoryDraw = () => {
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
    data: historyDraw,
    isLoading,
    error,
  } = useQuery<APIGetHistoryDrawResponseDTO>({
    queryKey: ["draw-ticket", userSession?.user.id, page, limit],
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
          History Draws
        </h2>

        <ResultDisplay
          isLoading={isLoading}
          error={error}
          data={historyDraw}
          loadingComponent={<SkeletonHistoryDraw />}
          dataErrorMessage="An error occurred while fetching the history draws."
          loadingErrorMessage="Failed to load history draws. Please try again later."
        >
          {(historyDraw) => (
            <div className="flex flex-col w-full h-full space-y-5">
              <DrawTicketTable draws={historyDraw.data.drawTickets} />

              <div className="flex flex-col items-center justify-between w-full mt-5 space-y-5 md:flex-row md:space-y-0 h-fit">
                <p className="text-sm text-bgtext-500">
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
            </div>
          )}
        </ResultDisplay>
      </div>
    </div>
  );
};

export default HistoryDraw;
