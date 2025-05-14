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

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);

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
                {item.count !== "" && (
                  <Badge
                    variant="destructive"
                    className="rounded-full text-xs border-0"
                  >
                    {item.count}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          <NotificationAllTab handleOpen={handleOpen} />
          <NotificationUnreadTab handleOpen={handleOpen} />
          <NotificationReadTab handleOpen={handleOpen} />
        </Tabs>

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
