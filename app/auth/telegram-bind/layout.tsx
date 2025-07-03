import type { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "Bind Telegram Account | DeFi Lottery Solutions",
  description:
    "Connect your Telegram account to DeFi Lottery for seamless notifications and enhanced user experience. Stay updated on draws, results, and important announcements directly through your Telegram messenger.",
  keywords: [
    "Telegram integration",
    "Bind Telegram account",
    "DeFi notifications",
    "Crypto notifications",
    "Telegram alerts",
    "Blockchain notifications",
    "Connect Telegram",
    "DeFi messaging",
    "Lottery notifications",
    "Instant alerts",
    "Crypto messaging",
    "Telegram bot connection",
    "Account linking",
    "Notification preferences",
    "Web3 messaging",
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
    title: "Bind Telegram Account | DeFi Lottery Solutions",
    description:
      "Connect your Telegram account to DeFi Lottery for seamless notifications and enhanced user experience. Stay updated on draws, results, and important announcements directly through your Telegram messenger.",
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
    title: "Bind Telegram Account | DeFi Lottery Solutions",
    description:
      "Connect your Telegram account to DeFi Lottery for seamless notifications and enhanced user experience. Stay updated on draws, results, and important announcements directly through your Telegram messenger.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/bind-telegram`,
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
