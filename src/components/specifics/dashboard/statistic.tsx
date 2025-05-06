"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Ticket } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const DashboardStatistic = () => {
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <Card className="bg-bgtext-950 lg:col-span-2 border border-bgtext-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <CardTitle className="text-bgtext-100 font-inter text-xl font-semibold">
              Monthly Ticket Performance
            </CardTitle>
            <CardDescription className="hidden text-bgtext-600 font-inter text-sm font-normal">
              View you lottery ticket statistics
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="w-full h-full">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width={"100%"} height={100}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar
                  dataKey="desktop"
                  fill={chartConfig.desktop.color}
                  radius={4}
                />
                <Bar
                  dataKey="mobile"
                  fill={chartConfig.mobile.color}
                  radius={4}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="bg-bgtext-950 border border-bgtext-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <CardTitle className="text-bgtext-100 font-inter text-xl font-semibold">
              Quick Claim
            </CardTitle>
            <CardDescription className="hidden text-bgtext-600 font-inter text-sm font-normal">
              View you lottery ticket statistics
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="w-full h-full">
          <div className="border border-bgtext-800 rounded-xl overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-bgtext-800 bg-bgtext-900">
                  <th className="p-4 w-2/12"></th>
                  <th className="p-4 w-5/12 text-left border-l border-r border-bgtext-800 bg-bgtext-900">
                    <span className="text-bgtext-100">Name</span>
                  </th>
                  <th className="p-4 w-5/12 text-center bg-bgtext-900">
                    <span className="text-bgtext-100">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Daily Draw Row */}
                <tr className="border-b border-bgtext-800">
                  <td className="p-4 text-center">
                    <div className="flex justify-center">
                      <div className="bg-gradient-to-b from-lincyan-start to-lincyan-end border-2 border-bgtext-800 rounded-2xl p-3 size-12 flex items-center justify-center">
                        <Ticket
                          weight="fill"
                          className="text-bgtext-100 size-8"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-l border-r border-bgtext-800">
                    <p className="text-bgtext-500 font-inter text-base">
                      Dialy Draw
                    </p>
                  </td>
                  <td className="p-4 text-center">
                    <Button className="bg-gradient-to-b px-8 py-5 from-linprimary-start to-linprimary-end text-bgtext-100 border-2 border-bgtext-800 hover:bg-gradient-to-b hover:from-linprimary-start hover:to-linprimary-end/50 rounded-xl cursor-pointer ease-out transition-all duration-300">
                      Claim
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-center">
                    <div className="flex justify-center">
                      <div className="bg-gradient-to-b from-linblue-start to-linblue-end rounded-2xl p-3 size-12 flex items-center justify-center">
                        <Ticket
                          weight="fill"
                          className="text-bgtext-100 size-8"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-l border-r border-bgtext-800">
                    <span className="text-[#9c9c9c] text-lg">Weekly Draw</span>
                  </td>
                  <td className="p-4 text-center">
                    <Button className="bg-gradient-to-b px-8 py-5 from-linprimary-start to-linprimary-end text-bgtext-100 border-2 border-bgtext-800 hover:bg-gradient-to-b hover:from-linprimary-start hover:to-linprimary-end/50 rounded-xl cursor-pointer ease-out transition-all duration-300">
                      Claim
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStatistic;
