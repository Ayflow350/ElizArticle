// app/types/index.ts
import { Article, User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
// Assuming this is in your types/index.ts or equivalent file
export type SafeArticle = Omit<
  Article,
  "userId" | "createdAt" | "updatedAt" | "datePublished"
> & {
  datePublished: string | null; // Format datePublished as a string
  references: string;

  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    emailVerified: string | null;
    // Include any other necessary user fields here
  } | null;
};
