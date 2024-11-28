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

  // Ensure `status` is set to `DRAFT` by default
  const editorArticle = await prisma.article.create({
    data: {
      picture,
      category,
      title,
      author,
      datePublished: datePublished ? new Date(datePublished) : undefined,
      minutesRead: minutesRead || 0, // Use default if minutesRead is not provided
      content,
      references,
      status: "DRAFT", // Explicitly set the status to DRAFT
      userId,
    },
  });

  return NextResponse.json(editorArticle);
}
