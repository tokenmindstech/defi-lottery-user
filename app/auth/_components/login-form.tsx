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
  GoogleLogoIcon,
  SpinnerIcon,
  TelegramLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
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
import {
  AUTH_ERROR_TELEGRAM_ALREADY_BOUND,
  REQUIRED_AUTHENTICATION,
  // REQUIRED_BIND_TELEGRAM,
} from "@/constant/common";
import { Web3AuthContext } from "@/provider/web3-auth";
import Link from "next/link";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_BASEURL!;

const LoginForm = () => {
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
        // if (result.error.startsWith(REQUIRED_BIND_TELEGRAM)) {
        //   toast.success("Telegram binding required. Redirecting...");
        //   web3Auth.clearCache();
        //   await web3Auth.logout();
        //   await delay(2000);
        //   router.push(
        //     `/auth/telegram-bind?jwt=${result.error.replace(
        //       REQUIRED_BIND_TELEGRAM,
        //       ""
        //     )}`
        //   );
        // }
        // else if (result.error.startsWith(REQUIRED_2FA_SETUP)) {
        //   toast.success("2FA setup required. Redirecting...");
        //   await delay(2000);
        //   router.push(
        //     `/auth/2fa-setup?token=${result.error.replace(
        //       REQUIRED_2FA_SETUP,
        //       ""
        //     )}`
        //   );
        // }
        if (result.error.startsWith(REQUIRED_AUTHENTICATION)) {
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
        delay(2000).then(() => {
          router.refresh();
        });
      }
    } catch (error) {
      console.error("JWT request failed:", error);
      // Reset the flag in case of error to allow retry
      jwtRequestedRef.current = false;
    } finally {
      setIsLoading(false);
    }
  }, [router, web3Auth]);

  const loginWithWeb3Auth = useCallback(
    async (token: string, type: "google" | "jwt") => {
      try {
        if (!isInitialized) {
          console.error("Web3Auth is not initialized");
          return;
        }

        setIsLoading(true);
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
          await requestJwt();
        }
      } catch (error) {
        console.error("Login failed:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [isInitialized, requestJwt, web3Auth]
  );

  const loginWithTelegram = useCallback(() => {
    router.push(`${BACKEND_URL}/auth/telegram-login`);
  }, [router]);

  // Handle initialization and check connection status
  useEffect(() => {
    const checkAuthStatus = async () => {
      if (!isInitialized) {
        return;
      }

      try {
        setIsLoading(true);
        const action = searchParams.get("action");
        const error = searchParams.get("error");
        const jwtToken = searchParams.get("token");

        // Reset JWT requested flag on logout
        if (action === "logout") {
          jwtRequestedRef.current = false;
          if (web3Auth.connected) {
            await web3Auth.logout();
          }
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
          return;
        }
        if (error === AUTH_ERROR_TELEGRAM_ALREADY_BOUND) {
          toast.error(
            "Telegram account already linked to another account. Please login using that account directly."
          );
          jwtRequestedRef.current = false;
          if (web3Auth.connected) {
            await web3Auth.logout();
          }
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
          return;
        }

        // Check if already logged in
        if (web3Auth.connected && !jwtRequestedRef.current) {
          await requestJwt();
        }
      } catch (error) {
        console.error("Auth status check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [isInitialized, loginWithWeb3Auth, requestJwt, searchParams, web3Auth]);

  return (
    <Card className="w-full z-20 max-w-sm md:max-w-md lg:max-w-lg bg-bgtext-950 border border-bgtext-800">
      <CardHeader className="flex flex-col items-center justify-center space-y-2">
        <div className="relative size-32">
          <Image
            src="/assets/images/536-White.png"
            alt="DeFi Lottery Solutions"
            fill
            className="object-contain object-center rounded-tl-xl rounded-tr-xl"
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
            <SpinnerIcon className="size-8 fill-bgtext-100 animate-spin" />
          ) : (
            <Fragment>
              <GoogleLogoIcon
                weight="fill"
                className="size-6 fill-bgtext-100"
              />
              <p className="text-bgtext-100 font-inter font-medium text-base">
                Login with Google
              </p>
            </Fragment>
          )}
        </Button>

        {/* <Button
          onClick={loginWithTelegram}
          className="w-full flex flex-row items-center justify-center bg-bgtext-800 border py-6 border-bgtext-700 hover:bg-bgtext-700 rounded-xl cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? (
            <SpinnerIcon className="size-8 fill-bgtext-100 animate-spin" />
          ) : (
            <Fragment>
              <TelegramLogoIcon
                weight="fill"
                className="size-6 fill-bgtext-100"
              />
              <p className="text-bgtext-100 font-inter font-medium text-base">
                Login with Telegram
              </p>
            </Fragment>
          )}
        </Button> */}

        <p className="text-xs text-bgtext-100 font-inter text-center">
          By creating an account, I agree to the536.com&apos;s{" "}
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            prefetch={false}
            className="text-blue-500 hover:underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            prefetch={false}
            className="text-blue-500 hover:underline"
          >
            Privacy Policy
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
