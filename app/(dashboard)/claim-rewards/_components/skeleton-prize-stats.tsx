import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SkeletonPrizeStats = () => {
  return (
    <div className="grid w-full h-full grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
      <Skeleton className="w-full h-32 rounded-xl bg-bgtext-900" />
      <Skeleton className="w-full h-32 rounded-xl bg-bgtext-900" />
      <Skeleton className="hidden w-full h-32 bg-transparent lg:flex rounded-xl" />
      <Skeleton className="hidden w-full h-32 bg-transparent lg:flex rounded-xl" />
      <Skeleton className="w-full h-16 rounded-xl bg-bgtext-900" />
    </div>
  );
};

export default SkeletonPrizeStats;
