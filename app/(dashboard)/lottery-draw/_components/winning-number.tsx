import RotatingText from "@/components/ui/rotating-text";
import React from "react";

interface WinningNumberProps {
  items: string[];
  interval?: number;
}

const WinningNumber = ({ items, interval }: WinningNumberProps) => {
  return (
    <div className="flex items-center justify-center p-[2px] bg-gradient-to-b from-linviolet-start to-linblue-2 rounded-lg">
      <div className="flex items-center justify-center rounded-lg size-12 bg-bgtext-900 ">
        {/* <span className="text-xl font-bold text-bgtext-100">{item}</span> */}
        <RotatingText
          texts={items}
          mainClassName="text-bgtext-100 text-xl font-inter font-bold"
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 400,
          }}
          rotationInterval={interval || 6000}
        />
      </div>
    </div>
  );
};

export default WinningNumber;
