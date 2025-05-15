import { TabsContent } from "@/components/ui/tabs";
import { NOTIFICATION_MENU_ITEMS } from "@/constant/common";
import React from "react";
import NotificationItem from "../item";
import { Info, Ticket } from "@phosphor-icons/react/dist/ssr";

interface NotificationUnreadTabProps {
  handleOpen?: () => void;
}

const NotificationUnreadTab = ({ handleOpen }: NotificationUnreadTabProps) => {
  return (
    <TabsContent
      value={NOTIFICATION_MENU_ITEMS[1].value}
      className="bg-transparent text-bgtext-100 font-inter"
    >
      <NotificationItem
        Icon={Ticket}
        title="Weekly Draw"
        description="Secure your integration with the new token management system to safeguard your API keys."
        isRead={false}
        time={new Date(Date.now() - 0.55 * 60 * 1000)}
        handleOpen={handleOpen}
        href="/notifications/id"
      />
      <NotificationItem
        Icon={Info}
        title="Your account is pending verification."
        description="Secure your integration with the new token management system to safeguard your API keys."
        isRead={false}
        time={new Date(Date.now() - 25 * 60 * 60 * 1000)}
        handleOpen={handleOpen}
        isLastItem={true}
        href="/notifications/id"
      />
    </TabsContent>
  );
};

export default NotificationUnreadTab;
