import { Skeleton } from "@/components/ui/skeleton";
import React, { Fragment } from "react";

const ReferralSkeleton = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-10">
      <div className="grid w-full h-full grid-cols-1 lg:grid-cols-2  gap-5">
        <Skeleton className="h-40 col-span-1 w-full rounded-lg bg-bgtext-900" />
        <Skeleton className="h-40 col-span-1 w-full rounded-lg bg-bgtext-900" />
      </div>
      <div className="grid w-full h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Skeleton className="h-40 col-span-1 md:col-span-2 lg:col-span-1 w-full rounded-lg bg-bgtext-900" />
        <Skeleton className="h-40 col-span-1 w-full rounded-lg bg-bgtext-900" />
        <Skeleton className="h-40 col-span-1 w-full rounded-lg bg-bgtext-900" />
      </div>

      <div className="grid w-full h-full grid-cols-1 lg:grid-cols-2  gap-5">
        <Skeleton className="h-80 col-span-1 w-full rounded-lg bg-bgtext-900" />
        <Skeleton className="h-80 col-span-1 w-full rounded-lg bg-bgtext-900" />
      </div>

      <div className="w-full grid grid-cols-3 gap-5">
        <div className="col-span-3 flex flex-col space-y-5 rounded-xl">
          <Skeleton className="h-8 w-full rounded-lg bg-bgtext-900" />
        </div>
        {Array.from({ length: 5 }, (_, idx) => (
          <Fragment key={idx}>
            <Skeleton className="h-8 w-full rounded-lg bg-bgtext-900" />
            <Skeleton className="h-8 w-full rounded-lg bg-bgtext-900" />
            <Skeleton className="h-8 w-full rounded-lg bg-bgtext-900" />
          </Fragment>
        ))}
      </div>

      <div className="grid w-full h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Skeleton className="h-40 col-span-1 w-full rounded-lg bg-bgtext-900" />
        <Skeleton className="h-40 col-span-1 w-full rounded-lg bg-bgtext-900" />
        <Skeleton className="h-40 col-span-1 w-full rounded-lg bg-bgtext-900" />
        <Skeleton className="h-40 col-span-1 w-full rounded-lg bg-bgtext-900" />
      </div>
    </div>
  );
};

export default ReferralSkeleton;
