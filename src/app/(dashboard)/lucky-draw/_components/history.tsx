"use client";

import React, { Fragment } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { fetchProxy } from "@/lib/utils";
import HistoryDrawSkeleton from "./history-draw-skeleton";
import PagePagination from "@/components/shared/page-pagination";
import { DrawTicketTable } from "./draw-ticket-list";
import { useSearchParams } from "next/navigation";

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

  const { data: historyDraw, isLoading } =
    useQuery<APIGetHistoryDrawResponseDTO>({
      queryKey: ["draw-ticket", userSession?.user.id, page, limit],
      queryFn: async () => {
        const url = `draw-ticket?page=${page}&limit=${limit}`;
        const result = await fetchProxy({
          url,
          method: "GET",
          auth: true,
        });

        return result;
      },
      enabled: !!userSession,
    });

  return (
    <div className="flex flex-col w-full h-full space-y-10">
      <div className="flex flex-col w-full h-full space-y-5">
        <h2 className="text-xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
          History Draws
        </h2>

        <div className="flex flex-col w-full h-full space-y-5">
          {isLoading ? (
            <HistoryDrawSkeleton />
          ) : (
            historyDraw !== undefined &&
            historyDraw !== null && (
              <Fragment>
                <DrawTicketTable draws={historyDraw.data.drawTickets} />

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

      {/* <div className="flex flex-row items-center justify-between w-full h-full">
        <p className="text-sm text-bgtext-500 font-inter whitespace-nowrap">
          Showing 5 from 1-10
        </p>

        <div className="flex flex-row items-center justify-center space-x-2">
          <Button
            type="button"
            className="bg-bgtext-900 text-bgtext-100 border-2 border-bgtext-800 rounded-xl p-5 cursor-pointer"
          >
            <CaretLeft weight="bold" className="size-5 text-bgtext-100" />
          </Button>
          <Button
            type="button"
            className="bg-bgtext-900 text-bgtext-100 border-2 border-bgtext-800 rounded-xl p-5 cursor-pointer"
          >
            <CaretRight weight="bold" className="size-5 text-bgtext-100" />
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default HistoryDraw;
