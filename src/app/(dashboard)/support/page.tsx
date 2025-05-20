"use client";

import { useSession } from "next-auth/react";
import OpenTicketForm from "./_components/open-ticket-form";
import { SupportTicketTable } from "./_components/support-ticket-list";
import { useQuery } from "@tanstack/react-query";
import { fetchProxy } from "@/lib/utils";
import SupportSkeleton from "./_components/skeleton";
import QuerySupport from "./_components/query";
import PagePagination from "@/components/shared/page-pagination";

const SupportPage = () => {
  const { data: userSession } = useSession();

  const { data: supportData, isLoading } =
    useQuery<APIGetSupportTicketsResponseDTO>({
      queryKey: ["my-support-tickets", userSession?.user.id],
      queryFn: async () => {
        const url = `support-ticket?page=1&limit=10&search`;
        return await fetchProxy({
          method: "GET",
          url,
          auth: true,
        });
      },
      enabled: !!userSession?.user.id,
    });

  console.log("Support tickets data: ", supportData);
  return (
    <section className="flex flex-col w-full h-full space-y-10">
      <div className="flex flex-row items-center justify-between w-full">
        <h2 className="text-3xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
          Support
        </h2>
        <OpenTicketForm />
      </div>

      {isLoading ? (
        <SupportSkeleton />
      ) : (
        supportData !== undefined &&
        supportData !== null && (
          <div className="flex flex-col w-full h-full space-y-5 bg-bgtext-950 p-5 rounded-xl">
            <QuerySupport />
            <SupportTicketTable tickets={supportData.data.supportTickets} />
            <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 w-full h-fit items-center justify-between mt-5">
              <p className="text-bgtext-500 text-sm">Showing 5 from 1-10</p>
              <PagePagination currentPage={1} totalPages={10} />
            </div>
          </div>
        )
      )}
    </section>
  );
};

export default SupportPage;
