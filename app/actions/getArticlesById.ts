// app/actions/getArticleById.ts
import prisma from "../libs/prismadb"; // Adjust the import path as necessary
import { SafeArticle } from "../../types/index"; // Import the SafeArticle type

interface IParams {
  articleId?: string;
}

export default async function getArticleById(
  params: IParams
): Promise<SafeArticle | null> {
  try {
    const { articleId } = params;

    const article = await prisma.article.findUnique({
      where: {
        id: articleId,
      },
      include: {
        user: true,
      },
    });

    if (!article) {
      return null;
    }

    return {
      ...article,
      datePublished: article.datePublished.toISOString(),

      userId: article.userId || null, // Ensuring nullable userId
      user: article.user
        ? {
            ...article.user,
            emailVerified: article.user.emailVerified?.toISOString() || null,
          }
        : null,
    } as SafeArticle;
  } catch (error) {
    console.error("Error fetching article by ID:", error);
    return null;
  }
}
