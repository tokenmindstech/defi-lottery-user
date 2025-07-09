"use client";

import React, { Fragment, useEffect, useState } from "react";
import SkeletonLuckyDrawWInningNumber from "./skeleton-lucky-draw-winning";
import WinningNumber from "./winning-number";
import { useSocket, useSocketEvent } from "socket.io-react-hook";

const DailyWinningNumber = () => {
  const HOST =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BACKEND_BASEURL!
      : "http://localhost:2010";
  const [sended, setSended] = useState(false);

  const { socket, connected } = useSocket(HOST);
  const { sendMessage, lastMessage } =
    useSocketEvent<ListenGetTodaysRewardDrawResponseDTO>(
      socket,
      "getTodayRewardDraw"
    );

  useEffect(() => {
    if (connected && !sended) {
      sendMessage();
      setSended(true);
    }
  }, [connected, sended, sendMessage]);

  return (
    <Fragment>
      {lastMessage === undefined ? (
        <SkeletonLuckyDrawWInningNumber />
      ) : (
        <Fragment>
          <div className="grid w-full grid-cols-1 gap-5 place-items-center">
            <div className="flex flex-col items-center justify-center w-full space-y-3">
              <p className="text-xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
                5/36 Winning Numbers
              </p>

              <div className="flex justify-center w-full">
                <div className="flex justify-center gap-2">
                  {lastMessage.data === null
                    ? "? ? ? ? ?"
                        .split(" ")
                        .map((number, index) => (
                          <WinningNumber item={number} key={index} />
                        ))
                    : lastMessage.data.drawNumbers
                        ?.split(" ")
                        .map((number, index) => (
                          <WinningNumber item={number} key={index} />
                        ))}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default DailyWinningNumber;
