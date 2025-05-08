import type { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "Claim Rewards | DeFi Lottery Solutions",
  description:
    "Claim your earned lottery rewards, jackpots, and bonuses instantly. Our secure blockchain-based reward system ensures transparent and immediate payouts for all your DeFi Lottery winnings.",
  keywords: [
    "Claim rewards",
    "Lottery winnings",
    "Prize withdrawal",
    "Crypto rewards claim",
    "DeFi lottery payouts",
    "Instant withdrawals",
    "Blockchain rewards",
    "Lottery prize collection",
    "Claim jackpot",
    "Reward redemption",
    "Winning payout",
    "Token rewards",
    "Crypto lottery prizes",
    "Secure withdrawals",
    "Winner verification",
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
    title: "Claim Rewards | DeFi Lottery Solutions",
    description:
      "Claim your earned lottery rewards, jackpots, and bonuses instantly. Our secure blockchain-based reward system ensures transparent and immediate payouts for all your DeFi Lottery winnings.",
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
    title: "Claim Rewards | DeFi Lottery Solutions",
    description:
      "Claim your earned lottery rewards, jackpots, and bonuses instantly. Our secure blockchain-based reward system ensures transparent and immediate payouts for all your DeFi Lottery winnings.",
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
