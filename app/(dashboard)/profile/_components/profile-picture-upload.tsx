import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { fetchProxy, toBase64 } from "@/lib/utils";
import { cacheProfileImage, useCachedProfileImage } from "@/lib/use-cached-profile-image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { Spinner } from "@phosphor-icons/react/dist/ssr";
import { Trash } from "lucide-react";
import Image from "next/image";

interface ProfilePictureUploadProps {
  userInfoResponse: UserInfoResponse;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfilePictureUpload = ({
  userInfoResponse,
  setIsEditing,
}: ProfilePictureUploadProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const queryClient = useQueryClient();
  const { data: userSession } = useSession();
  
  // Use the cached image hook
  const { cachedImage: cachedProfileImage } = useCachedProfileImage(
    userInfoResponse.imageUrl, 
    userSession?.user.id
  );

  const mutation = useMutation<
    APIBaseResponse | APIBaseErrorResponse,
    Error,
    { imageUrl: string }
  >({
    mutationKey: ["update-profile-picture"],
    mutationFn: async ({ imageUrl }) =>
      fetchProxy({
        method: "PATCH",
        url: "user/profile",
        body: {
          name: userInfoResponse.name,
          verifiers: userInfoResponse.verifiers,
          imageUrl,
        },
        auth: true,
      }),
    onSuccess: (data, variables) => {
      // Cache the preview image for immediate use
      if (previewUrl && userSession?.user.id) {
        cacheProfileImage(variables.imageUrl, userSession.user.id, previewUrl);
      }
      
      // Update ALL profile-related query caches
      const updateProfileData = (oldData: APIGetUserProfileResponseDTO | undefined) => {
        if (oldData) {
          return {
            ...oldData,
            data: {
              ...oldData.data,
              imageUrl: variables.imageUrl,
            },
          };
        }
        return oldData;
      };

      // Update specific user profile cache
      queryClient.setQueryData(["profile", userSession?.user.id], updateProfileData);
      
      // Update generic profile cache if it exists
      queryClient.setQueryData(["profile"], updateProfileData);
      
      // Force invalidate all profile queries to trigger re-renders
      queryClient.invalidateQueries({
        queryKey: ["profile"],
        refetchType: "none", // Don't refetch, just mark as stale
      });
      
      // Force re-render by updating the query timestamp
      setTimeout(() => {
        queryClient.refetchQueries({
          queryKey: ["profile", userSession?.user.id],
        });
      }, 100);
      
      // Additional debug: Check if cache is being set properly
      console.log("🔄 Upload success - checking cache state:", {
        newImageUrl: variables.imageUrl,
        userId: userSession?.user.id,
        previewCached: !!previewUrl
      });
    },
    onError: (error) => {
      console.error("Profile update failed:", error);
    },
  });

  const isErrorResponse = (
    response: APIBaseResponse | APIBaseErrorResponse
  ): response is APIBaseErrorResponse => {
    return "statusCode" in response && response.statusCode >= 400;
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select a valid image file");
      return;
    }

    // Validate file size (5MB maximum)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    // Validate image dimensions
    const img = new window.Image();
    img.onload = () => {
      if (img.width < 300 || img.height < 300) {
        toast.error("Image must be at least 300×300 pixels");
        return;
      }
      setSelectedFile(file);
    };
    
    const base64 = await toBase64(file);
    setPreviewUrl(base64 as string);
    img.src = base64 as string;
  };

