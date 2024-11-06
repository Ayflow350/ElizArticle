// app/Article/[id]/ArticleClient.tsx

import { SafeArticle } from "@/types/index"; // Import your SafeArticle type
import React from "react";
import Image from "next/image";
import Container from "@/app/components/Container";
export const dynamic = "force-dynamic";

interface ArticleClientProps {
  article: SafeArticle;
  // Adjust this type based on your current user data structure
}

const ArticleClient: React.FC<ArticleClientProps> = ({ article }) => {
  return (
    <Container>
      <h1 className="text-5xl font-bold mb-4">{article.title}</h1>
      <div className="relative w-auto h-[500px] mb-4">
        <Image
          src={article.picture}
          alt={article.title}
          layout="fill" // Ensures the image fills its container
          objectFit="cover" // Cover mode to maintain aspect ratio
          className="rounded-lg"
          priority // Loads this image with high priority
        />
      </div>
      <div className="flex gap-x-4 ">
        <div>
          <h1 className="mb-1">Author</h1>
          <h1 className="text-gray-600">{article.author}</h1>
        </div>

        <div>
          <h1 className="mb-1">Category</h1>
          <h1 className="text-gray-600">{article.category}</h1>
        </div>
      </div>
      <h1 className="my-3">{article.content}</h1>
      {/* Additional article details and rendering logic can go here */}
    </Container>
  );
};

export default ArticleClient;
