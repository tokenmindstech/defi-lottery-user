import React from "react";
import { User, Wallet } from "@phosphor-icons/react/dist/ssr";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import PerformanceCard from "@/components/shared/performance-card";
import { TrendingUp } from "lucide-react";

const AgentDashboardPerformance = () => {
  return (
    <Card className="bg-bgtext-950 border border-bgtext-800">
      <CardHeader className="flex flex-row items-center justify-between w-full">
        <CardTitle className="text-bgtext-100 font-inter text-xl font-semibold">
          Performance Overview
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PerformanceCard
          icon={<Wallet className="h-5 w-5" />}
          title="Total Earning"
          value="$4,589"
          trend="+7.25%"
          trendUp={true}
          variant="checkerboard"
        />
        <PerformanceCard
          icon={<User className="h-5 w-5" />}
          title="Total Sign Up"
          value="245"
          trend="+1.25%"
          trendUp={false}
        />
        <PerformanceCard
          icon={<TrendingUp className="h-5 w-5" />}
          title="Lifetime Value"
          value="$310"
          trend="+7.25%"
          trendUp={true}
        />
      </CardContent>
    </Card>
  );
};

export default AgentDashboardPerformance;
