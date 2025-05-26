"use client";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NOTIFICATION_MENU_ITEMS } from "@/constant/common";
import React from "react";
import NotificationAllTab from "./components/tabs/all";
import NotificationReadTab from "./components/tabs/read";
import NotificationUnreadTab from "./components/tabs/unread";
import { useSession } from "next-auth/react";
import { fetchProxy } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import NotificationSkeleton from "./components/skeleton";

const NotificationPage = () => {
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

  const { data: notifications, isLoading } = useQuery<
    APIQueryNotificationResponseDTO[]
  >({
    queryKey: ["notifications", userSession?.user.id, page, limit],
    queryFn: async () => {
      return await Promise.all([
        fetchProxy({
          url: `notifications/my?page=${page}&limit=${limit}`,
          method: "GET",
          auth: true,
        }),
        fetchProxy({
          url: `notifications/my?page=${page}&limit=${limit}&isRead=false`,
          method: "GET",
          auth: true,
        }),
        fetchProxy({
          url: `notifications/my?page=${page}&limit=${limit}&isRead=true`,
          method: "GET",
          auth: true,
        }),
      ]);
    },
    enabled: !!userSession,
  });

  console.log("notifications", notifications);
  return (
    <section className="flex flex-col w-full h-full space-y-10">
      <h2 className="text-3xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
        Notification
      </h2>

      <div className="flex flex-col w-full h-full space-y-5">
        {isLoading ? (
          <NotificationSkeleton />
        ) : (
          notifications !== undefined &&
          notifications !== null && (
            <Tabs
              defaultValue={NOTIFICATION_MENU_ITEMS[0].value}
              className="w-full bg-transparent"
            >
              <TabsList className="bg-transparent">
                {NOTIFICATION_MENU_ITEMS.map((item, idx) => (
                  <TabsTrigger
                    key={idx}
                    value={item.value}
                    className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none text-bgtext-600 data-[state=active]:text-bgtext-100 border-0 data-[state=active]:border-b-2 border-linprimary-start rounded-none px-2 cursor-pointer"
                  >
                    {item.label}
                    {idx === 1 && notifications[0].data.unreadCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="rounded-full text-xs border-0"
                      >
                        {notifications[0].data.unreadCount}
                      </Badge>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
              <NotificationAllTab
                notifications={notifications[0].data.notifications}
              />
              <NotificationUnreadTab
                notifications={notifications[1].data.notifications}
              />
              <NotificationReadTab
                notifications={notifications[2].data.notifications}
              />
            </Tabs>
          )
        )}
      </div>
    </section>
  );
};

export default NotificationPage;
