"use client";

import { Button } from "@/components/ui/button";
import { PROFILE_MENU_ITEMS, ProfileMenuType } from "@/constant/common";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import GeneralForm from "./general-form";
import MembershipForm from "./membership-form";
import PaymentDetailsForm from "./payment-details";

interface ProfileMenuProps {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileMenu = ({ isEditing, setIsEditing }: ProfileMenuProps) => {
  const [activeTab, setActiveTab] = useState<ProfileMenuType>("general");

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
          <GeneralForm isEditing={isEditing} setIsEditing={setIsEditing} />
        )}
        {activeTab === "membership" && <MembershipForm />}
        {activeTab === "payment" && <PaymentDetailsForm />}
        {activeTab === "account" && (
          <div className="flex flex-col space-y-5">
            <h2 className="text-xl font-semibold text-bgtext-100 font-inter whitespace-nowrap">
              Account
            </h2>
            <p className="text-base text-bgtext-600 font-inter">
              This is the account tab content.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileMenu;
