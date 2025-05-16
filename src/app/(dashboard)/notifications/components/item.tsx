import { Icon } from "@phosphor-icons/react";
import Link from "next/link";
import { getTimestamp } from "@/lib/utils";

interface NotificationItemProps {
  Icon: Icon;
  title: string;
  description: string;
  time: Date;
  isRead: boolean;
  href: string;
  handleOpen?: () => void;
  isLastItem?: boolean; // New prop to determine if this is the last item
}

const NotificationItem = ({
  description,
  Icon,
  isRead,
  href,
  time,
  title,
  handleOpen,
  isLastItem = false, // Default to false
}: NotificationItemProps) => {
  return (
    <Link
      href={href}
      onClick={handleOpen}
      className={`w-full flex flex-row space-x-5 p-2 ${
        !isLastItem ? "border-b-1 border-bgtext-800" : ""
      } hover:bg-bgtext-800 ease-out transition-all duration-300 cursor-pointer`}
    >
      <div className="w-fit flex items-start justify-start">
        <div className="bg-gradient-to-b from-linblue-start to-linblue-end rounded-full p-2 flex items-center justify-center">
          <Icon weight="fill" className="text-bgtext-100 size-8" />
        </div>
      </div>

      <div className="w-full flex flex-col space-y-2">
        <div className="flex flex-row items-center justify-between pr-5">
          <h5 className="text-bgtext-100 font-inter font-medium text-sm">
            {title}
          </h5>
          {!isRead && <div className="w-2 h-2 bg-linsea-start rounded-full" />}
        </div>
        <p className="text-bgtext-500 font-inter text-sm">{description}</p>
        <p className="text-bgtext-600 font-inter text-xs">
          {getTimestamp(time)}
        </p>
      </div>
    </Link>
  );
};

export default NotificationItem;
