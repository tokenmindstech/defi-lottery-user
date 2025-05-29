import React from "react";
import { Input } from "@/components/ui/input";
import { MagnifyingGlass, Plus } from "@phosphor-icons/react/dist/ssr";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MobileSidebarLayout from "./mobile-sidebar";
import NotificationDropdown from "./notification-dropdown";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeaderLayout = () => {
  return (
    <div className="flex sticky flex-row h-[10vh] w-full items-center justify-between">
      <div className="absolute h-[10vh] w-full border-b border-b-bgtext-800 mask-l-from-80% mask-r-from-80%" />
      <div className="flex w-full h-full p-5">
        <div className="flex z-20 flex-row items-center space-x-3 w-full">
          <MobileSidebarLayout />
          <Input
            type="text"
            placeholder="Search..."
            className="w-3/4 lg:w-1/2 h-10 bg-bgtext-900 border-0 rounded-full text-bgtext-100 selection:bg-bgtext-100 selection:text-bgtext-900 focus-visible:ring-0 focus-visible:border-[1px] focus-visible:border-bgtext-100 focus-visible:ring-bgtext-100"
            StartIcon={MagnifyingGlass}
          />
        </div>

        <div className="flex z-20 flex-row items-center space-x-3">
          <div className="flex flex-row items-center justify-start space-x-2 px-4 p-2 bg-bgtext-900 rounded-full">
            <p className="text-bgtext-600 text-sm hidden md:block">Balance:</p>
            <p className="pl-1 text-bgtext-100 font-bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }).format(1200)}
            </p>

            <Button
              size="icon"
              className="flex items-center justify-center size-7 bg-gradient-to-l from-linprimary-start to-linprimary-end rounded-full border-2 border-bgtext-800 cursor-pointer"
            >
              <Plus className="text-bgtext-100 size-5 cursor-pointer" />
            </Button>
          </div>
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
