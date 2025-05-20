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
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];
const chartConfig = {} satisfies ChartConfig;

const AgentDasboardStatistic = () => {
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
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width={"100%"} height={100}>
              <BarChart accessibilityLayer data={chartData}>
                <defs>
                  <linearGradient
                    id="desktopGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="30%" stopColor="#7b61ff" />
                    <stop offset="70%" stopColor="#887cff" />
                  </linearGradient>
                </defs>
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
                  dataKey="desktop"
                  fill="url(#desktopGradient)"
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
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width={"100%"} height={100}>
              <LineChart accessibilityLayer data={chartData}>
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

                <Line type="monotone" dataKey="desktop" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentDasboardStatistic;
