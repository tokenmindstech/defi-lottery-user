"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "@phosphor-icons/react/dist/ssr";
import React from "react";

const AccountSetting = () => {
  return (
    <div className="flex flex-col space-y-5 p-2">
      <h2 className="text-xl font-semibold text-bgtext-100 font-inter whitespace-nowrap">
        Account Controls
      </h2>

      <div className="flex flex-col space-y-3 lg:flex-row lg:space-y-0 justify-start items-start lg:justify-between">
        <div className="flex flex-col space-y-1">
          <p className="text-sm text-bgtext-100 font-inter font-medium">
            Delete your data and account
          </p>
          <p className="text-sm text-bgtext-500 font-inter font-medium">
            Permanently delete your data and everything related to your account
          </p>
        </div>

        <Button variant="destructive" className="cursor-pointer">
          Delete My Account
          <Trash className="size-5 text-bgtext-100" />
        </Button>
      </div>
    </div>
  );
};

export default AccountSetting;
