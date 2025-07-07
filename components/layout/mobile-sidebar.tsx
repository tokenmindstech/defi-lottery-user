"use client";

import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { List } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Image from "next/image";
import { MENU_ITEMS } from "@/constant/common";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import RenderIcon from "../icons/render-icon";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import { clearProfileImageCache } from "@/lib/use-cached-profile-image";

const MobileSidebarLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: userSession } = useSession();
  const [accordionValue, setAccordionValue] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  const handleOpenChange = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    // Clear profile image cache before logout
    if (userSession?.user?.id) {
      clearProfileImageCache(userSession.user.id);
    }
    signOut({ redirect: true, callbackUrl: "/auth?action=logout" });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const shouldExpandAccordion =
        pathname.startsWith("/lucky-draw") ||
        pathname.startsWith("/bonus-reward");
      setAccordionValue(shouldExpandAccordion ? ["item-1"] : []);
    }
  }, [mounted, pathname]);

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
            {MENU_ITEMS.map((item, index) => {
              if (item.subMenu) {
                return (
                  <Accordion
                    type="multiple"
                    key={index}
                    value={accordionValue}
                    onValueChange={setAccordionValue}
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="py-0 group">
                        <div className="flex flex-row space-x-2 items-center justify-start group cursor-pointer">
                          <RenderIcon
                            icon={"lucky-draw"}
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
                            Lucky Draw
                          </p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        {item.subMenu.map((subItem, subIndex) => (
                          <Link
                            href={subItem.href}
                            key={subIndex}
                            onClick={handleOpenChange}
                          >
                            <li
                              className={cn(
                                "flex flex-row space-x-2 items-center justify-start group cursor-pointer pl-10",
                                pathname === subItem.href ||
                                  pathname.startsWith(`${subItem.href}/`)
                                  ? "bg-gradient-to-l from-bgtext-800 to-bgtext-900 rounded-2xl border border-bgtext-800"
                                  : ""
                              )}
                            >
                              <p
                                className={cn(
                                  " font-medium text-base group-hover:text-bgtext-100 ease-out duration-300 transition-all py-3",
                                  pathname === subItem.href ||
                                    pathname.startsWith(`${subItem.href}/`)
                                    ? "text-bgtext-100"
                                    : "text-bgtext-600"
                                )}
                              >
                                {subItem.title}
                              </p>
                            </li>
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              } else {
                return (
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
                );
              }
            })}

            <Separator className="bg-bgtext-800 mask-l-from-80% mask-r-from-80%" />

            <Button
              onClick={handleLogout}
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
