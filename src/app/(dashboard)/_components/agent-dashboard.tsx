"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "lucide-react";
import AgentDashboardPerformance from "./agent-performance";
import AgentDasboardStatistic from "./agent-statistic";
import AgentRecentReferrall from "./agent-recent-referral";
import toast from "react-hot-toast";
import AgentDashboardTraining from "./agent-training";

const AgentDashboard = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch((err) => {
        toast.success("Failed to copy!");
      });
  };

  return (
    <section className="flex flex-col w-full h-full space-y-6">
      <div className="flex flex-row  justify-between items-center">
        <h2 className="text-3xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
          Welcome Alex!
        </h2>

        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-8 md:gap-16">
          <div className="flex flex-col space-y-1">
            <p className="text-sm text-bgtext-600 font-inter">Agent ID</p>
            <p className="text-sm text-bgtext-100 font-inter">ID : 123123</p>
          </div>
          <div className="flex  flex-col space-y-1">
            <p className="text-sm text-bgtext-600 font-inter">Joined Date</p>
            <p className="text-sm text-bgtext-100 font-inter">August 2025</p>
          </div>
        </div>
      </div>

      {/* Copy, Share, and Earn Section */}
      <Card className="bg-bgtext-950 border border-bgtext-800">
        <CardHeader className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-col">
            <CardTitle className="text-bgtext-100 font-inter text-xl">
              Copy, Share, and Earn
            </CardTitle>
          </div>

          {/* <Button className="bg-linprimary-start hover:bg-linprimary-end text-white flex items-center gap-2 rounded-lg">
            <Telegram className="h-4 w-4" />
            <span>Share on Telegram</span>
          </Button> */}
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 bg-bgtext-900 border border-bgtext-800 rounded-lg p-5">
            <p className="text-sm text-bgtext-500">Referral Link</p>
            <div className="flex items-center justify-between">
              <div className="text-bgtext-100 font-inter">
                https://example.com/ref123
              </div>
              <Button
                onClick={() => copyToClipboard("https://example.com/ref123")}
                className="flex p-1.5 rounded-lg bg-gradient-to-b from-linblack-start via-30% via-linblack-via to-linblack-end cursor-pointer hover:bg-gradient-to-t"
              >
                <Link className="rotate-45 text-bgtext-100" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2 bg-bgtext-900 border border-bgtext-800 rounded-lg p-5">
            <p className="text-sm text-bgtext-500">Referral Code</p>
            <div className="flex items-center justify-between">
              <div className="text-bgtext-100 font-inter">DKHIKX123</div>
              <Button
                onClick={() => copyToClipboard("DKHIKX123")}
                className="flex p-1.5 rounded-lg bg-gradient-to-b from-linblack-start via-30% via-linblack-via to-linblack-end cursor-pointer hover:bg-gradient-to-t"
              >
                <Link className="rotate-45 text-bgtext-100" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Overview */}
      <AgentDashboardPerformance />

      {/* Charts Section */}
      <AgentDasboardStatistic />

      {/* Recent Referrals */}
      <AgentRecentReferrall />

      {/* Recommended Training */}
      <AgentDashboardTraining />
    </section>
  );
};

export default AgentDashboard;
