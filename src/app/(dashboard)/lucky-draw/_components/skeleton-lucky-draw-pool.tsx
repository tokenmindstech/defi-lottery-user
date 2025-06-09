import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SkeletonLuckyDrawPool = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-5">
      <div className="flex flex-col w-full h-full space-y-5 lg:flex-row lg:space-y-0 lg:space-x-5 lg:items-center">
        <Skeleton className="w-full h-40 rounded-xl bg-bgtext-900" />
        <Skeleton className="w-full h-40 rounded-xl bg-bgtext-900" />
      </div>
    </div>
  );
};

export default SkeletonLuckyDrawPool;
