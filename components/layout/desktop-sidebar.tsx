"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Separator } from "../ui/separator";
import { MENU_ITEMS } from "@/constant/common";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import RenderIcon from "../icons/render-icon";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const DesktopSidebarLayout = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [accordionValue, setAccordionValue] = useState<string[]>([]);

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
    <div className="hidden lg:flex flex-col space-y-5 min-w-[290px] max-w-[290px] h-screen bg-black border-r border-bgtext-800">
      <div className="absolute min-w-[290px] max-w-[290px] h-[85px] space-x-2 items-center justify-start p-5 border-b border-b-bgtext-800 mask-l-from-80% mask-r-from-80%" />
      <Link
        href={"/"}
        className="flex z-20 flex-row items-center justify-start p-5 pb-0 space-x-2"
      >
        <Image
          src="/assets/images/536-White.png"
          alt="logo"
          width={100}
          height={43}
          className=""
        />
      </Link>

      <ul className="flex flex-col space-y-7 p-5 pt-5">
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
                    {item.subMenu.map((item, index) => (
                      <Link href={item.href} key={index}>
                        <li
                          className={cn(
                            "flex flex-row space-x-2 items-center justify-start group cursor-pointer pl-10",
                            pathname === item.href ||
                              pathname.startsWith(`${item.href}/`)
                              ? "bg-gradient-to-l from-bgtext-800 to-bgtext-900 rounded-2xl border border-bgtext-800"
                              : ""
                          )}
                        >
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
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          } else {
            return (
              <Link href={item.href} key={index}>
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
          onClick={() =>
            signOut({ redirect: true, callbackUrl: "/auth?action=logout" })
          }
          className="w-full flex flex-row items-start justify-start bg-transparent hover:bg-transparent cursor-pointer group"
        >
          <li className="flex flex-row space-x-2 items-center justify-start">
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
    </div>
  );
};

export default DesktopSidebarLayout;
