import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLuckyDrawWInningNumber = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-5">
      <div className="grid w-full grid-cols-1 gap-5 place-items-center">
        <div className="flex flex-col items-center justify-center space-y-5 w-fit">
          <Skeleton className="w-3/4 h-6 rounded-lg bg-bgtext-900" />
          <div className="flex justify-center gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                className="rounded-lg w-14 h-14 bg-bgtext-900"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLuckyDrawWInningNumber;
