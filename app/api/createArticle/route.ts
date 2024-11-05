import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const {
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

  const editorArticle = await prisma.article.create({
    data: {
      picture,
      category,
      title,
      author,
      datePublished: datePublished ? new Date(datePublished) : undefined,
      minutesRead,
      content,
      references,
      userId,
    },
  });

  return NextResponse.json(editorArticle);
}
