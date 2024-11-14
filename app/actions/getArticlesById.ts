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

    // Log the articleId to confirm it's what you expect
    console.log("Fetching article with ID:", articleId);

    // Validate if the articleId is a valid ObjectId
    if (!articleId || !/^[a-fA-F0-9]{24}$/.test(articleId)) {
      console.error("Invalid article ID format:", articleId);
      return null;
    }

    // Fetch the article by ID
    const article = await prisma.article.findUnique({
      where: {
        id: articleId, // Directly use the valid ObjectId
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
      userId: article.userId || null,
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
