import type { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "No Access | DeFi Lottery Solutions",
  description:
    "You do not have sufficient permissions to access this area. Please contact your administrator or return to the homepage to continue using other features of our blockchain-based lottery platform.",
  keywords: [
    "Access restricted",
    "No permission",
    "DeFi lottery access",
    "Restricted area",
    "Permission denied",
    "Authorization required",
    "Login required",
    "Secure area",
    "Account access",
    "Role-based access",
    "Permission management",
    "Blockchain access control",
    "User privileges",
    "Access levels",
    "Security restrictions",
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
    title: "No Access | DeFi Lottery Solutions",
    description:
      "You do not have sufficient permissions to access this area. Please contact your administrator or return to the homepage to continue using other features of our blockchain-based lottery platform.",
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
    title: "No Access | DeFi Lottery Solutions",
    description:
      "You do not have sufficient permissions to access this area. Please contact your administrator or return to the homepage to continue using other features of our blockchain-based lottery platform.",
    url: process.env.NEXT_PUBLIC_APP_URL,
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
