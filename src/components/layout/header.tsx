import React from "react";
import { Input } from "../ui/input";
import { MagnifyingGlass, Bell } from "@phosphor-icons/react/dist/ssr";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import MobileSidebarLayout from "./mobile-sidebar";

const HeaderLayout = () => {
  return (
    <div className="flex relative flex-row h-[10vh] w-full items-center justify-between p-5">
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
        <div className="w-10 h-10 bg-transparent border-2 border-bgtext-700 rounded-full items-center justify-center flex cursor-pointer">
          <Bell weight="regular" className="text-bgtext-100 size-7" />
        </div>
        <Avatar className="w-10 h-10 bg-bgtext-700 rounded-full cursor-pointer">
          <AvatarImage
            src="/assets/images/536.png"
            alt="@shadcn"
            className="object-cover p-0.5"
          />
          <AvatarFallback>DF</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default HeaderLayout;
