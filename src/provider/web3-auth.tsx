"use client";

import { useState, useEffect, createContext, ReactNode } from "react";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { UX_MODE, WEB3AUTH_NETWORK, getEvmChainConfig } from "@web3auth/base";
import { AuthAdapter, LoginConfig } from "@web3auth/auth-adapter";

const CLIENT_ID = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!;
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
const VERIFIER_NAME = process.env.NEXT_PUBLIC_VERIFIER_NAME!;
const SUB_VERIFIER_GOOGLE = process.env.NEXT_PUBLIC_SUB_VERIFIER_GOOGLE!;
const SUB_VERIFIER_TELEGRAM = process.env.NEXT_PUBLIC_SUB_VERIFIER_TELEGRAM!;

// Initialize the Web3Auth configuration outside the component
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

export const loginConfig: LoginConfig = {
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
};

const authAdapter = new AuthAdapter({
  adapterSettings: {
    uxMode: UX_MODE.REDIRECT,
    loginConfig,
  },
});
web3Auth.configureAdapter(authAdapter);

// Track initialization state globally
let isGloballyInitialized = false;

// Create context for Web3Auth
type Web3AuthContextType = {
  isInitialized: boolean;
  isLoadingInitialization: boolean;
  web3Auth: typeof web3Auth;
};

export const Web3AuthContext = createContext<Web3AuthContextType>({
  isInitialized: false,
  isLoadingInitialization: false,
  web3Auth,
});

// Provider component
const Web3AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(isGloballyInitialized);
  const [isLoadingInitialization, setIsLoadingInitialization] = useState(false);

  useEffect(() => {
    const initializeWeb3Auth = async () => {
      // Skip if already initialized globally
      if (isGloballyInitialized) {
        setIsInitialized(true);
        return;
      }

      console.log("Initializing Web3Auth...");
      try {
        setIsLoadingInitialization(true);
        await web3Auth.init();
        isGloballyInitialized = true; // Set global flag
        setIsInitialized(true);
        console.log("Web3Auth initialized");
      } catch (error) {
        console.error("Failed to initialize web3Auth:", error);
      } finally {
        setIsLoadingInitialization(false);
      }
    };

    initializeWeb3Auth();
  }, []);

  return (
    <Web3AuthContext.Provider
      value={{ isInitialized, isLoadingInitialization, web3Auth }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};

export default Web3AuthProvider;
