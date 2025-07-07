"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { fetchProxy, getTimestamp } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import SupportDetailSkeleton from "./_components/support-detail-skeleton";
import BreadcrumbPages from "@/components/layout/breadcrumb-pages";

const NotificationPage = () => {
  const { data: userSession } = useSession();
  const { supportId } = useParams();

  const { data: supportData, isLoading } =
    useQuery<APIGetSupportTicketDetailsResponseDTO>({
      queryKey: ["support-ticket", userSession?.user.id, supportId],
      queryFn: async () =>
        fetchProxy({
          url: `support-ticket/${supportId}`,
          method: "GET",
          auth: true,
        }),
      enabled: !!userSession,
    });

  return (
    <section className="flex flex-col w-full h-full space-y-10">
      <h2 className="text-3xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
        Support
      </h2>

      {isLoading ? (
        <SupportDetailSkeleton />
      ) : (
        supportData !== null &&
        supportData !== undefined && (
          <div className="flex flex-col w-full h-full space-y-5">
            <BreadcrumbPages
              currentPageName={supportData.data.subject || "Ticket Subject"}
              currentPageUrl={`/support/${supportId}`}
              previousPages={[
                {
                  pageName: "Support",
                  pageUrl: "/support",
                },
              ]}
            />

            <div
              className={`w-full flex flex-row space-x-5 p-2 ease-out transition-all duration-300`}
            >
              <div className="w-full flex flex-col space-y-2">
                <div className="flex flex-row space-x-2">
                  <p className="text-bgtext-100 font-inter text-lg font-medium">
                    {supportData.data.category} -{" "}
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        supportData.data.status === "OPEN"
                          ? "bg-warning-500/20 text-warning-500"
                          : supportData.data.status === "CLOSED"
                          ? "bg-error-500/20 text-error-500"
                          : "bg-success-500/20 text-success-500"
                      }`}
                    >
                      {supportData.data.status}
                    </span>
                  </p>
                </div>
                <p className="text-bgtext-500 font-inter text-sm">
                  {supportData.data.description || "Ticket Subject"}
                </p>
                <p className="text-bgtext-600 font-inter text-xs">
                  Opened: {getTimestamp(new Date(supportData.data.createdAt))}
                </p>
                <p className="text-bgtext-600 font-inter text-xs">
                  Last Updated:{" "}
                  {getTimestamp(new Date(supportData.data.updatedAt))}
                </p>
              </div>
            </div>
          </div>
        )
      )}
    </section>
  );
};

export default NotificationPage;
