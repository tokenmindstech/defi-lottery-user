"use client";

import Image from "next/image";
import React from "react";
import { Separator } from "../ui/separator";
import { SignOut } from "@phosphor-icons/react/dist/ssr";
import { MENU_ITEMS } from "@/constant/common";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const SidebarLayout = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col space-y-5 w-[300px] h-screen bg-bgtext-950">
      <div className="flex flex-row h-[10vh] space-x-2 items-center justify-start p-5 border-b border-b-bgtext-700">
        <Image
          width={50}
          height={50}
          src="/assets/images/536.png"
          alt="DeFi Lottery"
        />
        <p className="text-bgtext-100 text-2xl font-bold">Lottery</p>
      </div>

      <ul className="flex flex-col space-y-7 p-5 pt-0">
        {MENU_ITEMS.map((item, index) => (
          <Link href={item.href} key={index}>
            <li
              className={cn(
                "flex flex-row space-x-2 items-center justify-start group cursor-pointer",
                pathname === item.href || pathname.startsWith(`${item.href}/`)
                  ? "bg-gradient-to-r from-bgtext-800 to-bgtext-900 p-2 rounded-lg border border-bgtext-900"
                  : ""
              )}
            >
              <item.icon
                className={cn(
                  "size-6 group-hover:text-bgtext-100 ease-out duration-300 transition-all",
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "text-bgtext-100"
                    : "text-bgtext-600"
                )}
              />
              <p
                className={cn(
                  " font-medium text-base group-hover:text-bgtext-100 ease-out duration-300 transition-all",
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "text-bgtext-100"
                    : "text-bgtext-600"
                )}
              >
                {item.title}
              </p>
            </li>
          </Link>
        ))}

        <Separator className="bg-bgtext-700" />

        <li className="flex flex-row space-x-2 items-center justify-start group cursor-pointer">
          <SignOut className="text-bgtext-600 size-6 group-hover:text-bgtext-100 ease-out duration-300 transition-all" />
          <p className="text-bgtext-600 font-medium text-base group-hover:text-bgtext-100 ease-out duration-300 transition-all">
            Logout
          </p>
        </li>
      </ul>
    </div>
  );
};

export default SidebarLayout;
