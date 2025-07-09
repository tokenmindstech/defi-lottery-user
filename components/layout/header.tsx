import React from "react";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MobileSidebarLayout from "./mobile-sidebar";
import NotificationDropdown from "./notification-dropdown";
import Link from "next/link";

const HeaderLayout = () => {
  return (
    <div className="flex sticky flex-row h-[10vh] w-full items-center justify-between">
      <div className="absolute h-[85px] w-full border-b border-b-bgtext-800 mask-l-from-80% mask-r-from-80%" />
      <div className="flex w-full h-full p-5">
        <div className="flex z-20 flex-row items-center space-x-3 w-full">
          <MobileSidebarLayout />
          <Input
            type="text"
            placeholder="Search..."
            className="w-3/4 lg:w-1/2 h-10 bg-bgtext-900 border-0 rounded-full text-bgtext-100 selection:bg-bgtext-100 selection:text-bgtext-900 focus-visible:ring-0 focus-visible:border-[1px] focus-visible:border-bgtext-100 focus-visible:ring-bgtext-100"
            StartIcon={MagnifyingGlassIcon}
          />
        </div>

        <div className="flex z-20 flex-row items-center space-x-3">
          <NotificationDropdown />
          <Link href={"/profile"}>
            <Avatar className="w-10 h-10 bg-bgtext-800 rounded-full cursor-pointer">
              <AvatarImage
                src="/assets/images/user.jpeg"
                alt="User Avatar"
                className="object-cover"
              />
              <AvatarFallback>DF</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderLayout;
