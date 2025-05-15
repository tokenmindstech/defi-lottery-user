"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";
import QueryProvider from "./query";

interface AuthProviderProps {
  children: React.ReactNode;
  session: Session;
}

const AuthProvider = ({ children, session }: AuthProviderProps) => {
  // const pathName = usePathname();
  // let redirect = true;
  // if (!session && typeof window !== "undefined") {
  //   if (pathName.startsWith("/auth")) {
  //     redirect = false;
  //   }
  //   signOut({ redirect, callbackUrl: "/auth" });
  // }

  return (
    <SessionProvider baseUrl={process.env.NEXTAUTH_URL} session={session}>
      <QueryProvider>{children}</QueryProvider>
    </SessionProvider>
  );
};

export default AuthProvider;
