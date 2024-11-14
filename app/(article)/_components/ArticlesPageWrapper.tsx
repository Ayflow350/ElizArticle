// components/ArticlesPageWrapper.tsx
"use client";

import { useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import Container from "@/app/components/Container";
import ArticleCard from "./ArticleCard";
export const dynamic = "force-dynamic";

interface Article {
  id: string;
  picture: string;
  category: string;
  title: string;
  author: string;
  datePublished: string;
  minutesRead: number;
  content: string;
  references: string;
}

const queryClient = new QueryClient();

interface ArticlesPageWrapperProps {
  articles: Article[];
}

const AuthorPageWrapper: React.FC<ArticlesPageWrapperProps> = ({
  articles,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  // Pagination logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  return (
    <Container>
      <div className="flex justify-center items-center p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-10 space-x-2">
        {/* Previous Button */}
        <button
          className={`px-4 py-2 border rounded flex gap-x-2 items-center ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Preious
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              className={`px-4 py-2 border rounded ${
                currentPage === pageNumber ? "bg-black text-white" : ""
              }`}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          className={`px-4 py-2 border text-black rounded flex gap-x-2 items-center ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </Container>
  );
};

export default AuthorPageWrapper;
