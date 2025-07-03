import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SubscriptionSkeleton = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-10">
      <div className="grid w-full">
        <div className="flex flex-col col-span-3 space-y-5 rounded-xl">
          <Skeleton className="w-full h-10 rounded-lg bg-bgtext-900" />
          <Skeleton className="w-full h-10 rounded-lg bg-bgtext-900" />
          <Skeleton className="w-full h-10 rounded-lg bg-bgtext-900" />
          <Skeleton className="w-full h-10 rounded-lg bg-bgtext-900" />
          <Skeleton className="w-full h-10 rounded-lg bg-bgtext-900" />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSkeleton;
