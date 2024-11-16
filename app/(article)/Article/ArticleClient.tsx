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
import { TbCaretLeftRightFilled } from "react-icons/tb";
import { CgArrowLeft } from "react-icons/cg";
import Link from "next/link";

interface ArticleClientProps {
  article: SafeArticle | null;
}

const ArticleClient: React.FC<ArticleClientProps> = ({ article }) => {
  const [sanitizedContent, setSanitizedContent] = useState<string>("");
  const [sanitizedReferences, setSanitizedReferences] = useState<string>("");
  const { isOpen, onOpen, onClose } = useModalBlock();
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (article?.content) {
      setSanitizedContent(DOMPurify.sanitize(article.content));
    }
    if (article?.references) {
      setSanitizedReferences(DOMPurify.sanitize(article.references));
    }
  }, [article?.content, article?.references]);

  if (!article) {
    return <div>Article not found</div>;
  }

  const handleClick = () => {
    router.push(`/article/${article.id}`);
  };

  return (
    <Container>
      <div className="flex flex-col">
        <div className="flex justify-between mb-10">
          <Link
            href="/Article"
            className="flex gap-x-1 items-center bg-black rounded-md text-white py-3 px-4"
          >
            <CgArrowLeft /> Back
          </Link>

          <button className="flex gap-x-1 items-center bg-black rounded-md text-white py-3 px-4">
            Add to Favorites
          </button>
        </div>
        <h1
          className="text-2xl md:text-3xl lg:text-5xl font-bold mb-8 cursor-pointer"
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
        <div className="flex justify-between mb-10">
          <div>
            <h1 className="font-bold text-lg">Author</h1>
            <h1>{article.author}</h1>
          </div>
          <div>
            <h1 className="font-bold text-lg">Date Published</h1>
            <h1>
              {new Date(article.datePublished).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h1>
          </div>
        </div>

        <div
          className="my-3 prose prose-lg text-xl mt-4"
          dangerouslySetInnerHTML={{
            __html: sanitizedContent,
          }}
        />

        {sanitizedReferences && (
          <div className="mt-8">
            <h2 className="text-lg font-bold">References</h2>
            <div
              className="prose prose-sm mt-2 text-lg"
              dangerouslySetInnerHTML={{
                __html: sanitizedReferences,
              }}
            />
          </div>
        )}

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
      </div>
    </Container>
  );
};

export default ArticleClient;
