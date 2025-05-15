import React from "react";

import ClaimRewardIcon from "./claim-rewards";
import DashboardIcon from "./dashboard";
import LogOutIcon from "./log-out";
import LuckyDrawIcon from "./lucky-draw";
import MyProfileIcon from "./my-profile";
import PerksIcon from "./perks";
import SupportIcon from "./support";
import ReferralIcon from "./referral";
import ComissionIcon from "./commission";

interface RenderIconProps {
  icon: string;
  className?: string;
}

const RenderIcon = ({ icon, className }: RenderIconProps) => {
  const icons: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    "claim-rewards": ClaimRewardIcon,
    dashboard: DashboardIcon,
    "log-out": LogOutIcon,
    "lucky-draw": LuckyDrawIcon,
    "my-profile": MyProfileIcon,
    perks: PerksIcon,
    support: SupportIcon,
    referral: ReferralIcon,
    commission: ComissionIcon,
  };

  const IconComponent = icons[icon];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent className={className} />;
};

export default RenderIcon;
