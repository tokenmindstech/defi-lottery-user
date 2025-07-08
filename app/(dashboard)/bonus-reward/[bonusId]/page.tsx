"use client";

import React, { Fragment } from "react";
import BreadcrumbPages from "@/components/layout/breadcrumb-pages";
import { useParams } from "next/navigation";
import Image from "next/image";
import BlueShadow from "@/components/icons/blue-shadow";
import RotatingText from "@/components/ui/rotating-text";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useQuery } from "@tanstack/react-query";
import { fetchProxy } from "@/lib/utils";
import { useSession } from "next-auth/react";
import BonusDetailSkeleton from "./_components/bonus-detail-skeleton";
import ClaimBonus from "./_components/claim-bonus";
import ResultDisplay from "@/components/shared/result-display";

// Configure dayjs to use plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const BonusDetailPage = () => {
  const { bonusId } = useParams();
  const { data: userSession } = useSession();

  const {
    data: bonusData,
    isLoading,
    error,
  } = useQuery<APIGetBonusDetailsResponseDTO>({
    queryKey: ["bonus", bonusId],
    queryFn: async () =>
      fetchProxy({
        url: `bonus/${bonusId}`,
        method: "GET",
        auth: true,
      }),
    enabled: !!bonusId && !!userSession?.user.id,
  });
  return (
    <section className="flex flex-col w-full h-full space-y-10">
      <h2 className="text-3xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
        Bonus Reward
      </h2>

      <div className="flex flex-col w-full h-full space-y-5">
        <ResultDisplay
          isLoading={isLoading}
          error={error}
          data={bonusData}
          loadingComponent={<BonusDetailSkeleton />}
          dataErrorMessage="An error occurred while fetching bonus details."
          loadingErrorMessage="Failed to load bonus details. Please try again later."
        >
          {(bonusData) => (
            <Fragment>
              <BreadcrumbPages
                currentPageName={bonusData.data.name}
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
                      texts={bonusData.data.category}
                      mainClassName="text-bgtext-100 text-base font-semibold "
                      staggerFrom={"last"}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-120%" }}
                      staggerDuration={0.025}
                      splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                      transition={{
                        type: "spring",
                        damping: 30,
                        stiffness: 400,
                      }}
                      rotationInterval={4000}
                    />
                  </div>
                  <div className="flex w-full h-[500px] items-center justify-center relative rounded-lg  bg-bgtext-950">
                    <div className="flex w-full h-[500px] absolute rounded-lg z-40">
                      <Image
                        src={bonusData.data.imageUrl}
                        alt={bonusData.data.name}
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

                <div className="flex flex-col w-full h-full space-y-5">
                  <div className="w-full h-fit flex flex-col space-y-5 p-5 rounded-lg bg-bgtext-950">
                    <div className="flex flex-col space-y-2">
                      <p className="text-bgtext-100 font-inter text-2xl font-bold">
                        {bonusData.data.name}{" "}
                        <span className="text-bgtext-100 text-xs w-fit px-2 py-1 bg-linprimary-start rounded-lg">
                          2 Winners ✨
                        </span>
                      </p>
                      <div className="flex flex-row space-x-2">
                        <p className="text-bgtext-100 font-inter text-xs font-semibold">
                          Draw Period:
                        </p>
                        <p className="text-bgtext-500 font-inter text-xs">
                          {dayjs(bonusData.data.createdAt)
                            .tz("Asia/Singapore")
                            .format("DD/MM/YYYY")}
                        </p>
                        <p className="text-bgtext-500 font-inter text-xs">-</p>
                        <p className="text-bgtext-500 font-inter text-xs">
                          {dayjs(bonusData.data.validAt)
                            .tz("Asia/Singapore")
                            .format("DD/MM/YYYY")}
                        </p>
                      </div>
                    </div>

                    <p className="text-bgtext-500 font-inter text-base">
                      {bonusData.data.description}
                    </p>
                  </div>

                  <ClaimBonus bonus={bonusData.data} />
                </div>
              </div>
            </Fragment>
          )}
        </ResultDisplay>
      </div>
    </section>
  );
};

export default BonusDetailPage;
