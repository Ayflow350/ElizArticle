"use client";

import { SafeArticle } from "@/types/index";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/app/components/Container";
import DOMPurify from "dompurify"; // Import DOMPurify
import Link from "next/link";

export const dynamic = "force-dynamic";

interface ArticleClientProps {
  article: SafeArticle;
}

const ArticleClient: React.FC<ArticleClientProps> = ({ article }) => {
  const [sanitizedContent, setSanitizedContent] = useState<string>("");

  // Sanitize content only on the client side
  useEffect(() => {
    const sanitized = DOMPurify.sanitize(article.content);
    setSanitizedContent(sanitized);
  }, [article.content]);

  return (
    <Container>
      <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4">
        {article.title}
      </h1>
      <div className="relative w-auto h-[500px] mb-4">
        <Image
          src={article.picture}
          alt={article.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
          priority
        />
      </div>
      <div className="flex gap-x-4">
        <div>
          <h1 className="mb-1">Author</h1>
          <h1 className="text-gray-600">{article.author}</h1>
        </div>

        <div>
          <h1 className="mb-1">Category</h1>
          <h1 className="text-gray-600">{article.category}</h1>
        </div>
      </div>

      {/* Render the sanitized content */}
      <div
        className="my-3"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }} // Render sanitized HTML
      />
    </Container>
  );
};

export default ArticleClient;
