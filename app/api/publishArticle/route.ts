import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { articleId } = body;

    // Validate the input
    if (!articleId) {
      return NextResponse.json(
        { error: "Article ID is required to publish." },
        { status: 400 }
      );
    }

    // Update the article status to PUBLISHED
    const publishedArticle = await prisma.article.update({
      where: { id: articleId },
      data: { status: "PUBLISHED", datePublished: new Date() }, // Set the status to PUBLISHED and update the publish date
    });

    // Return the updated article
    return NextResponse.json(publishedArticle);
  } catch (error) {
    console.error("Error publishing article:", error);
    return NextResponse.json(
      { error: "Failed to publish the article." },
      { status: 500 }
    );
  }
}
