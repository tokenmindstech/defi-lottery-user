import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "@phosphor-icons/react/dist/ssr";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NOTIFICATION_MENU_ITEMS } from "@/constant/common";
import Link from "next/link";

const NotificationDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-10 h-10 border-2 bg-bgtext-900 border-bgtext-800 rounded-full items-center justify-center flex cursor-pointer">
        <Bell weight="regular" className="text-bgtext-100 size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={20}
        className="w-full min-w-xs max-w-sm bg-bgtext-900 border-1 border-bgtext-800 rounded-xl p-0"
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
                className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none text-bgtext-600 data-[state=active]:text-bgtext-100 border-0 data-[state=active]:border-b-2 border-linprimary-start rounded-none px-2"
              >
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>

        <Link href="/notifications">
          <p className="text-bgtext-100 text-sm text-center border-0 border-t-1 p-2 border-bgtext-800 hover:bg-bgtext-800 ease-out transition-all duration-300 cursor-pointer">
            View all
          </p>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
