import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SkeletonReferral = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-5">
      <Skeleton className="w-1/4 h-10 rounded-lg bg-bgtext-900" />
      <div className="flex flex-col w-full h-full space-y-5">
        <div className="grid w-full h-full grid-cols-1 gap-5 lg:grid-cols-2">
          <Skeleton className="w-full h-40 col-span-1 rounded-lg bg-bgtext-900" />
          <Skeleton className="w-full h-40 col-span-1 rounded-lg bg-bgtext-900" />
        </div>
        <div className="grid w-full h-full grid-cols-1 gap-5 md:grid-cols-2">
          <Skeleton className="w-full h-40 col-span-1 rounded-lg bg-bgtext-900" />
          <Skeleton className="w-full h-40 col-span-1 rounded-lg bg-bgtext-900" />
        </div>

        <div className="grid w-full h-full grid-cols-1 gap-5 lg:grid-cols-2">
          <Skeleton className="w-full col-span-1 rounded-lg h-80 bg-bgtext-900" />
          <Skeleton className="w-full col-span-1 rounded-lg h-80 bg-bgtext-900" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonReferral;
