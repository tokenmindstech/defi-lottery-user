import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SkeletonLuckyDrawPool = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-5">
      <div className="grid w-full h-full grid-cols-1 gap-5 xl:grid-cols-3">
        <Skeleton className="w-full h-40 xl:col-span-2 rounded-xl bg-bgtext-900" />
        <Skeleton className="w-full h-40 rounded-xl bg-bgtext-900" />
      </div>

      <div className="grid w-full h-full grid-cols-1 gap-5 lg:grid-cols-2">
        <Skeleton className="w-full h-28 rounded-xl bg-bgtext-900" />
        <Skeleton className="w-full h-28 rounded-xl bg-bgtext-900" />
      </div>
    </div>
  );
};

export default SkeletonLuckyDrawPool;
