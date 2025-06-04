import type { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "Support & Help | DeFi Lottery Solutions",
  description:
    "Get assistance with your DeFi Lottery experience. Our dedicated support team is ready to help with account issues, lottery questions, technical problems, and more through our 24/7 customer service.",
  keywords: [
    "DeFi lottery support",
    "Customer service",
    "Crypto lottery help",
    "Account assistance",
    "Technical support",
    "Lottery FAQ",
    "Ticket issues",
    "Payment help",
    "Wallet connection support",
    "User guide",
    "Problem resolution",
    "Contact support",
    "Help center",
    "Troubleshooting",
    "Support ticket",
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
    title: "Support & Help | DeFi Lottery Solutions",
    description:
      "Get assistance with your DeFi Lottery experience. Our dedicated support team is ready to help with account issues, lottery questions, technical problems, and more through our 24/7 customer service.",
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
    title: "Support & Help | DeFi Lottery Solutions",
    description:
      "Get assistance with your DeFi Lottery experience. Our dedicated support team is ready to help with account issues, lottery questions, technical problems, and more through our 24/7 customer service.",
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
