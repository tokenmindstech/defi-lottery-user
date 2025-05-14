import { TabsContent } from "@/components/ui/tabs";
import { NOTIFICATION_MENU_ITEMS } from "@/constant/common";
import React from "react";
import NotificationItem from "../item";
import { Info, Ticket } from "@phosphor-icons/react/dist/ssr";

const NotificationAllTab = () => {
  return (
    <TabsContent
      value={NOTIFICATION_MENU_ITEMS[0].value}
      className="bg-transparent text-bgtext-100 font-inter"
    >
      <NotificationItem
        Icon={Ticket}
        title="Weekly Draw"
        description="Secure your integration with the new token management system to safeguard your API keys."
        isRead={false}
        time={new Date(Date.now() - 0.55 * 60 * 1000)}
        href="/notifications/id"
      />
      <NotificationItem
        Icon={Info}
        title="Your account is pending verification."
        description="Secure your integration with the new token management system to safeguard your API keys."
        isRead={false}
        time={new Date(Date.now() - 25 * 60 * 60 * 1000)}
        isLastItem={false}
        href="/notifications/id"
      />
      <NotificationItem
        Icon={Info}
        title="Your account is pending verification."
        description="Secure your integration with the new token management system to safeguard your API keys."
        isRead={true}
        time={new Date(Date.now() - 25 * 60 * 60 * 1000)}
        isLastItem={true}
        href="/notifications/id"
      />
    </TabsContent>
  );
};

export default NotificationAllTab;
