"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "@phosphor-icons/react/dist/ssr";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NOTIFICATION_MENU_ITEMS } from "@/constant/common";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import NotificationAllTab from "@/app/(dashboard)/notifications/components/tabs/all";
import NotificationReadTab from "@/app/(dashboard)/notifications/components/tabs/read";
import NotificationUnreadTab from "@/app/(dashboard)/notifications/components/tabs/unread";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProxy } from "@/lib/utils";
import NotificationSkeleton from "@/app/(dashboard)/notifications/components/skeleton";
import { Button } from "../ui/button";

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const { data: userSession } = useSession();
  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery<
    APIQueryNotificationResponseDTO[]
  >({
    queryKey: ["notifications", userSession?.user.id, 1, 3],
    queryFn: async () => {
      return await Promise.all([
        fetchProxy({
          url: "notifications/my?page=1&limit=3",
          method: "GET",
          auth: true,
        }),
        fetchProxy({
          url: "notifications/my?page=1&limit=3&isRead=false",
          method: "GET",
          auth: true,
        }),
        fetchProxy({
          url: "notifications/my?page=1&limit=3&isRead=true",
          method: "GET",
          auth: true,
        }),
      ]);
    },
    enabled: !!userSession,
  });

  const mutation = useMutation({
    mutationKey: ["read-all-notifications", userSession?.user.id],
    mutationFn: async () => {
      return await fetchProxy({
        url: "notifications/read-all",
        method: "POST",
        auth: true,
        body: {},
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", userSession?.user.id, 1, 3],
      });
    },
  });

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="w-10 h-10 border-2 bg-bgtext-900 border-bgtext-800 rounded-full items-center justify-center flex cursor-pointer">
        <Bell weight="regular" className="text-bgtext-100 size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={20}
        className="w-full min-w-sm max-w-sm md:min-w-md md:max-w-md bg-bgtext-900 border-1 border-bgtext-800 rounded-xl p-0"
      >
        <DropdownMenuLabel className="text-bgtext-100 font-medium text-base mb-3 p-3 pb-0">
          Notification
        </DropdownMenuLabel>
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
                  handleOpen={handleOpen}
                  notifications={notifications[0].data.notifications}
                />
                <NotificationUnreadTab
                  handleOpen={handleOpen}
                  notifications={notifications[1].data.notifications}
                />
                <NotificationReadTab
                  handleOpen={handleOpen}
                  notifications={notifications[2].data.notifications}
                />
              </Tabs>
            )
          )}
        </div>

        <Link href="/notifications" onClick={() => setOpen(false)}>
          <p className="text-bgtext-100 text-sm text-center border-0 border-t-1 py-2 border-bgtext-800 hover:bg-bgtext-800 ease-out transition-all duration-300 cursor-pointer">
            View all
          </p>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
