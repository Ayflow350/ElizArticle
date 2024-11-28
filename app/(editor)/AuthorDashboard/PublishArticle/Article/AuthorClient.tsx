"use client";

import { SafeArticle } from "@/types/index";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/app/components/Container";
import DOMPurify from "dompurify";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import Modal from "@/app/components/Modals/Modal"; // Import the Modal component
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export const dynamic = "force-dynamic";

interface ArticleClientProps {
  article: SafeArticle;
}

const AuthorClient: React.FC<ArticleClientProps> = ({ article }) => {
  const [sanitizedContent, setSanitizedContent] = useState<string>("");
  const [sanitizedReferences, setSanitizedReferences] = useState<string>("");
  const [isPublishing, setIsPublishing] = useState(false); // For spinner and disabling the button
  const [isModalOpen, setIsModalOpen] = useState(false); // For controlling the modal
  const router = useRouter();

  useEffect(() => {
    const sanitizedContent = DOMPurify.sanitize(article.content);
    setSanitizedContent(sanitizedContent);

    const sanitizedReferences = DOMPurify.sanitize(article.references);
    setSanitizedReferences(sanitizedReferences);
  }, [article.content, article.references]);

  const handlePublish = async () => {
    setIsPublishing(true); // Show spinner
    try {
      const response = await fetch("/api/publishArticle", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ articleId: article.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to publish the article.");
      }

      const data = await response.json();
      toast.success("Article published successfully!");
      router.push("/AuthorDashboard/Article");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while publishing the article.");
    } finally {
      setIsPublishing(false); // Hide spinner
      setIsModalOpen(false); // Close modal
    }
  };

  return (
    <Container>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold">
          {article.title}
        </h1>
        <div className="flex gap-x-2">
          <Link href={`/AuthorDashboard/editArticle/${article.id}`}>
            <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
              Edit
            </button>
          </Link>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setIsModalOpen(true)} // Open modal on click
          >
            Publish
          </button>
        </div>
      </div>

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
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />

      {/* Render the sanitized references */}
      {sanitizedReferences && (
        <div className="my-3">
          <h2 className="font-bold text-lg">References</h2>
          <div
            className="my-3"
            dangerouslySetInnerHTML={{ __html: sanitizedReferences }}
          />
        </div>
      )}

      <Footer />

      {/* Modal for confirmation */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handlePublish}
        title="Publish Article"
        paragraph="Are you sure you want to publish this article?"
        actionLabel="Yes, Publish"
        disabled={isPublishing} // Disable if publishing
        isLoading={isPublishing} // Show spinner if publishing
      />
    </Container>
  );
};

export default AuthorClient;
