import type { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "My Profile | DeFi Lottery Solutions",
  description:
    "Manage your DeFi Lottery profile, view your ticket history, track winnings, and customize your account settings. Access your personal lottery dashboard for a complete overview of your gaming activity.",
  keywords: [
    "Lottery profile",
    "Player account",
    "Ticket history",
    "Winning records",
    "User dashboard",
    "DeFi lottery stats",
    "Crypto wallet management",
    "Lottery preferences",
    "Account settings",
    "Play history",
    "Participant profile",
    "Wallet connection",
    "User verification",
    "Security settings",
    "Lottery notifications",
  ],
  creator: "TokenMinds",
  authors: {
    name: "DeFi Lottery Solutions",
    url: process.env.NEXT_PUBLIC_APP_URL,
  },
  publisher: "DeFi Lottery Solutions",
  applicationName: "DeFi Lottery Solutions",
  twitter: {
    card: "summary_large_image",
    title: "My Profile | DeFi Lottery Solutions",
    description:
      "Manage your DeFi Lottery profile, view your ticket history, track winnings, and customize your account settings. Access your personal lottery dashboard for a complete overview of your gaming activity.",
    creator: "tokenminds_co",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/assets/icons/536.svg`,
        width: 1200,
        height: 630,
      },
    ],
  },
  openGraph: {
    title: "My Profile | DeFi Lottery Solutions",
    description:
      "Manage your DeFi Lottery profile, view your ticket history, track winnings, and customize your account settings. Access your personal lottery dashboard for a complete overview of your gaming activity.",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "DeFi Lottery Solutions",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/assets/icons/536.svg`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Fragment>{children}</Fragment>;
}
