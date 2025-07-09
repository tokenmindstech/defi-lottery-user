import { Skeleton } from "@/components/ui/skeleton";
import React, { Fragment } from "react";

const SkeletonCommissionHistory = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-5">
      <div className="grid w-full grid-cols-6 gap-5">
        <div className="flex flex-col col-span-6 space-y-5 rounded-xl">
          <Skeleton className="w-full h-8 rounded-lg bg-bgtext-900" />
        </div>
        {Array.from({ length: 5 }, (_, idx) => (
          <Fragment key={idx}>
            <Skeleton className="w-full h-8 rounded-lg bg-bgtext-900" />
            <Skeleton className="w-full h-8 rounded-lg bg-bgtext-900" />
            <Skeleton className="w-full h-8 rounded-lg bg-bgtext-900" />
            <Skeleton className="w-full h-8 rounded-lg bg-bgtext-900" />
            <Skeleton className="w-full h-8 rounded-lg bg-bgtext-900" />
            <Skeleton className="w-full h-8 rounded-lg bg-bgtext-900" />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default SkeletonCommissionHistory;
