"use client";

import { useQuery } from "@tanstack/react-query";
import DashboardLottery from "./_components/lottery";
import DashboardOngoingUpcoming from "./_components/ongoing-upcoming";
import { fetchProxy, truncateString } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Fragment } from "react";
import TicketPerformance from "./_components/ticket-performance";
import PlanBadge from "@/components/shared/plan-badge";
import ResultDisplay from "@/components/shared/result-display";
import SkeletonDashboard from "./_components/skeleton-dashboard";

const DashboardPage = () => {
  const { data: userSession } = useSession();
  const {
    data: dashboardData,
    isLoading,
    error,
  } = useQuery<APIDashboardStatsResponseDTO>({
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
      <ResultDisplay
        isLoading={isLoading}
        error={error}
        data={dashboardData}
        loadingComponent={<SkeletonDashboard />}
        dataErrorMessage="An error occurred while fetching dashboard data."
        loadingErrorMessage="Failed to load dashboard data. Please try again later."
      >
        {(dashboardData) => (
          <Fragment>
            <div className="flex flex-row items-start justify-between w-full h-full space-x-5 md:justify-between">
              <h2 className="text-3xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
                Welcome {truncateString(userSession?.user?.name || "", 8)}
              </h2>

              <div className="flex flex-col justify-between space-y-5 md:flex-row md:space-y-0 md:space-x-10 lg:justify-start">
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
        )}
      </ResultDisplay>
    </section>
  );
};

export default DashboardPage;
