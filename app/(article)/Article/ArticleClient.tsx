"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
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

  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>(
    []
  );
  const trailRef = useRef<number>(0);
  const mouseMoveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  // Disable print/save options using JavaScript
  useEffect(() => {
    const preventSavePrint = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === "s" || e.key === "p")) {
        e.preventDefault();
        alert("Save and Print features are disabled!");
      }
    };
    document.addEventListener("keydown", preventSavePrint);

    return () => document.removeEventListener("keydown", preventSavePrint);
  }, []);

  // Enter full-screen mode automatically
  useEffect(() => {
    const requestFullScreen = () => {
      const doc = document.documentElement;
      if (doc.requestFullscreen) {
        doc.requestFullscreen();
      }
    };
    requestFullScreen();
  }, []);

  // Hide the page when the browser menu or dev tools are opened
  useEffect(() => {
    const detectMenuOpen = (e: MouseEvent) => {
      if (e.button === 2) {
        alert("Right-click is disabled!");
        document.body.style.visibility = "hidden";
        setTimeout(() => {
          document.body.style.visibility = "visible";
        }, 1000);
      }
    };

    document.addEventListener("contextmenu", detectMenuOpen);
    return () => document.removeEventListener("contextmenu", detectMenuOpen);
  }, []);

  // Callback for mouse and gesture detection (triggering modal)
  const handleMouseOut = useCallback(
    (e: MouseEvent) => {
      const isMouseOutOfBounds =
        e.clientY <= 0 || // Top boundary
        e.clientX >= window.innerWidth || // Right boundary
        e.clientY >= window.innerHeight || // Bottom boundary
        e.clientX <= 0; // Left boundary

      if (isMouseOutOfBounds) {
        onOpen();
      }
    },
    [onOpen]
  );

  useEffect(() => {
    const sanitized = DOMPurify.sanitize(article.content);
    setSanitizedContent(sanitized);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        document.addEventListener("mouseout", handleMouseOut);
      } else {
        document.removeEventListener("mouseout", handleMouseOut);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [article.content, handleMouseOut]);

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

      {/* Modal that appears when the mouse reaches the top */}
      {isOpen && (
        <Modal
          title="Export Not Allowed"
          paragraph="You cannot export this content."
          actionLabel="I Agree"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={onClose}
        />
      )}
    </Container>
  );
};

export default ArticleClient;
