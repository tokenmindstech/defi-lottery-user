import React from "react";
import Layout from "@/components/layout/layout";
import SocketProvider from "@/provider/socket";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | DeFi Lottery Solutions",
  description:
    "Crypto-native membership platform with daily and Sunday prize draws, secure Telegram authentication, and transparent on-chain lottery mechanics powered by Chainlink VRF.",
  keywords: [
    "DeFi lottery",
    "crypto lottery",
    "blockchain gambling",
    "crypto membership platform",
    "Chainlink VRF lottery",
    "provably fair lottery",
    "crypto prize draws",
    "DeFi gambling platform",
    "Telegram authentication",
    "blockchain casino",
    "on-chain lottery",
    "cryptocurrency gambling",
    "transparent lottery mechanics",
    "daily crypto draws",
    "decentralized lottery",
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
    title: "Dashboard | DeFi Lottery Solutions",
    description:
      "Crypto-native membership platform with daily and Sunday prize draws, secure Telegram authentication, and transparent on-chain lottery mechanics powered by Chainlink VRF.",
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
    title: "Dashboard | DeFi Lottery Solutions",
    description:
      "Crypto-native membership platform with daily and Sunday prize draws, secure Telegram authentication, and transparent on-chain lottery mechanics powered by Chainlink VRF.",
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <SocketProvider>{children}</SocketProvider>
    </Layout>
  );
}
