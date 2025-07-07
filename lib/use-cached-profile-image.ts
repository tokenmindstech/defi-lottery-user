import { useEffect, useState } from 'react';

// Cache for storing uploaded images
const imageCache = new Map<string, string>();

// Utility function to get cached image
export const getCachedProfileImage = (imageUrl: string, userId: string): string | null => {
  if (!imageUrl || !userId) return null;
  
  // First check in-memory cache
  if (imageCache.has(imageUrl)) {
    return imageCache.get(imageUrl)!;
  }
  
  // Then check localStorage
  try {
    const cachedUrl = localStorage.getItem(`profile_image_url_${userId}`);
    const cachedImage = localStorage.getItem(`profile_image_${userId}`);
    
    if (cachedUrl === imageUrl && cachedImage) {
      // Store back in memory cache for faster access
      imageCache.set(imageUrl, cachedImage);
      return cachedImage;
    }
  } catch (error) {
    // Handle localStorage access errors
    console.warn('Unable to access localStorage:', error);
  }
  
  return null;
};

// Cache a profile image
export const cacheProfileImage = (imageUrl: string, userId: string, base64Image: string): void => {
  if (!imageUrl || !userId || !base64Image) return;
  
  // Store in memory cache
  imageCache.set(imageUrl, base64Image);
  
  // Store in localStorage
  try {
    localStorage.setItem(`profile_image_${userId}`, base64Image);
    localStorage.setItem(`profile_image_url_${userId}`, imageUrl);
  } catch (error) {
    console.warn('Unable to cache profile image in localStorage:', error);
  }
};

// Clear cache for a user (useful for logout)
export const clearProfileImageCache = (userId: string): void => {
  try {
    localStorage.removeItem(`profile_image_${userId}`);
    localStorage.removeItem(`profile_image_url_${userId}`);
    
    // Clear from memory cache as well
    const cachedUrl = localStorage.getItem(`profile_image_url_${userId}`);
    if (cachedUrl) {
      imageCache.delete(cachedUrl);
    }
  } catch (error) {
    console.warn('Unable to clear profile image cache:', error);
  }
};

// Hook to get cached profile image with reactive updates
export const useCachedProfileImage = (imageUrl: string | undefined, userId: string | undefined) => {
  const [cachedImage, setCachedImage] = useState<string | null>(null);
  const [shouldTryS3, setShouldTryS3] = useState<boolean>(false);
  
  useEffect(() => {
    if (userId) {
      // First check if we have any cached image for this user (even if imageUrl is undefined)
      let cached: string | null = null;
      
      if (imageUrl) {
        // Try to get cache for the specific imageUrl
        cached = getCachedProfileImage(imageUrl, userId);
      } else {
        // If imageUrl is undefined, try to get any cached image for this user
        try {
          const lastCachedImage = localStorage.getItem(`profile_image_${userId}`);
          if (lastCachedImage) {
            cached = lastCachedImage;
          }
        } catch (error) {
          console.warn('Unable to access localStorage:', error);
        }
      }
      
      if (cached) {
        setCachedImage(cached);
        setShouldTryS3(false);
      } else {
        setCachedImage(null);
        setShouldTryS3(!!imageUrl);
      }
    } else {
      setCachedImage(null);
      setShouldTryS3(false);
    }
  }, [imageUrl, userId]);
  
  return { cachedImage, shouldTryS3 };
};
