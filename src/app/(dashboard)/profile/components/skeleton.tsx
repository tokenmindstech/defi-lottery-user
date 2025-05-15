import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-10">
      <div className="flex flex-col lg:flex-row w-full h-full lg:items-center lg:justify-between space-y-10 p-5 ">
        <div className="flex flex-row space-x-5">
          <Skeleton className="h-20 w-20 rounded-xl bg-bgtext-900" />
          <div className="flex flex-col space-y-2">
            <Skeleton className="h-8 w-32 rounded-lg bg-bgtext-900" />
            <Skeleton className="h-6 w-24 rounded-lg bg-bgtext-900" />
          </div>
        </div>

        <Skeleton className="h-10 w-20 rounded-xl bg-bgtext-900" />
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="col-span-3 lg:col-span-1 flex flex-col space-y-5 rounded-xl px-4 py-4">
          <Skeleton className="h-8 w-full rounded-lg bg-bgtext-900" />
          <Skeleton className="h-8 w-full rounded-lg bg-bgtext-900" />
          <Skeleton className="h-8 w-full rounded-lg bg-bgtext-900" />
          <Skeleton className="h-8 w-full rounded-lg bg-bgtext-900" />
        </div>
        <div className="col-span-3 lg:col-span-2 flex flex-col space-y-5 rounded-xl px-4 py-4">
          <Skeleton className="h-8 w-full rounded-lg bg-bgtext-900" />
          <Skeleton className="h-8 w-full rounded-lg bg-bgtext-900" />
          <Skeleton className="h-8 w-full rounded-lg bg-bgtext-900" />
          <Skeleton className="h-8 w-full rounded-lg bg-bgtext-900" />
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
