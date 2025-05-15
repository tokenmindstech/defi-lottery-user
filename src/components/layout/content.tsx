import React, { PropsWithChildren } from "react";
import HeaderLayout from "./header";
import { getServerSession } from "next-auth";
import { authConfig } from "@/config/auth";

const ContentLayout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession(authConfig);
  const isAgent = session?.user?.roles?.includes("AGENT");
  return (
    <div className="w-full h-screen bg-black">
      <HeaderLayout isAgent={isAgent} />
      <div className="w-full h-[90vh] overflow-y-scroll no-scrollbar flex flex-col relative">
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export default ContentLayout;
