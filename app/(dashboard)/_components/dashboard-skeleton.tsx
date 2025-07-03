import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const DashboardSkeleton = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-10">
      <div className="flex flex-row items-start justify-between space-x-5 w-full h-full">
        <Skeleton className="h-10 w-1/3 rounded-lg bg-bgtext-900" />
        <div className="flex flex-col space-y-3 lg:flex-row lg:space-y-0 lg:space-x-3 w-1/3 h-full">
          <Skeleton className="h-10 w-full rounded-lg bg-bgtext-900" />
          <Skeleton className="h-10 w-full rounded-lg bg-bgtext-900" />
        </div>
      </div>

      <div className="grid w-full h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Skeleton className="h-40 col-span-1 md:col-span-2 lg:col-span-1 w-full rounded-lg bg-bgtext-900" />
        <Skeleton className="h-40 col-span-1 w-full rounded-lg bg-bgtext-900" />
        <Skeleton className="h-40 col-span-1 w-full rounded-lg bg-bgtext-900" />
      </div>

      <div className="grid col-span-1 w-full h-full gap-5">
        <Skeleton className="h-72 w-full rounded-lg bg-bgtext-900" />
      </div>

      <div className="grid w-full h-full grid-cols-1 md:grid-cols-2 gap-5">
        <Skeleton className="h-40 col-span-1 w-full rounded-lg bg-bgtext-900" />
        <Skeleton className="h-40 col-span-1 w-full rounded-lg bg-bgtext-900" />
      </div>
    </div>
  );
};

export default DashboardSkeleton;
