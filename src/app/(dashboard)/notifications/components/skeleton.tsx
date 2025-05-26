import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const NotificationSkeleton = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-5 p-3">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex space-x-3">
          <Skeleton className="h-5 w-14 rounded-lg bg-bgtext-950" />
          <Skeleton className="h-5 w-14 rounded-lg bg-bgtext-950" />
          <Skeleton className="h-5 w-14 rounded-lg bg-bgtext-950" />
        </div>
        <Skeleton className="h-5 w-20 rounded-lg bg-bgtext-950" />
      </div>
      <Skeleton className="h-14 w-full rounded-lg bg-bgtext-950" />
      <Skeleton className="h-14 w-full rounded-lg bg-bgtext-950" />
      <Skeleton className="h-14 w-full rounded-lg bg-bgtext-950" />
    </div>
  );
};

export default NotificationSkeleton;
