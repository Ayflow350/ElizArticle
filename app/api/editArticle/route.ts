import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const body = await request.json();
  const {
    id,
    picture,
    category,
    title,
    author,
    datePublished,
    minutesRead,
    content,
    references,
    userId,
  } = body;

  if (!id) {
    return NextResponse.json(
      { error: "Article ID is required" },
      { status: 400 }
    );
  }

  const updatedArticle = await prisma.article.update({
    where: { id },
    data: {
      picture,
      category,
      title,
      author,
      datePublished: datePublished ? new Date(datePublished) : undefined,
      minutesRead,
      content,

      userId,
    },
  });

  return NextResponse.json(updatedArticle);
}
