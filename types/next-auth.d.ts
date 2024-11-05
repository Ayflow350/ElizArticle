// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    role: string; // Define the type of your role, adjust if necessary
  }

  interface Session {
    user: User; // Ensure that the session user includes the custom User type
  }

  interface JWT {
    role: string; // Add the role property to the JWT
  }
}
