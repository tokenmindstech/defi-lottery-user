import React, { PropsWithChildren } from "react";
import HeaderLayout from "./header";

const ContentLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full h-screen bg-black">
      <HeaderLayout />
      <div className="w-full h-full">
        <div className="absolute h-[90vh] w-full lg:w-[calc(100%-290px)] border-t border-b-bgtext-700 mask-l-from-20% mask-r-from-20%" />
        <div className="flex flex-col w-full h-full overflow-y-auto p-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ContentLayout;
