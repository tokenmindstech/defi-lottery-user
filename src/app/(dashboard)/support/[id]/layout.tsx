import { authConfig } from "@/config/auth";
import { fetchProxy } from "@/lib/utils";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata(props: any): Promise<Metadata> {
  try {
    // read route params
    const { id } = await props.params;
    const session = await getServerSession(authConfig);

    // fetch data
    const supportTicket = await fetchProxy({
      url: `support-ticket/${id}`,
      method: "GET",
      customHeaders: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    });

    if (supportTicket.statusCode === 404) {
      return {
        title: "Support Ticket Not Found | DeFi Lottery Solutions",
        description: "Support ticket not found in DeFi Lottery Solutions",
        keywords: ["Support ticket", "Not found", "DeFi Lottery Solutions"],
      };
    } else if (supportTicket.statusCode !== 200) {
      return {
        title: "Error | DeFi Lottery Solutions",
        description: "Error loading support ticket details",
        keywords: ["Support ticket", "Error", "DeFi Lottery Solutions"],
      };
    } else if (supportTicket.statusCode === 200 && supportTicket.data) {
      return {
        title: `${supportTicket.data.subject} | DeFi Lottery Solutions Support`,
        description:
          supportTicket.data.description ||
          "View support ticket details in DeFi Lottery Solutions",
        keywords: [
          "DeFi lottery support",
          "Support ticket",
          "Customer service",
          "Ticket details",
          "Help request",
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
          title: `${supportTicket.data.subject} | DeFi Lottery Solutions Support`,
          description:
            supportTicket.data.description ||
            "View support ticket details in DeFi Lottery Solutions",
          creator: "tokenminds_co",
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_APP_URL}/assets/images/536-White.png`,
              width: 1200,
              height: 630,
              alt: "DeFi Lottery Solutions",
            },
          ],
        },
        openGraph: {
          title: `${supportTicket.data.subject} | DeFi Lottery Solutions Support`,
          description:
            supportTicket.data.description ||
            "View support ticket details in DeFi Lottery Solutions",
          url: process.env.NEXT_PUBLIC_APP_URL,
          type: "website",
          locale: "en_US",
          siteName: "DeFi Lottery Solutions",
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_APP_URL}/assets/images/536-White.png`,
              width: 1200,
              height: 630,
              alt: "DeFi Lottery Solutions",
            },
          ],
        },
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  // Default return in case of an error or no conditions are met
  return {
    title: "Support Ticket | DeFi Lottery Solutions",
    description: "View support ticket details in DeFi Lottery Solutions",
    keywords: [
      "DeFi lottery support",
      "Support ticket",
      "Customer service",
      "Crypto lottery help",
      "Account assistance",
      "Technical support",
      "Help request",
    ],
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex flex-col w-full h-full">{children}</div>;
}
