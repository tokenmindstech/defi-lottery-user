"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { BellIcon } from "@phosphor-icons/react/dist/ssr";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { NOTIFICATION_MENU_ITEMS } from "@/constant/common";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProxy } from "@/lib/utils";
import { Button } from "../ui/button";
import NotificationSkeleton from "@/app/(dashboard)/notifications/_components/skeleton";
import NotificationAllTab from "@/app/(dashboard)/notifications/_components/tabs/all";
import NotificationUnreadTab from "@/app/(dashboard)/notifications/_components/tabs/unread";
import NotificationReadTab from "@/app/(dashboard)/notifications/_components/tabs/read";

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const { data: userSession } = useSession();
  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery<
    APIQueryNotificationResponseDTO[]
  >({
    queryKey: ["notifications", userSession?.user.id, 1, 10],
    queryFn: async () => {
      return await Promise.all([
        fetchProxy({
          url: `notifications/my?page=1&limit=10&user=${userSession?.user.id}`,
          method: "GET",
          auth: true,
        }),
        fetchProxy({
          url: `notifications/my?page=1&limit=10&isRead=false&user=${userSession?.user.id}`,
          method: "GET",
          auth: true,
        }),
        fetchProxy({
          url: `notifications/my?page=1&limit=10&isRead=true&user=${userSession?.user.id}`,
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
        queryKey: ["notifications", userSession?.user.id, 1, 10],
      });
    },
  });

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="flex items-center justify-center w-10 h-10 border-2 rounded-full cursor-pointer bg-bgtext-900 border-bgtext-800">
        <BellIcon weight="regular" className="text-bgtext-100 size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={20}
        className="w-full max-w-sm p-0 min-w-sm md:min-w-md md:max-w-md bg-bgtext-900 border-1 border-bgtext-800 rounded-xl"
      >
        <DropdownMenuLabel className="p-3 pb-0 mb-3 text-base font-medium text-bgtext-100">
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
                <TabsList className="flex flex-row items-center justify-between w-full bg-transparent">
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
                            className="text-xs border-0 rounded-full"
                          >
                            {notifications[0].data.unreadCount}
                          </Badge>
                        )}
                      </TabsTrigger>
                    ))}
                  </div>
                  <Button
                    variant="link"
                    className="transition-all duration-300 ease-out rounded-none cursor-pointer text-bgtext-600 hover:text-bgtext-100 hover:border-b-2 border-linprimary-start hover:no-underline"
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
                  notifications={
                    notifications[0]?.data?.notifications?.slice(0, 3) || []
                  }
                />
                <NotificationUnreadTab
                  handleOpen={handleOpen}
                  notifications={
                    notifications[1]?.data?.notifications?.slice(0, 3) || []
                  }
                />
                <NotificationReadTab
                  handleOpen={handleOpen}
                  notifications={
                    notifications[2]?.data?.notifications?.slice(0, 3) || []
                  }
                />
              </Tabs>
            )
          )}
        </div>

        <Link href="/notifications" onClick={() => setOpen(false)}>
          <p className="py-2 text-sm text-center transition-all duration-300 ease-out border-0 cursor-pointer text-bgtext-100 border-t-1 border-bgtext-800 hover:bg-bgtext-800">
            View all
          </p>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
