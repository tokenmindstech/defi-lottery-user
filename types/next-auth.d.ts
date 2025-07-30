// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { User } from "next-auth"; // used to export NextAuth type

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string | null;
    roles: RoleType[];
    accessToken: string;
    verifiers: Verifier[];
    isTwoFactorSetup: boolean;
  }

  interface Session {
    accessToken: string;
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string | null;
    accessToken: string;
    roles: RoleType[];
    isVerified: boolean;
    verifiers: Verifier[];
    isTwoFactorSetup: boolean;
  }
}
