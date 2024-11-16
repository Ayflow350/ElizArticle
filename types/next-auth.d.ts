// types/next-auth.d.ts (or at the root of the project)
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string; // Ensure name is always a string
    role: "USER" | "ADMIN"; // Define the role explicitly as a union type
    hasActiveSubscription: boolean; // Custom field for subscription status
  }

  interface Session {
    user: User; // Use the extended User interface
  }

  interface JWT {
    id: string;
    email: string;
    name: string;
    role: "USER" | "ADMIN"; // Include the role in JWT for consistency
    hasActiveSubscription: boolean; // Ensure this custom field is present in the JWT
  }
}
