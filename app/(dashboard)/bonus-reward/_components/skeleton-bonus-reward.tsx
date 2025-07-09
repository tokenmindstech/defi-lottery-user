import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SkeletonBonusReward = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-5">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={index}
            className="flex flex-col p-4 space-y-3 rounded-xl bg-bgtext-900"
          >
            <Skeleton className="w-full h-40 rounded-lg bg-bgtext-800" />
            <Skeleton className="w-full h-6 rounded-lg bg-bgtext-800" />
            <Skeleton className="w-3/4 h-4 rounded-lg bg-bgtext-800" />
            <Skeleton className="w-full h-6 rounded-lg bg-bgtext-800" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonBonusReward;
