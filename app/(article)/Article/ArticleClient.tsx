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

  // Crazy Mouse Tracking
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>(
    []
  );
  const trailRef = useRef<number>(0); // To keep track of the trail count for unique IDs
  const mouseMoveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  // Function to generate a trail effect
  const createMouseTrail = useCallback(
    (e: MouseEvent) => {
      const newTrail = {
        x: e.clientX,
        y: e.clientY,
        id: trailRef.current,
      };

      trailRef.current++;

      setTrail((prevTrail) => [...prevTrail, newTrail]);

      // Limit the trail size for better performance
      if (trail.length > 10) {
        setTrail((prevTrail) => prevTrail.slice(1));
      }
    },
    [trail.length]
  );

  // Update mouse position
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      createMouseTrail(e);
    },
    [createMouseTrail]
  );

  // Cleanup mouse trail after some time
  useEffect(() => {
    if (mouseMoveTimeoutRef.current) {
      clearTimeout(mouseMoveTimeoutRef.current);
    }

    mouseMoveTimeoutRef.current = setTimeout(() => {
      setTrail([]); // Clear the trail after some idle time
    }, 2000); // Clear trail after 2 seconds of no movement

    return () => clearTimeout(mouseMoveTimeoutRef.current!);
  }, [trail]);

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

  // Trigger modal on page load
  useEffect(() => {
    const sanitized = DOMPurify.sanitize(article.content);
    setSanitizedContent(sanitized);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        document.addEventListener("mouseout", handleMouseOut);
        document.addEventListener("mousemove", handleMouseMove); // Add mouse move listener
      } else {
        document.removeEventListener("mouseout", handleMouseOut);
        document.removeEventListener("mousemove", handleMouseMove); // Remove mouse move listener
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Trigger the modal once immediately on page load
    onOpen();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [article.content, handleMouseOut, handleMouseMove, onOpen]);

  // Mouse trail effect
  const trailElements = trail.map((trailElement) => (
    <div
      key={trailElement.id}
      style={{
        position: "absolute",
        top: `${trailElement.y}px`,
        left: `${trailElement.x}px`,
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        backgroundColor: `rgba(${Math.random() * 255}, ${
          Math.random() * 255
        }, ${Math.random() * 255}, 0.7)`,
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        transition: "all 0.2s ease-out",
      }}
    />
  ));

  const handleClick = () => {
    router.push(`/article/${article.id}`);
  };

  return (
    <Container>
      {/* Mouse trail effects */}
      <div>{trailElements}</div>
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
