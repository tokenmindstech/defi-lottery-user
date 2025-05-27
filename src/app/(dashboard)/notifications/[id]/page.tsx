"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { fetchProxy, getTimestamp } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Info, Ticket } from "@phosphor-icons/react/dist/ssr";
import NotificationDetailsSkeleton from "../components/skeleton-details";
import Link from "next/link";

const NotificationPage = () => {
  const { data: userSession } = useSession();
  const pathname = usePathname();
  const notificationId = pathname.split("/").pop();

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
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    asChild
                    className="font-medium text-bgtext-100 font-inter whitespace-nowrap hover:text-bgtext-100"
                  >
                    <Link href="/notifications">Notification</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    asChild
                    className="font-medium text-bgtext-500 font-inter whitespace-nowrap hover:text-bgtext-100"
                  >
                    <Link href={`/notifications/${notificationId}`}>
                      {notification.data.title || "Notification Details"}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

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
