"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ProfileMenu from "./components/menu";
import { Fragment, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProxy } from "@/lib/utils";
import { useSession } from "next-auth/react";
import ProfileSkeleton from "./components/skeleton";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { data: userSession } = useSession();
  const { data: userData, isLoading } = useQuery<APIGetUserProfileResponseDTO>({
    queryKey: ["profile"],
    queryFn: async () =>
      fetchProxy({
        url: "user/profile",
        method: "GET",
        auth: true,
      }),
    enabled: !!userSession,
  });

  console.log("User Data:", userData);

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
            <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 items-start justify-start lg:items-center lg:justify-between w-full h-full p-5">
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
                    {userData.data.name}
                  </h2>

                  <p className="text-base text-bgtext-100 font-inter py-1 px-4 bg-gradient-to-b from-lindeepgreen-start/40 to-black rounded-lg border-2 border-bgtext-800">
                    Premium
                  </p>
                </div>
              </div>

              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="w-fit bg-bgtext-800 border border-bgtext-700 hover:bg-bgtext-700 rounded-lg cursor-pointer"
              >
                <p className="text-bgtext-100 font-inter font-medium text-sm py-4">
                  Edit Profile
                </p>
              </Button>
            </div>

            <ProfileMenu
              verifiers={userData.data.verifiers}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          </Fragment>
        )
      )}
    </section>
  );
};

export default ProfilePage;
