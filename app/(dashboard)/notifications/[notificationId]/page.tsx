"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { fetchProxy, getTimestamp } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Info, Ticket } from "@phosphor-icons/react/dist/ssr";
import NotificationDetailsSkeleton from "../_components/skeleton-details";
import BreadcrumbPages from "@/components/layout/breadcrumb-pages";

const NotificationPage = () => {
  const { data: userSession } = useSession();
  const { notificationId } = useParams();

  const { data: notification, isLoading } =
    useQuery<APIGetNotificationDetailsResponseDTO>({
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

      {isLoading ? (
        <NotificationDetailsSkeleton />
      ) : (
        notification !== null &&
        notification !== undefined && (
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
              <div className="w-fit flex items-start justify-start">
                <div className="bg-gradient-to-b from-linblue-start to-linblue-end rounded-full p-2 flex items-center justify-center">
                  {notification.data.type === "DRAW" ? (
                    <Ticket weight="fill" className="text-bgtext-100 size-8" />
                  ) : (
                    <Info weight="fill" className="text-bgtext-100 size-8" />
                  )}
                </div>
              </div>

              <div className="w-full flex flex-col space-y-2">
                <p className="text-bgtext-500 font-inter text-sm">
                  {notification.data.message || "No message provided."}
                </p>
                <p className="text-bgtext-600 font-inter text-xs">
                  {getTimestamp(new Date(notification.data.createdAt))}
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
