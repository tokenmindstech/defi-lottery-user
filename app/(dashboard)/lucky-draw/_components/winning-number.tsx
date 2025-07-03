import React from "react";

interface WinningNumberProps {
  item: string;
}

const WinningNumber = ({ item }: WinningNumberProps) => {
  return (
    <div className="flex items-center justify-center p-[2px] bg-gradient-to-b from-linviolet-start to-linblue-2 rounded-lg">
      <div className="flex items-center justify-center size-12 rounded-lg bg-bgtext-900 ">
        <span className="text-bgtext-100 text-xl font-bold">{item}</span>
      </div>
    </div>
  );
};

export default WinningNumber;
