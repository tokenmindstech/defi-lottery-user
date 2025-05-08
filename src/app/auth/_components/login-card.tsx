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
import {
  GoogleLogo,
  Spinner,
  TelegramLogo,
} from "@phosphor-icons/react/dist/ssr";
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
import { useEffect, useState, useCallback, Fragment } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { delay } from "@/lib/utils";

const CLIENT_ID = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!;
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
const VERIFIER_NAME = process.env.NEXT_PUBLIC_VERIFIER_NAME!;
const SUB_VERIFIER_TELEGRAM = process.env.NEXT_PUBLIC_SUB_VERIFIER_TELEGRAM!;
const SUB_VERIFIER_GOOGLE = process.env.NEXT_PUBLIC_SUB_VERIFIER_GOOGLE!;
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_BASEURL!;

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
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initializeWeb3Auth = useCallback(async () => {
    if (isInitialized) {
      return true;
    }

    try {
      setIsLoading(true);
      await web3Auth.init();
      setIsInitialized(true);
      return true;
    } catch (error) {
      console.error("Failed to initialize web3Auth:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized]);

  const requestJwt = useCallback(async () => {
    try {
      if (!web3Auth || !web3Auth.connected) {
        return;
      }

      const user = await web3Auth.getUserInfo();
      const result = await signIn("credentials", {
        jwt: user.idToken,
        role: "USER",
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error || "Invalid credentials. Please try again.");
      }

      if (result?.ok) {
        toast.success("Login successful!", { id: "login" });
        delay(2000).then(() => {
          router.refresh();
        });
      }
    } catch (error) {
      console.error("JWT request failed:", error);
    }
  }, [router]);

  const loginWithWeb3Auth = useCallback(
    async (token: string, type: "google" | "jwt") => {
      try {
        setIsLoading(true);

        const initialized = await initializeWeb3Auth();
        if (!initialized) return;

        let web3AuthProvider;

        if (type === "google") {
          web3AuthProvider = await web3Auth.connectTo(WALLET_ADAPTERS.AUTH, {
            loginProvider: "google",
          });
        } else if (type === "jwt") {
          web3AuthProvider = await web3Auth.connectTo(WALLET_ADAPTERS.AUTH, {
            loginProvider: "jwt",
            extraLoginOptions: {
              id_token: token,
              verifierIdField: "sub",
            },
          });
        }

        if (web3AuthProvider) {
          setProvider(web3AuthProvider);
          await requestJwt();
        }
      } catch (error) {
        console.error("Login failed:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [initializeWeb3Auth, requestJwt]
  );

  const loginWithTelegram = useCallback(() => {
    router.push(
      `${BACKEND_URL}/auth/telegram-login?redirect_uri=${window.location.origin}/auth`
    );
  }, [router]);

  // Handle initialization and check connection status
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const action = searchParams.get("action");
        const jwtToken = searchParams.get("token");

        // Initialize web3Auth
        const initialized = await initializeWeb3Auth();
        if (!initialized) return;

        // Handle logout action
        if (action === "logout") {
          if (web3Auth.connected) {
            await web3Auth.logout();
          }
          setProvider(null);
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
          return;
        }

        // Handle JWT token from URL
        if (jwtToken) {
          await loginWithWeb3Auth(jwtToken, "jwt");
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
          return;
        }

        // Check if already logged in
        if (web3Auth.connected) {
          setProvider(web3Auth.provider);
          await requestJwt();
        }
      } catch (error) {
        console.error("Auth status check failed:", error);
      }
    };

    checkAuthStatus();
  }, [initializeWeb3Auth, loginWithWeb3Auth, requestJwt, searchParams]);

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
        <Button
          onClick={() => loginWithWeb3Auth("", "google")}
          className="w-full flex flex-row items-center justify-center bg-bgtext-800 border py-6 border-bgtext-700 hover:bg-bgtext-700 rounded-xl cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner className="size-8 fill-bgtext-100 animate-spin" />
          ) : (
            <Fragment>
              <GoogleLogo weight="fill" className="size-6 fill-bgtext-100" />
              <p className="text-bgtext-100 font-inter font-medium text-base">
                Login with Google
              </p>
            </Fragment>
          )}
        </Button>
        <Button
          onClick={loginWithTelegram}
          className="w-full flex flex-row items-center justify-center bg-bgtext-800 border py-6 border-bgtext-700 hover:bg-bgtext-700 rounded-xl cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner className="size-8 fill-bgtext-100 animate-spin" />
          ) : (
            <Fragment>
              <TelegramLogo weight="fill" className="size-6 fill-bgtext-100" />
              <p className="text-bgtext-100 font-inter font-medium text-base">
                Login with Telegram
              </p>
            </Fragment>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
