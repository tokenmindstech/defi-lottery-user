"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { fetchProxy, getTimestamp } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { InfoIcon, TicketIcon } from "@phosphor-icons/react/dist/ssr";
import BreadcrumbPages from "@/components/layout/breadcrumb-pages";
import SkeletonNotificationDetails from "../_components/skeleton-notification-details";
import ResultDisplay from "@/components/shared/result-display";

const NotificationPage = () => {
  const { data: userSession } = useSession();
  const { notificationId } = useParams();

  const {
    data: notification,
    isLoading,
    error,
  } = useQuery<APIGetNotificationDetailsResponseDTO>({
    queryKey: ["notification", userSession?.user.id, notificationId],
    queryFn: async () =>
      fetchProxy({
        url: `notifications/${notificationId}`,
        method: "GET",
        auth: true,
      }),
    enabled: !!userSession,
  });

  return (
    <section className="flex flex-col w-full h-full space-y-10">
      <h2 className="text-3xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
        Notification
      </h2>

      <ResultDisplay
        isLoading={isLoading}
        error={error}
        data={notification}
        loadingComponent={<SkeletonNotificationDetails />}
        dataErrorMessage="An error occurred while fetching notification details."
        loadingErrorMessage="Failed to load notification details. Please try again later."
      >
        {(notification) => (
          <div className="flex flex-col w-full h-full space-y-5">
            <BreadcrumbPages
              currentPageName={
                notification.data.title || "Notification Details"
              }
              currentPageUrl={`/notifications/${notificationId}`}
              previousPages={[
                {
                  pageName: "Notifications",
                  pageUrl: "/notifications",
                },
              ]}
            />

            <div
              className={`w-full flex flex-row space-x-5 p-2 ease-out transition-all duration-300`}
            >
              <div className="flex items-start justify-start w-fit">
                <div className="flex items-center justify-center p-2 rounded-full bg-gradient-to-b from-linblue-start to-linblue-end">
                  {notification.data.type === "DRAW" ? (
                    <TicketIcon
                      weight="fill"
                      className="text-bgtext-100 size-8"
                    />
                  ) : (
                    <InfoIcon
                      weight="fill"
                      className="text-bgtext-100 size-8"
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-col w-full space-y-2">
                <p className="text-sm text-bgtext-500 font-inter">
                  {notification.data.message || "No message provided."}
                </p>
                <p className="text-xs text-bgtext-600 font-inter">
                  {getTimestamp(new Date(notification.data.createdAt))}
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
