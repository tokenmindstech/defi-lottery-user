import { capitalizeFirstLetter, cn } from "../../lib/utils";
import React from "react";

interface PlanBadgeProps {
  type: SubscriptionType;
}

const PlanBadge = ({ type }: PlanBadgeProps) => {
  return (
    <p
      className={cn(
        "w-fit text-base text-bgtext-100 font-inter py-1 px-4 rounded-lg border-2 border-bgtext-800",
        type === "PREMIUM"
          ? "bg-gradient-to-b from-lindeepgreen-start/40 to-black"
          : type === "BASIC"
          ? "bg-gradient-to-b from-linblue-start/40 to-black"
          : "bg-gradient-to-b from-white/40 to-black"
      )}
    >
      {capitalizeFirstLetter(type)}
    </p>
  );
};

export default PlanBadge;
