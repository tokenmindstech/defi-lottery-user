"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import dayjs from "dayjs";
import BarGradient from "@/components/shared/BarGradient";

interface AgentDashboardStatisticProps {
  commisionTrends: CommissionTrends[];
  referralGrowth: ReferralGrowth[];
}

const AgentDashboardStatistic = ({
  commisionTrends,
  referralGrowth,
}: AgentDashboardStatisticProps) => {
  const referralData = referralGrowth.map((data) => {
    const [day, month, year] = data.date.split("/");
    const dateObject = dayjs(`${month}/${day}/${year}`);
    return {
      month: dateObject.format("MMM YYYY"),
      amount: data.totalAmount,
    };
  });
  const commissionData = commisionTrends.map((data) => {
    const [day, month, year] = data.date.split("/");
    const dateObject = dayjs(`${month}/${day}/${year}`);

    return {
      month: dateObject.format("MMM YYYY"),
      earning: data.totalEarnings,
    };
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Bar Chart */}
      <Card className="bg-bgtext-950 border border-bgtext-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-bgtext-100 font-inter text-xl font-semibold">
              Referral Growth
            </CardTitle>
            <CardDescription className="text-bgtext-600 font-inter text-sm font-normal">
              Number of Referrals
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="w-full h-full">
          <ChartContainer
            config={{
              referralGrowth: {
                label: "Total Referrals",
                color: "hsl(var(--chart-1))",
              },
            }}
          >
            <ResponsiveContainer width={"100%"} height={100}>
              <BarChart accessibilityLayer data={referralData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis axisLine={false} tickMargin={25} tickLine={false} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar
                  barSize={50}
                  radius={[5, 5, 5, 5]}
                  dataKey="amount"
                  shape={
                    <BarGradient
                      stopColor1={{ offset: "0%", stopColor: "#7259FD" }}
                      stopColor2={{ offset: "64.43%", stopColor: "#9986FF" }}
                      stopColor3={{ offset: "100%", stopColor: "#7259FD" }}
                    />
                  }
                  activeBar={
                    <BarGradient
                      stopColor1={{ offset: "0%", stopColor: "#7259FD" }}
                      stopColor2={{ offset: "64.43%", stopColor: "#9986FF" }}
                      stopColor3={{ offset: "100%", stopColor: "#7259FD" }}
                    />
                  }
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Line Chart */}
      <Card className="bg-bgtext-950 border border-bgtext-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-bgtext-100 font-inter text-xl font-semibold">
              Comission Trend
            </CardTitle>
            <CardDescription className="text-bgtext-600 font-inter text-sm font-normal">
              Earnings
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="w-full h-full">
          <ChartContainer
            config={{
              commissionTrends: {
                label: "Total Earnings",
                color: "hsl(var(--chart-2))",
              },
            }}
          >
            <ResponsiveContainer width={"100%"} height={100}>
              <LineChart accessibilityLayer data={commissionData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis axisLine={false} tickMargin={25} tickLine={false} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />

                <Line type="monotone" dataKey="earning" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentDashboardStatistic;
