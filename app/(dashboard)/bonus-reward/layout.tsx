import type { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "Bonus Reward | DeFi Lottery Solutions",
  description:
    "Discover exclusive bonus rewards for DeFi Lottery users. Earn special token bonuses, promotional rewards, referral benefits, and loyalty points to enhance your crypto lottery experience.",
  keywords: [
    "DeFi bonus rewards",
    "Crypto bonus",
    "Lottery bonus",
    "Token bonuses",
    "Promotional rewards",
    "Special bonuses",
    "Bonus benefits",
    "Player bonuses",
    "DeFi lottery bonus",
    "VIP bonuses",
    "Crypto bonus rewards",
    "Bonus program",
    "Extra rewards",
    "Bonus points",
    "Exclusive bonuses",
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
    title: "Bonus Reward | DeFi Lottery Solutions",
    description:
      "Discover exclusive bonus rewards for DeFi Lottery users. Earn special token bonuses, promotional rewards, referral benefits, and loyalty points to enhance your crypto lottery experience.",
    creator: "@tokenminds_co",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/assets/images/536-White.png`,
        width: 1200,
        height: 630,
        alt: "DeFi Lottery Bonus Reward",
      },
    ],
  },
  openGraph: {
    title: "Bonus Reward | DeFi Lottery Solutions",
    description:
      "Discover exclusive bonus rewards for DeFi Lottery users. Earn special token bonuses, promotional rewards, referral benefits, and loyalty points to enhance your crypto lottery experience.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/bonus-reward`,
    siteName: "DeFi Lottery Solutions",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/assets/images/536-White.png`,
        width: 1200,
        height: 630,
        alt: "DeFi Lottery Bonus Reward",
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
