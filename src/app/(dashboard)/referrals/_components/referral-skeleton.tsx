import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ReferralSkeleton = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-10">
      <div className="grid w-full h-full grid-cols-1 lg:grid-cols-2  gap-5">
        <Skeleton className="h-40 col-span-1 w-full rounded-lg bg-bgtext-900" />
        <Skeleton className="h-40 col-span-1 w-full rounded-lg bg-bgtext-900" />
      </div>
      <div className="grid w-full h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Skeleton className="h-40 col-span-1 w-full rounded-lg bg-bgtext-900" />
        <Skeleton className="h-40 col-span-1 w-full rounded-lg bg-bgtext-900" />
      </div>

      <div className="grid w-full h-full grid-cols-1 lg:grid-cols-2  gap-5">
        <Skeleton className="h-80 col-span-1 w-full rounded-lg bg-bgtext-900" />
        <Skeleton className="h-80 col-span-1 w-full rounded-lg bg-bgtext-900" />
      </div>
    </div>
  );
};

export default ReferralSkeleton;
