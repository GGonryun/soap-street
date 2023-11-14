import { CreatedUserResponse } from "@/types/create-user-form";
import { getBaseUrl } from "@/util/urls";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const userCredentials = {
          email: credentials?.email,
          password: credentials?.password,
        };

        const res = await fetch(`${getBaseUrl()}/api/user/login`, {
          method: "POST",
          body: JSON.stringify(userCredentials),
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("finished logging in", res);

        const user: CreatedUserResponse = await res.json();

        if (res.ok && user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        ...session.user,
        id: token.sub ?? "",
        email: token?.user?.email ?? "",
        role: token?.user?.role ?? "",
      };
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // support subdomains in production and local development
        domain: `${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}`,
      },
    },
  },
});
