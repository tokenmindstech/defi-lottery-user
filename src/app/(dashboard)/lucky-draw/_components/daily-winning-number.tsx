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
          <div className="w-full grid grid-cols-1 place-items-center gap-5">
            <div className="flex flex-col space-y-3 items-center justify-center w-full">
              <p className="text-xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
                5/36 Winning Numbers
              </p>

              <div className="w-full flex justify-center">
                <div className="flex gap-2 justify-center">
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
