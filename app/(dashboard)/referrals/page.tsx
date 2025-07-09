"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link as LinkIcon } from "lucide-react";
import toast from "react-hot-toast";
import AgentDashboardPerformance from "./_components/performance";
import AgentDashboardTraining from "./_components/training";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { fetchProxy, truncateString } from "@/lib/utils";
import { TelegramLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { Fragment } from "react";
import Link from "next/link";
import AgentDashboardStatistic from "./_components/statistic";
import HistoryReferrals from "./_components/history-referral";
import SkeletonReferral from "./_components/skeleton-referral";
import ResultDisplay from "@/components/shared/result-display";

const ReferralPage = () => {
  const { data: userSession } = useSession();

  const {
    data: referralStats,
    isLoading,
    error,
  } = useQuery<APIGetReferralStatsResponseDTO>({
    queryKey: ["referralStats", userSession?.user.id],
    queryFn: async () =>
      fetchProxy({
        url: "referrals/stats",
        method: "GET",
        auth: true,
      }),
    enabled: !!userSession?.user?.id,
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch(() => {
        toast.success("Failed to copy!");
      });
  };

  return (
    <section className="flex flex-col w-full h-full space-y-10">
      <ResultDisplay
        isLoading={isLoading}
        error={error}
        data={referralStats}
        loadingComponent={<SkeletonReferral />}
        dataErrorMessage="An error occurred while fetching referral stats."
        loadingErrorMessage="Failed to load referral stats. Please try again later."
      >
        {(referralStats) => (
          <Fragment>
            <div className="flex flex-row items-center justify-between">
              <h2 className="text-3xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
                Welcome {truncateString(userSession?.user?.name || "", 8)}
              </h2>
            </div>

            <Card className="border bg-bgtext-950 border-bgtext-800">
              <CardHeader className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-col">
                  <CardTitle className="text-xl text-bgtext-100 font-inter">
                    Copy, Share, and Earn
                  </CardTitle>
                </div>

                <Link
                  target="_blank"
                  href={`https://t.me/share?url=${encodeURIComponent(
                    `${process.env.NEXT_PUBLIC_APP_URL}/auth?ref=${referralStats.data.stats.referralCode}`
                  )}&text=%F0%9F%9A%80%20Join%20the%20DeFi%20Lottery%20fun%20with%20my%20referral%20link%21%20%F0%9F%8E%89%20Sign%20up%2C%20play%2C%20and%20earn%20rewards%20together%21%20%F0%9F%92%B0`}
                >
                  <Button className="transition-all duration-300 ease-out border-2 rounded-lg cursor-pointer bg-gradient-to-b from-linprimary-start to-linprimary-end text-bgtext-100 hover:bg-gradient-to-b border-bgtext-800 hover:from-linprimary-start hover:to-linprimary-end/50">
                    <TelegramLogoIcon className="w-4 h-4" />
                    <span>Share on Telegram</span>
                  </Button>
                </Link>
              </CardHeader>

              <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2 p-5 border rounded-lg bg-bgtext-900 border-bgtext-800">
                  <p className="text-sm text-bgtext-500">Referral LinkIcon</p>
                  <div className="flex items-center justify-between">
                    <div className="text-bgtext-100 font-inter">
                      {truncateString(
                        `${process.env.NEXT_PUBLIC_APP_URL}/auth?ref=${referralStats.data.stats.referralCode}`,
                        35
                      )}
                    </div>
                    <Button
                      onClick={() =>
                        copyToClipboard(
                          `${process.env.NEXT_PUBLIC_APP_URL}/auth?ref=${referralStats.data.stats.referralCode}`
                        )
                      }
                      className="flex p-1.5 rounded-lg bg-gradient-to-b from-linblack-start via-30% via-linblack-via to-linblack-end cursor-pointer hover:bg-gradient-to-t"
                    >
                      <LinkIcon className="rotate-45 text-bgtext-100" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-2 p-5 border rounded-lg bg-bgtext-900 border-bgtext-800">
                  <p className="text-sm text-bgtext-500">Referral Code</p>
                  <div className="flex items-center justify-between">
                    <div className="text-bgtext-100 font-inter">
                      {truncateString(
                        referralStats.data.stats.referralCode,
                        35
                      )}
                    </div>
                    <Button
                      onClick={() =>
                        copyToClipboard(referralStats.data.stats.referralCode)
                      }
                      className="flex p-1.5 rounded-lg bg-gradient-to-b from-linblack-start via-30% via-linblack-via to-linblack-end cursor-pointer hover:bg-gradient-to-t"
                    >
                      <LinkIcon className="rotate-45 text-bgtext-100" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <AgentDashboardPerformance
              totalSignUps={referralStats.data.stats.totalSignUps}
              totalEarnings={referralStats.data.stats.totalEarnings}
            />
            <AgentDashboardStatistic
              commisionTrends={referralStats.data.charts.commisionTrends}
              referralGrowth={referralStats.data.charts.referralGrowth}
            />
          </Fragment>
        )}
      </ResultDisplay>

      <HistoryReferrals />

      <AgentDashboardTraining />
    </section>
  );
};

export default ReferralPage;
