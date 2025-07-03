"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { List } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Image from "next/image";
import { MENU_ITEMS } from "@/constant/common";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import RenderIcon from "../icons/render-icon";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const MobileSidebarLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const handleOpenChange = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <List className="size-7 fill-bgtext-100 cursor-pointer" />
        </SheetTrigger>
        <SheetContent side="left" className="bg-bgtext-950">
          <SheetHeader>
            <SheetTitle className="text-bgtext-100 font-bold text-xl">
              <Link
                href={"/"}
                onClick={handleOpenChange}
                className="flex flex-row items-center justify-start p-5 pb-0 space-x-2"
              >
                <Image
                  src="/assets/images/536-White.png"
                  alt="logo"
                  width={100}
                  height={43}
                  className=""
                />
              </Link>
            </SheetTitle>
            <SheetDescription className="hidden text-bgtext-100 font-medium text-base" />
          </SheetHeader>

          <ul className="flex flex-col space-y-7 p-5 pt-0">
            {MENU_ITEMS.map((item, index) => (
              <Link href={item.href} key={index} onClick={handleOpenChange}>
                <li
                  className={cn(
                    "flex flex-row space-x-2 items-center justify-start group cursor-pointer",
                    pathname === item.href ||
                      pathname.startsWith(`${item.href}/`)
                      ? "bg-gradient-to-l from-bgtext-800 to-bgtext-900 rounded-2xl border border-bgtext-800"
                      : ""
                  )}
                >
                  <RenderIcon
                    icon={item.icon}
                    className={cn(
                      "size-6 group-hover:fill-bgtext-100 ease-out duration-300 transition-all fill-bgtext-100 ml-3",
                      pathname === item.href ||
                        pathname.startsWith(`${item.href}/`)
                        ? "fill-bgtext-100"
                        : "fill-bgtext-600"
                    )}
                  />
                  <p
                    className={cn(
                      " font-medium text-base group-hover:text-bgtext-100 ease-out duration-300 transition-all py-3",
                      pathname === item.href ||
                        pathname.startsWith(`${item.href}/`)
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

            <Button
              onClick={() =>
                signOut({ redirect: true, callbackUrl: "/auth?action=logout" })
              }
              className="w-full flex flex-row items-start justify-start bg-transparent hover:bg-transparent cursor-pointer group"
            >
              <li className="flex flex-row space-x-2 items-center justify-start group cursor-pointer">
                <RenderIcon
                  icon="log-out"
                  className="fill-bgtext-600 size-6 group-hover:fill-bgtext-100 ease-out duration-300 transition-all"
                />

                <p className="text-bgtext-600 font-medium text-base group-hover:text-bgtext-100 ease-out duration-300 transition-all">
                  Logout
                </p>
              </li>
            </Button>
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebarLayout;
