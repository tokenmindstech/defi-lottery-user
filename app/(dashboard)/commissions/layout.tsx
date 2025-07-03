import type { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "Commissions | DeFi Lottery Solutions",
  description:
    "Track your earnings and commission payouts from our referral program. Our transparent blockchain-based commission structure rewards you for growing the DeFi Lottery community with competitive rates and real-time statistics.",
  keywords: [
    "Lottery commissions",
    "Referral earnings",
    "DeFi lottery income",
    "Crypto commission system",
    "Blockchain lottery rewards",
    "Referral payouts",
    "Commission structure",
    "Crypto lottery earnings",
    "DeFi commission tracking",
    "Lottery affiliate earnings",
    "Passive income commissions",
    "Blockchain reward payouts",
    "Referral performance stats",
    "Commission withdrawal",
    "Decentralized lottery earnings",
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
    title: "Commissions | DeFi Lottery Solutions",
    description:
      "Track your earnings and commission payouts from our referral program. Our transparent blockchain-based commission structure rewards you for growing the DeFi Lottery community with competitive rates and real-time statistics.",
    creator: "tokenminds_co",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/assets/images/536-White.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
  openGraph: {
    title: "Commissions | DeFi Lottery Solutions",
    description:
      "Track your earnings and commission payouts from our referral program. Our transparent blockchain-based commission structure rewards you for growing the DeFi Lottery community with competitive rates and real-time statistics.",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "DeFi Lottery Solutions",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/assets/images/536-White.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Fragment>{children}</Fragment>;
}
