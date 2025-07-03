import { cn } from "@/lib/utils";
import React from "react";

const LotteryDrawIcon = ({ className }: CustomIconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-6", className)}
    >
      <rect
        y="4"
        width="24"
        height="15"
        rx="3"
        fill="white"
        fillOpacity="0.12"
      />
      <rect x="2" y="6" width="9.5" height="11" rx="2" />
      <path
        d="M5.09163 14.5L7.57163 9.46H4.76363V8.54H8.71563V9.46L6.29163 14.5H5.09163Z"
        fill="#0F0F0F"
      />
      <rect x="12.5" y="6" width="9.5" height="11" rx="2" />
      <path
        d="M15.5916 14.5L18.0716 9.46H15.2636V8.54H19.2156V9.46L16.7916 14.5H15.5916Z"
        fill="#0F0F0F"
      />
    </svg>
  );
};

export default LotteryDrawIcon;
