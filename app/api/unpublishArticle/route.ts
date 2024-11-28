import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { articleId } = body;

    if (!articleId) {
      return NextResponse.json(
        { error: "Article ID is required to unpublish." },
        { status: 400 }
      );
    }

    const unpublishedArticle = await prisma.article.update({
      where: { id: articleId },
      data: {
        status: "UNPUBLISHED",
        datePublished: { set: null },
      },
    });

    return NextResponse.json(unpublishedArticle);
  } catch (error) {
    console.error("Error unpublishing article:", error);
    return NextResponse.json(
      { error: "Failed to unpublish the article." },
      { status: 500 }
    );
  }
}
