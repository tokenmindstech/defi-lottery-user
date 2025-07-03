import type { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "Setup Two-Factor Authentication | DeFi Lottery Solutions",
  description:
    "Enhance your account security with two-factor authentication. Set up 2FA to add an extra layer of protection to your DeFi Lottery account, ensuring your crypto assets and personal information remain secure.",
  keywords: [
    "Two-factor authentication",
    "2FA setup",
    "Account security",
    "DeFi security",
    "Crypto account protection",
    "Blockchain security",
    "Authentication methods",
    "Secure login",
    "Security verification",
    "TOTP setup",
    "Authentication app",
    "Enhanced security",
    "Crypto protection",
    "Identity verification",
    "Web3 security",
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
    title: "Setup Two-Factor Authentication | DeFi Lottery Solutions",
    description:
      "Enhance your account security with two-factor authentication. Set up 2FA to add an extra layer of protection to your DeFi Lottery account, ensuring your crypto assets and personal information remain secure.",
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
    title: "Setup Two-Factor Authentication | DeFi Lottery Solutions",
    description:
      "Enhance your account security with two-factor authentication. Set up 2FA to add an extra layer of protection to your DeFi Lottery account, ensuring your crypto assets and personal information remain secure.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/setup-2fa`,
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
