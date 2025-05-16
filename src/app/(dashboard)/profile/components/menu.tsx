"use client";

import { Button } from "@/components/ui/button";
import { PROFILE_MENU_ITEMS, ProfileMenuType } from "@/constant/common";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import GeneralForm from "./general-form";
import MembershipForm from "./membership-form";
import PaymentDetailsForm from "./payment-details";
import AccountSetting from "./account-setting";
import { useSearchParams } from "next/navigation";
import { Web3AuthContext } from "@/provider/web3-auth";
import { AuthUserInfo } from "@web3auth/auth-adapter";
import { Skeleton } from "@/components/ui/skeleton";

interface ProfileMenuProps {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  verifiers: Verifier[];
}

const ProfileMenu = ({
  isEditing,
  setIsEditing,
  verifiers,
}: ProfileMenuProps) => {
  const [activeTab, setActiveTab] = useState<ProfileMenuType>("general");
  const [userInfo, setUserInfo] = useState<Partial<AuthUserInfo>>();
  const [isLoading, setIsLoading] = useState(true);

  const { isInitialized, web3Auth } = useContext(Web3AuthContext);
  const searchParams = useSearchParams();

  const checkBinding = useCallback(async () => {
    if (!isInitialized) {
      console.info("Web3Auth not initialized");
      return null;
    }

    const binding = searchParams.get("binding");
    const provider = searchParams.get("provider");

    if (binding && provider) {
      try {
        const userInfoData = await web3Auth.getUserInfo();
        console.log("User Info:", userInfoData);
        return userInfoData;
      } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
      }
    }

    return null;
  }, [isInitialized, searchParams, web3Auth]);

  useEffect(() => {
    const loadUserInfo = async () => {
      setIsLoading(true);

      try {
        const userInfoData = await checkBinding();
        setUserInfo(userInfoData || undefined);
        setIsEditing(userInfoData ? true : false);
      } catch (error) {
        console.error("Error in loadUserInfo:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserInfo();
  }, [checkBinding, isInitialized, searchParams, setIsEditing]);

  if (isLoading || !isInitialized) {
    return (
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="col-span-3 lg:col-span-1 flex flex-col space-y-5 rounded-xl px-4 py-4">
          <Skeleton className="h-8 w-full rounded-lg bg-bgtext-900" />
          <Skeleton className="h-8 w-full rounded-lg bg-bgtext-900" />
          <Skeleton className="h-8 w-full rounded-lg bg-bgtext-900" />
          <Skeleton className="h-8 w-full rounded-lg bg-bgtext-900" />
        </div>
        <div className="col-span-3 lg:col-span-2 flex flex-col space-y-5 rounded-xl px-4 py-4">
          <Skeleton className="h-8 w-full rounded-lg bg-bgtext-900" />
          <Skeleton className="h-8 w-full rounded-lg bg-bgtext-900" />
          <Skeleton className="h-8 w-full rounded-lg bg-bgtext-900" />
          <Skeleton className="h-8 w-full rounded-lg bg-bgtext-900" />
        </div>
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
            userInfo={userInfo}
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
