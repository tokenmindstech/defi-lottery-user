import {
  AUTH_ERROR,
  AUTH_LOGIN_2FA,
  REQUIRED_2FA_SETUP,
  REQUIRED_AUTHENTICATION,
  REQUIRED_BIND_TELEGRAM,
} from "@/constant/common";
import { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { cookies } from "next/headers";

type ErrorType =
  | "AccessDenied"
  | "AdapterError"
  | "CallbackRouteError"
  | "ErrorPageLoop"
  | "EventError"
  | "InvalidCallbackUrl"
  | "CredentialsSignin"
  | "InvalidEndpoints"
  | "InvalidCheck"
  | "JWTSessionError"
  | "MissingAdapter"
  | "MissingAdapterMethods"
  | "MissingAuthorize"
  | "MissingSecret"
  | "OAuthAccountNotLinked"
  | "OAuthCallbackError"
  | "OAuthProfileParseError"
  | "SessionTokenError"
  | "OAuthSignInError"
  | "EmailSignInError"
  | "SignOutError"
  | "UnknownAction"
  | "UnsupportedStrategy"
  | "InvalidProvider"
  | "UntrustedHost"
  | "Verification"
  | "MissingCSRF"
  | "AccountNotLinked"
  | "DuplicateConditionalUI"
  | "MissingWebAuthnAutocomplete"
  | "WebAuthnVerificationError"
  | "ExperimentalFeatureNotEnabled";

export class AuthError extends Error {
  /** The error type. Used to identify the error in the logs.
   * @internal
   */
  type: ErrorType;
  /**
   * Determines on which page an error should be handled. Typically `signIn` errors can be handled in-page.
   * Default is `"error"`.
   * @internal
   */
  kind?: "signIn" | "error";

  /** @internal */
  cause?: Record<string, unknown> & { err?: Error };

  /** @internal */
  constructor(
    message?: string | Error | ErrorOptions,
    errorOptions?: ErrorOptions
  ) {
    if (message instanceof Error) {
      super(undefined, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cause: { err: message, ...(message.cause as any), ...errorOptions },
      });
    } else if (typeof message === "string") {
      if (errorOptions instanceof Error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        errorOptions = { err: errorOptions, ...(errorOptions.cause as any) };
      }
      super(message, errorOptions);
    } else {
      super(undefined, message);
    }
    this.name = this.constructor.name;
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/3841
    this.type = this.constructor.type ?? "AuthError";
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/3841
    this.kind = this.constructor.kind ?? "error";

    Error.captureStackTrace?.(this, this.constructor);
    const url = `https://errors.authjs.dev#${this.type.toLowerCase()}`;
    this.message += `${this.message ? ". " : ""}Read more at ${url}`;
  }
}

export class SignInError extends AuthError {
  /** @internal */
  static kind = "signIn";
}

export class CredentialsSignin extends SignInError {
  /** @internal */
  static type = "CredentialsSignin";
  /**
   * The error code that is set in the `code` query parameter of the redirect URL.
   *
   *
   * ⚠ NOTE: This property is going to be included in the URL, so make sure it does not hint at sensitive errors.
   *
   * The full error is always logged on the server, if you need to debug.
   *
   * Generally, we don't recommend hinting specifically if the user had either a wrong username or password specifically,
   * try rather something like "Invalid credentials".
   */
  code: string = "credentials";
}

class CustomError extends CredentialsSignin {
  constructor(code: string) {
    super();
    this.code = code;
    this.message = code;
    this.stack = undefined;
  }
}

export const authConfig: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        type: { label: "Type", type: "text" },
        user: { label: "User", type: "text" },
        accessToken: { label: "Access Token", type: "text" },
        role: { label: "Role", type: "text" },
        jwt: { label: "JWT", type: "text" },
      },
      authorize: async (credentials): Promise<User | null> => {
        const cookieStore = await cookies();
        const referral = cookieStore.get("ref")?.value;

        try {
          if (credentials?.type === AUTH_LOGIN_2FA) {
            const userData =
              typeof credentials.user === "string"
                ? JSON.parse(credentials.user)
                : credentials.user;
            const user: User = {
              accessToken: credentials?.accessToken,
              email: userData.email,
              id: userData.id,
              name: userData.name,
              roles: userData.roles,
              verifiers: userData.verifiers,
              image: "https://example.com/image.jpg",
            };

            return user;
          }

          const request = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/auth`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                role: credentials?.role,
                jwt: credentials?.jwt,
                referral: referral ? referral : undefined,
              }),
            }
          );
          const response = (await request.json()) as APILoginResponseDTO;

          if (!request.ok) {
            throw new CustomError(`${AUTH_ERROR}${response.message}`);
          }

          // Check if TELEGRAM is exist in verifiers
          const telegramVerifier = response.data.user.verifiers.find(
            (verifier) => verifier.type === "TELEGRAM"
          );
          if (!telegramVerifier) {
            throw new CustomError(
              `${REQUIRED_BIND_TELEGRAM}${response.data.access_token}`
            );
          }

          if (response.data.user.isTwoFactorSetup === false) {
            throw new CustomError(
              `${REQUIRED_2FA_SETUP}${response.data.access_token}`
            );
          }

          if (response.data.user.authenticated === false) {
            throw new CustomError(
              `${REQUIRED_AUTHENTICATION}${response.data.access_token}`
            );
          }

          const user: User = {
            accessToken: response.data.access_token,
            email: response.data.user.email,
            id: response.data.user.id,
            name: response.data.user.name,
            roles: response.data.user.roles,
            verifiers: response.data.user.verifiers,
            image: "https://example.com/image.jpg",
          };

          return user;
        } catch (error) {
          console.error("Error during authorization:", error);
          if (error instanceof CustomError) {
            throw new CustomError(error.code);
          }
          throw new Error("An error occurred during sign-in");
        }
      },
    }),
  ],
  session: {
    maxAge: 7 * 24 * 60 * 60, // 7 days
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.accessToken = user.accessToken;
        token.roles = user.roles;
        token.picture = user.image;
        token.name = user.name;
        token.verifiers = user.verifiers;
      }
      if (trigger === "update" && session) {
        token.accessToken = session.accessToken;
        token.email = session.user?.email;
        token.name = session.user?.name;
        token.roles = session.user?.roles;
        token.provider = session.user?.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          accessToken: token.accessToken,
          name: token.name || "",
          image: token.picture || "",
          roles: token.roles,
          verifiers: token.verifiers,
        };
      }
      return session;
    },
  },
};
