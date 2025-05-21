"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

const MembershipForm = () => {
  return (
    <div className="flex flex-col space-y-5 p-2">
      <h2 className="text-xl font-semibold text-bgtext-100 font-inter whitespace-nowrap">
        Membership Overview
      </h2>

      <div className="w-full flex flex-col space-y-3">
        <p className="text-sm text-bgtext-100 font-inter font-medium">
          Current Plan
        </p>
        <div className="flex flex-row items-center justify-between p-3 bg-bgtext-900 rounded-lg border-1 border-bgtext-800">
          <p className="text-base text-bgtext-100 font-inter py-1 px-4 bg-gradient-to-b from-lindeepgreen-start/40 to-black rounded-lg border-2 border-bgtext-800">
            Premium
          </p>

          <Button
            variant="link"
            className="text-base font-inter font-medium text-linsea-start"
          >
            Upgrade Plan
          </Button>
        </div>
      </div>

      <div className="w-full flex flex-col space-y-3">
        <p className="text-sm text-bgtext-100 font-inter font-medium">
          Ticket Allocation
        </p>
        <div className="flex flex-row items-center justify-between p-3 bg-bgtext-900 rounded-lg border-1 border-bgtext-800">
          <p className="text-sm text-bgtext-100 font-inter font-medium">
            <span className="text-linsea-start">30</span> tickets per month
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col space-y-3">
        <p className="text-sm text-bgtext-100 font-inter font-medium">Status</p>
        <div className="flex flex-row items-center justify-between p-3 bg-bgtext-900 rounded-lg border-1 border-bgtext-800">
          <p className="text-sm text-linsea-start font-inter font-medium">
            Active
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col space-y-3">
        <p className="text-sm text-bgtext-100 font-inter font-medium">
          Renewal Date
        </p>
        <div className="flex flex-row items-center justify-between p-3 bg-bgtext-900 rounded-lg border-1 border-bgtext-800">
          <div className="flex flex-row items-center space-x-2">
            <p className="text-sm text-linsea-start font-inter font-medium">
              {dayjs().format("DD/MM/YYYY")}
            </p>
            <Button
              variant="link"
              className="text-sm font-inter font-medium text-destructive"
            >
              Cancel
            </Button>
          </div>

          <Button
            variant="link"
            className="text-base font-inter font-medium text-linsea-start"
          >
            Renew
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MembershipForm;
