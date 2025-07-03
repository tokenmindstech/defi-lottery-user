import type { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "Notifications | DeFi Lottery Solutions",
  description:
    "Stay updated with real-time notifications about your lottery tickets, draw results, and prize winnings. Never miss important updates about your participation in our transparent blockchain-based lottery system.",
  keywords: [
    "Lottery notifications",
    "Draw alerts",
    "Prize notifications",
    "Ticket updates",
    "Lottery results alerts",
    "DeFi lottery updates",
    "Blockchain lottery notifications",
    "Win alerts",
    "Result notifications",
    "Crypto prize alerts",
    "Lottery account notifications",
    "Draw reminders",
    "Decentralized lottery updates",
    "Real-time lottery alerts",
    "Ticket status notifications",
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
    title: "Notifications | DeFi Lottery Solutions",
    description:
      "Stay updated with real-time notifications about your lottery tickets, draw results, and prize winnings. Never miss important updates about your participation in our transparent blockchain-based lottery system.",
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
    title: "Notifications | DeFi Lottery Solutions",
    description:
      "Stay updated with real-time notifications about your lottery tickets, draw results, and prize winnings. Never miss important updates about your participation in our transparent blockchain-based lottery system.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Fragment>{children}</Fragment>;
}
