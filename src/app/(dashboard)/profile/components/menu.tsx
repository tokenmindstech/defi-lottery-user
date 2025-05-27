"use client";

import { Button } from "@/components/ui/button";
import { PROFILE_MENU_ITEMS, ProfileMenuType } from "@/constant/common";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { cn, fetchProxy } from "@/lib/utils";
import GeneralForm from "./general-form";
import PaymentDetailsForm from "./payment-details";
import AccountSetting from "./account-setting";
import { useSearchParams } from "next/navigation";
import { Web3AuthContext } from "@/provider/web3-auth";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import SubscriptionForm from "./subscription-form";

interface ProfileMenuProps {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  userInfoResponse: UserInfoResponse;
  activeTab: ProfileMenuType;
  handleChangeMenu: (menu: ProfileMenuType) => void;
}

const ProfileMenu = ({
  isEditing,
  setIsEditing,
  userInfoResponse,
  activeTab,
  handleChangeMenu,
}: ProfileMenuProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { isInitialized, web3Auth } = useContext(Web3AuthContext);
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { data: userSession } = useSession();

  const mutation = useMutation<
    APIBaseResponse | APIBaseErrorResponse,
    Error,
    Verifier[]
  >({
    mutationKey: ["update-account"],
    mutationFn: async (data: Verifier[]) =>
      fetchProxy({
        method: "PATCH",
        url: "user/profile",
        body: {
          name: userInfoResponse.name,
          verifiers: data,
        },
        auth: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile", userSession?.user.id],
      });
    },
  });

  const isErrorResponse = (
    response: APIBaseResponse | APIBaseErrorResponse
  ): response is APIBaseErrorResponse => {
    return "statusCode" in response && response.statusCode >= 400;
  };

  const checkBinding = useCallback(async () => {
    if (!isInitialized) {
      console.info("Web3Auth not initialized");
      return null;
    }

    const binding = searchParams.get("binding");
    const provider = searchParams.get("provider");

    if (binding && provider) {
      try {
        setIsLoading(true);

        const userInfoData = await web3Auth.getUserInfo();
        const toBeNewVerifiers = userInfoResponse.verifiers.map((verifier) => {
          if (verifier.type === "GOOGLE") {
            return {
              ...verifier,
              preferNotification:
                userInfoResponse.verifiers.find((v) => v.type === "GOOGLE")
                  ?.preferNotification || false,
            };
          }
          if (verifier.type === "TELEGRAM") {
            return {
              ...verifier,
              preferNotification:
                userInfoResponse.verifiers.find((v) => v.type === "TELEGRAM")
                  ?.preferNotification || false,
            };
          }
          return verifier;
        });

        if (userInfoData) {
          toBeNewVerifiers.push({
            id: userInfoData.verifierId!,
            type:
              userInfoData.verifier ===
              process.env.NEXT_PUBLIC_SUB_VERIFIER_TELEGRAM
                ? "TELEGRAM"
                : "GOOGLE",
            preferNotification: false,
            userId: userInfoResponse.id,
          });
        }

        toast.success("Binding account successful!", {
          id: `binding-${userInfoResponse.id}`,
        });
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );

        const result = await mutation.mutateAsync(toBeNewVerifiers);
        if (isErrorResponse(result)) {
          toast.error(
            Array.isArray(result.message) ? result.message[0] : result.message,
            {
              id: `binding-error-${userInfoResponse.id}`,
            }
          );
          return;
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
      } finally {
        setIsLoading(false);
      }
    }

    return null;
  }, [
    isInitialized,
    mutation,
    searchParams,
    userInfoResponse.id,
    userInfoResponse.verifiers,
    web3Auth,
  ]);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        await checkBinding();
      } catch (error) {
        console.error("Error in loadUserInfo:", error);
      }
    };

    loadUserInfo();
  }, [checkBinding, isInitialized, searchParams, setIsEditing]);

  if (isLoading || !isInitialized) {
    return (
      <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="flex flex-col col-span-3 px-4 py-4 space-y-5 lg:col-span-1 rounded-xl">
          <Skeleton className="w-full h-8 rounded-lg bg-bgtext-900" />
          <Skeleton className="w-full h-8 rounded-lg bg-bgtext-900" />
          <Skeleton className="w-full h-8 rounded-lg bg-bgtext-900" />
          <Skeleton className="w-full h-8 rounded-lg bg-bgtext-900" />
        </div>
        <div className="flex flex-col col-span-3 px-4 py-4 space-y-5 lg:col-span-2 rounded-xl">
          <Skeleton className="w-full h-8 rounded-lg bg-bgtext-900" />
          <Skeleton className="w-full h-8 rounded-lg bg-bgtext-900" />
          <Skeleton className="w-full h-8 rounded-lg bg-bgtext-900" />
          <Skeleton className="w-full h-8 rounded-lg bg-bgtext-900" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-3">
      <div className="flex flex-col col-span-3 px-4 py-4 space-y-5 h-fit lg:col-span-1 bg-bgtext-950 rounded-xl">
        {PROFILE_MENU_ITEMS.map((item, idx) => (
          <Button
            key={idx}
            onClick={() => {
              handleChangeMenu(item.value);
              setIsEditing(false);
            }}
            className={cn(
              "w-full bg-bgtext-950 border-0 hover:bg-gradient-to-r from-linviolet-start to-transparent hover:text-bgtext-100 ease-out transition-all duration-300 rounded-lg cursor-pointer",
              activeTab === item.value
                ? "bg-gradient-to-r from-linviolet-start to-transparent text-bgtext-100"
                : "text-bgtext-600"
            )}
          >
            <p className="w-full py-2 text-base font-medium text-left font-inter">
              {item.label}
            </p>
          </Button>
        ))}
      </div>

      <div className="flex flex-col col-span-3 px-4 py-4 space-y-5 lg:col-span-2 bg-bgtext-950 rounded-xl">
        {activeTab === "general" && (
          <GeneralForm
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            userInfoResponse={userInfoResponse}
          />
        )}
        {activeTab === "subscription" && (
          <SubscriptionForm userInfoResponse={userInfoResponse} />
        )}
        {activeTab === "payment" && <PaymentDetailsForm />}
        {activeTab === "account" && <AccountSetting />}
      </div>
    </div>
  );
};

export default ProfileMenu;
