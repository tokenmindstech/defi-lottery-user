"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  PropsWithChildren,
} from "react";
import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";

type SocketContextType = {
  socket: Socket | null;
  connected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  connected: false,
});

export const useSocketContext = () => useContext(SocketContext);

const SocketProvider = ({ children }: PropsWithChildren) => {
  const { data: session, status } = useSession();
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  const HOST =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BACKEND_BASEURL!
      : "http://localhost:2010";

  useEffect(() => {
    if (
      status === "authenticated" &&
      session?.user?.accessToken &&
      !socketRef.current
    ) {
      const socket = io(HOST, {
        auth: {
          token: session.user.accessToken,
        },
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
      });

      socket.on("connect", () => {
        setConnected(true);
      });

      socket.on("disconnect", () => {
        setConnected(false);
      });

      socketRef.current = socket;
    }

    return () => {
      // Optional: You can clean up here if needed on unmount (not usually required in persistent layouts)
    };
  }, [status, session, HOST]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, connected }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
