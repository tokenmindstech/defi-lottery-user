"use client";

import React from "react";
import BreadcrumbPages from "@/components/layout/breadcrumb-pages";
import { useParams } from "next/navigation";
import Image from "next/image";
import BlueShadow from "@/components/icons/blue-shadow";
import RotatingText from "@/components/ui/rotating-text";
import dayjs from "dayjs";

const BonusDetailPage = () => {
  const { bonusId } = useParams();
  return (
    <section className="flex flex-col w-full h-full space-y-10">
      <h2 className="text-3xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
        Bonus Reward
      </h2>

      <div className="flex flex-col w-full h-full space-y-5">
        <BreadcrumbPages
          currentPageName={"Ticket to Chongqing"}
          currentPageUrl={`/bonus-reward/${bonusId}`}
          previousPages={[
            {
              pageName: "Support",
              pageUrl: "/support",
            },
          ]}
        />

        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative px-0 py-0">
            <div className="absolute top-0 left-0 z-20 flex w-fit px-2 py-1 rounded-tl-lg bg-linprimary-start rounded-br-2xl">
              <RotatingText
                texts={["Travel", "Adventure", "Experience"]}
                mainClassName="text-bgtext-100 text-base font-semibold "
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={4000}
              />
            </div>
            <div className="flex w-full h-[500px] items-center justify-center relative rounded-lg  bg-bgtext-950">
              <div className="flex w-full h-[500px] absolute rounded-lg z-40">
                <Image
                  src={"/assets/images/travel.png"}
                  alt={"Travel Image"}
                  fill
                  className="object-contain rounded-lg"
                  sizes="100%"
                />
              </div>
              <BlueShadow
                className="absolute inset-0 z-10 rounded-lg"
                showCircle={false}
              />
            </div>
          </div>

          <div className="w-full h-fit flex flex-col space-y-5 p-5 rounded-lg bg-bgtext-950">
            <div className="flex flex-col space-y-2">
              <p className="text-bgtext-100 font-inter text-2xl font-bold">
                Travel to Chongqing{" "}
                <span className="text-bgtext-100 text-xs w-fit px-2 py-1 bg-linprimary-start rounded-lg">
                  2 Winners ✨
                </span>
              </p>
              <div className="flex flex-row space-x-2">
                <p className="text-bgtext-100 font-inter text-xs font-semibold">
                  Draw Period:
                </p>
                <p className="text-bgtext-500 font-inter text-xs">
                  {dayjs("2025-07-13T17:00:00.000Z").format("DD/MM/YYYY")}
                </p>
                <p className="text-bgtext-500 font-inter text-xs">-</p>
                <p className="text-bgtext-500 font-inter text-xs">
                  {dayjs("2025-07-20T17:00:00.000Z").format("DD/MM/YYYY")}
                </p>
              </div>
            </div>

            <p className="text-bgtext-500 font-inter text-base">
              Experience cutting-edge technology with the iPhone 16 Pro Max!
              This sleek, high-performance smartphone features a stunning
              6.9-inch Super Retina XDR display, the powerful A18 Pro chip for
              seamless multitasking, and an advanced triple-camera system for
              professional-quality photos and videos. With enhanced battery
              life, 5G connectivity, and the latest iOS, it’s the ultimate
              device for staying connected and creative on the go.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BonusDetailPage;
