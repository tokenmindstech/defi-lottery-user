import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { fetchProxy, toBase64 } from "@/lib/utils";
import { useCachedProfileImage, forceRefreshProfileImageCache } from "@/lib/use-cached-profile-image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { Spinner } from "@phosphor-icons/react/dist/ssr";
import { Trash } from "lucide-react";
import Image from "next/image";
import Cropper from "react-easy-crop";

// Cropping utility functions
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new window.Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

const getCroppedImg = async (
  imageSrc: string, 
  pixelCrop: { width: number; height: number; x: number; y: number }
): Promise<string> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return canvas.toDataURL('image/jpeg', 0.9);
};

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
  
  // Cropping state
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    width: number;
    height: number;
    x: number;
    y: number;
  } | null>(null);
  const [showCropper, setShowCropper] = useState(false);

  const queryClient = useQueryClient();
  const { data: userSession } = useSession();
  
  // Use the cached image hook
  const { cachedImage: cachedProfileImage } = useCachedProfileImage(
    userInfoResponse.imageUrl, 
    userSession?.user.id
  );

  // Debug: Log modal state
  useEffect(() => {
    console.log("🖼️ ProfilePictureUpload Modal Debug:", {
      isOpen,
      cachedProfileImage: !!cachedProfileImage,
      userImageUrl: userInfoResponse.imageUrl,
      userId: userSession?.user.id,
    });
  }, [isOpen, cachedProfileImage, userInfoResponse.imageUrl, userSession?.user.id]);

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
      // Clear and force refresh the cache to ensure all components update
      if (userSession?.user.id) {
        forceRefreshProfileImageCache(userSession.user.id);
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
      
      // Force invalidate all profile queries to trigger re-renders and fresh fetches
      queryClient.invalidateQueries({
        queryKey: ["profile"],
        refetchType: "all", // Force refetch to get new image from S3
      });
      
      // Force immediate re-render by updating the query timestamp
      setTimeout(() => {
        queryClient.refetchQueries({
          queryKey: ["profile", userSession?.user.id],
        });
        // Also refetch any generic profile queries
        queryClient.refetchQueries({
          queryKey: ["profile"],
        });
      }, 100);
      
      // Additional debug: Check new image URL
      console.log("🔄 Upload success - new image uploaded:", {
        newImageUrl: variables.imageUrl,
        userId: userSession?.user.id,
        cacheCleared: true
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

  // Cropping callback functions
  const onCropComplete = useCallback(
    (
      croppedArea: { width: number; height: number; x: number; y: number }, 
      croppedAreaPixels: { width: number; height: number; x: number; y: number }
    ) => {
      setCroppedAreaPixels(croppedAreaPixels);
    }, 
    []
  );

  const handleCropImage = useCallback(async () => {
    if (!previewUrl || !croppedAreaPixels) return previewUrl;
    
    try {
      const croppedImage = await getCroppedImg(previewUrl, croppedAreaPixels);
      return croppedImage;
    } catch (error) {
      console.error('Error cropping image:', error);
      return previewUrl;
    }
  }, [previewUrl, croppedAreaPixels]);

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
      setShowCropper(true); // Enable cropper when image is loaded
    };
    
    const base64 = await toBase64(file);
    setPreviewUrl(base64 as string);
    img.src = base64 as string;
  };

  const handleSaveChanges = useCallback(async () => {
    if (!selectedFile) {
      toast.error("Please select an image");
      return;
    }

    try {
      setIsLoading(true);
      
      // Get the image to upload (cropped if cropper was used, otherwise original)
      let imageToUpload = previewUrl;
      if (showCropper && croppedAreaPixels) {
        imageToUpload = await handleCropImage();
      }
      
      // Convert base64 to blob for upload
      const response = await fetch(imageToUpload);
      const blob = await response.blob();
      const fileToUpload = new File([blob], selectedFile.name, { type: selectedFile.type });
      
      // Create FormData for upload
      const formData = new FormData();
      formData.append("file", fileToUpload);

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

      const uploadResponse = await uploadResult.json();
      const imageUrl = uploadResponse.url;

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
      setShowCropper(false);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Profile picture update failed:", error);
      toast.error("Failed to update profile picture");
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile, mutation, userSession?.user.id, setIsEditing, previewUrl, showCropper, croppedAreaPixels, handleCropImage]);

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setShowCropper(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
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
        
        <DialogContent className="max-w-sm md:max-w-md overflow-y-auto bg-black border border-bgtext-800 rounded-3xl" aria-describedby="profile-picture-description">
          {/* Modal-specific gradient at top */}
          <div 
            className="absolute top-0 left-0 right-0 h-48 pointer-events-none rounded-t-3xl"
            style={{
              background: `radial-gradient(ellipse 400px 200px at center top, 
                rgba(139, 69, 219, 0.8) 0%, 
                rgba(139, 69, 219, 0.6) 30%, 
                rgba(139, 69, 219, 0.3) 60%, 
                transparent 100%)`
            }}
          />
        <DialogHeader className="text-center relative z-10">
          <DialogTitle className="text-bgtext-100 font-inter font-semibold text-xl">Edit Profile Picture</DialogTitle>
        </DialogHeader>
        
        <div className="flex gap-6 px-6 py-4 relative z-10">
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
                    <Image
                      src={userInfoResponse.imageUrl}
                      alt="Current profile"
                      width={120}
                      height={120}
                      className="w-full h-full rounded-3xl object-cover"
                      onError={(e) => {
                        // Hide image on error and show fallback
                        e.currentTarget.style.display = 'none';
                        const fallbackDiv = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallbackDiv) {
                          fallbackDiv.style.display = 'flex';
                        }
                      }}
                    />
                  )}
                  
                  {/* Fallback initial - only show when image fails to load */}
                  <div 
                    className="w-full h-full bg-bgtext-800 rounded-3xl flex items-center justify-center absolute inset-0"
                    style={{ display: cachedProfileImage ? 'none' : 'none' }}
                  >
                    <span className="text-2xl text-white font-medium">
                      {userInfoResponse.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
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
                Choose Picture
              </label>
            </div>
          </div>
        </div>

        {/* Image Cropping Interface */}
        {showCropper && previewUrl && (
          <div className="px-6 py-4 relative z-10">
            <div className="space-y-4">
              {/* Cropping Header */}
              <div className="text-center">
                <h3 className="text-bgtext-100 font-medium mb-2">Adjust Your Photo</h3>
                <p className="text-bgtext-400 text-sm">Drag to reposition • Use zoom to resize</p>
              </div>
              
              {/* Cropper Container */}
              <div className="relative w-full h-64 bg-black rounded-lg overflow-hidden">
                <Cropper
                  image={previewUrl}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  showGrid={false}
                  cropShape="round"
                  style={{
                    containerStyle: {
                      backgroundColor: '#000',
                    },
                    cropAreaStyle: {
                      border: '2px solid rgba(139, 69, 219, 0.8)',
                      boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
                    },
                  }}
                />
              </div>
              
              {/* Zoom Control */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-bgtext-300 text-sm min-w-[40px]">Zoom:</span>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="flex-1 h-2 bg-bgtext-700 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, rgb(139, 69, 219) 0%, rgb(139, 69, 219) ${((zoom - 1) / 2) * 100}%, rgb(55, 65, 81) ${((zoom - 1) / 2) * 100}%, rgb(55, 65, 81) 100%)`,
                    }}
                  />
                  <span className="text-bgtext-300 text-sm min-w-[35px]">{zoom.toFixed(1)}x</span>
                </div>
              </div>
              
              {/* Cropping Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowCropper(false)}
                  variant="outline"
                  className="flex-1 border-bgtext-700 bg-bgtext-800 hover:bg-bgtext-700 text-bgtext-100"
                >
                  Skip Crop
                </Button>
                <Button
                  onClick={() => {
                    // Reset crop to center when user wants to recrop
                    setCrop({ x: 0, y: 0 });
                    setZoom(1);
                  }}
                  variant="outline"
                  className="flex-1 border-bgtext-700 bg-bgtext-800 hover:bg-bgtext-700 text-bgtext-100"
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Gradient line separator */}
        <div className="px-6 relative z-10">
          <div className="relative h-px">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500/60 to-transparent"></div>
          </div>
        </div>

        {/* Save Button */}
        <div className="px-6 pb-6 pt-4 relative z-10 flex justify-center">
          <Button
            onClick={handleSaveChanges}
            disabled={isLoading || !selectedFile}
            className="px-8 py-3 bg-gradient-to-b from-linprimary-start to-linprimary-end text-bgtext-100 hover:bg-gradient-to-b border-2 border-bgtext-800 hover:from-linprimary-start hover:to-linprimary-end/50 rounded-xl cursor-pointer ease-out transition-all duration-300 font-medium min-w-[160px]"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner className="animate-spin" size={16} />
                <span>Saving...</span>
              </div>
            ) : (
              "Save Change"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePictureUpload;
