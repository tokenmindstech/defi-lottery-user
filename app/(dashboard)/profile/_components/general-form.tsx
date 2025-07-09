"use client";

import React, { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  EnvelopeSimple,
  Spinner,
  TelegramLogo,
} from "@phosphor-icons/react/dist/ssr";
import { Switch } from "@/components/ui/switch";
import { cn, fetchProxy } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import BindUnbindGoogle from "./bind-unbind-google";
import ProfilePictureUpload from "./profile-picture-upload";
import Image from "next/image";
import { useCachedProfileImage } from "@/lib/use-cached-profile-image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  telegramId: z.string().optional(),
  email: z
    .string()
    .optional()
    .refine((val) => !val || z.string().email().safeParse(val).success, {
      message: "Invalid email address",
    }),

  notificationPreferences: z.enum(["TELEGRAM", "GOOGLE"]),
  twoFactorAuth: z.boolean(),
});

interface GeneralFormProps {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  userInfoResponse: UserInfoResponse;
}

const GeneralForm = ({
  isEditing,
  setIsEditing,
  userInfoResponse,
}: GeneralFormProps) => {
  const queryClient = useQueryClient();
  const { data: userSession } = useSession();
  
  // Get the latest profile data from React Query cache
  const latestProfileData = queryClient.getQueryData<APIGetUserProfileResponseDTO>(["profile", userSession?.user.id]);
  const currentUserInfo = latestProfileData?.data || userInfoResponse;
  
  // Track the user info as state to force re-renders - use current data
  const [userInfo, setUserInfo] = useState(currentUserInfo);
  
  // Update userInfo when the latest profile data changes
  useEffect(() => {
    setUserInfo(currentUserInfo);
  }, [currentUserInfo]);

  // Force re-render when profile image cache is cleared
  useEffect(() => {
    const handleCacheCleared = (event: CustomEvent) => {
      if (event.detail.userId === userSession?.user.id) {
        console.log("🔄 GeneralForm: Cache cleared event received, forcing refresh");
        // Force a re-render by updating the query cache
        queryClient.invalidateQueries({
          queryKey: ["profile", userSession?.user.id],
        });
      }
    };
    
    window.addEventListener('profileImageCacheCleared', handleCacheCleared as EventListener);
    return () => {
      window.removeEventListener('profileImageCacheCleared', handleCacheCleared as EventListener);
    };
  }, [userSession?.user.id, queryClient]);
  
  // Use cached profile image with the current image URL
  const { cachedImage: cachedProfileImage } = useCachedProfileImage(
    currentUserInfo.imageUrl,
    userSession?.user.id
  );

  // Debug logging
  useEffect(() => {
    console.log("🔍 GeneralForm Debug:", {
      cachedProfileImage: !!cachedProfileImage,
      currentUserInfoImageUrl: currentUserInfo.imageUrl,
      userId: userSession?.user.id,
      latestProfileData: !!latestProfileData
    });
  }, [cachedProfileImage, currentUserInfo.imageUrl, userSession?.user.id, latestProfileData]);

  // Initialize default notification preference
  const getDefaultNotificationPreference = useCallback(() => {
    const preferredVerifier = userInfo.verifiers.find(
      (verifier) => verifier.preferNotification
    );
    return preferredVerifier?.type === "GOOGLE" ? "GOOGLE" : "TELEGRAM";
  }, [userInfo.verifiers]);

  // Get verifier IDs with defaults to prevent undefined values
  const getTelegramId = useCallback(() => {
    return (
      userInfo.verifiers.find((verifier) => verifier.type === "TELEGRAM")?.id ||
      ""
    );
  }, [userInfo.verifiers]);

  const getEmailId = useCallback(() => {
    return (
      userInfo.verifiers.find((verifier) => verifier.type === "GOOGLE")?.id ||
      ""
    );
  }, [userInfo.verifiers]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userInfo.name,
      telegramId: getTelegramId(),
      email: getEmailId(),
      notificationPreferences: getDefaultNotificationPreference(),
      twoFactorAuth: true,
    },
  });

  const mutation = useMutation<
    APIBaseResponse | APIBaseErrorResponse,
    Error,
    { name: string; verifiers: Verifier[] }
  >({
    mutationKey: ["update-account"],
    mutationFn: async ({ name, verifiers }) =>
      fetchProxy({
        method: "PATCH",
        url: "user/profile",
        body: {
          name,
          verifiers,
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

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const newVerifiers = userInfoResponse.verifiers.map((verifier) => {
        if (verifier.type === "TELEGRAM") {
          return {
            ...verifier,
            preferNotification: data.notificationPreferences === "TELEGRAM",
          };
        }
        if (verifier.type === "GOOGLE") {
          return {
            ...verifier,
            preferNotification: data.notificationPreferences === "GOOGLE",
          };
        }
        return verifier;
      });
      const result = await mutation.mutateAsync({
        name: data.name,
        verifiers: newVerifiers,
      });

      if (isErrorResponse(result)) {
        toast.error(
          Array.isArray(result.message) ? result.message[0] : result.message,
          {
            id: `update-profile-error-${userSession?.user.id}`,
          }
        );
        return;
      }
      toast.success("Profile updated successfully", {
        id: `update-profile-success-${userSession?.user.id}`,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleResetForm = () => {
    form.reset({
      name: userInfo.name,
      telegramId: getTelegramId(),
      email: getEmailId(),
      notificationPreferences: getDefaultNotificationPreference(),
      twoFactorAuth: true,
    });
    setIsEditing(false);
  };

  // Update local state when props change
  useEffect(() => {
    setUserInfo(userInfoResponse);
  }, [userInfoResponse]);

  // Add effect to update form when userInfoResponse changes
  useEffect(() => {
    const notificationPreference = getDefaultNotificationPreference();

    form.reset({
      name: userInfo.name,
      telegramId: getTelegramId(),
      email: getEmailId(),
      notificationPreferences: notificationPreference,
      twoFactorAuth: true,
    });
  }, [
    form,
    getDefaultNotificationPreference,
    getTelegramId,
    getEmailId,
    userInfo.name,
  ]);

  return (
    <div className="flex flex-col space-y-5 p-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-bgtext-100 font-inter whitespace-nowrap">
          Profile
        </h2>
      </div>
      
      {/* Display current profile picture with edit button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            {cachedProfileImage ? (
              <Image
                src={cachedProfileImage}
                alt="Profile"
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
            ) : currentUserInfo.imageUrl ? (
              <Image
                src={currentUserInfo.imageUrl}
                alt="Profile"
                width={80}
                height={80}
                className="rounded-full object-cover"
                onError={(e) => {
                  // Hide image on error and show fallback
                  e.currentTarget.style.display = 'none';
                  const fallbackDiv = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallbackDiv) {
                    fallbackDiv.style.display = 'flex';
                  }
                }}
              />
            ) : null}
            
            {/* Fallback initial - only show when no image or on error */}
            <div 
              className="w-20 h-20 bg-bgtext-800 rounded-full flex items-center justify-center absolute inset-0"
              style={{ display: (!cachedProfileImage && !currentUserInfo.imageUrl) ? 'flex' : 'none' }}
            >
              <span className="text-xl text-white">
                {currentUserInfo.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-bgtext-400">Profile Picture</p>
          </div>
        </div>
        {isEditing && (
          <ProfilePictureUpload 
            userInfoResponse={currentUserInfo}
            setIsEditing={setIsEditing}
          />
        )}
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-5"
        >
          <div
            className={cn(
              "grid grid-cols-1 md:grid-cols-2 gap-5",
              isEditing && "mb-0"
            )}
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 h-fit">
                  <FormLabel className="text-bgtext-100 font-inter font-medium text-sm">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Name"
                      disabled={!isEditing}
                      className="w-full h-12 bg-bgtext-900 border-1 border-bgtext-800 text-sm rounded-lg text-bgtext-100 selection:bg-bgtext-100 selection:text-bgtext-900 focus-visible:ring-0 focus-visible:border-[1px] focus-visible:border-bgtext-100 focus-visible:ring-bgtext-100"
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="telegramId"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1 h-fit">
                  <FormLabel className="text-bgtext-100 font-inter font-medium text-sm">
                    Telegram ID
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Telegram ID"
                      disabled
                      className="w-full h-12 bg-bgtext-900 border-1 border-bgtext-800 text-sm rounded-lg text-bgtext-100 selection:bg-bgtext-100 selection:text-bgtext-900 focus-visible:ring-0 focus-visible:border-[1px] focus-visible:border-bgtext-100 focus-visible:ring-bgtext-100"
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col space-y-2 mb-0 col-span-2 md:col-span-1">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-bgtext-100 font-inter font-medium text-sm">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        disabled
                        className="w-full h-12 bg-bgtext-900 border-1 border-bgtext-800 text-sm rounded-lg text-bgtext-100 selection:bg-bgtext-100 selection:text-bgtext-900 focus-visible:ring-0 focus-visible:border-[1px] focus-visible:border-bgtext-100 focus-visible:ring-bgtext-100"
                        value={field.value || ""}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isEditing && (
                <BindUnbindGoogle
                  setIsEditing={setIsEditing}
                  userInfoResponse={userInfoResponse}
                />
              )}
            </div>
          </div>

          <Separator className="bg-bgtext-800  mask-l-from-80% mask-r-from-80%" />

          <div className="flex flex-col space-y-5">
            <h2 className="text-sm font-medium text-bgtext-100 font-inter whitespace-nowrap">
              Notification Preferences
            </h2>

            <div className="flex flex-row items-center justify-start space-x-10">
              {userInfo.verifiers.some(
                (verifier) => verifier.type === "TELEGRAM"
              ) && (
                <FormField
                  name="notificationPreferences"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2">
                      <div className="flex flex-row items-center space-x-2">
                        <div className="bg-bgtext-100 rounded-full p-1">
                          <TelegramLogo className="text-bgtext-900 size-4" />
                        </div>
                        <FormLabel className="text-bgtext-100 font-inter font-medium text-sm">
                          Telegram
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          id="telegram"
                          checked={field.value === "TELEGRAM"}
                          disabled={
                            !isEditing || userInfo.verifiers.length === 1
                          }
                          className={cn(
                            "w-8 h-5 cursor-pointer data-[state=checked]:bg-linprimary-start data-[state=unchecked]:bg-linblack-start",
                            !isEditing && "cursor-not-allowed opacity-70"
                          )}
                          onCheckedChange={(checked) =>
                            field.onChange(checked ? "TELEGRAM" : "GOOGLE")
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
              {userInfo.verifiers.some(
                (verifier) => verifier.type === "GOOGLE"
              ) && (
                <FormField
                  name="notificationPreferences"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2">
                      <div className="flex flex-row items-center space-x-2">
                        <div className="bg-bgtext-100 rounded-full p-1">
                          <EnvelopeSimple className="text-bgtext-900 size-4" />
                        </div>
                        <FormLabel className="text-bgtext-100 font-inter font-medium text-sm">
                          Email
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          id="email"
                          checked={field.value === "GOOGLE"}
                          disabled={!isEditing}
                          className={cn(
                            "w-8 h-5 cursor-pointer data-[state=checked]:bg-linprimary-start data-[state=unchecked]:bg-linblack-start",
                            !isEditing && "cursor-not-allowed opacity-70"
                          )}
                          onCheckedChange={(checked) =>
                            field.onChange(checked ? "GOOGLE" : "TELEGRAM")
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>

          <Separator className="bg-bgtext-800 mask-l-from-80% mask-r-from-80%" />

          <div className="flex flex-col space-y-5">
            <h2 className="text-sm font-medium text-bgtext-100 font-inter whitespace-nowrap">
              Two-Factor Authentication
            </h2>

            <div className="flex flex-row items-center justify-start space-x-10">
              <FormField
                name="twoFactorAuth"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2">
                    <FormControl>
                      <Switch
                        disabled
                        checked={field.value}
                        className={cn(
                          "w-8 h-5 cursor-not-allowed data-[state=checked]:bg-linprimary-start opacity-70"
                        )}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex flex-row items-center justify-end space-x-5">
              <Button
                type="button"
                onClick={handleResetForm}
                disabled={form.formState.isSubmitting}
                className="bg-bgtext-800 border-2 border-bgtext-700 hover:bg-bgtext-700 rounded-lg cursor-pointer"
              >
                Reset to Default
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="bg-gradient-to-b from-linprimary-start to-linprimary-end text-bgtext-100 hover:bg-gradient-to-b border-2 border-bgtext-800 hover:from-linprimary-start hover:to-linprimary-end/50 rounded-lg cursor-pointer ease-out transition-all duration-300"
              >
                {form.formState.isSubmitting ? (
                  <div className="flex flex-row items-center justify-center space-x-2">
                    <Spinner className="size-5 fill-bgtext-100 animate-spin" />
                    <p className="text-bgtext-100 font-inter font-medium text-sm">
                      Saving...
                    </p>
                  </div>
                ) : (
                  <p className="text-bgtext-100 font-inter font-medium text-sm">
                    Save Changes
                  </p>
                )}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default GeneralForm;
