"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PROFILE_MENU_ITEMS, ProfileMenuType } from "@/constant/common";
import React, { useState } from "react";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<ProfileMenuType>("general");
  return (
    <section className="flex flex-col w-full h-full space-y-10">
      <h2 className="text-3xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
        Profile
      </h2>

      <div className="flex flex-row items-center justify-between w-full h-full p-5">
        <div className="flex flex-row space-x-5 items-center justify-center">
          <Avatar className="w-20 h-20 bg-bgtext-800 rounded-xl cursor-pointer">
            <AvatarImage
              src="/assets/images/user.jpeg"
              alt="User Avatar"
              className="object-cover"
            />
            <AvatarFallback>DF</AvatarFallback>
          </Avatar>

          <div className="flex flex-col space-y-2 items-center justify-center">
            <h2 className="text-2xl font-semibold text-bgtext-100 font-inter whitespace-nowrap">
              John Doe
            </h2>

            <p className="text-base text-bgtext-100 font-inter py-1 px-4 bg-gradient-to-b from-lindeepgreen-start/40 to-black rounded-lg border-2 border-bgtext-800">
              Premium
            </p>
          </div>
        </div>

        <Button className="w-fit bg-bgtext-800 border border-bgtext-700 hover:bg-bgtext-700 rounded-lg cursor-pointer">
          <p className="text-bgtext-100 font-inter font-medium text-sm py-4">
            Edit Profile
          </p>
        </Button>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="flex flex-col col-span-3 lg:col-span-1 space-y-5 bg-bgtext-900 border border-bgtext-800 rounded-xl px-4 py-4">
          {PROFILE_MENU_ITEMS.map((item, idx) => (
            <Button
              key={idx}
              onClick={() => setActiveTab(item.value)}
              className={`w-fit bg-bgtext-900 border-0 hover:bg-bgtext-800 rounded-lg cursor-pointer ${
                activeTab === item.value
                  ? "bg-bgtext-800 text-bgtext-100"
                  : "text-bgtext-600"
              }`}
            >
              <p className="font-inter font-medium text-base">{item.label}</p>
            </Button>
          ))}
        </div>

        <div className="flex flex-col col-span-3 lg:col-span-2 space-y-5 bg-bgtext-900 border border-bgtext-800 rounded-xl px-4 py-4">
          {activeTab === "general" && (
            <div className="flex flex-col space-y-5">
              <h2 className="text-xl font-semibold text-bgtext-100 font-inter whitespace-nowrap">
                General
              </h2>
              <p className="text-base text-bgtext-600 font-inter">
                This is the general tab content.
              </p>
            </div>
          )}
          {activeTab === "membership" && (
            <div className="flex flex-col space-y-5">
              <h2 className="text-xl font-semibold text-bgtext-100 font-inter whitespace-nowrap">
                Membership
              </h2>
              <p className="text-base text-bgtext-600 font-inter">
                This is the membership tab content.
              </p>
            </div>
          )}
          {activeTab === "payment" && (
            <div className="flex flex-col space-y-5">
              <h2 className="text-xl font-semibold text-bgtext-100 font-inter whitespace-nowrap">
                Payment
              </h2>
              <p className="text-base text-bgtext-600 font-inter">
                This is the payment tab content.
              </p>
            </div>
          )}
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
    </section>
  );
};

export default ProfilePage;
