"use client";

import { SafeArticle } from "@/types/index";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/app/components/Container";
import DOMPurify from "dompurify";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface ArticleClientProps {
  article: SafeArticle;
}

const AuthorClient: React.FC<ArticleClientProps> = ({ article }) => {
  const [sanitizedContent, setSanitizedContent] = useState<string>("");
  const [sanitizedReferences, setSanitizedReferences] = useState<string>("");

  useEffect(() => {
    const sanitizedContent = DOMPurify.sanitize(article.content);
    setSanitizedContent(sanitizedContent);

    const sanitizedReferences = DOMPurify.sanitize(article.references);
    setSanitizedReferences(sanitizedReferences);
  }, [article.content, article.references]);

  return (
    <Container>
      <Link href={`/AuthorDashboard/editArticle/${article.id}`}>
        <button className="mt-2 px-4 py-2 bg-black text-white rounded">
          Edit
        </button>
      </Link>
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
        dangerouslySetInnerHTML={{ __html: sanitizedContent }} // Render sanitized content
      />

      {/* Render the sanitized references */}
      {sanitizedReferences && (
        <div className="my-3">
          <h2 className="font-bold text-lg">References</h2>
          <div
            className="my-3"
            dangerouslySetInnerHTML={{ __html: sanitizedReferences }} // Render sanitized references
          />
        </div>
      )}
    </Container>
  );
};

export default AuthorClient;
