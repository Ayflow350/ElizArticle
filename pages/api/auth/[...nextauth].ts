import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name || "",
          role: (user.role as "USER" | "ADMIN") || "USER",
          hasActiveSubscription: user.hasActiveSubscription ?? false,
          emailVerified: user.emailVerified,
          image: user.image,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // Session expires after 30 minutes (in seconds)
  },
  jwt: {
    maxAge: 60 * 60, // JWT token expires after 30 minutes (in seconds)
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Set token data based on user information
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role || "USER";
        token.hasActiveSubscription = user.hasActiveSubscription ?? false;

        // Set token expiration to 30 minutes from the current time (in seconds)
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60; // 30 minutes
      }

      // Calculate the time left based on the token expiration time
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      const timeLeft = token.exp ? Number(token.exp) - currentTime : 0;

      // Log token data and time left
      console.log("JWT Callback:");
      console.log("Token Data:", token);
      console.log(
        timeLeft > 0
          ? `Time Left: ${timeLeft} seconds`
          : "Token has already expired."
      );

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          role: token.role as "USER" | "ADMIN",
          hasActiveSubscription: token.hasActiveSubscription as boolean,
        };

        // Get the current time in seconds
        const currentTime = Math.floor(Date.now() / 1000);

        // Get expiration time from session (in seconds)
        const expirationTime = new Date(session.expires).getTime() / 1000;

        // Calculate time left
        const timeLeft = expirationTime - currentTime;

        console.log("Session Callback:");
        console.log("Session Data:", session);
        console.log(
          timeLeft > 0
            ? `Time Left: ${timeLeft} seconds`
            : "Session has already expired."
        );
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
