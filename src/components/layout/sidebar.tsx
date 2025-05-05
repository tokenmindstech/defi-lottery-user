import Image from "next/image";
import React from "react";

const SidebarLayout = () => {
  return (
    <div className="flex flex-col space-y-5 w-[250px] h-screen bg-bgtext-950 p-5">
      <div className="flex flex-row space-x-2 items-center justify-start">
        <Image
          width={50}
          height={50}
          src="/assets/images/536.png"
          alt="DeFi Lottery"
        />
        <p className="text-bgtext-100 text-2xl font-bold">Lottery</p>
      </div>
    </div>
  );
};

export default SidebarLayout;
