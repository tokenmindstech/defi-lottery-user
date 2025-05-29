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
import ReferralSkeleton from "./_components/referral-skeleton";
import { TelegramLogo } from "@phosphor-icons/react/dist/ssr";
import { Fragment } from "react";
import Link from "next/link";
import AgentDashboardStatistic from "./_components/statistic";
import { useSearchParams } from "next/navigation";
import ReferralListSkeleton from "./_components/referral-list-skeleton";
import QuerySearch from "@/components/shared/query-search";
import PagePagination from "@/components/shared/page-pagination";
import { ReferralsTable } from "./_components/referral-list";

const ReferralPage = () => {
  const { data: userSession } = useSession();
  const searchParams = useSearchParams();

  const page =
    searchParams.get("page") &&
    !Number.isNaN(parseInt(searchParams.get("page") as string))
      ? parseInt(searchParams.get("page") as string)
      : 1;
  const limit =
    searchParams.get("limit") &&
    !Number.isNaN(parseInt(searchParams.get("limit") as string))
      ? parseInt(searchParams.get("limit") as string)
      : 10;
  const search =
    searchParams.get("q") && searchParams.get("q") !== "undefined"
      ? searchParams.get("q")
      : undefined;

  const { data: referralStats, isLoading: referralStatsLoading } =
    useQuery<APIGetReferralStatsResponseDTO>({
      queryKey: ["referralStats", userSession?.user.id],
      queryFn: async () =>
        fetchProxy({
          url: "referrals/stats",
          method: "GET",
          auth: true,
        }),
      enabled: !!userSession?.user?.id,
    });

  const { data: referredUsers, isLoading: referredUsersLoading } =
    useQuery<APIQueryReferredUsersResponseDTO>({
      queryKey: ["referred-users", userSession?.user.id, page, limit, search],
      queryFn: async () =>
        fetchProxy({
          method: "GET",
          url: `referrals?page=${page}&limit=${limit}&search=${search || ""}`,
          auth: true,
        }),
      enabled: !!userSession?.user.id,
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
      {referralStatsLoading ? (
        <ReferralSkeleton />
      ) : (
        referralStats !== undefined &&
        referralStats !== null && (
          <Fragment>
            <div className="flex flex-row  justify-between items-center">
              <h2 className="text-3xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
                Welcome {truncateString(userSession?.user?.name || "", 8)}
              </h2>
            </div>

            <Card className="bg-bgtext-950 border border-bgtext-800">
              <CardHeader className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-col">
                  <CardTitle className="text-bgtext-100 font-inter text-xl">
                    Copy, Share, and Earn
                  </CardTitle>
                </div>

                <Link
                  target="_blank"
                  href={`https://t.me/share?url=${encodeURIComponent(
                    `${process.env.NEXT_PUBLIC_APP_URL}/auth?ref=${referralStats.data.stats.referralCode}`
                  )}&text=%F0%9F%9A%80%20Join%20the%20DeFi%20Lottery%20fun%20with%20my%20referral%20link%21%20%F0%9F%8E%89%20Sign%20up%2C%20play%2C%20and%20earn%20rewards%20together%21%20%F0%9F%92%B0`}
                >
                  <Button className="bg-gradient-to-b from-linprimary-start to-linprimary-end text-bgtext-100 hover:bg-gradient-to-b border-2 border-bgtext-800 hover:from-linprimary-start hover:to-linprimary-end/50 rounded-lg cursor-pointer ease-out transition-all duration-300">
                    <TelegramLogo className="h-4 w-4" />
                    <span>Share on Telegram</span>
                  </Button>
                </Link>
              </CardHeader>

              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 bg-bgtext-900 border border-bgtext-800 rounded-lg p-5">
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

                <div className="flex flex-col gap-2 bg-bgtext-900 border border-bgtext-800 rounded-lg p-5">
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
        )
      )}

      <div className="flex flex-col w-full h-full space-y-5 bg-bgtext-950 p-5 rounded-xl">
        <QuerySearch page={page} />
        {referredUsersLoading ? (
          <ReferralListSkeleton />
        ) : (
          referredUsers !== undefined &&
          referredUsers !== null && (
            <Fragment>
              <ReferralsTable
                referredUsers={referredUsers.data.referredUsers}
              />
              <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 w-full h-fit items-center justify-between mt-5">
                <p className="text-bgtext-500 text-sm">
                  Showing {referredUsers?.metadata?.totalCount || 0} results of{" "}
                  {referredUsers?.metadata?.totalCount || 0}
                </p>
                <PagePagination
                  currentPage={page}
                  totalPages={referredUsers?.metadata?.totalPage || 1}
                />
              </div>
            </Fragment>
          )
        )}
      </div>

      <AgentDashboardTraining />
    </section>
  );
};

export default ReferralPage;
