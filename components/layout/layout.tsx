import React, { PropsWithChildren } from "react";
import ContentLayout from "./content";
import DesktopSidebarLayout from "./desktop-sidebar";

const Layout = async ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-row w-full h-full">
      <DesktopSidebarLayout />
      <ContentLayout>{children}</ContentLayout>
    </div>
  );
};

export default Layout;
