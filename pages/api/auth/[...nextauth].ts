// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import NextAuth, { AuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import prisma from "@/app/libs/prismadb"; // Ensure this path is correct

// export const authOptions: AuthOptions = {
//   adapter: PrismaAdapter(prisma), // Prisma-only adapter
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         console.log("Authorization attempt with credentials:", credentials);

//         if (!credentials?.email || !credentials?.password) {
//           console.error("Authorization failed: Missing email or password.");
//           throw new Error("Invalid credentials");
//         }

//         // Step 2: Find user by email
//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user || !user.hashedPassword) {
//           console.error(
//             "Authorization failed: No user found or missing password hash."
//           );
//           throw new Error("Invalid credentials");
//         }

//         // Step 3: Validate the password
//         let isCorrectPassword = await bcrypt.compare(
//           credentials.password,
//           user.hashedPassword
//         );

//         // If password comparison fails, reset to known hash for testing purposes
//         if (!isCorrectPassword) {
//           console.warn("Password mismatch, attempting reset for test.");

//           // Generate a new bcrypt hash for the test password
//           const testPassword = "Beams"; // known test password
//           const testHashedPassword = await bcrypt.hash(testPassword, 10);

//           // Update user password in database to test hash
//           await prisma.user.update({
//             where: { email: credentials.email },
//             data: { hashedPassword: testHashedPassword },
//           });

//           // Retry password validation with test password
//           isCorrectPassword = await bcrypt.compare(
//             credentials.password,
//             testHashedPassword
//           );
//           if (!isCorrectPassword) {
//             console.error(
//               "Authorization failed: Incorrect password after reset attempt."
//             );
//             throw new Error("Invalid credentials");
//           }
//         }

//         console.log("User authenticated successfully:", {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//         });

//         return {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//         };
//       },
//     }),
//   ],
//   session: { strategy: "jwt" },
//   pages: { signIn: "/" },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         console.log("JWT callback: Attaching user info to token", {
//           userId: user.id,
//           role: user.role,
//         });
//         token.id = user.id;
//         token.role = user.role;
//       }
//       console.log("JWT token created:", token);
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         console.log("Session callback: Attaching token info to session", {
//           tokenId: token.id,
//           tokenRole: token.role,
//         });
//         session.user.id = token.id as string;
//         session.user.role = token.role as string;
//       }
//       console.log("Session created:", session);
//       return session;
//     },
//   },
//   cookies: {
//     sessionToken: {
//       name: "next-auth.session-token",
//       options: {
//         httpOnly: true,
//         sameSite: "lax",
//         secure: process.env.NODE_ENV === "production",
//       },
//     },
//   },
//   debug: process.env.NODE_ENV === "development",
//   secret: process.env.NEXTAUTH_SECRET,
// };

// export default NextAuth(authOptions);

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
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        // Debugging credentials
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
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT instead of database sessions
  },

  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV == "development",
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
