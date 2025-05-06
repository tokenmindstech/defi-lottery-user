interface MenuItems {
  icon: string;
  title: string;
  href: string;
}

export const MENU_ITEMS: MenuItems[] = [
  {
    icon: "dashboard",
    title: "Dashboard",
    href: "/",
  },
  {
    icon: "lucky-draw",
    title: "Lucky Draw",
    href: "/lucky-draw",
  },
  {
    icon: "perks",
    title: "Perks",
    href: "/perks",
  },
  {
    icon: "claim-rewards",
    title: "Claim Rewards",
    href: "/claim-rewards",
  },
  {
    icon: "my-profile",
    title: "My Profile",
    href: "/profile",
  },
  {
    icon: "support",
    title: "Support",
    href: "/support",
  },
];
