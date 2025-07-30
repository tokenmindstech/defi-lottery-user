"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ProfileMenu from "./_components/menu";
import { Fragment, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProxy, formUrlQuery } from "@/lib/utils";
import { useCachedProfileImage } from "@/lib/use-cached-profile-image";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { PROFILE_MENU_ITEMS, ProfileMenuType } from "@/constant/common";
import PlanBadge from "@/components/shared/plan-badge";
import SkeletonProfile from "./_components/skeleton-profile";
import ResultDisplay from "@/components/shared/result-display";

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
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery<APIGetUserProfileResponseDTO>({
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

      <ResultDisplay
        isLoading={isLoading}
        error={error}
        data={userData}
        loadingComponent={<SkeletonProfile />}
        dataErrorMessage="An error occurred while fetching user profile."
        loadingErrorMessage="Failed to load user profile. Please try again later."
      >
        {(userData) => (
          <Fragment>
            <div className="flex flex-col items-start justify-start w-full h-full p-5 space-y-5 lg:flex-row lg:space-y-0 lg:items-center lg:justify-between">
              <div className="flex flex-row items-center justify-center space-x-5">
                <Avatar className="w-20 h-20 cursor-pointer bg-bgtext-800 rounded-xl">
                  {cachedProfileImage ? (
                    <AvatarImage
                      src={cachedProfileImage}
                      alt="User Avatar"
                      className="object-cover"
                    />
                  ) : userData.data.imageUrl ? (
                    <AvatarImage
                      src={userData.data.imageUrl}
                      alt="User Avatar"
                      className="object-cover"
                      onError={(e) => {
                        // Hide the image if it fails to load, fallback will show
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : null}
                  <AvatarFallback className="bg-bgtext-800 text-white text-xl">
                    {userData.data.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col space-y-2">
                  <h2 className="text-2xl font-semibold text-bgtext-100 font-inter whitespace-nowrap">
                    {userData.data.name}
                  </h2>

                  <PlanBadge
                    type={userData.data.subscription?.type || "EXPLORE"}
                  />
                </div>
              </div>

              {activeTab === "general" && (
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  className="border rounded-lg cursor-pointer w-fit bg-bgtext-800 border-bgtext-700 hover:bg-bgtext-700"
                >
                  <p className="py-4 text-sm font-medium text-bgtext-100 font-inter">
                    Edit Profile
                  </p>
                </Button>
              )}
            </div>

            <ProfileMenu
              userInfoResponse={userData.data}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              activeTab={activeTab}
              handleChangeMenu={handleChangeMenu}
            />
          </Fragment>
        )}
      </ResultDisplay>
    </section>
  );
};

export default ProfilePage;
