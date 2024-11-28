import prisma from "@/app/libs/prismadb";
import { SafeArticle } from "@/types";

export interface IArticleParams {
  userId?: string;
  category?: string;
  title?: string;
  datePublished?: string;
  author?: string;
  minReadTime?: number;
  references?: string; // Make this optional for flexibility
  status?: string; // Add the status field for filtering
}

const formatDate = (date: Date | null): string | null =>
  date ? date.toISOString().split("T")[0] : null;

export default async function getArticles(
  params: IArticleParams
): Promise<SafeArticle[]> {
  // Check if we're on the server
  if (typeof window !== "undefined") {
    throw new Error("getArticles should only be called on the server side");
  }

  const {
    userId,
    category,
    title,
    datePublished,
    author,
    minReadTime,
    references,
    status, // Destructure the status field
  } = params;

  // Construct the query object
  const query: Record<string, any> = {
    ...(userId && { userId }),
    ...(category && { category }),
    ...(title && { title: { contains: title, mode: "insensitive" } }),
    ...(author && { author: { contains: author, mode: "insensitive" } }),
    ...(minReadTime && { minutesRead: { gte: minReadTime } }),
    ...(datePublished && { datePublished: { gte: new Date(datePublished) } }),
    ...(references && {
      references: { contains: references, mode: "insensitive" },
    }),
    ...(status && { status }), // Filter by status if provided
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
      datePublished: formatDate(article.datePublished), // Handle potential null values
      minutesRead: article.minutesRead,
      userId: article.userId,
      picture: article.picture,
      references: article.references,
      status: article.status,
      user: article.user
        ? {
            id: article.user.id,
            name: article.user.name,
            email: article.user.email,
            image: article.user.image,
            emailVerified: article.user.emailVerified
              ? article.user.emailVerified.toISOString()
              : null,
          }
        : null,
    }));
  } catch (error) {
    console.error("Prisma error in getArticles:", error);
    throw new Error("Error fetching articles");
  }
}
