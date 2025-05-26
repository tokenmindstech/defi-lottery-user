"use client";

import Link from "next/link";
import { getTimestamp } from "@/lib/utils";
import { Info, Ticket } from "@phosphor-icons/react/dist/ssr";

interface NotificationItemProps {
  notification: UserNotification;
  isLastItem?: boolean; // New prop to determine if this is the last item
}

const NotificationItem = ({
  notification,
  isLastItem = false, // Default to false
}: NotificationItemProps) => {
  return (
    <Link
      href={`/notifications/${notification.id}`}
      className={`w-full flex flex-row space-x-5 p-2 ${
        !isLastItem ? "border-b-1 border-bgtext-800" : ""
      } hover:bg-bgtext-800 ease-out transition-all duration-300 cursor-pointer`}
    >
      <div className="w-fit flex items-start justify-start">
        <div className="bg-gradient-to-b from-linblue-start to-linblue-end rounded-full p-2 flex items-center justify-center">
          {notification.type === "DRAW" ? (
            <Ticket weight="fill" className="text-bgtext-100 size-8" />
          ) : (
            <Info weight="fill" className="text-bgtext-100 size-8" />
          )}
        </div>
      </div>

      <div className="w-full flex flex-col space-y-2">
        <div className="flex flex-row items-center justify-between pr-5">
          <h5 className="text-bgtext-100 font-inter font-medium text-sm">
            {notification.title}
          </h5>
          {!notification.isRead && (
            <div className="w-2 h-2 bg-linsea-start rounded-full" />
          )}
        </div>
        <p className="text-bgtext-500 font-inter text-sm">
          {notification.message}
        </p>
        <p className="text-bgtext-600 font-inter text-xs">
          {getTimestamp(new Date(notification.createdAt))}
        </p>
      </div>
    </Link>
  );
};

export default NotificationItem;
