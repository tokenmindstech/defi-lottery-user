import type { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "Referrals | DeFi Lottery Solutions",
  description:
    "Earn rewards by inviting friends to our blockchain-based lottery platform. Our referral program lets you share the excitement while building passive income through our transparent and fair reward system.",
  keywords: [
    "Lottery referrals",
    "Refer and earn",
    "DeFi lottery rewards",
    "Crypto referral program",
    "Blockchain lottery affiliates",
    "Lottery commission",
    "Referral bonuses",
    "Crypto lottery partners",
    "DeFi referral rewards",
    "Lottery affiliate program",
    "Passive income referrals",
    "Blockchain reward system",
    "Share and earn crypto",
    "Friend referral rewards",
    "Decentralized lottery referrals",
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
    title: "Referrals | DeFi Lottery Solutions",
    description:
      "Earn rewards by inviting friends to our blockchain-based lottery platform. Our referral program lets you share the excitement while building passive income through our transparent and fair reward system.",
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
    title: "Referrals | DeFi Lottery Solutions",
    description:
      "Earn rewards by inviting friends to our blockchain-based lottery platform. Our referral program lets you share the excitement while building passive income through our transparent and fair reward system.",
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
