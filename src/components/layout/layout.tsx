import React, { PropsWithChildren } from "react";
import ContentLayout from "./content";
import DesktopSidebarLayout from "./desktop-sidebar";
import { getServerSession } from "next-auth";
import { authConfig } from "@/config/auth";

const Layout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession(authConfig);
  const isAgent = session?.user?.roles?.includes("AGENT");

  console.log("session", session);
  return (
    <div className="flex flex-row w-full h-full">
      <DesktopSidebarLayout isAgent={isAgent} />
      <ContentLayout>{children}</ContentLayout>
    </div>
  );
};

export default Layout;
