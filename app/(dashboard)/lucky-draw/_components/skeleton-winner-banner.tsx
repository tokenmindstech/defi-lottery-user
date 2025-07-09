import { Skeleton } from "@/components/ui/skeleton";

const SkeletonWinnerBanner = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-5">
      <div className="w-full h-full flex flex-row items-center justify-between">
        <Skeleton className="h-10 w-1/4 rounded-lg bg-bgtext-900" />
        <Skeleton className="h-10 w-1/4 rounded-lg bg-bgtext-900" />
      </div>
    </div>
  );
};

export default SkeletonWinnerBanner;
