import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params; // Get the ID from the path parameters

  if (!id) {
    return NextResponse.json(
      { error: "Article ID is required" },
      { status: 400 }
    );
  }

  const article = await prisma.article.findUnique({
    where: { id },
  });

  if (!article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  return NextResponse.json(article);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params; // Get the ID from the path parameters

  const updatedData = await req.json(); // Get the updated data from the request body

  if (!id) {
    return NextResponse.json(
      { error: "Article ID is required" },
      { status: 400 }
    );
  }

  try {
    // Update the article using the provided data, excluding the id from updatedData
    const { id: _, ...dataToUpdate } = updatedData; // Destructure to remove id if present

    const updatedArticle = await prisma.article.update({
      where: { id },
      data: dataToUpdate, // Pass the rest of the data for the update
    });

    return NextResponse.json(updatedArticle, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update article" },
      { status: 500 }
    );
  }
}
