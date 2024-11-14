// types/index.ts
// types/index.ts
export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  emailVerified: string | null;
}

// types/index.ts
export interface SafeArticle {
  id: string;
  picture: string;
  category: string;
  title: string;
  author: string;
  datePublished: string;
  minutesRead: number;
  content: string;
  references: string;
  userId: string | null; // Remains nullable if the article doesn’t always have an associated user
  user?: User | null; // Optional user object for populated details
}
