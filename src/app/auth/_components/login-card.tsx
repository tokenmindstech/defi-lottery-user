"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GoogleLogo, TelegramLogo } from "@phosphor-icons/react/dist/ssr";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import {
  WALLET_ADAPTERS,
  IProvider,
  UX_MODE,
  WEB3AUTH_NETWORK,
  getEvmChainConfig,
} from "@web3auth/base";
import { AuthAdapter } from "@web3auth/auth-adapter";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const CLIENT_ID = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!;
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
const VERIFIER_NAME = process.env.NEXT_PUBLIC_VERIFIER_NAME!;
const SUB_VERIFIER_TELEGRAM = process.env.NEXT_PUBLIC_SUB_VERIFIER_TELEGRAM!;
const SUB_VERIFIER_GOOGLE = process.env.NEXT_PUBLIC_SUB_VERIFIER_GOOGLE!;
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_BASEURL!;

console.info("Environment Variables", {
  CLIENT_ID,
  GOOGLE_CLIENT_ID,
  VERIFIER_NAME,
  SUB_VERIFIER_TELEGRAM,
  SUB_VERIFIER_GOOGLE,
  BACKEND_URL,
});

const chainConfig = getEvmChainConfig(0x13882, CLIENT_ID)!;
const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});
const web3Auth = new Web3AuthNoModal({
  clientId: CLIENT_ID!,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
  chainConfig,
});
const authAdapter = new AuthAdapter({
  adapterSettings: {
    uxMode: UX_MODE.REDIRECT,
    loginConfig: {
      google: {
        verifier: VERIFIER_NAME,
        typeOfLogin: "google",
        clientId: GOOGLE_CLIENT_ID,
        verifierSubIdentifier: SUB_VERIFIER_GOOGLE,
      },
      jwt: {
        verifier: VERIFIER_NAME,
        verifierSubIdentifier: SUB_VERIFIER_TELEGRAM,
        typeOfLogin: "jwt",
        clientId: CLIENT_ID,
      },
    },
  },
});
web3Auth.configureAdapter(authAdapter);

export function LoginCardForm() {
  const searchParams = useSearchParams();
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const loginWithWeb3Auth = async (token: string, type: "google" | "jwt") => {
    await web3Auth.init();

    if (type === "google") {
      console.log("Google login");
      const web3AuthProvider = await web3Auth?.connectTo(WALLET_ADAPTERS.AUTH, {
        loginProvider: "google",
      });
      setProvider(web3AuthProvider);
    } else if (type === "jwt") {
      const web3authProvider = await web3Auth?.connectTo(WALLET_ADAPTERS.AUTH, {
        loginProvider: "jwt",
        extraLoginOptions: {
          id_token: token,
          verifierIdField: "sub",
        },
      });
      setProvider(web3authProvider!);
    }
  };

  const getUserInfo = async () => {
    if (!web3Auth) {
      return;
    }
    const user = await web3Auth.getUserInfo();
    console.log("User info", user);
  };

  useEffect(() => {
    const jwtToken = searchParams.get("token");
    console.log("JWT Token", jwtToken);

    if (jwtToken) {
      loginWithWeb3Auth(jwtToken, "jwt");
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  });

  useEffect(() => {
    const init = async () => {
      try {
        await web3Auth?.init();
        setProvider(web3Auth?.provider);
        if (web3Auth?.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  return (
    <Card className="w-full z-20 max-w-sm md:max-w-md lg:max-w-lg bg-bgtext-950 border border-bgtext-800">
      <CardHeader className="flex flex-col items-center justify-center space-y-2">
        <div className="relative h-25 w-25 bg-gradient-to-b from-linprimary-start to-linprimary-end rounded-xl">
          <Image
            src="/assets/icons/536.svg"
            alt="DeFi Lottery Solutions"
            fill
            className="object-cover object-center rounded-tl-xl rounded-tr-xl"
            sizes="100%"
          />
        </div>
        <CardTitle className="text-3xl lg:text-4xl font-inter font-medium text-bgtext-100 text-center">
          Web3Auth DeFi Lottery
        </CardTitle>
        <CardDescription className="hidden">
          Deploy your new project in one-click.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-5">
        <p className="text-bgtext-100 font-inter font-medium text-2xl text-center">
          Is Authenticated {loggedIn ? "true" : "false"}
        </p>
        {loggedIn && (
          <Button
            onClick={getUserInfo}
            className="w-full flex flex-row items-center justify-center bg-bgtext-800 border py-6 border-bgtext-700 hover:bg-bgtext-700 rounded-xl cursor-pointer"
          >
            <p className="text-bgtext-100 font-inter font-medium text-base">
              Get User Info
            </p>
          </Button>
        )}
        <Button
          onClick={() => loginWithWeb3Auth("", "google")}
          className="w-full flex flex-row items-center justify-center bg-bgtext-800 border py-6 border-bgtext-700 hover:bg-bgtext-700 rounded-xl cursor-pointer"
        >
          <GoogleLogo weight="fill" className="size-6 fill-bgtext-100" />
          <p className="text-bgtext-100 font-inter font-medium text-base">
            Login with Google
          </p>
        </Button>
        <Link href={`${BACKEND_URL}/auth/telegram-login`} className="w-full">
          <Button className="w-full flex flex-row items-center justify-center bg-bgtext-800 border py-6 border-bgtext-700 hover:bg-bgtext-700 rounded-xl cursor-pointer">
            <TelegramLogo weight="fill" className="size-6 fill-bgtext-100" />
            <p className="text-bgtext-100 font-inter font-medium text-base">
              Login with Telegram
            </p>
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
