// lib/prismadb.ts
import prisma from "../libs/prismadb";
import { SafeArticle } from "@/types";

export interface IArticleParams {
  userId?: string;
  category?: string;
  title?: string;
  datePublished?: string;
  author?: string;
  minReadTime?: number;
}

// Utility to format date as YYYY-MM-DD
const formatDate = (date: Date): string => date.toISOString().split("T")[0];

export default async function getArticles(
  params: IArticleParams
): Promise<SafeArticle[]> {
  const { userId, category, title, datePublished, author, minReadTime } =
    params;

  const query: Record<string, any> = {
    ...(userId && { userId }),
    ...(category && { category }),
    ...(title && { title: { contains: title, mode: "insensitive" } }),
    ...(author && { author: { contains: author, mode: "insensitive" } }),
    ...(minReadTime && { minutesRead: { gte: minReadTime } }),
    ...(datePublished && { datePublished: { gte: new Date(datePublished) } }),
  };

  try {
    const articles = await prisma.article.findMany({
      where: query,
      include: { user: true },
      orderBy: { datePublished: "desc" },
    });

    return articles.map((article) => ({
      id: article.id,
      title: article.title,
      author: article.author,
      category: article.category,
      content: article.content,
      datePublished: formatDate(article.datePublished),
      minutesRead: article.minutesRead,
      userId: article.userId,
      picture: article.picture, // Now guaranteed to be non-nullable
      user: article.user
        ? {
            id: article.user.id,
            name: article.user.name,
            email: article.user.email,
            image: article.user.image,
            emailVerified: article.user.emailVerified
              ? article.user.emailVerified.toISOString()
              : null, // Convert Date to string
          }
        : null,
    }));
  } catch (error) {
    // Safely handle the unknown type for error
    if (error instanceof Error) {
      throw new Error(error.message || "Error fetching articles");
    }
    throw new Error("An unknown error occurred while fetching articles");
  }
}
