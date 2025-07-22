"use client";

import React, { Fragment, useEffect, useState } from "react";
import SkeletonLuckyDrawWInningNumber from "./skeleton-lucky-draw-winning";
import WinningNumber from "./winning-number";
import { useSocketContext } from "@/provider/socket";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import RotatingText from "@/components/ui/rotating-text";

// Configure dayjs to use plugins
dayjs.extend(utc);
dayjs.extend(timezone);

// const lastMessage: ListenGetTodaysRewardDrawResponseDTO = {
//   message: "getTodayRewardDraw",
//   data: [
//     {
//       id: "12345",
//       drawType: "DAILY",
//       drawNumbers: "1 2 3 4 5",
//       ticketType: "PREMIUM",
//       createdAt: new Date().toISOString(),
//     },
//     {
//       id: "54321",
//       drawType: "DAILY",
//       drawNumbers: "10 11 12 13 14",
//       ticketType: "BASIC",
//       createdAt: new Date().toISOString(),
//     },
//     {
//       id: "67890",
//       drawType: "WEEKLY",
//       drawNumbers: "6 7 8 9 10",
//       ticketType: "PREMIUM",
//       createdAt: new Date().toISOString(),
//     },
//     {
//       id: "09876",
//       drawType: "WEEKLY",
//       drawNumbers: "15 16 17 18 19",
//       ticketType: "BASIC",
//       createdAt: new Date().toISOString(),
//     },
//   ],
// };

interface RenderTodaysWinningNumbersProps {
  items: TodaysDraw[];
}

const DailyWinningNumber = () => {
  const [lastMessage, setLastMessage] = useState<
    ListenGetTodaysRewardDrawResponseDTO | undefined
  >(undefined);
  const { socket, connected } = useSocketContext();
  const [sended, setSended] = useState(false);

  useEffect(() => {
    if (connected && socket && !sended) {
      socket.emit("getTodayRewardDraw");
      setSended(true);
    }
    if (socket) {
      const handler = (msg: ListenGetTodaysRewardDrawResponseDTO) => {
        setLastMessage(msg);
      };
      socket.on("getTodayRewardDraw", handler);
      return () => {
        socket.off("getTodayRewardDraw", handler);
      };
    }
  }, [connected, socket, sended]);

  return (
    <Fragment>
      {lastMessage === undefined ? (
        <SkeletonLuckyDrawWInningNumber />
      ) : (
        <Fragment>
          <div className="grid w-full grid-cols-1 gap-5 place-items-center">
            <div className="flex flex-col items-center justify-center w-full space-y-3">
              <div className="flex flex-row items-center space-x-2 jucestify-center">
                <p className="text-xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
                  Today&apos;s 5/36 Winning Numbers
                </p>
                <RotatingText
                  texts={["(BASIC)", "(PREMIUM)"]}
                  mainClassName="text-bgtext-100 text-lg font-inter font-bold -translate-x-1 translate-y-0.5"
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
                  rotationInterval={6000}
                />
              </div>

              <div className="flex justify-center w-full">
                <div className="flex justify-center gap-2">
                  {lastMessage.data.length === 0 ? (
                    "? ? ? ? ?"
                      .split(" ")
                      .map((number, index) => (
                        <WinningNumber items={["?", "?"]} key={index} />
                      ))
                  ) : dayjs().tz("Asia/Singapore").get("day") !== 0 ? (
                    <RenderTodaysWinningNumbers
                      items={lastMessage.data.filter(
                        (item) => item.drawType === "DAILY"
                      )}
                    />
                  ) : (
                    <RenderTodaysWinningNumbers
                      items={lastMessage.data.filter(
                        (item) => item.drawType === "WEEKLY"
                      )}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const RenderTodaysWinningNumbers = ({
  items,
}: RenderTodaysWinningNumbersProps) => {
  const intervals = [6100, 6200, 6300, 6400, 6500];
  return (
    <Fragment>
      {items[0].drawNumbers.split(" ").map((number, index) => (
        <WinningNumber
          items={[
            items[0].drawNumbers.split(" ")[index],
            items[1].drawNumbers.split(" ")[index],
          ]}
          interval={intervals[index]}
          key={index}
        />
      ))}
    </Fragment>
  );
};

export default DailyWinningNumber;
