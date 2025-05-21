"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ProfileMenu from "./components/menu";
import { Fragment, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProxy, formUrlQuery } from "@/lib/utils";
import { useSession } from "next-auth/react";
import ProfileSkeleton from "./components/skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { PROFILE_MENU_ITEMS, ProfileMenuType } from "@/constant/common";

const ProfilePage = () => {
  const searchParams = useSearchParams();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<ProfileMenuType>(
    (searchParams.get("tab") as ProfileMenuType) &&
      PROFILE_MENU_ITEMS.some((item) => item.value === searchParams.get("tab"))
      ? (searchParams.get("tab") as ProfileMenuType)
      : "general"
  );

  const router = useRouter();
  const { data: userSession } = useSession();
  const { data: userData, isLoading } = useQuery<APIGetUserProfileResponseDTO>({
    queryKey: ["profile", userSession?.user.id],
    queryFn: async () =>
      fetchProxy({
        url: "user/profile",
        method: "GET",
        auth: true,
      }),
    enabled: !!userSession,
    staleTime: 0,
  });

  const handleChangeMenu = (menu: ProfileMenuType) => {
    setActiveTab(menu);
    const updatedParams = searchParams.toString();

    const newUrl = formUrlQuery({
      params: updatedParams.replace("/?", ""),
      key: "tab",
      value: menu,
    });

    router.push(decodeURIComponent(newUrl), { scroll: false });
  };

  return (
    <section className="flex flex-col w-full h-full space-y-10">
      <h2 className="text-3xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
        Profile
      </h2>

      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        userData !== undefined &&
        userData !== null && (
          <Fragment>
            <div className="flex flex-col items-start justify-start w-full h-full p-5 space-y-5 lg:flex-row lg:space-y-0 lg:items-center lg:justify-between">
              <div className="flex flex-row items-center justify-center space-x-5">
                <Avatar className="w-20 h-20 cursor-pointer bg-bgtext-800 rounded-xl">
                  <AvatarImage
                    src="/assets/images/user.jpeg"
                    alt="User Avatar"
                    className="object-cover"
                  />
                  <AvatarFallback>DF</AvatarFallback>
                </Avatar>

                <div className="flex flex-col space-y-2">
                  <h2 className="text-2xl font-semibold text-bgtext-100 font-inter whitespace-nowrap">
                    {userData.data.name}
                  </h2>

                  <p className="px-4 py-1 text-base border-2 rounded-lg text-bgtext-100 font-inter bg-gradient-to-b from-lindeepgreen-start/40 to-black border-bgtext-800">
                    Premium
                  </p>
                </div>
              </div>

              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="border rounded-lg cursor-pointer w-fit bg-bgtext-800 border-bgtext-700 hover:bg-bgtext-700"
              >
                <p className="py-4 text-sm font-medium text-bgtext-100 font-inter">
                  Edit Profile
                </p>
              </Button>
            </div>

            <ProfileMenu
              userInfoResponse={userData.data}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              activeTab={activeTab}
              handleChangeMenu={handleChangeMenu}
            />
          </Fragment>
        )
      )}
    </section>
  );
};

export default ProfilePage;
