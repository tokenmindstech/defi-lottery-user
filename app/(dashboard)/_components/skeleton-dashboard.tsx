import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SkeletonDashboard = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-10">
      <div className="flex flex-row items-start justify-between w-full h-full space-x-5">
        <Skeleton className="w-1/3 h-10 rounded-lg bg-bgtext-900" />
        <div className="flex flex-col w-1/3 h-full space-y-3 lg:flex-row lg:space-y-0 lg:space-x-3">
          <Skeleton className="w-full h-10 rounded-lg bg-bgtext-900" />
          <Skeleton className="w-full h-10 rounded-lg bg-bgtext-900" />
        </div>
      </div>

      <div className="grid w-full h-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="w-full h-40 col-span-1 rounded-lg md:col-span-2 lg:col-span-1 bg-bgtext-900" />
        <Skeleton className="w-full h-40 col-span-1 rounded-lg bg-bgtext-900" />
        <Skeleton className="w-full h-40 col-span-1 rounded-lg bg-bgtext-900" />
      </div>

      <div className="grid w-full h-full col-span-1 gap-5">
        <Skeleton className="w-full rounded-lg h-72 bg-bgtext-900" />
      </div>

      <div className="grid w-full h-full grid-cols-1 gap-5 md:grid-cols-2">
        <Skeleton className="w-full h-40 col-span-1 rounded-lg bg-bgtext-900" />
        <Skeleton className="w-full h-40 col-span-1 rounded-lg bg-bgtext-900" />
      </div>
    </div>
  );
};

export default SkeletonDashboard;
