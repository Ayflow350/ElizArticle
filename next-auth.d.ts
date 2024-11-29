import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    exp?: number;
    id?: string;
    email?: string;
    name?: string;
    role?: "USER" | "ADMIN";
    hasActiveSubscription?: boolean;
  }
}
