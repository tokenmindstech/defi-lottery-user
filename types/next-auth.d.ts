// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { User } from "next-auth"; // used to export NextAuth type

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    roles: RoleType[];
    accessToken: string;
    provider: ProviderType;
  }

  interface Session {
    accessToken: string;
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    accessToken: string;
    roles: RoleType[];
    isVerified: boolean;
    provider: ProviderType;
  }
}
