/**
 * @file api-response.d.ts
 * @description This file contains TypeScript types for API responses.
 */

export {};

declare global {
  type ProviderType = "GOOGLE" | "TELEGRAM";
  type RoleType = "USER" | "ADMIN";
  type TicketIssueType = "BILLING" | "ACCOUNT" | "TECHNICAL" | "OTHER";
  type TicketStatusType = "OPEN" | "CLOSED" | "RESOLVED";
  type SubscriptionType = "EXPLORE" | "BASIC" | "PREMIUM";
  type TierType = "TIER1" | "TIER2" | "TIER3";

  interface Verifier {
    id: string;
    type: ProviderType;
    preferNotification: boolean;
    userId: string;
  }

  interface SupportTicket {
    id: string;
    subject: string;
    category: TicketIssueType;
    description: string;
    status: TicketStatusType;
    createdAt: string;
    updatedAt: string;
  }

  interface SupportTicketWithUser {
    id: string;
    subject: string;
    category: TicketIssueType;
    description: string;
    status: TicketStatusType;
    createdAt: string;
    updatedAt: string;
    User: {
      id: string;
      name: string;
    };
  }

  interface ReferredUser {
    id: string;
    earnings: number;
    user: {
      id: string;
      name: string;
    };
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

  interface InvoiceSubscription {
    id: string;
    amount: number;
    currency: string;
    isPaid: boolean;
    referenceId: string;
    paymentUrl: string;
    createdAt: string;
    subscriptionId: string;
  }

  interface TodaysDraw {
    id: string;
    drawNumbers: string;
    prizePool: number;
    drawType: string;
    createdAt: string;
  }

  interface DrawTicket {
    id: string;
    drawNumbers: string;
    tier: TierType;
    amount: number;
    createdAt: string;
    rewardDraw: TodaysDraw | null;
  }

  interface APIBaseResponse {
    message: string;
    metadata?: {
      page?: number;
      limit?: number;
      totalPage?: number;
      totalCount?: number;
    };
    data?: unknown;
    statusCode: number;
  }

  interface APIBaseErrorResponse {
    error: string;
    message: string[];
    statusCode: number;
  }

  interface APIBaseGenerateUploadResponse {
    uploadUrl: string;
    url: string;
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
        ownedReferral: {
          id: string;
          referred: ReferredUser[];
        };
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

  interface APIGetSupportTicketsResponseDTO extends APIBaseResponse {
    data: {
      supportTickets: SupportTicketWithUser[];
    };
  }

  interface APICreatePaymentResponseDTO extends APIBaseResponse {
    data: {
      invoiceUrl: string;
    };
  }

  interface APIGetMembershipResponseDTO extends APIBaseResponse {
    data: {
      id: string;
      type: SubscriptionType;
      validUntil: string;
      userId: string;
      invoices: InvoiceSubscription[];
    } | null;
  }

  interface APIGetTodaysRewardDrawResponseDTO extends APIBaseResponse {
    data: TodaysDraw | null;
  }

  interface APIGetHistoryDrawResponseDTO extends APIBaseResponse {
    data: {
      drawTickets: DrawTicket[];
    };
  }

  interface APICancelSubscriptionResponseDTO extends APIBaseResponse {
    data: {
      id: string;
      type: SubscriptionType;
      validUntil: string;
      requestCancellation: boolean;
      userId: string;
    };
  }
}
