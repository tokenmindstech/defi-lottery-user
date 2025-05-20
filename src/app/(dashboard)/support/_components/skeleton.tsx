import { Skeleton } from "@/components/ui/skeleton";
import React, { Fragment } from "react";

const SupportSkeleton = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-10">
      <div className="flex flex-row items-center justify-between w-full">
        <Skeleton className="h-10 w-2/5 rounded-lg bg-bgtext-900" />
        <Skeleton className="h-10 w-1/5 rounded-lg bg-bgtext-900" />
      </div>
      <div className="w-full grid grid-cols-5 gap-5">
        <div className="col-span-5 flex flex-col space-y-5 rounded-xl">
          <Skeleton className="h-8 w-full rounded-lg bg-bgtext-900" />
        </div>
        {Array.from({ length: 5 }, (_, idx) => (
          <Fragment key={idx}>
            <Skeleton className="h-8 w-full rounded-lg bg-bgtext-900" />
            <Skeleton className="h-8 w-full rounded-lg bg-bgtext-900" />
            <Skeleton className="h-8 w-full rounded-lg bg-bgtext-900" />
            <Skeleton className="h-8 w-full rounded-lg bg-bgtext-900" />
            <Skeleton className="h-8 w-full rounded-lg bg-bgtext-900" />
          </Fragment>
        ))}
      </div>
      <div className="flex flex-row-reverse items-center justify-between w-full">
        <Skeleton className="h-10 w-2/5 rounded-lg bg-bgtext-900" />
        <Skeleton className="h-10 w-1/5 rounded-lg bg-bgtext-900" />
      </div>
    </div>
  );
};

export default SupportSkeleton;
