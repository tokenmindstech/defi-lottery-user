import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NOTIFICATION_MENU_ITEMS } from "@/constant/common";
import React from "react";
import NotificationAllTab from "./components/tabs/all";
import NotificationReadTab from "./components/tabs/read";
import NotificationUnreadTab from "./components/tabs/unread";

const NotificationPage = () => {
  return (
    <section className="flex flex-col w-full h-full space-y-10">
      <h2 className="text-3xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
        Notification
      </h2>

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
        <NotificationAllTab />
        <NotificationUnreadTab />
        <NotificationReadTab />
      </Tabs>
    </section>
  );
};

export default NotificationPage;
