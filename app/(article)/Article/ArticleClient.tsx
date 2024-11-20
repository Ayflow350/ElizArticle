"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";
import Container from "@/app/components/Container";
import Modal from "@/app/components/Modals/ModalBlocking";
import useModalBlock from "@/app/hooks/useModalBlock";
import { SafeArticle } from "@/types/index";
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import Footer from "@/app/components/Footer";

interface ArticleClientProps {
  article: SafeArticle;
}

const ArticleClient: React.FC<ArticleClientProps> = ({ article }) => {
  const [sanitizedContent, setSanitizedContent] = useState<string>("");
  const [sanitizedRefrences, setSanitizedRefrences] = useState<string>("");
  const { isOpen, onOpen, onClose } = useModalBlock();
  const router = useRouter();

  // Callback for mouse movement
  const handleMouseMovement = useCallback(
    (e: MouseEvent) => {
      // Check if mouse Y position is between 0 and 6
      if (e.clientY >= 0 && e.clientY <= 6) {
        onOpen(); // Trigger modal if mouse is in the top 6 pixels
      }
    },
    [onOpen]
  );

  // Prevent right-click, copy, and print actions
  const preventRightClick = (e: MouseEvent) => {
    e.preventDefault(); // Prevent context menu (right-click)
  };

  const preventCopy = (e: ClipboardEvent) => {
    e.preventDefault(); // Prevent copy action
  };

  const preventPrint = () => {
    onOpen(); // Trigger modal to block printing
  };

  useEffect(() => {
    const sanitized = DOMPurify.sanitize(article.content);
    setSanitizedContent(sanitized);

    const sanitizedRefrences = DOMPurify.sanitize(article.references);
    setSanitizedRefrences(sanitizedRefrences);

    // Add event listeners for mouse movement and right-click, copy, and print prevention
    document.addEventListener("mousemove", handleMouseMovement);
    document.addEventListener("contextmenu", preventRightClick); // Prevent right-click
    document.addEventListener("copy", preventCopy); // Prevent copy
    window.addEventListener("beforeprint", preventPrint); // Prevent printing
    window.addEventListener("afterprint", preventPrint); // Prevent printing

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener("mousemove", handleMouseMovement);
      document.removeEventListener("contextmenu", preventRightClick);
      document.removeEventListener("copy", preventCopy);
      window.removeEventListener("beforeprint", preventPrint);
      window.removeEventListener("afterprint", preventPrint);
    };
  }, [article.content, handleMouseMovement]);

  const handleClick = () => {
    router.push(`/article/${article.id}`);
  };

  return (
    <Container>
      <div className="flex justify-between mb-6">
        <Link
          href="/Article"
          className="bg-black text-white font-bold rounded-lg py-3 px-5"
        >
          Back
        </Link>

        <Link
          href="/Article"
          className="bg-black font-bold w-fit text-white rounded-lg py-3 flex items-center gap-x-2 px-5"
        >
          <AiOutlineHeart />
          Favorites
        </Link>
      </div>

      <h1
        className="text-2xl md:text-3xl lg:text-5xl font-bold my-6 cursor-pointer"
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
      <div className="my-6 font-bold text-xl ">References</div>
      <div
        className="my-3"
        dangerouslySetInnerHTML={{ __html: sanitizedRefrences }}
      />

      {isOpen && (
        <Modal
          title="Action Not Allowed"
          paragraph="This action is restricted."
          actionLabel="I Understand"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={onClose}
        />
      )}
      <Footer />
    </Container>
  );
};

export default ArticleClient;
