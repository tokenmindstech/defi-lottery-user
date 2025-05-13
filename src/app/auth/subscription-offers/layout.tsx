import type { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "Subscription Plans | DeFi Lottery Solutions",
  description:
    "Choose the right subscription plan for your DeFi Lottery experience. Select from our premium features or explore the platform before committing to unlock the full potential of blockchain lottery solutions.",
  keywords: [
    "DeFi lottery subscription",
    "Blockchain lottery plans",
    "Crypto lottery pricing",
    "DeFi subscription plans",
    "Crypto gaming packages",
    "Blockchain lottery membership",
    "DeFi platform access",
    "Web3 lottery subscription",
    "Crypto lottery features",
    "Premium lottery plans",
    "Free trial lottery",
    "Explore DeFi lottery",
    "Lottery subscription tiers",
    "DeFi membership benefits",
    "Crypto gaming subscription",
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
    title: "Choose Your Subscription Plan | DeFi Lottery Solutions",
    description:
      "Select the perfect subscription plan for your DeFi Lottery journey. Explore our platform or unlock premium features with a subscription that fits your needs.",
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
    title: "Choose Your Subscription Plan | DeFi Lottery Solutions",
    description:
      "Select the perfect subscription plan for your DeFi Lottery journey. Explore our platform or unlock premium features with a subscription that fits your needs.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/subscription-offers`,
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Fragment>{children}</Fragment>;
}
