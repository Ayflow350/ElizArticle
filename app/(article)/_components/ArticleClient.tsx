"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";
import Container from "@/app/components/Container";
import Modal from "@/app/components/Modals/ModalBlocking";
import useModalBlock from "@/app/hooks/useModalBlock";
import { SafeArticle } from "@/types/index";

interface ArticleClientProps {
  article: SafeArticle;
}

const ArticleClient: React.FC<ArticleClientProps> = ({ article }) => {
  const [sanitizedContent, setSanitizedContent] = useState<string>("");
  const { isOpen, onOpen, onClose } = useModalBlock();
  const router = useRouter();

  useEffect(() => {
    const sanitized = DOMPurify.sanitize(article.content);
    setSanitizedContent(sanitized);
  }, [article.content]);

  const handleClick = () => {
    router.push(`/article/${article.id}`);
  };

  return (
    <Container>
      <h1
        className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 cursor-pointer"
        onClick={handleClick}
      >
        {article.title}
      </h1>
      <div
        className="relative w-auto h-[500px] mb-4 cursor-pointer"
        onClick={handleClick}
      >
        <Image
          src={article.picture}
          alt={article.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
          priority
        />
      </div>
      <div
        className="my-3"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />

      {isOpen && (
        <Modal
          title="Export/Copying of this Page is not allowed and there is a fine for it"
          paragraph="This action is restricted."
          actionLabel="I Understand"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={onClose}
        />
      )}
    </Container>
  );
};

export default ArticleClient;
