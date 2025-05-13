import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SkeletonForm = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-5">
      <div className="flex w-full items-center justify-center">
        <Skeleton className="size-[150px] bg-bgtext-900 rounded-xl" />
      </div>

      <div className="grid grid-cols-6 gap-y-5 w-full h-full">
        <Skeleton className="size-8 bg-bgtext-900 rounded-full" />
        <div className="col-span-5 h-full flex flex-col space-y-2">
          <Skeleton className="h-4 bg-bgtext-900 rounded-lg" />
          <Skeleton className="h-4 bg-bgtext-900 rounded-lg" />
          <Skeleton className="h-14 bg-bgtext-900 rounded-lg" />
        </div>
      </div>

      <div className="grid grid-cols-6 gap-y-5 w-full h-full">
        <Skeleton className="size-8 bg-bgtext-900 rounded-full" />
        <div className="col-span-5 h-full flex flex-col space-y-2">
          <Skeleton className="h-4 bg-bgtext-900 rounded-lg" />
          <Skeleton className="h-4 bg-bgtext-900 rounded-lg" />
          <Skeleton className="h-14 bg-bgtext-900 rounded-lg" />
        </div>
      </div>

      <div className="w-full flex flex-row space-x-5 items-center justify-end">
        <Skeleton className="h-10 w-32 bg-bgtext-900 rounded-lg" />
        <Skeleton className="h-10 w-32 bg-bgtext-900 rounded-lg" />
      </div>
    </div>
  );
};

export default SkeletonForm;
