/**
 * @file api-response.d.ts
 * @description This file contains TypeScript types for API responses.
 */

export {};

declare global {
  type ProviderType = "GOOGLE" | "TELEGRAM";
  type RoleType = "USER" | "ADMIN" | "AGENT";
  type TicketIssueType = "BILLING" | "ACCOUNT" | "TECHNICAL" | "OTHER";

  interface Verifier {
    id: string;
    type: ProviderType;
    preferNotification: boolean;
    userId: string;
  }

  interface UserInfoResponse {
    id: string;
    email: string;
    name: string;
    roles: RoleType[];
    createdAt: string;
    updatedAt: string;
    twoFactorAuthId: string | null;
    subscriptionId: string | null;
    verifiers: Verifier[];
    subscription: unknown | null;
  }

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
        verifiers: Verifier[];
        isTwoFactorSetup: boolean;
        authenticated: boolean;
      };
      access_token: string;
    };
  }

  interface APIGenerate2FAResponseDTO extends APIBaseResponse {
    data: {
      userId: string;
      secret: string;
      qrCode: string;
    };
  }

  interface APIBind2FAResponseDTO extends APIBaseResponse {
    data: {
      user: {
        id: string;
        name: string;
        email: string;
        roles: RoleType[];
        verifiers: Verifier[];
        isTwoFactorSetup: boolean;
        subscription: unknown | null;
        authenticated: boolean;
      };
      access_token: string;
    };
  }

  interface API2FAVerifyResponseDTO extends APIBaseResponse {
    data: {
      user: {
        id: string;
        name: string;
        email: string;
        roles: RoleType[];
        verifiers: Verifier[];
        isTwoFactorSetup: boolean;
        subscription: unknown | null;
        authenticated: boolean;
      };
      access_token: string;
    };
  }

  interface APIGetUserProfileResponseDTO extends APIBaseResponse {
    data: UserInfoResponse;
  }
}
