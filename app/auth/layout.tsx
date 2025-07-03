import { authConfig } from "../../config/auth";
import type { Metadata } from "next";
import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "Account Login | DeFi Lottery Solutions",
  description:
    "Securely access your DeFi Lottery account to manage tickets, view prize history, and participate in transparent crypto draws. Our blockchain-based authentication ensures your information stays protected.",
  keywords: [
    "Lottery account",
    "Secure login",
    "DeFi authentication",
    "Crypto lottery account",
    "Blockchain security",
    "Lottery dashboard",
    "Ticket management",
    "Prize tracking",
    "Secure crypto platform",
    "User authentication",
    "Wallet connection",
    "Decentralized identity",
    "Web3 login",
    "Lottery profile",
    "Account security",
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
    title: "Account Login | DeFi Lottery Solutions",
    description:
      "Securely access your DeFi Lottery account to manage tickets, view prize history, and participate in transparent crypto draws. Our blockchain-based authentication ensures your information stays protected.",
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
    title: "Account Login | DeFi Lottery Solutions",
    description:
      "Securely access your DeFi Lottery account to manage tickets, view prize history, and participate in transparent crypto draws. Our blockchain-based authentication ensures your information stays protected.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/auth`,
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
  const session = (await getServerSession(authConfig)) as Session;

  if (session) {
    redirect("/");
  }
  return <Fragment>{children}</Fragment>;
}
