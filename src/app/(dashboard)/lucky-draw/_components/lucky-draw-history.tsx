import { Skeleton } from "@/components/ui/skeleton";
import React, { Fragment } from "react";

const LuckyDrawHistorySkeleton = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-5">
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
    </div>
  );
};

export default LuckyDrawHistorySkeleton;
