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
    const notification = (await fetchProxy({
      url: `notifications/${id}`,
      method: "GET",
      customHeaders: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    })) as APIGetNotificationDetailsResponseDTO;

    if (notification.statusCode === 404) {
      return {
        title: "Notification Not Found",
        description: "Notification Not Found",
        keywords: [""],
      };
    } else if (notification.statusCode !== 200) {
      return {
        title: "Error",
        description: "Error",
        keywords: [""],
      };
    } else if (notification.statusCode === 200 && notification.data) {
      return {
        title: `${notification.data.title} | DeFi Lottery Solutions`,
        description: notification.data.message,
        keywords: [
          "Lottery notifications",
          "Draw alerts",
          "Prize notifications",
          "Ticket updates",
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
          title: `${notification.data.title} | DeFi Lottery Solutions`,
          description: notification.data.message,
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
          title: `${notification.data.title} | DeFi Lottery Solutions`,
          description: notification.data.message,
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
    title: "Notification | DeFi Lottery Solutions",
    description: "View notification details in DeFi Lottery Solutions",
    keywords: [
      "Lottery notifications",
      "Draw alerts",
      "Prize notifications",
      "Ticket updates",
      "Lottery results alerts",
      "DeFi lottery updates",
      "Blockchain lottery notifications",
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
