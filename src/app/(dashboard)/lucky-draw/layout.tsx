import type { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "Lucky Draw | DeFi Lottery Solutions",
  description:
    "Participate in our transparent crypto lottery draws with daily and Sunday prizes. Experience provably fair blockchain-based lottery mechanics powered by Chainlink VRF with real-time results.",
  keywords: [
    "Lucky draw",
    "Crypto prize draw",
    "Daily lottery",
    "DeFi lottery",
    "Blockchain lucky draw",
    "Crypto jackpot",
    "Random number generation",
    "Chainlink VRF lottery",
    "Provably fair draws",
    "Transparent prize selection",
    "Crypto gambling",
    "Blockchain prize draw",
    "Lucky numbers",
    "Lottery tickets",
    "Decentralized lucky draw",
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
      "Participate in our transparent crypto lottery draws with daily and Sunday prizes. Experience provably fair blockchain-based lottery mechanics powered by Chainlink VRF with real-time results.",
    creator: "tokenminds_co",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/assets/images/536.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
  openGraph: {
    title: "Lucky Draw | DeFi Lottery Solutions",
    description:
      "Participate in our transparent crypto lottery draws with daily and Sunday prizes. Experience provably fair blockchain-based lottery mechanics powered by Chainlink VRF with real-time results.",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "DeFi Lottery Solutions",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/assets/images/536.png`,
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
