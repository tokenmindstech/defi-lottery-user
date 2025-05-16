"use client";

import { Button } from "@/components/ui/button";
import { Web3AuthContext } from "@/provider/web3-auth";
import { WALLET_ADAPTERS } from "@web3auth/base";
import { useCallback, useContext, useState } from "react";
import DialogUnbindGoogle from "./dialog-unbind-google";

interface BindUnbindGoogleProps {
  userInfoResponse: UserInfoResponse;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const BindUnbindGoogle = ({
  userInfoResponse,
  setIsEditing,
}: BindUnbindGoogleProps) => {
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

  if (userInfoResponse.verifiers.find((v) => v.type === "GOOGLE")) {
    return (
      <DialogUnbindGoogle
        userInfoResponse={userInfoResponse}
        setIsEditing={setIsEditing}
      />
    );
  }
  return (
    <Button
      variant="link"
      type="button"
      className="w-fit text-info-500 cursor-pointer px-0"
      onClick={loginWithWeb3Auth}
      disabled={isLoading}
    >
      {isLoading ? "Binding..." : "Bind Google"}
    </Button>
  );
};

export default BindUnbindGoogle;
