"use client";

import React, { useState } from "react";

const CountDownDraw = () => {
  const [timeLeft] = useState({
    days: 3,
    hours: 26,
    minutes: 58,
    seconds: 0,
  });
  return (
    <div className="flex items-center justify-center gap-1">
      {/* Days */}
      <div className="flex flex-col items-center">
        <div className="flex gap-1">
          <div className="w-14 h-16 bg-gradient-to-b from-linblack-start via-bgtext-700 to-linblack-end rounded-lg flex items-center justify-center border border-bgtext-800">
            <span className="text-bgtext-100 text-3xl font-bold">0</span>
          </div>
          <div className="w-14 h-16 bg-gradient-to-b from-linblack-start via-bgtext-700 to-linblack-end rounded-lg flex items-center justify-center border border-bgtext-800">
            <span className="text-bgtext-100 text-3xl font-bold">
              {timeLeft.days}
            </span>
          </div>
        </div>
        <p className="text-bgtext-500 text-xs mt-1">Days</p>
      </div>

      {/* Separator */}
      <div className="text-white text-3xl font-bold mx-1">:</div>

      {/* Hours */}
      <div className="flex flex-col items-center">
        <div className="flex gap-1">
          <div className="w-14 h-16 bg-gradient-to-b from-linblack-start via-bgtext-700 to-linblack-end rounded-lg flex items-center justify-center border border-bgtext-800">
            <span className="text-white text-3xl font-bold">2</span>
          </div>
          <div className="w-14 h-16 bg-gradient-to-b from-linblack-start via-bgtext-700 to-linblack-end rounded-lg flex items-center justify-center border border-bgtext-800">
            <span className="text-white text-3xl font-bold">6</span>
          </div>
        </div>
        <p className="text-bgtext-500 text-xs mt-1">Hours</p>
      </div>

      {/* Separator */}
      <div className="text-white text-3xl font-bold mx-1">:</div>

      {/* Minutes */}
      <div className="flex flex-col items-center">
        <div className="flex gap-1">
          <div className="w-14 h-16 bg-gradient-to-b from-linblack-start via-bgtext-700 to-linblack-end rounded-lg flex items-center justify-center border border-bgtext-800">
            <span className="text-white text-3xl font-bold">5</span>
          </div>
          <div className="w-14 h-16 bg-gradient-to-b from-linblack-start via-bgtext-700 to-linblack-end rounded-lg flex items-center justify-center border border-bgtext-800">
            <span className="text-white text-3xl font-bold">8</span>
          </div>
        </div>
        <p className="text-bgtext-500 text-xs mt-1">Minutes</p>
      </div>
    </div>
  );
};

export default CountDownDraw;
