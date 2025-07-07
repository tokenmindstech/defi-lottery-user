"use client";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NOTIFICATION_MENU_ITEMS } from "@/constant/common";
import React from "react";
import NotificationAllTab from "./_components/tabs/all";
import NotificationReadTab from "./_components/tabs/read";
import NotificationUnreadTab from "./_components/tabs/unread";
import { useSession } from "next-auth/react";
import { fetchProxy } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import NotificationSkeleton from "./_components/skeleton";
import { Button } from "@/components/ui/button";
import BreadcrumbPages from "@/components/layout/breadcrumb-pages";

const NotificationPage = () => {
  const { data: userSession } = useSession();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

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
          url: `notifications/my?page=${page}&limit=${limit}&user=${userSession?.user.id}`,
          method: "GET",
          auth: true,
        }),
        fetchProxy({
          url: `notifications/my?page=${page}&limit=${limit}&isRead=false&user=${userSession?.user.id}`,
          method: "GET",
          auth: true,
        }),
        fetchProxy({
          url: `notifications/my?page=${page}&limit=${limit}&isRead=true&user=${userSession?.user.id}`,
          method: "GET",
          auth: true,
        }),
      ]);
    },
    enabled: !!userSession,
  });

  const mutation = useMutation({
    mutationKey: ["read-all-notifications"],
    mutationFn: async () =>
      fetchProxy({
        url: "notifications/read-all",
        method: "POST",
        auth: true,
        body: {},
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", userSession?.user.id, page, limit],
      });
    },
  });

  return (
    <section className="flex flex-col w-full h-full space-y-10">
      <h2 className="text-3xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
        Notifications
      </h2>
      <BreadcrumbPages
        currentPageName={"Notifications"}
        currentPageUrl={`/notifications`}
      />

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
              <TabsList className="w-full flex flex-row items-center justify-between bg-transparent">
                <div className="flex flex-row space-x-2 w-fit">
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
                </div>
                <Button
                  variant="link"
                  className="text-bgtext-600 cursor-pointer hover:text-bgtext-100 hover:border-b-2 border-linprimary-start rounded-none hover:no-underline ease-out transition-all duration-300"
                  onClick={() => {
                    mutation.mutate();
                  }}
                  disabled={mutation.isPending}
                >
                  {mutation.isPending
                    ? "Marking as read..."
                    : "Mark all as read"}
                </Button>
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
