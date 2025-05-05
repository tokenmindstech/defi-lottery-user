import React, { PropsWithChildren } from "react";

const ContentLayout = ({ children }: PropsWithChildren) => {
  return <div className="w-full h-screen bg-bgtext-500 p-5">{children}</div>;
};

export default ContentLayout;
