"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";
import Container from "@/app/components/Container";
import Modal from "@/app/components/Modals/ModalBlocking";
import useModalBlock from "@/app/hooks/useModalBlock";
import { SafeArticle } from "@/types/index";
import Footer from "@/app/components/Footer";

interface ArticleClientProps {
  article: SafeArticle;
}

const ArticleClient: React.FC<ArticleClientProps> = ({ article }) => {
  const [sanitizedContent, setSanitizedContent] = useState<string>("");
  const { isOpen, onOpen, onClose } = useModalBlock();
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  // Callback for mouse and gesture detection
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

  const handleGestureEnd = useCallback(
    (e: any) => {
      if (e.scale < 1) {
        onOpen();
      }
    },
    [onOpen]
  );

  const handleSwipeEnd = useCallback(
    (e: TouchEvent) => {
      const swipeThreshold = 50;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      if (
        touchEndY <= swipeThreshold ||
        touchEndX >= window.innerWidth - swipeThreshold ||
        touchEndY >= window.innerHeight - swipeThreshold ||
        touchEndX <= swipeThreshold
      ) {
        onOpen();
      }
    },
    [onOpen]
  );

  // Reset inactivity timer on user activity
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
      onOpen();
    }, 60000); // 1 minute of inactivity
  }, [onOpen]);

  useEffect(() => {
    const sanitized = DOMPurify.sanitize(article.content);
    setSanitizedContent(sanitized);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        document.addEventListener("mouseout", handleMouseOut);
        document.addEventListener("gestureend", handleGestureEnd);
        document.addEventListener("touchend", handleSwipeEnd);
        resetInactivityTimer();
      } else {
        document.removeEventListener("mouseout", handleMouseOut);
        document.removeEventListener("gestureend", handleGestureEnd);
        document.removeEventListener("touchend", handleSwipeEnd);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("mousemove", resetInactivityTimer);
    document.addEventListener("keypress", resetInactivityTimer);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("mousemove", resetInactivityTimer);
      document.removeEventListener("keypress", resetInactivityTimer);
      clearTimeout(inactivityTimerRef.current as ReturnType<typeof setTimeout>);
    };
  }, [
    article.content,
    handleMouseOut,
    handleGestureEnd,
    handleSwipeEnd,
    resetInactivityTimer,
  ]);

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
          title="Export Not Allowed"
          paragraph="You cannot export this content."
          actionLabel="I Agree"
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
