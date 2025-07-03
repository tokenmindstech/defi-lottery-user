import type { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "Reward Details | DeFi Lottery Solutions",
  description:
    "Explore detailed information about this exclusive DeFi Lottery reward. Learn how to unlock special benefits, bonuses, and rewards to maximize your crypto lottery experience.",
  keywords: [
    "DeFi reward details",
    "Crypto reward information",
    "Lottery reward specifics",
    "Token benefit details",
    "Referral program specifics",
    "Loyalty reward tiers",
    "Staking benefit information",
    "Player advantage details",
    "DeFi lottery bonus specifics",
    "VIP membership rewards",
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
    title: "Reward Details | DeFi Lottery Solutions",
    description:
      "Explore detailed information about this exclusive DeFi Lottery reward. Learn how to unlock special benefits, bonuses, and rewards to maximize your crypto lottery experience.",
    creator: "@tokenminds_co",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/assets/images/536-White.png`,
        width: 1200,
        height: 630,
        alt: "DeFi Lottery Reward Details",
      },
    ],
  },
  openGraph: {
    title: "Reward Details | DeFi Lottery Solutions",
    description:
      "Explore detailed information about this exclusive DeFi Lottery reward. Learn how to unlock special benefits, bonuses, and rewards to maximize your crypto lottery experience.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/rewards`,
    siteName: "DeFi Lottery Solutions",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/assets/images/536-White.png`,
        width: 1200,
        height: 630,
        alt: "DeFi Lottery Reward Details",
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
