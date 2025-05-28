"use client";

import React, { useEffect, useState } from "react";

const CountDownDraw = () => {
  // Use our custom hook with internally calculated target date
  const { timeLeft, isLoading } = useCountdown();

  // Don't render anything while loading to prevent flash
  if (isLoading) {
    return null;
  }

  // Split each time unit into individual digits
  const [daysFirstDigit, daysSecondDigit] = getDigits(timeLeft.days % 100); // Limit to 2 digits
  const [hoursFirstDigit, hoursSecondDigit] = getDigits(timeLeft.hours);
  const [minutesFirstDigit, minutesSecondDigit] = getDigits(timeLeft.minutes);
  const [secondsFirstDigit, secondsSecondDigit] = getDigits(timeLeft.seconds);

  if (daysFirstDigit === 0 && daysSecondDigit === 0) {
    return (
      <div className="flex items-center justify-center gap-1">
        <RenderCountDown
          firstDigit={hoursFirstDigit}
          secondDigit={hoursSecondDigit}
          label="Hours"
        />

        {/* Separator */}
        <div className="text-white text-3xl font-bold mx-1">:</div>

        <RenderCountDown
          firstDigit={minutesFirstDigit}
          secondDigit={minutesSecondDigit}
          label="Minutes"
        />

        {/* Separator */}
        <div className="text-white text-3xl font-bold mx-1">:</div>

        <RenderCountDown
          firstDigit={secondsFirstDigit}
          secondDigit={secondsSecondDigit}
          label="Seconds"
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-1">
      <RenderCountDown
        firstDigit={daysFirstDigit}
        secondDigit={daysSecondDigit}
        label="Days"
      />

      {/* Separator */}
      <div className="text-white text-3xl font-bold mx-1">:</div>

      <RenderCountDown
        firstDigit={hoursFirstDigit}
        secondDigit={hoursSecondDigit}
        label="Hours"
      />

      {/* Separator */}
      <div className="text-white text-3xl font-bold mx-1">:</div>

      <RenderCountDown
        firstDigit={minutesFirstDigit}
        secondDigit={minutesSecondDigit}
        label="Minutes"
      />
    </div>
  );
};

// Custom hook to handle countdown logic with internal target date calculation
const useCountdown = () => {
  // Calculate the next draw date
  const calculateNextDrawDate = () => {
    const now = new Date();
    const nextDrawDate = new Date();
    nextDrawDate.setHours(22, 0, 0, 0); // Set to 22:00
    if (nextDrawDate <= now) {
      nextDrawDate.setDate(nextDrawDate.getDate() + 1); // Move to tomorrow if today's 00:10 has passed
    }
    return nextDrawDate.getTime();
  };

  const [targetTime, setTargetTime] = useState(calculateNextDrawDate());
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to calculate remaining time
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      // If countdown is finished, recalculate the next target time
      if (difference <= 0) {
        const newTargetTime = calculateNextDrawDate();
        setTargetTime(newTargetTime);
        return; // Skip this update cycle
      }

      // Calculate time units
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (isLoading) {
        setIsLoading(false);
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Set up interval to update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Clean up interval on unmount
    return () => clearInterval(timer);
  }, [targetTime, isLoading]);

  return { timeLeft, isLoading };
};

// Helper function to split a number into digits
const getDigits = (number: number): [number, number] => {
  // Ensure two digits by padding with leading zero if needed
  const paddedNumber = number.toString().padStart(2, "0");
  return [Number.parseInt(paddedNumber[0]), Number.parseInt(paddedNumber[1])];
};

interface RenderCountDownProps {
  firstDigit: number;
  secondDigit: number;
  label: string;
}

const RenderCountDown = ({
  firstDigit,
  secondDigit,
  label,
}: RenderCountDownProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-1">
        <div className="p-2 bg-gradient-to-b from-linblack-start via-bgtext-700 to-linblack-end rounded-lg flex items-center justify-center border border-bgtext-800">
          <span className="text-bgtext-100 text-3xl font-bold">
            {firstDigit}
          </span>
        </div>
        <div className="p-2 bg-gradient-to-b from-linblack-start via-bgtext-700 to-linblack-end rounded-lg flex items-center justify-center border border-bgtext-800">
          <span className="text-bgtext-100 text-3xl font-bold">
            {secondDigit}
          </span>
        </div>
      </div>
      <p className="text-bgtext-500 text-xs mt-1">{label}</p>
    </div>
  );
};

export default CountDownDraw;
