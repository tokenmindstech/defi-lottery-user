/**
 * @file api-response.d.ts
 * @description This file contains TypeScript types for API responses.
 */

export {};

declare global {
  type RoleType = "USER" | "ADMIN";
  type ProviderType = "GOOGLE" | "TELEGRAM";
  interface APIBaseResponse {
    message: string;
    metadata?: {
      page?: number;
      limit?: number;
      totalPage?: number;
    };
    data?: unknown;
    statusCode: number;
  }

  interface APIBaseErrorResponse {
    error: string;
    message: string[];
    statusCode: number;
  }

  interface APILoginResponseDTO extends APIBaseResponse {
    data: {
      user: {
        id: string;
        name: string;
        email: string | null;
        roles: RoleType[];
        provider: ProviderType;
        isTwoFactorSetup: boolean;
        authenticated: boolean;
      };
      access_token: string;
    };
  }
}
