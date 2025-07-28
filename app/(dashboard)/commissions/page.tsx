"use client";

import { TrophyIcon, ClockIcon } from "@phosphor-icons/react/dist/ssr";
import { Separator } from "@/components/ui/separator";
import ClaimCommissionButton from "./_components/claim-commission-button";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { fetchProxy } from "@/lib/utils";
import ComissionStatsSkeleton from "./_components/commission-stats-skeleton";
import { CURRENCY_FRACTION } from "@/constant/common";
import CommissionHistory from "./_components/commission-history";

const EarningsPage = () => {
  const { data: userSession } = useSession();
  const { data: commissionStats, isLoading: isCommissionStatsLoading } =
    useQuery<APIGetCommissionStatisticsResponseDTO>({
      queryKey: ["commission-stats", userSession?.user.id],
      queryFn: async () =>
        fetchProxy({
          method: "GET",
          url: "commission/stats",
          auth: true,
        }),
      enabled: !!userSession?.user.id,
    });

  return (
    <section className="flex flex-col w-full h-full space-y-6">
      <h2 className="text-3xl font-medium text-bgtext-100 font-inter">
        My Earnings
      </h2>

      {isCommissionStatsLoading ? (
        <ComissionStatsSkeleton />
      ) : (
        commissionStats !== undefined &&
        commissionStats !== null && (
          <div className="flex flex-col items-start justify-between w-full h-full p-5 space-y-5 border md:flex-row md:space-y-0 bg-bgtext-900 border-bgtext-800 rounded-xl">
            <div className="flex flex-row items-center justify-start w-full space-x-5">
              <div className="flex flex-row items-center justify-start p-5 space-x-3 bg-gradient-to-b from-linprimary-start to-linprimary-end rounded-xl">
                <div className="relative flex flex-col w-full h-full rounded-xl">
                  <div className="flex flex-row items-center justify-between space-x-10">
                    <p className="text-xs text-bgtext-100 font-inter">
                      Total Earnings
                    </p>
                    <div className="flex bg-bgtext-900 rounded-full p-1.5">
                      <TrophyIcon className="size-5 text-bgtext-100" />
                    </div>
                  </div>
                  <p className="mt-2 text-4xl font-semibold text-bgtext-100 font-inter">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: CURRENCY_FRACTION.MINIMUM,
                      maximumFractionDigits: CURRENCY_FRACTION.MAXIMUM,
                    }).format(commissionStats.data.totalEarnings)}
                  </p>
                </div>
              </div>

              <Separator
                className="data-[orientation=vertical]:h-[100px] bg-bgtext-700"
                orientation="vertical"
              />

              <div className="flex flex-row items-center justify-start p-5 space-x-3 bg-transparent rounded-xl">
                <div className="relative flex flex-col w-full h-full rounded-xl">
                  <div className="flex flex-row items-center justify-between space-x-10">
                    <p className="text-xs text-bgtext-100 font-inter">
                      Pending Claimable
                    </p>
                    <div className="flex bg-bgtext-900 rounded-full p-1.5">
                      <ClockIcon className="size-5 text-bgtext-100" />
                    </div>
                  </div>
                  <p className="mt-2 text-4xl font-semibold text-bgtext-100 font-inter">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: CURRENCY_FRACTION.MINIMUM,
                      maximumFractionDigits: CURRENCY_FRACTION.MAXIMUM,
                    }).format(commissionStats.data.unclaimedEarnings)}
                  </p>
                </div>
              </div>
            </div>

            <ClaimCommissionButton
              totalClaimable={commissionStats.data.unclaimedEarnings}
            />
          </div>
        )
      )}

      <CommissionHistory />
    </section>
  );
};

export default EarningsPage;
