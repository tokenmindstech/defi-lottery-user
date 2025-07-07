import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const BonusRewardSkeleton = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10">
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={index}
            className="flex flex-col space-y-3 rounded-xl bg-bgtext-900 p-4"
          >
            <Skeleton className="h-40 w-full rounded-lg bg-bgtext-800" />
            <Skeleton className="h-6 w-full rounded-lg bg-bgtext-800" />
            <Skeleton className="h-4 w-3/4 rounded-lg bg-bgtext-800" />
            <Skeleton className="h-6 w-full rounded-lg bg-bgtext-800" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BonusRewardSkeleton;
