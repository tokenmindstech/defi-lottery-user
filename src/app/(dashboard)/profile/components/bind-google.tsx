"use client";

import { Button } from "@/components/ui/button";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import {
  UX_MODE,
  WALLET_ADAPTERS,
  WEB3AUTH_NETWORK,
  getEvmChainConfig,
} from "@web3auth/base";
import { AuthAdapter } from "@web3auth/auth-adapter";
import { useCallback, useEffect, useRef, useState } from "react";

const CLIENT_ID = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!;
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
const VERIFIER_NAME = process.env.NEXT_PUBLIC_VERIFIER_NAME!;
const SUB_VERIFIER_GOOGLE = process.env.NEXT_PUBLIC_SUB_VERIFIER_GOOGLE!;

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
    redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/profile?binding=google`,
    loginConfig: {
      google: {
        verifier: VERIFIER_NAME,
        typeOfLogin: "google",
        clientId: GOOGLE_CLIENT_ID,
        verifierSubIdentifier: SUB_VERIFIER_GOOGLE,
      },
    },
  },
});
web3Auth.configureAdapter(authAdapter);

const BindGoogle = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const jwtRequestedRef = useRef(false);

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

  const loginWithWeb3Auth = useCallback(async () => {
    try {
      setIsLoading(true);

      const initialized = await initializeWeb3Auth();
      if (!initialized) return;

      web3Auth.clearCache();
      await web3Auth.logout();
      const web3AuthProvider = await web3Auth.connectTo(WALLET_ADAPTERS.AUTH, {
        loginProvider: "google",
      });

      if (web3AuthProvider) {
        console.log("Connected to Web3Auth provider:", web3AuthProvider);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoading(false);
    }
  }, [initializeWeb3Auth]);

  const bindGoogle = useCallback(async () => {
    console.log("Binding Google account...");

    const user = await web3Auth.getUserInfo();
    console.log("User info:", user);
  }, []);

  // Handle initialization and check connection status
  useEffect(() => {
    let isMounted = true;

    const checkAuthStatus = async () => {
      if (!isMounted) return;

      try {
        // Initialize web3Auth
        const initialized = await initializeWeb3Auth();
        jwtRequestedRef.current = true;
        if (!initialized || !isMounted) return;
        // Check if already logged in
        if (web3Auth.connected && isMounted && !jwtRequestedRef.current) {
          await bindGoogle();
        }
      } catch (error) {
        console.error("Auth status check failed:", error);
      }
    };

    checkAuthStatus();

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [bindGoogle, initializeWeb3Auth]);
  return (
    <Button
      variant="link"
      type="button"
      className="text-info-500 w-fit px-0 cursor-pointer"
      onClick={() => loginWithWeb3Auth()}
    >
      {isLoading ? "Binding..." : "Bind Google Account"}
    </Button>
  );
};

export default BindGoogle;
