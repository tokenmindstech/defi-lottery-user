"use client";

import React, { PropsWithChildren } from "react";
import { IoProvider } from "socket.io-react-hook";

const SocketProvider = ({ children }: PropsWithChildren) => {
  return <IoProvider>{children}</IoProvider>;
};

export default SocketProvider;
