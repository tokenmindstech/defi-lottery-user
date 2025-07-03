import React from "react";

import ClaimRewardIcon from "./claim-rewards";
import DashboardIcon from "./dashboard";
import LogOutIcon from "./log-out";
import LotteryDrawIcon from "./lottery-draw";
import MyProfileIcon from "./my-profile";
import SupportIcon from "./support";
import ReferralIcon from "./referral";
import ComissionIcon from "./commission";
import RewardsIcon from "./rewards";
import LuckyDrawIcon from "./lucky-draw";

interface RenderIconProps {
  icon: string;
  className?: string;
}

const RenderIcon = ({ icon, className }: RenderIconProps) => {
  const icons: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    "claim-rewards": ClaimRewardIcon,
    dashboard: DashboardIcon,
    "log-out": LogOutIcon,
    "lottery-draw": LotteryDrawIcon,
    "my-profile": MyProfileIcon,
    rewards: RewardsIcon,
    support: SupportIcon,
    referral: ReferralIcon,
    commission: ComissionIcon,
    "lucky-draw": LuckyDrawIcon,
  };

  const IconComponent = icons[icon];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent className={className} />;
};

export default RenderIcon;
