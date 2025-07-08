"use client";

import React from "react";
import { Input } from "../ui/input";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import MobileSidebarLayout from "./mobile-sidebar";
import NotificationDropdown from "./notification-dropdown";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { fetchProxy } from "@/lib/utils";
import { useCachedProfileImage } from "@/lib/use-cached-profile-image";

const HeaderLayout = () => {
  const { data: userSession } = useSession();
  
  // Get user profile data
  const { data: userData } = useQuery<APIGetUserProfileResponseDTO>({
    queryKey: ["profile", userSession?.user.id],
    queryFn: async () =>
      fetchProxy({
        url: "user/profile",
        method: "GET",
        auth: true,
      }),
    enabled: !!userSession,
  });

  // Use cached profile image
  const { cachedImage: cachedProfileImage } = useCachedProfileImage(
    userData?.data?.imageUrl,
    userSession?.user.id
  );

  // Debug: Log what the header is receiving
  React.useEffect(() => {
    console.log("🔍 Header Debug:", {
      userImageUrl: userData?.data?.imageUrl,
      cachedProfileImage: cachedProfileImage ? "Available" : "None",
      userId: userSession?.user.id,
      timestamp: new Date().toISOString()
    });
  }, [userData?.data?.imageUrl, cachedProfileImage, userSession?.user.id]);

  return (
    <div className="flex sticky flex-row h-[10vh] w-full items-center justify-between">
      <div className="absolute h-[85px] w-full border-b border-b-bgtext-800 mask-l-from-80% mask-r-from-80%" />
      <div className="flex w-full h-full p-5">
        <div className="flex z-20 flex-row items-center space-x-3 w-full">
          <MobileSidebarLayout />
          <Input
            type="text"
            placeholder="Search..."
            className="w-3/4 lg:w-1/2 h-10 bg-bgtext-900 border-0 rounded-full text-bgtext-100 selection:bg-bgtext-100 selection:text-bgtext-900 focus-visible:ring-0 focus-visible:border-[1px] focus-visible:border-bgtext-100 focus-visible:ring-bgtext-100"
            StartIcon={MagnifyingGlass}
          />
        </div>

        <div className="flex z-20 flex-row items-center space-x-3">
          <NotificationDropdown />
          <Link href={"/profile"}>
            <Avatar className="w-10 h-10 bg-bgtext-800 rounded-full cursor-pointer">
              {cachedProfileImage ? (
                <AvatarImage
                  src={cachedProfileImage}
                  alt="User Avatar"
                  className="object-cover"
                />
              ) : userData?.data?.imageUrl ? (
                <AvatarImage
                  src={userData.data.imageUrl}
                  alt="User Avatar"
                  className="object-cover"
                  onError={(e) => {
                    // Hide the image if it fails to load, fallback will show
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : null}
              <AvatarFallback className="bg-bgtext-800 text-white text-sm">
                {userData?.data?.name ? userData.data.name.charAt(0).toUpperCase() : userSession?.user?.name?.charAt(0).toUpperCase() || "DF"}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderLayout;
