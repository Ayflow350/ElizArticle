"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";
import Container from "@/app/components/Container";
import Modal from "@/app/components/Modals/ModalBlocking";
import useMouseTracker from "@/app/hooks/useMouseTracker";
import { SafeArticle } from "@/types/index";
import Footer from "@/app/components/Footer";

interface ArticleClientProps {
  article: SafeArticle;
}

const ArticleClient: React.FC<ArticleClientProps> = ({ article }) => {
  const [sanitizedContent, setSanitizedContent] = useState<string>("");
  const [sanitizedReferences, setSanitizedReferences] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal starts open
  const [isMouseLocked, setIsMouseLocked] = useState(false); // Lock mouse
  const router = useRouter();

  // Function to handle mouse lock
  const handleMouseLock = () => {
    if (document.documentElement.requestPointerLock) {
      document.documentElement.requestPointerLock(); // Lock mouse
    }
  };

  // Callback for mouse out of bounds
  const handleMouseOut = useCallback(
    (e: MouseEvent) => {
      if (!isModalOpen) {
        const isMouseOutOfBounds =
          e.clientY <= 0 ||
          e.clientX >= window.innerWidth ||
          e.clientY >= window.innerHeight ||
          e.clientX <= 0;

        if (isMouseOutOfBounds) {
          setIsModalOpen(true); // Reopen modal
        }
      }
    },
    [isModalOpen]
  );

  // Use the custom hook
  useMouseTracker(handleMouseOut);

  // Handle agreement
  const handleAgree = () => {
    setIsModalOpen(false); // Close modal on agreement
    setIsMouseLocked(true); // Lock mouse interactions
    handleMouseLock(); // Lock the mouse pointer
  };

  const handleClick = () => {
    router.push(`/article/${article.id}`);
  };

  // Sanitize the article content on mount
  React.useEffect(() => {
    const sanitized = DOMPurify.sanitize(article.content);
    setSanitizedContent(sanitized);
  }, [article.content]);
  // Sanitize the article content on mount
  React.useEffect(() => {
    const sanitized = DOMPurify.sanitize(article.references);
    setSanitizedReferences(sanitized);
  }, [article.references]);

  // Automatically unlock mouse if pointer lock is exited
  useEffect(() => {
    const onPointerLockChange = () => {
      if (document.pointerLockElement === null) {
        setIsMouseLocked(false); // Unlock mouse when pointer lock is exited
      }
    };

    // Listen for changes to pointer lock status
    document.addEventListener("pointerlockchange", onPointerLockChange);

    // Listen for Escape key press to reload the page and navigate
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // Reload the page or navigate to the articles page
        window.location.href = "/Article"; // Replace with the path to the articles page
      }
    };

    // Add keydown event listener for Escape
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("pointerlockchange", onPointerLockChange);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Container>
      <h1
        className="text-4xl md:text-3xl  lg:text-5xl font-bold mb-6 cursor-pointer"
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

      <h1 className="text-lg bg-black text-white rounded-full mt-3  w-fit px-3 py-1">
        {article.category}
      </h1>

      <div className="mt-4 flex justify-between">
        <div>
          <h1 className="font-bold">Article Author</h1>
          {article.author}
        </div>
        <div>
          <h1 className="font-bold">Minutes Read</h1>
          {article.minutesRead} minutes
        </div>
      </div>

      <div
        className="mb-3 indent-10 text-lg mt-8"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />

      <div className="mb-4 mt-10">
        <h1 className="text-2xl  font-extrabold">References</h1>
      </div>
      <div
        className=""
        dangerouslySetInnerHTML={{ __html: sanitizedReferences }}
      />

      {isModalOpen && (
        <Modal
          title="Agreement Required"
          paragraph="Please agree to the terms before accessing this content. 
          
          "
          guidelines="Your mouse will be inactive while you read this page"
          guidelines2="You move around the article by scrolling up and down"
          guidelines3="When you are done reading you can leave  by using the esc key"
          actionLabel="I Agree"
          isOpen={isModalOpen}
          onClose={handleAgree}
          onSubmit={handleAgree}
        />
      )}

      {isMouseLocked && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-transparent z-50"
          style={{
            pointerEvents: isModalOpen ? "none" : "auto",
          }}
          onContextMenu={(e) => {
            e.preventDefault(); // Disable right-click on the overlay itself
            alert("Right-click is disabled on the overlay!");
          }}
        />
      )}
      <Footer />
    </Container>
  );
};

export default ArticleClient;
