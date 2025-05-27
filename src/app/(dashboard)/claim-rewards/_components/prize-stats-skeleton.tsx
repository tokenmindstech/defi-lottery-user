import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const PrizeStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full h-full gap-5">
      <Skeleton className="w-full h-32 rounded-xl bg-bgtext-900" />
      <Skeleton className="w-full h-32 rounded-xl bg-bgtext-900" />
      <Skeleton className="hidden lg:flex w-full h-32 rounded-xl bg-transparent" />
      <Skeleton className="hidden lg:flex w-full h-32 rounded-xl bg-transparent" />
      <Skeleton className="w-full h-16 rounded-xl bg-bgtext-900" />
    </div>
  );
};

export default PrizeStatsSkeleton;
