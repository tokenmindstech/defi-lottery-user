import type { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "2FA Challenge | DeFi Lottery Solutions",
  description:
    "Complete the two-factor authentication verification to access your account. This security measure ensures that your DeFi Lottery account and crypto assets remain protected from unauthorized access.",
  keywords: [
    "Two-factor authentication",
    "2FA verification",
    "Account security",
    "DeFi security",
    "Crypto account protection",
    "Blockchain security",
    "Authentication methods",
    "Secure login",
    "Security verification",
    "TOTP verification",
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
    title: "Two-Factor Authentication Challenge | DeFi Lottery Solutions",
    description:
      "Complete the two-factor authentication verification to access your account. This security measure ensures that your DeFi Lottery account and crypto assets remain protected from unauthorized access.",
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
    title: "Two-Factor Authentication Challenge | DeFi Lottery Solutions",
    description:
      "Complete the two-factor authentication verification to access your account. This security measure ensures that your DeFi Lottery account and crypto assets remain protected from unauthorized access.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/2fa-challenge`,
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
