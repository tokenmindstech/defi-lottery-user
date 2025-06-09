import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LuckyDrawPoolSkeleton = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-5">
      <div className="flex flex-col w-full h-full p-5 pb-0 space-y-5 lg:flex-row lg:space-y-0 lg:space-x-5 lg:items-center">
        <Skeleton className="w-full h-40 rounded-xl bg-bgtext-900" />
        <Skeleton className="w-full h-40 rounded-xl bg-bgtext-900" />
      </div>
      <div className="flex w-full h-full items-center justify-center">
        <Skeleton className="w-1/2 h-40 rounded-xl bg-bgtext-900" />
      </div>
    </div>
  );
};

export default LuckyDrawPoolSkeleton;
