import { TabsContent } from "@/components/ui/tabs";
import { NOTIFICATION_MENU_ITEMS } from "@/constant/common";
import React from "react";
import NotificationItem from "../item";
import { Ticket } from "@phosphor-icons/react/dist/ssr";

const NotificationReadTab = () => {
  return (
    <TabsContent
      value={NOTIFICATION_MENU_ITEMS[2].value}
      className="bg-transparent text-bgtext-100 font-inter"
    >
      <NotificationItem
        Icon={Ticket}
        title="Weekly Draw"
        description="Secure your integration with the new token management system to safeguard your API keys."
        isRead={true}
        time={new Date(Date.now() - 30 * 60 * 1000)}
        href="/notifications/id"
      />
      <NotificationItem
        Icon={Ticket}
        title="Weekly Draw"
        description="Secure your integration with the new token management system to safeguard your API keys."
        isRead={true}
        time={new Date(Date.now() - 2 * 60 * 60 * 1000)}
        href="/notifications/id"
      />
      <NotificationItem
        Icon={Ticket}
        title="Weekly Draw"
        description="Secure your integration with the new token management system to safeguard your API keys."
        isRead={true}
        time={new Date(Date.now() - 79 * 60 * 60 * 1000)}
        href="/notifications/id"
        isLastItem={true}
      />
    </TabsContent>
  );
};

export default NotificationReadTab;
