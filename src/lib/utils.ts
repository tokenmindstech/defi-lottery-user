import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

/**
 * Parse custom headers from string format supporting multiple formats:
 * - "key1=value1,key2=value2" (comma-separated)
 * - "key1=value1&key2=value2" (ampersand-separated)
 * Handles URL-encoded values with + signs and special characters
 */
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
