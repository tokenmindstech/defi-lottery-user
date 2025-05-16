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
import { Spinner, TelegramLogo } from "@phosphor-icons/react/dist/ssr";
import { WALLET_ADAPTERS } from "@web3auth/base";
import {
  useEffect,
  useState,
  useCallback,
  Fragment,
  useRef,
  useContext,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { delay } from "@/lib/utils";
import { REQUIRED_2FA_SETUP, REQUIRED_AUTHENTICATION } from "@/constant/common";
import { Web3AuthContext } from "@/provider/web3-auth";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_BASEURL!;

const BindTelegramForm = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const jwtRequestedRef = useRef(false);

  const router = useRouter();
  const { web3Auth, isInitialized } = useContext(Web3AuthContext);

  const requestJwt = useCallback(async () => {
    // Skip if JWT was already requested during this session
    if (jwtRequestedRef.current) {
      return;
    }

    try {
      setIsLoading(true);
      if (!web3Auth || !web3Auth.connected) {
        return;
      }

      // Mark that we've started the JWT request process
      jwtRequestedRef.current = true;

      const user = await web3Auth.getUserInfo();
      const result = await signIn("credentials", {
        jwt: user.idToken,
        role: "USER",
        redirect: false,
      });

      if (result?.error) {
        if (result.error.startsWith(REQUIRED_2FA_SETUP)) {
          toast.success("2FA setup required. Redirecting...");
          await delay(2000);
          router.push(
            `/auth/2fa-setup?token=${result.error.replace(
              REQUIRED_2FA_SETUP,
              ""
            )}`
          );
        } else if (result.error.startsWith(REQUIRED_AUTHENTICATION)) {
          router.push(
            `/auth/2fa-challenge?token=${result.error.replace(
              REQUIRED_AUTHENTICATION,
              ""
            )}`
          );
        } else {
          toast.error(result.error || "Invalid credentials. Please try again.");
        }
      }

      if (result?.ok) {
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
        toast.success("Login successful!", { id: "login" });
        setIsLoading(false);
        delay(2000).then(() => {
          router.refresh();
        });
      }
    } catch (error) {
      console.error("JWT request failed:", error);
      // Reset the flag in case of error to allow retry
      jwtRequestedRef.current = false;
      setIsLoading(false);
    }
  }, [router, web3Auth]);

  const loginWithWeb3Auth = useCallback(
    async (token: string) => {
      try {
        if (!isInitialized) {
          console.error("Web3Auth is not initialized");
          return;
        }

        setIsLoading(true);
        const web3AuthProvider = await web3Auth.connectTo(
          WALLET_ADAPTERS.AUTH,
          {
            loginProvider: "jwt",
            extraLoginOptions: {
              id_token: token,
              verifierIdField: "sub",
            },
          }
        );

        if (web3AuthProvider) {
          await requestJwt();
        }
      } catch (error) {
        console.error("Login failed:", error);
        setIsLoading(false);
      }
    },
    [isInitialized, requestJwt, web3Auth]
  );

  const loginWithTelegram = useCallback(() => {
    router.push(
      `${BACKEND_URL}/auth/telegram-bind?jwt=${searchParams.get("jwt")}`
    );
  }, [router, searchParams]);

  // Handle initialization and check connection status
  useEffect(() => {
    const checkAuthStatus = async () => {
      if (!isInitialized) {
        return;
      }

      try {
        const jwtToken = searchParams.get("token");

        // Handle JWT token from URL
        if (jwtToken) {
          await loginWithWeb3Auth(jwtToken);
          return;
        }

        // Check if already logged in
        if (web3Auth.connected && !jwtRequestedRef.current) {
          await requestJwt();
        }
      } catch (error) {
        console.error("Auth status check failed:", error);
      }
    };

    checkAuthStatus();
  }, [isInitialized, loginWithWeb3Auth, requestJwt, searchParams, web3Auth]);

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
        <p className="text-bgtext-100 font-inter font-medium text-base text-center">
          Oops! It seems you haven&apos;t bound your Telegram account yet. To
          continue, please bind your Telegram account to your DeFi Lottery
          account.
        </p>
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
                Bind Telegram Account
              </p>
            </Fragment>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BindTelegramForm;
