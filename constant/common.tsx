export type ProfileMenuType =
  | "general"
  | "subscription"
  | "payment"
  | "account";

interface MenuItems {
  icon: string;
  title: string;
  href: string;
}

interface SubMenu {
  title: string;
  href: string;
}

interface MenuItemWithSubMenu extends MenuItems {
  subMenu?: SubMenu[];
}

interface ProfileMenuItems {
  value: ProfileMenuType;
  label: string;
}

interface TicketIssue {
  value: TicketIssueType;
  label: string;
}

interface SubscriptionItems {
  value: SubscriptionType;
  label: string;
  information: string;
  tickets: number;
  price: number;
}

export const REQUIRED_2FA_SETUP = "required_2fa_setup";
export const REQUIRED_AUTHENTICATION = "required_authentication";
export const REQUIRED_BIND_TELEGRAM = "required_bind_telegram";
export const AUTH_ERROR = "auth_error";
export const AUTH_ERROR_TELEGRAM_ALREADY_BOUND = "telegram_already_bound";
export const AUTH_LOGIN_2FA = "2fa";

export const MENU_ITEMS: MenuItemWithSubMenu[] = [
  {
    icon: "dashboard",
    title: "Dashboard",
    href: "/",
  },
  {
    icon: "referral",
    title: "My Referrals",
    href: "/referrals",
  },
  {
    icon: "commission",
    title: "Commissions",
    href: "/commissions",
  },
  {
    icon: "lottery-draw",
    title: "Lottery Draw",
    href: "/lottery-draw",
  },
  {
    icon: "lucky-draw",
    title: "Lucky Draw",
    href: "/lucky",
    subMenu: [
      {
        title: "Draw",
        href: "/lucky-draw",
      },
      {
        title: "Bonus Reward",
        href: "/bonus-reward",
      },
    ],
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
  },
  {
    value: "unread",
    label: "Unread",
  },
  {
    value: "read",
    label: "Read",
  },
];

export const PROFILE_MENU_ITEMS: ProfileMenuItems[] = [
  {
    value: "general",
    label: "General Settings",
  },
  {
    value: "subscription",
    label: "Subscription",
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

export const TICKET_ISSUE_ITEMS: TicketIssue[] = [
  {
    value: "ACCOUNT",
    label: "Account",
  },
  {
    value: "BILLING",
    label: "Billing",
  },
  {
    value: "TECHNICAL",
    label: "Technical Support",
  },
  {
    value: "OTHER",
    label: "General Inquiry",
  },
];

export const PAGINATION_ITEMS: number[] = [10, 20, 50, 100];

export const SUBSCRIPTION_ITEMS: SubscriptionItems[] = [
  {
    value: "BASIC",
    label: "Basic ($30/month)",
    information: "Access to essential features with limited benefits.",
    tickets: 30,
    price: 30,
  },
  {
    value: "PREMIUM",
    label: "Premium ($300/month)",
    information:
      "Full access to all features, bigger prize pools, and premium support.",
    tickets: 30,
    price: 300,
  },
  {
    value: "EXPLORE",
    label: "I'm only exploring",
    information: "Browse our platform with limited functionality.",
    tickets: 0,
    price: 0,
  },
];

export const CURRENCY_FRACTION = {
  MINIMUM: 0,
  MAXIMUM: 2,
};
