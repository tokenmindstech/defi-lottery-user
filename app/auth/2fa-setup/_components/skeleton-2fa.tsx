import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Skeleton2FA = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-5">
      <div className="flex items-center justify-center w-full">
        <Skeleton className="size-[150px] bg-bgtext-900 rounded-xl" />
      </div>

      <div className="grid w-full h-full grid-cols-6 gap-y-5">
        <Skeleton className="rounded-full size-8 bg-bgtext-900" />
        <div className="flex flex-col h-full col-span-5 space-y-2">
          <Skeleton className="h-4 rounded-lg bg-bgtext-900" />
          <Skeleton className="h-4 rounded-lg bg-bgtext-900" />
          <Skeleton className="rounded-lg h-14 bg-bgtext-900" />
        </div>
      </div>

      <div className="grid w-full h-full grid-cols-6 gap-y-5">
        <Skeleton className="rounded-full size-8 bg-bgtext-900" />
        <div className="flex flex-col h-full col-span-5 space-y-2">
          <Skeleton className="h-4 rounded-lg bg-bgtext-900" />
          <Skeleton className="h-4 rounded-lg bg-bgtext-900" />
          <Skeleton className="rounded-lg h-14 bg-bgtext-900" />
        </div>
      </div>

      <div className="flex flex-row items-center justify-end w-full space-x-5">
        <Skeleton className="w-32 h-10 rounded-lg bg-bgtext-900" />
        <Skeleton className="w-32 h-10 rounded-lg bg-bgtext-900" />
      </div>
    </div>
  );
};

export default Skeleton2FA;
