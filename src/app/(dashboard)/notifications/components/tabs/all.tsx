import { TabsContent } from "@/components/ui/tabs";
import { NOTIFICATION_MENU_ITEMS } from "@/constant/common";
import React from "react";
import NotificationItem from "../item";

interface NotificationAllTabProps {
  handleOpen?: () => void;
  notifications: UserNotification[];
}

const NotificationAllTab = ({ notifications }: NotificationAllTabProps) => {
  return (
    <TabsContent
      value={NOTIFICATION_MENU_ITEMS[0].value}
      className="bg-transparent w-full text-bgtext-100 font-inter"
    >
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-full space-y-5 p-5">
          <p className="text-bgtext-500">No notifications found.</p>
        </div>
      ) : (
        notifications.map((notification, index) => (
          <NotificationItem
            key={index}
            notification={notification}
            isLastItem={index === notifications.length - 1}
          />
        ))
      )}
    </TabsContent>
  );
};

export default NotificationAllTab;
