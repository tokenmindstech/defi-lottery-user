import {
  Layout,
  Gift,
  PiggyBank,
  DiceFive,
  User,
  Headset,
} from "@phosphor-icons/react/dist/ssr";
import { Icon } from "@phosphor-icons/react";

interface MenuItems {
  icon: Icon;
  title: string;
  href: string;
}

export const MENU_ITEMS: MenuItems[] = [
  {
    icon: Layout,
    title: "Dashboard",
    href: "/",
  },
  {
    icon: DiceFive,
    title: "Lucky Draw",
    href: "/lucky-draw",
  },
  {
    icon: Gift,
    title: "Perks",
    href: "/perks",
  },
  {
    icon: PiggyBank,
    title: "Claim Rewards",
    href: "/claim-rewards",
  },
  {
    icon: User,
    title: "My Profile",
    href: "/profile",
  },
  {
    icon: Headset,
    title: "Support",
    href: "/support",
  },
];
