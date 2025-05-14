export type ProfileMenuType = "general" | "membership" | "payment" | "account";

interface MenuItems {
  icon: string;
  title: string;
  href: string;
}

interface ProfileMenuItems {
  value: ProfileMenuType;
  label: string;
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

export const NOTIFICATION_MENU_ITEMS = [
  {
    value: "all",
    label: "All",
    count: "",
  },
  {
    value: "unread",
    label: "Unread",
    count: "2",
  },
  {
    value: "read",
    label: "Read",
    count: "",
  },
];

export const REQUIRED_2FA_SETUP = "required_2fa_setup";
export const REQUIRED_AUTHENTICATION = "required_authentication";
export const AUTH_ERROR = "auth_error";
export const AUTH_LOGIN_2FA = "2fa";

export const PROFILE_MENU_ITEMS: ProfileMenuItems[] = [
  {
    value: "general",
    label: "General Settings",
  },
  {
    value: "membership",
    label: "Membership",
  },
  {
    value: "payment",
    label: "Payment Details",
  },
  {
    value: "account",
    label: "Account Settings",
  },
];
