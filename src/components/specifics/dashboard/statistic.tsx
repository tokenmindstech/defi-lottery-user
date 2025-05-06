import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DashboardStatistic = () => {
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <Card className="bg-bgtext-950 border-0 col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <CardTitle className="text-bgtext-100 font-inter text-xl font-semibold">
              Lottery Stats
            </CardTitle>
            <CardDescription className="text-bgtext-600 font-inter text-sm font-normal">
              View you lottery ticket statistics
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"></CardContent>
      </Card>

      <Card className="bg-bgtext-950 border-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <CardTitle className="text-bgtext-100 font-inter text-xl font-semibold">
              Lottery Stats
            </CardTitle>
            <CardDescription className="text-bgtext-600 font-inter text-sm font-normal">
              View you lottery ticket statistics
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"></CardContent>
      </Card>
    </div>
  );
};

export default DashboardStatistic;
