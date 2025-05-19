import type { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "Rewards | DeFi Lottery Solutions",
  description:
    "Discover exclusive rewards for DeFi Lottery users. Earn token rewards, special bonuses, referral benefits, and loyalty points to enhance your crypto lottery experience.",
  keywords: [
    "DeFi rewards",
    "Crypto rewards",
    "Lottery rewards",
    "Token benefits",
    "Referral program",
    "Loyalty rewards",
    "Staking benefits",
    "Player advantages",
    "DeFi lottery bonuses",
    "VIP membership",
    "Crypto cashback",
    "Play-to-earn",
    "Ticket discounts",
    "Holder benefits",
    "Exclusive rewards",
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
    title: "Rewards | DeFi Lottery Solutions",
    description:
      "Discover exclusive rewards for DeFi Lottery users. Earn token rewards, special bonuses, referral benefits, and loyalty points to enhance your crypto lottery experience.",
    creator: "@tokenminds_co",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/assets/icons/536.svg`,
        width: 1200,
        height: 630,
        alt: "DeFi Lottery Rewards",
      },
    ],
  },
  openGraph: {
    title: "Rewards | DeFi Lottery Solutions",
    description:
      "Discover exclusive rewards for DeFi Lottery users. Earn token rewards, special bonuses, referral benefits, and loyalty points to enhance your crypto lottery experience.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/rewards`,
    siteName: "DeFi Lottery Solutions",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/assets/icons/536.svg`,
        width: 1200,
        height: 630,
        alt: "DeFi Lottery Rewards",
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
