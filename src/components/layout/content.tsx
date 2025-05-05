import React, { PropsWithChildren } from "react";
import HeaderLayout from "./header";

const ContentLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full h-screen bg-black">
      <HeaderLayout />
      <div className="w-full h-full p-5 pt-0">{children}</div>
    </div>
  );
};

export default ContentLayout;
