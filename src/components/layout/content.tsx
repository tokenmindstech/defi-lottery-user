import React, { PropsWithChildren } from "react";

const ContentLayout = ({ children }: PropsWithChildren) => {
  return <div className="w-full h-screen bg-green-200 p-5">{children}</div>;
};

export default ContentLayout;
