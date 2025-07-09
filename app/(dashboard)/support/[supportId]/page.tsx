"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { fetchProxy, getTimestamp } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import BreadcrumbPages from "@/components/layout/breadcrumb-pages";
import SkeletonSupportDetails from "./_components/skeleton-support-details";
import ResultDisplay from "@/components/shared/result-display";

const NotificationPage = () => {
  const { data: userSession } = useSession();
  const { supportId } = useParams();

  const {
    data: supportData,
    isLoading,
    error,
  } = useQuery<APIGetSupportTicketDetailsResponseDTO>({
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

      <ResultDisplay
        isLoading={isLoading}
        error={error}
        data={supportData}
        loadingComponent={<SkeletonSupportDetails />}
        dataErrorMessage="An error occurred while fetching support ticket details."
        loadingErrorMessage="Failed to load support ticket details. Please try again later."
      >
        {(supportData) => (
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
              <div className="flex flex-col w-full space-y-2">
                <div className="flex flex-row space-x-2">
                  <p className="text-lg font-medium text-bgtext-100 font-inter">
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
                <p className="text-sm text-bgtext-500 font-inter">
                  {supportData.data.description || "Ticket Subject"}
                </p>
                <p className="text-xs text-bgtext-600 font-inter">
                  Opened: {getTimestamp(new Date(supportData.data.createdAt))}
                </p>
                <p className="text-xs text-bgtext-600 font-inter">
                  Last Updated:{" "}
                  {getTimestamp(new Date(supportData.data.updatedAt))}
                </p>
              </div>
            </div>
          </div>
        )}
      </ResultDisplay>
    </section>
  );
};

export default NotificationPage;
