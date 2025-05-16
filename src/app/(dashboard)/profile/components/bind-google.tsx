"use client";

import { Button } from "@/components/ui/button";
import { Web3AuthContext } from "@/provider/web3-auth";
import { WALLET_ADAPTERS } from "@web3auth/base";
import { useCallback, useContext, useState } from "react";

const BindGoogle = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { isInitialized, web3Auth } = useContext(Web3AuthContext);

  const loginWithWeb3Auth = useCallback(async () => {
    try {
      if (!isInitialized) {
        console.info("Web3Auth not initialized");
        return;
      }

      web3Auth.clearCache();
      await web3Auth.logout();

      await web3Auth.connectTo(WALLET_ADAPTERS.AUTH, {
        loginProvider: "google",
        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/profile?binding=true&provider=google`,
      });
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoading(false);
    }
  }, [isInitialized, web3Auth]);

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
