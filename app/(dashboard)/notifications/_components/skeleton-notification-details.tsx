import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SkeletonNotificationDetails = () => {
  return (
    <div className="flex flex-col w-full h-full p-3 space-y-5">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex space-x-3">
          <Skeleton className="w-20 h-5 rounded-lg bg-bgtext-950" />
          <Skeleton className="w-20 h-5 rounded-lg bg-bgtext-950" />
        </div>
      </div>
      <Skeleton className="w-full h-40 rounded-lg bg-bgtext-950" />
    </div>
  );
};

export default SkeletonNotificationDetails;
