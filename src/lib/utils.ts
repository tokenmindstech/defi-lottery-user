import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

interface UrlQueryProps {
  params: string;
  key: string;
  value: string | null;
}

interface RemoveKeysProps {
  params: string;
  keysToRemove: string[];
}

interface FetchProxyProps {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: Record<string, unknown>;
  auth?: boolean;
  customHeaders?: Record<string, string>;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const formUrlQuery = ({ key, params, value }: UrlQueryProps) => {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveKeysProps) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

export const fetchProxy = async ({
  method,
  url,
  body,
  auth,
  customHeaders,
}: FetchProxyProps) => {
  try {
    let baseURL = auth
      ? `${process.env.NEXT_PUBLIC_APP_URL}/api/proxy-auth?target=${url}`
      : `${process.env.NEXT_PUBLIC_APP_URL}/api/proxy?target=${url}`;

    if (customHeaders) {
      const customHeadersToQuery = new URLSearchParams(
        customHeaders
      ).toString();
      baseURL += `&customHeaders=${customHeadersToQuery}`;
    }
    const response = await fetch(baseURL, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: method !== "GET" ? JSON.stringify(body) : undefined,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    console.error(`Error in ${method} ${url}:`, error);
    return error;
  }
};

export const parseCustomHeaders = (
  headersStr: string | null
): Record<string, string> => {
  if (!headersStr) return {};

  try {
    const headers: Record<string, string> = {};

    // Split by either comma or ampersand
    const pairs = headersStr.split("&");

    for (const pair of pairs) {
      // Find the first equals sign to split key/value
      const equalIndex = pair.indexOf("=");
      if (equalIndex === -1) continue;

      const key = pair.substring(0, equalIndex).trim();
      const value = pair.substring(equalIndex + 1).trim();

      if (key && value) {
        // Replace + with spaces in the value (URL decoding)
        headers[key] = value.replace(/\+/g, " ");
      }
    }

    return headers;
  } catch (error) {
    console.error("Error parsing custom headers:", error);
    return {};
  }
};

export const getTimestamp = (date: Date): string => {
  const now = new Date();
  const timeDifference = now.getTime() - date.getTime();

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (timeDifference < minute) {
    const seconds = Math.floor(timeDifference / 1000);
    return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
  } else if (timeDifference < hour) {
    const minutes = Math.floor(timeDifference / minute);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (timeDifference < day) {
    const hours = Math.floor(timeDifference / hour);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (timeDifference < week) {
    const days = Math.floor(timeDifference / day);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (timeDifference < month) {
    const weeks = Math.floor(timeDifference / week);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else if (timeDifference < year) {
    const months = Math.floor(timeDifference / month);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    const years = Math.floor(timeDifference / year);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }
};

export const toBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) {
    return str;
  }

  return str.slice(0, maxLength) + "...";
};

export const capitalizeFirstLetter = (str: string): string => {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
