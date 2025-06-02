import { cn } from "@/lib/utils";
import React from "react";

interface StatisticItemProps {
  variant?: "default" | "checkerboard";
  className?: string;
  children?: React.ReactNode;
}

const StatisticItem = ({
  variant = "default",
  className,
  children,
}: StatisticItemProps) => {
  if (variant === "checkerboard") {
    return (
      <div
        className={cn(
          "flex w-full h-[125px] rounded-xl bg-gradient-to-t from-linblue-start/50 to-transparent border border-bgtext-800",
          className
        )}
      >
        <div className="flex w-full h-full bg-[url(/assets/images/checkboard-transparent.png)] bg-no-repeat bg-center bg-cover rounded-xl p-5">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full h-[125px] rounded-xl bg-bgtext-900 text-bg-text-100 p-5 flex-col border border-bgtext-800">
      {children}
    </div>
  );
};

export default StatisticItem;
