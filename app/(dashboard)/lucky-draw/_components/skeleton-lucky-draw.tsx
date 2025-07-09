import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLuckyDraw = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-5">
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Skeleton className="col-span-1 h-48 lg:col-span-2 rounded-xl bg-bgtext-900" />
        <Skeleton className="col-span-1 h-48 rounded-xl bg-bgtext-900" />
      </div>
    </div>
  );
};

export default SkeletonLuckyDraw;
