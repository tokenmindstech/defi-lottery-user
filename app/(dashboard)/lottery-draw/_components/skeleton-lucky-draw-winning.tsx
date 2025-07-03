import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLuckyDrawWInningNumber = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-5">
      <div className="flex w-full h-full items-center justify-center">
        <Skeleton className="w-1/2 h-40 rounded-xl bg-bgtext-900" />
      </div>
    </div>
  );
};

export default SkeletonLuckyDrawWInningNumber;
