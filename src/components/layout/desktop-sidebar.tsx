"use client";

import Image from "next/image";
import React from "react";
import { Separator } from "../ui/separator";
import { MENU_ITEMS } from "@/constant/common";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import RenderIcon from "../icons/render-icon";

const DesktopSidebarLayout = () => {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex flex-col space-y-5 min-w-[290px] max-w-[290px] h-screen bg-black border-r border-bgtext-800">
      <div className="absolute min-w-[290px] max-w-[290px] h-[10vh] space-x-2 items-center justify-start p-5 border-b border-b-bgtext-800 mask-l-from-80% mask-r-from-80%" />
      <Link
        href={"/"}
        className="flex z-20 flex-row items-center justify-start p-5 space-x-2"
      >
        <Image
          src="/assets/icons/536.svg"
          alt="logo"
          width={50}
          height={50}
          className="rounded-full"
        />
        <p className="text-bgtext-100 font-bold text-xl">DeFi Lottery</p>
      </Link>

      <ul className="flex flex-col space-y-7 p-5 pt-0">
        {MENU_ITEMS.map((item, index) => (
          <Link href={item.href} key={index}>
            <li
              className={cn(
                "flex flex-row space-x-2 items-center justify-start group cursor-pointer",
                pathname === item.href || pathname.startsWith(`${item.href}/`)
                  ? "bg-gradient-to-l from-bgtext-800 to-bgtext-900 rounded-2xl border border-bgtext-800"
                  : ""
              )}
            >
              <RenderIcon
                icon={item.icon}
                className={cn(
                  "size-6 group-hover:fill-bgtext-100 ease-out duration-300 transition-all fill-bgtext-100 ml-3",
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "fill-bgtext-100"
                    : "fill-bgtext-600"
                )}
              />
              <p
                className={cn(
                  " font-medium text-base group-hover:text-bgtext-100 ease-out duration-300 transition-all py-3",
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

        <Separator className="bg-bgtext-800 mask-l-from-80% mask-r-from-80%" />

        <li className="flex flex-row space-x-2 items-center justify-start group cursor-pointer">
          <RenderIcon
            icon="log-out"
            className="ml-3 fill-bgtext-600 size-6 group-hover:fill-bgtext-100 ease-out duration-300 transition-all"
          />

          <p className="text-bgtext-600 font-medium text-base group-hover:text-bgtext-100 ease-out duration-300 transition-all">
            Logout
          </p>
        </li>
      </ul>
    </div>
  );
};

export default DesktopSidebarLayout;
