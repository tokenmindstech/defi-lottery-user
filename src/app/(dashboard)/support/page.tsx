"use client";

import { useSession } from "next-auth/react";
import OpenTicketForm from "./_components/open-ticket-form";
import { SupportTicketTable } from "./_components/support-ticket-list";
import { useQuery } from "@tanstack/react-query";
import { fetchProxy } from "@/lib/utils";
import SupportSkeleton from "./_components/skeleton";
import QuerySupport from "./_components/query";
import PagePagination from "@/components/shared/page-pagination";
import { useSearchParams } from "next/navigation";
import { Fragment } from "react";

const SupportPage = () => {
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
  const search =
    searchParams.get("q") && searchParams.get("q") !== "undefined"
      ? searchParams.get("q")
      : undefined;

  const { data: supportData, isLoading } =
    useQuery<APIGetSupportTicketsResponseDTO>({
      queryKey: [
        "my-support-tickets",
        userSession?.user.id,
        page,
        limit,
        search,
      ],
      queryFn: async () => {
        const url = `support-ticket?page=${page}&limit=${limit}&search=${
          search || ""
        }&userId=${userSession?.user.id}`;

        return await fetchProxy({
          method: "GET",
          url,
          auth: true,
        });
      },
      enabled: !!userSession?.user.id,
    });

  console.log("supportData", supportData);

  return (
    <section className="flex flex-col w-full h-full space-y-10">
      <div className="flex flex-row items-center justify-between w-full">
        <h2 className="text-3xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
          Support
        </h2>
        <OpenTicketForm />
      </div>

      <div className="flex flex-col w-full h-full space-y-5 bg-bgtext-950 p-5 rounded-xl">
        <QuerySupport page={page} />
        {isLoading ? (
          <SupportSkeleton />
        ) : (
          supportData !== undefined &&
          supportData !== null && (
            <Fragment>
              <SupportTicketTable tickets={supportData.data.supportTickets} />
              <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 w-full h-fit items-center justify-between mt-5">
                <p className="text-bgtext-500 text-sm">
                  Showing {supportData?.metadata?.totalCount || 0} results of{" "}
                  {supportData?.metadata?.totalCount || 0}
                </p>
                <PagePagination
                  currentPage={page}
                  totalPages={supportData?.metadata?.totalPage || 1}
                />
              </div>
            </Fragment>
          )
        )}
      </div>
    </section>
  );
};

export default SupportPage;
