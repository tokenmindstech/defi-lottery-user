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
  ResponsiveContainer,
  XAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import BarGradient from "./BarGradient";
import dayjs from "dayjs";

const chartConfig = {
  tickets: {
    label: "Total tickets",
    color: "hsl(var(--chart-1))",
  },
  wins: {
    label: "Winning tickets",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface MonthlyStats {
  date: string;
  winningTickets: number;
  totalTickets: number;
}

interface TicketPerformanceProps {
  monthlyData: MonthlyStats[];
}

const TicketPerformance = ({ monthlyData }: TicketPerformanceProps) => {
  const chartData = monthlyData.map((data) => {
    // Split the date by "/" and reorder to MM/DD/YYYY format for proper parsing
    const [day, month, year] = data.date.split("/");
    const dateObject = dayjs(`${month}/${day}/${year}`);

    return {
      month: dateObject.format("MMM YYYY"),
      tickets: data.totalTickets,
      wins: data.winningTickets,
      // Store the original date format for sorting if needed
      originalDate: data.date,
    };
  });

  return (
    <Card className="bg-bgtext-950 md:col-span-3 xl:col-span-2 border border-bgtext-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <CardTitle className="text-bgtext-100 font-inter text-xl font-semibold">
            Monthly Ticket Performance
          </CardTitle>
          <CardDescription className="hidden text-bgtext-600 font-inter text-sm font-normal">
            View your lottery ticket statistics
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
                dataKey="tickets"
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
                radius={4}
              />
              <Bar
                dataKey="wins"
                shape={
                  <BarGradient
                    stopColor1={{ offset: "0%", stopColor: "#2EB8F6" }}
                    stopColor2={{ offset: "64.43%", stopColor: "#6CEBFF" }}
                    stopColor3={{ offset: "100%", stopColor: "#2EB8F6" }}
                  />
                }
                activeBar={
                  <BarGradient
                    stopColor1={{ offset: "0%", stopColor: "#2EB8F6" }}
                    stopColor2={{ offset: "64.43%", stopColor: "#6CEBFF" }}
                    stopColor3={{ offset: "100%", stopColor: "#2EB8F6" }}
                  />
                }
                radius={4}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TicketPerformance;
