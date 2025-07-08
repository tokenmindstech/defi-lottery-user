import { cn } from "@/lib/utils";
import { BugIcon } from "@phosphor-icons/react/dist/ssr";
import React from "react";

interface ErrorInfoProps {
  errorMessage: string;
  className?: string;
  textClassName?: string;
  showIcon?: boolean;
}

const ErrorInfo = ({
  errorMessage,
  className,
  textClassName,
  showIcon = true,
}: ErrorInfoProps) => {
  return (
    <div
      className={cn(
        "flex w-full h-full items-center justify-center",
        className
      )}
    >
      <div className="w-fit h-full bg-bgtext-950 rounded-xl flex flex-col space-y-4 items-center justify-center p-5">
        {showIcon && <BugIcon className="size-20 text-destructive/80" />}
        <p
          className={cn(
            "text-destructive/80 font-inter text-base",
            textClassName
          )}
        >
          {errorMessage}
        </p>
      </div>
    </div>
  );
};

export default ErrorInfo;
