import React from "react";
import { UserIcon, WalletIcon } from "@phosphor-icons/react/dist/ssr";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import PerformanceCard from "@/components/shared/performance-card";

interface AgentDashboardPerformanceProps {
  totalSignUps: number;
  totalEarnings: number;
}

const AgentDashboardPerformance = ({
  totalSignUps,
  totalEarnings,
}: AgentDashboardPerformanceProps) => {
  return (
    <Card className="bg-bgtext-950 border border-bgtext-800">
      <CardHeader className="flex flex-row items-center justify-between w-full">
        <CardTitle className="text-bgtext-100 font-inter text-xl font-semibold">
          Performance Overview
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PerformanceCard
          icon={<WalletIcon className="h-5 w-5" />}
          title="Total Earning"
          value={new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(totalEarnings)}
          variant="checkerboard"
        />
        <PerformanceCard
          icon={<UserIcon className="h-5 w-5" />}
          title="Total Sign Up"
          value={new Intl.NumberFormat("en-US", {
            style: "decimal",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(totalSignUps)}
        />
      </CardContent>
    </Card>
  );
};

export default AgentDashboardPerformance;
