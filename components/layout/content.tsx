import React, { PropsWithChildren } from "react";
import HeaderLayout from "./header";

const ContentLayout = async ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full h-screen bg-black">
      <HeaderLayout />
      <div className="w-full h-[90vh] overflow-y-scroll no-scrollbar flex flex-col relative">
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export default ContentLayout;
