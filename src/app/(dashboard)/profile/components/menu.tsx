"use client";

import { Button } from "@/components/ui/button";
import { PROFILE_MENU_ITEMS, ProfileMenuType } from "@/constant/common";
import React, { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import GeneralForm from "./general-form";
import MembershipForm from "./membership-form";
import PaymentDetailsForm from "./payment-details";
import AccountSetting from "./account-setting";
import { useSearchParams } from "next/navigation";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import {
  WALLET_ADAPTERS,
  UX_MODE,
  WEB3AUTH_NETWORK,
  getEvmChainConfig,
  ADAPTER_STATUS,
} from "@web3auth/base";
import { AuthAdapter } from "@web3auth/auth-adapter";

interface ProfileMenuProps {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  verifiers: Verifier[];
}

const CLIENT_ID = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!;
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
const VERIFIER_NAME = process.env.NEXT_PUBLIC_VERIFIER_NAME!;
const SUB_VERIFIER_GOOGLE = process.env.NEXT_PUBLIC_SUB_VERIFIER_GOOGLE!;

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
    },
  },
});
web3Auth.configureAdapter(authAdapter);

const ProfileMenu = ({
  isEditing,
  setIsEditing,
  verifiers,
}: ProfileMenuProps) => {
  const [activeTab, setActiveTab] = useState<ProfileMenuType>("general");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  // Check initial connection status
  useEffect(() => {
    const checkConnectionStatus = async () => {
      try {
        if (web3Auth.status !== ADAPTER_STATUS.READY) {
          await web3Auth.init();
        }

        // Check if user is already connected
        const isUserConnected = web3Auth.connected;
        setIsConnected(isUserConnected);

        if (isUserConnected) {
          console.log("User is already connected");
        }
      } catch (error) {
        console.error("Error checking connection status:", error);
      }
    };

    checkConnectionStatus();
  }, []);

  const initAndBindGoogle = useCallback(async () => {
    if (isConnected) {
      console.log("Already connected to Web3Auth");
      return await web3Auth.getUserInfo();
    }

    try {
      setIsAuthenticating(true);
      setAuthError(null);

      // Initialize Web3Auth
      if (web3Auth.status !== ADAPTER_STATUS.READY) {
        console.log("Initializing Web3Auth...");
        await web3Auth.init();
      }

      // Connect using Google provider
      console.log("Connecting to Web3Auth with Google...");
      await web3Auth.connectTo(WALLET_ADAPTERS.AUTH, {
        loginProvider: "google",
      });

      // Get user info after successful connection
      const user = await web3Auth.getUserInfo();
      console.log("User authenticated:", user);
      setIsConnected(true);

      // Add additional handling here if needed
      // For example, you might want to call your backend API to save the binding

      return user;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Failed to initialize and bind Google:", error);
      setAuthError(error.message || "Failed to connect with Google");
      throw error;
    } finally {
      setIsAuthenticating(false);
    }
  }, [isConnected]);

  useEffect(() => {
    const binding = searchParams.get("binding");

    // Only attempt Google binding if specifically requested and not already connected
    if (binding === "google" && !isConnected) {
      console.log("Starting Google binding process");

      // Add a small delay to ensure proper initialization
      const timer = setTimeout(() => {
        initAndBindGoogle()
          .then((user) => {
            console.log("Google binding successful", user);
            // Additional success handling if needed
          })
          .catch((error) => {
            console.error("Error during Google binding:", error);
            // Error is already set in the initAndBindGoogle function
          });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [initAndBindGoogle, searchParams, isConnected]);

  // Return loading state if authentication is in progress
  if (isAuthenticating) {
    return (
      <div className="w-full text-center py-8">
        <p>Authenticating with Google...</p>
        <p className="text-sm text-bgtext-600 mt-2">
          Please wait while we connect your account
        </p>
      </div>
    );
  }

  // Show error message if authentication failed
  if (authError) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-red-500">Authentication failed</p>
        <p className="text-sm text-bgtext-600 mt-2">{authError}</p>
        <Button
          onClick={() => setAuthError(null)}
          className="mt-4 bg-bgtext-800 hover:bg-bgtext-700"
        >
          Return to Profile
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="flex h-fit flex-col col-span-3 lg:col-span-1 space-y-5 bg-bgtext-950 rounded-xl px-4 py-4">
        {PROFILE_MENU_ITEMS.map((item, idx) => (
          <Button
            key={idx}
            onClick={() => {
              setActiveTab(item.value);
              setIsEditing(false);
            }}
            className={cn(
              "w-full bg-bgtext-950 border-0 hover:bg-gradient-to-r from-linviolet-start to-transparent hover:text-bgtext-100 ease-out transition-all duration-300 rounded-lg cursor-pointer",
              activeTab === item.value
                ? "bg-gradient-to-r from-linviolet-start to-transparent text-bgtext-100"
                : "text-bgtext-600"
            )}
          >
            <p className="w-full text-left font-inter font-medium text-base py-2">
              {item.label}
            </p>
          </Button>
        ))}
      </div>

      <div className="flex flex-col col-span-3 lg:col-span-2 space-y-5 bg-bgtext-950 rounded-xl px-4 py-4">
        {activeTab === "general" && (
          <GeneralForm
            verifiers={verifiers}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        )}
        {activeTab === "membership" && <MembershipForm />}
        {activeTab === "payment" && <PaymentDetailsForm />}
        {activeTab === "account" && <AccountSetting />}
      </div>
    </div>
  );
};

export default ProfileMenu;
