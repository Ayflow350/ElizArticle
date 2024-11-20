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

    // Prevent mouse right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Block screenshot functionality
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "PrintScreen" || // Windows Print Screen
        (e.metaKey && e.shiftKey && e.key === "4") // macOS Command + Shift + 4
      ) {
        e.preventDefault();
        onOpen(); // Open modal or handle screenshot block
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("mousemove", resetInactivityTimer);
    document.addEventListener("keypress", resetInactivityTimer);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("mousemove", resetInactivityTimer);
      document.removeEventListener("keypress", resetInactivityTimer);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(inactivityTimerRef.current as ReturnType<typeof setTimeout>);
    };
  }, [
    article.content,
    handleMouseOut,
    handleGestureEnd,
    handleSwipeEnd,
    resetInactivityTimer,
    onOpen,
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
