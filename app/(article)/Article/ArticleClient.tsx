"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";
import Container from "@/app/components/Container";
import Modal from "@/app/components/Modals/ModalBlocking";
import { SafeArticle } from "@/types/index";

interface ArticleClientProps {
  article: SafeArticle;
}

const ArticleClient: React.FC<ArticleClientProps> = ({ article }) => {
  const [sanitizedContent, setSanitizedContent] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal starts open
  const router = useRouter();

  const handleMouseOut = useCallback(
    (e: MouseEvent) => {
      if (!isModalOpen) {
        const isMouseOutOfBounds =
          e.clientY <= 0 || // Top boundary
          e.clientX >= window.innerWidth || // Right boundary
          e.clientY >= window.innerHeight || // Bottom boundary
          e.clientX <= 0; // Left boundary

        if (isMouseOutOfBounds) {
          setIsModalOpen(true); // Reopen modal if mouse moves out
        }
      }
    },
    [isModalOpen]
  );

  useEffect(() => {
    const sanitized = DOMPurify.sanitize(article.content);
    setSanitizedContent(sanitized);

    if (!isModalOpen) {
      document.addEventListener("mouseout", handleMouseOut);
    }

    return () => {
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [article.content, isModalOpen, handleMouseOut]);

  const handleAgree = () => {
    setIsModalOpen(false); // Close modal on agreement
  };

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

      {isModalOpen && (
        <Modal
          title="Agreement Required"
          paragraph="Please agree to the terms before accessing this content."
          actionLabel="I Agree"
          isOpen={isModalOpen}
          onClose={handleAgree}
          onSubmit={handleAgree}
        />
      )}
    </Container>
  );
};

export default ArticleClient;
