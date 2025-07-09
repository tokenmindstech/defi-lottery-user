import type { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "Lucky Draw | DeFi Lottery Solutions",
  description:
    "Participate in exciting lucky draw events for DeFi Lottery users. Win exclusive prizes, bonus tokens, special rewards, and cryptocurrency prizes through our lucky draw system.",
  keywords: [
    "Lucky draw",
    "DeFi lucky draw",
    "Crypto lucky draw",
    "Lucky draw prizes",
    "Random draws",
    "Prize draws",
    "Lucky numbers",
    "Draw events",
    "Special draws",
    "Lucky draw rewards",
    "Prize pool",
    "Draw winners",
    "Lucky participants",
    "Draw system",
    "Lucky draw bonus",
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
    title: "Lucky Draw | DeFi Lottery Solutions",
    description:
      "Participate in exciting lucky draw events for DeFi Lottery users. Win exclusive prizes, bonus tokens, special rewards, and cryptocurrency prizes through our lucky draw system.",
    creator: "@tokenminds_co",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/assets/images/536-White.png`,
        width: 1200,
        height: 630,
        alt: "DeFi Lottery Lucky Draw",
      },
    ],
  },
  openGraph: {
    title: "Lucky Draw | DeFi Lottery Solutions",
    description:
      "Participate in exciting lucky draw events for DeFi Lottery users. Win exclusive prizes, bonus tokens, special rewards, and cryptocurrency prizes through our lucky draw system.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/lucky-draw`,
    siteName: "DeFi Lottery Solutions",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/assets/images/536-White.png`,
        width: 1200,
        height: 630,
        alt: "DeFi Lottery Lucky Draw",
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
