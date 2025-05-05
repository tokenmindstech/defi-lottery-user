import React, { PropsWithChildren } from "react";
import SidebarLayout from "./sidebar";
import ContentLayout from "./content";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-row w-full h-full">
      <SidebarLayout />
      <ContentLayout>{children}</ContentLayout>
    </div>
  );
};

export default Layout;