  const handleUploadImage = useCallback(async (): Promise<string> => {
    if (!selectedFile) throw new Error("No file selected");

    const formData = new FormData();
    formData.append("file", selectedFile);

    const uploadResult = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/upload?folderName=profiles`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!uploadResult.ok) {
      throw new Error("Failed to upload image");
    }

    const result = await uploadResult.json();
    return result.url;
  }, [selectedFile]);

  const handleSaveChanges = useCallback(async () => {
    if (!selectedFile) {
      toast.error("Please select an image");
      return;
    }

    try {
      setIsLoading(true);
      
      // Upload the image
      const imageUrl = await handleUploadImage();

      // Update profile with new image URL
      const result = await mutation.mutateAsync({ imageUrl });

      if (isErrorResponse(result)) {
        toast.error(
          Array.isArray(result.message) ? result.message[0] : result.message,
          {
            id: `update-profile-picture-error-${userSession?.user.id}`,
          }
        );
        return;
      }

      toast.success("Profile picture updated successfully", {
        id: `update-profile-picture-success-${userSession?.user.id}`,
      });
      
      setIsOpen(false);
      setSelectedFile(null);
      setPreviewUrl("");
      setIsEditing(false);
    } catch (error) {
      console.error("Profile picture update failed:", error);
      toast.error("Failed to update profile picture");
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile, mutation, userSession?.user.id, setIsEditing, handleUploadImage]);

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          type="button"
          className="text-sm border-bgtext-700 bg-bgtext-800 hover:bg-bgtext-700 text-bgtext-100"
        >
          Edit Profile Picture
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm md:max-w-md h-fit overflow-y-auto bg-black border border-bgtext-800 rounded-3xl" aria-describedby="profile-picture-description">
        <DialogHeader className="text-center">
          <DialogTitle className="text-bgtext-100 font-inter font-semibold text-xl">Edit Profile Picture</DialogTitle>
        </DialogHeader>
        
        <div className="flex gap-6 px-6 py-4">
          {/* Profile Image Display - Left Side */}
          <div className="flex-shrink-0">
            {previewUrl ? (
              <div className="relative">
                <div className="w-32 h-32 rounded-3xl overflow-hidden bg-gradient-to-b from-blue-400 to-blue-600 p-1">
                  <Image
                    src={previewUrl}
                    alt="Profile preview"
                    width={120}
                    height={120}
                    className="w-full h-full rounded-3xl object-cover"
                  />
                </div>
                <button
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                  aria-label="Remove selected image"
                >
                  <Trash size={16} />
                </button>
              </div>
            ) : userInfoResponse.imageUrl ? (
              <div className="relative">
                <div className="w-32 h-32 rounded-3xl overflow-hidden bg-gradient-to-b from-blue-400 to-blue-600 p-1">
                  {cachedProfileImage ? (
                    <Image
                      src={cachedProfileImage}
                      alt="Current profile"
                      width={120}
                      height={120}
                      className="w-full h-full rounded-3xl object-cover"
                    />
                  ) : (
                    <>
                      <Image
                        src={userInfoResponse.imageUrl}
                        alt="Current profile"
                        width={120}
                        height={120}
                        className="w-full h-full rounded-3xl object-cover"
                        onError={(e) => {
                          // Fallback to initials if image fails to load
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="w-full h-full bg-bgtext-800 rounded-3xl flex items-center justify-center absolute inset-0">
                        <span className="text-2xl text-white font-medium">
                          {userInfoResponse.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-b from-blue-400 to-blue-600 p-1">
                <div className="w-full h-full bg-bgtext-800 rounded-3xl flex items-center justify-center">
                  <span className="text-2xl text-white font-medium">
                    {userInfoResponse.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            )}
          </div>
          
          {/* Right Side Content */}
          <div className="flex flex-col justify-center space-y-4 flex-1">
            {/* File Requirements Text */}
            <div id="profile-picture-description">
              <p className="text-bgtext-400 text-sm">
                JPG, PNG, or GIF format with 5MB maximum file size
              </p>
              <p className="text-bgtext-400 text-sm">
                and minimum resolution of 300 × 300 pixels
              </p>
            </div>
            
            {/* File Upload Button */}
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="profile-picture-input"
              />
              <label
                htmlFor="profile-picture-input"
                className="inline-block cursor-pointer bg-bgtext-800 hover:bg-bgtext-700 text-bgtext-100 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
              >
                Choose image
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="px-6 pb-6">
          <Button
            onClick={handleSaveChanges}
            disabled={isLoading || !selectedFile}
            className="w-full bg-gradient-to-b from-linprimary-start to-linprimary-end text-bgtext-100 hover:bg-gradient-to-b border-2 border-bgtext-800 hover:from-linprimary-start hover:to-linprimary-end/50 rounded-xl cursor-pointer ease-out transition-all duration-300 py-3 font-medium"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner className="animate-spin" size={16} />
                <span>Saving...</span>
              </div>
            ) : (
              "Save changes"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePictureUpload;
