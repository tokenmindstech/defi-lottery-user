import React from "react";
import { Input } from "../ui/input";
import { MagnifyingGlass, Bell } from "@phosphor-icons/react/dist/ssr";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const HeaderLayout = () => {
  return (
    <div className="flex flex-row h-[10vh] items-center justify-between p-4 bg-black">
      <Input
        type="text"
        placeholder="Search..."
        className="w-1/4 h-10 bg-bgtext-900 border-0 rounded-full text-bgtext-100 selection:bg-bgtext-100 selection:text-bgtext-900 focus-visible:ring-0 focus-visible:border-[1px] focus-visible:border-bgtext-100 focus-visible:ring-bgtext-100"
        StartIcon={MagnifyingGlass}
      />

      <div className="flex flex-row items-center space-x-3">
        <div className="w-10 h-10 bg-transparent border-2 border-bgtext-700 rounded-full items-center justify-center flex cursor-pointer">
          <Bell weight="regular" className="text-bgtext-100 size-7" />
        </div>
        <Avatar className="w-10 h-10 bg-bgtext-700 rounded-full cursor-pointer">
          <AvatarImage
            src="/assets/images/536.png"
            alt="@shadcn"
            className="object-cover p-0.5"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default HeaderLayout;
