import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const BonusDetailSkeleton = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-10">
      <div className="flex flex-row space-x-2">
        <Skeleton className="h-8 w-1/6 rounded-full bg-bgtext-900" />
        <Skeleton className="h-8 w-1/6 rounded-full bg-bgtext-900" />
      </div>
      <div className="grid w-full h-full grid-cols-1 md:grid-cols-2 gap-5">
        <Skeleton className="h-[500px] col-span-1 w-full rounded-lg bg-bgtext-900" />
        <div className="w-full h-full flex flex-col space-y-5">
          <Skeleton className="h-8 w-3/4 rounded-full bg-bgtext-900" />
          <Skeleton className="h-5 w-1/2 rounded-full bg-bgtext-900" />
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-4 w-full rounded-lg bg-bgtext-900" />
            <Skeleton className="h-4 w-full rounded-lg bg-bgtext-900" />
            <Skeleton className="h-4 w-full rounded-lg bg-bgtext-900" />
            <Skeleton className="h-4 w-full rounded-lg bg-bgtext-900" />
            <Skeleton className="h-4 w-full rounded-lg bg-bgtext-900" />
            <Skeleton className="h-4 w-3/4 rounded-lg bg-bgtext-900" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BonusDetailSkeleton;
