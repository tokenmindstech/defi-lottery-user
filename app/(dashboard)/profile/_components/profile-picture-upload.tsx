import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
      
      // Update the cache directly with the imageUrl we sent
      queryClient.setQueryData(
        ["profile", userSession?.user.id],
        (oldData: APIGetUserProfileResponseDTO | undefined) => {
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
        }
      );
      
      // Don't invalidate immediately as it might overwrite our cache update
      // Instead, mark the data as fresh since we just updated it
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
        toast.error("Image must be at least 300x300 pixels");
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
          Edit Profile Photo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-bgtext-950 border-bgtext-800" aria-describedby="profile-picture-description">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Profile Photo</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            {previewUrl ? (
              <div className="relative">
                <Image
                  src={previewUrl}
                  alt="Profile preview"
                  width={120}
                  height={120}
                  className="rounded-full object-cover"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  aria-label="Remove selected image"
                >
                  <Trash size={12} />
                </button>
              </div>
            ) : userInfoResponse.imageUrl ? (
              <div className="relative">
                {cachedProfileImage ? (
                  <Image
                    src={cachedProfileImage}
                    alt="Current profile"
                    width={120}
                    height={120}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <>
                    <Image
                      src={userInfoResponse.imageUrl}
                      alt="Current profile"
                      width={120}
                      height={120}
                      className="rounded-full object-cover"
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="w-[120px] h-[120px] bg-bgtext-800 rounded-full flex items-center justify-center absolute inset-0">
                      <span className="text-2xl text-white">
                        {userInfoResponse.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="w-[120px] h-[120px] bg-bgtext-800 rounded-full flex items-center justify-center">
                <span className="text-2xl text-white">
                  {userInfoResponse.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          
          <div id="profile-picture-description" className="text-center text-sm text-bgtext-400">
            <p>JPG, PNG, or GIF format with 5MB maximum</p>
            <p>file size and minimum resolution of 300 x 300 pixels.</p>
          </div>
          
          <div className="flex gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="profile-picture-input"
            />
            <label
              htmlFor="profile-picture-input"
              className="cursor-pointer bg-bgtext-800 hover:bg-bgtext-700 text-white px-4 py-2 rounded-md text-sm"
            >
              Choose Image
            </label>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSaveChanges}
            disabled={isLoading || !selectedFile}
            className="bg-primary-600 hover:bg-primary-700 text-white"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Spinner className="animate-spin" size={16} />
                Saving...
              </div>
            ) : (
              "Save changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePictureUpload;
