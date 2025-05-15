import type { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "Perk Details | DeFi Lottery Solutions",
  description:
    "Explore detailed information about this exclusive DeFi Lottery perk. Learn how to unlock special benefits, bonuses, and rewards to maximize your crypto lottery experience.",
  keywords: [
    "DeFi reward details",
    "Crypto perk information",
    "Lottery reward specifics",
    "Token benefit details",
    "Referral program specifics",
    "Loyalty reward tiers",
    "Staking benefit information",
    "Player advantage details",
    "DeFi lottery bonus specifics",
    "VIP membership perks",
    "Crypto cashback details",
    "Play-to-earn mechanics",
    "Ticket discount information",
    "Holder benefit specifics",
    "Exclusive reward details",
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
    title: "Perk Details | DeFi Lottery Solutions",
    description:
      "Explore detailed information about this exclusive DeFi Lottery perk. Learn how to unlock special benefits, bonuses, and rewards to maximize your crypto lottery experience.",
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
    title: "Perk Details | DeFi Lottery Solutions",
    description:
      "Explore detailed information about this exclusive DeFi Lottery perk. Learn how to unlock special benefits, bonuses, and rewards to maximize your crypto lottery experience.",
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
