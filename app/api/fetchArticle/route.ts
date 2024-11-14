import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const articles = await prisma.article.findMany();
  return NextResponse.json(articles);
}
