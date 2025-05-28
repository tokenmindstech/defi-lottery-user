"use client";

import { useQuery } from "@tanstack/react-query";
import DashboardSkeleton from "./_components/dashboard-skeleton";
import DashboardLottery from "./_components/lottery";
import DashboardOngoingUpcoming from "./_components/ongoing-upcoming";
import { fetchProxy, truncateString } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Fragment } from "react";
import TicketPerformance from "./_components/ticket-performance";
import PlanBadge from "@/components/shared/plan-badge";

const DashboardPage = () => {
  const { data: userSession } = useSession();
  const { data: dashboardData, isLoading } =
    useQuery<APIDashboardStatsResponseDTO>({
      queryKey: ["dashboard-stats"],
      queryFn: async () =>
        fetchProxy({
          url: "user/dashboard",
          method: "GET",
          auth: true,
        }),
      enabled: !!userSession?.user?.id,
    });

  return (
    <section className="flex flex-col w-full h-full space-y-10">
      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        dashboardData !== undefined &&
        dashboardData !== null && (
          <Fragment>
            <div className="flex flex-row items-start justify-between space-x-5 w-full h-full md:justify-between">
              <h2 className="text-3xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
                Welcome {truncateString(userSession?.user?.name || "", 8)}
              </h2>

              <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-10 justify-between lg:justify-start">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm text-bgtext-600 font-inter">
                    Tickets Remaining
                  </p>
                  <p className="text-2xl font-semibold text-bgtext-100 font-inter">
                    {dashboardData.data.remainingTickets}
                  </p>
                </div>

                <div className="flex flex-col space-y-2">
                  <p className="text-sm text-bgtext-600 font-inter">Tier</p>
                  <PlanBadge
                    type={dashboardData?.data.subscriptionType || "EXPLORE"}
                  />
                </div>
              </div>
            </div>
            <DashboardLottery
              totalEarnings={dashboardData.data.stats.totalEarnings}
              totalTickets={dashboardData.data.stats.totalTickets}
              totalWinningTickets={dashboardData.data.stats.totalWinningTickets}
            />
            <TicketPerformance monthlyData={dashboardData.data.monthlyData} />
            <DashboardOngoingUpcoming />
          </Fragment>
        )
      )}
    </section>
  );
};

export default DashboardPage;
