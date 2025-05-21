import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-10">
      <div className="flex flex-col w-full h-full p-5 space-y-10 lg:flex-row lg:items-center lg:justify-between ">
        <div className="flex flex-row space-x-5">
          <Skeleton className="w-20 h-20 rounded-xl bg-bgtext-900" />
          <div className="flex flex-col space-y-2">
            <Skeleton className="w-32 h-8 rounded-lg bg-bgtext-900" />
            <Skeleton className="w-24 h-6 rounded-lg bg-bgtext-900" />
          </div>
        </div>

        <Skeleton className="w-20 h-10 rounded-xl bg-bgtext-900" />
      </div>

      <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="flex flex-col col-span-3 px-4 py-4 space-y-5 lg:col-span-1 rounded-xl">
          <Skeleton className="w-full h-8 rounded-lg bg-bgtext-900" />
          <Skeleton className="w-full h-8 rounded-lg bg-bgtext-900" />
          <Skeleton className="w-full h-8 rounded-lg bg-bgtext-900" />
          <Skeleton className="w-full h-8 rounded-lg bg-bgtext-900" />
        </div>
        <div className="flex flex-col col-span-3 px-4 py-4 space-y-5 lg:col-span-2 rounded-xl">
          <Skeleton className="w-full h-8 rounded-lg bg-bgtext-900" />
          <Skeleton className="w-full h-8 rounded-lg bg-bgtext-900" />
          <Skeleton className="w-full h-8 rounded-lg bg-bgtext-900" />
          <Skeleton className="w-full h-8 rounded-lg bg-bgtext-900" />
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
