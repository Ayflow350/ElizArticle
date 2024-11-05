import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorization started...");
        console.log("Credentials provided:", credentials);

        if (!credentials?.email || !credentials?.password) {
          console.log("Invalid credentials provided.");
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        console.log("User fetched from database:", user);

        if (!user || !user?.hashedPassword) {
          console.log("Invalid user or missing hashed password.");
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        console.log("Password comparison result:", isCorrectPassword);

        if (!isCorrectPassword) {
          console.log("Incorrect password.");
          throw new Error("Invalid credentials");
        }

        console.log("Authorization successful. User:", user);

        // Return user with role
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role, // Ensure role is included in the returned user object
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Ensure user role is part of the JWT
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role as string; // Explicitly cast to string
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
