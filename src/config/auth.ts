import { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        role: { label: "Role", type: "text" },
        jwt: { label: "JWT", type: "text" },
      },
      authorize: async (credentials): Promise<User | null> => {
        try {
          console.log("Credentials", credentials);
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
              }),
            }
          );
          const response = await request.json();
          console.log("Response", response);

          const user: User = {
            accessToken: "xxx",
            email: "aa@mail.com",
            id: "zxx",
            name: "John Doe",
            roles: ["USER"],
            provider: "GOOGLE",
            image: "https://example.com/image.jpg",
          };

          return user;
        } catch (error) {
          console.error("Error during authorization:", error);
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
        token.provider = user.provider;
      }
      if (trigger === "update" && session) {
        token.picture = session.imageUrl;
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
          provider: token.provider,
        };
      }
      return session;
    },
  },
};
