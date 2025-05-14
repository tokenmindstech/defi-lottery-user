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
      className={`w-full grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 py-2 ${
        !isLastItem ? "border-b-1 border-bgtext-800" : ""
      } hover:bg-bgtext-800 ease-out transition-all duration-300 cursor-pointer`}
    >
      <div className="col-span-1 flex items-start justify-center">
        <div className="bg-gradient-to-b from-linblue-start to-linblue-end rounded-full p-2 size-10 flex items-center justify-center">
          <Icon weight="fill" className="text-bgtext-100 size-5" />
        </div>
      </div>

      <div className="col-span-5 md:col-span-7 lg:col-span-11 flex flex-col space-y-2">
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
