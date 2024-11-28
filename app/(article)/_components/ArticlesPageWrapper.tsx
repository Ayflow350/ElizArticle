"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Container from "@/app/components/Container";
import ArticleCard from "./ArticleCard";

export const dynamic = "force-dynamic";

interface Article {
  id: string;
  picture: string;
  category: string;
  title: string;
  author: string;
  datePublished: string | null;
  minutesRead: number;
  content: string;
  references: string;
  status: string;
}

const queryClient = new QueryClient();

interface ArticlesPageWrapperProps {
  articles: Article[];
}

const AuthorPageWrapper: React.FC<ArticlesPageWrapperProps> = ({
  articles,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const articlesPerPage = 9;

  // Filter only published articles
  const publishedArticles = articles.filter(
    (article) => article.status === "PUBLISHED"
  );

  // Filter articles by selected category
  const filteredArticles =
    selectedCategory === "All"
      ? publishedArticles
      : publishedArticles.filter(
          (article) => article.category === selectedCategory
        );

  // Pagination logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  // Categories for tabs
  const categories = [
    "All",
    "Thyroid Function",
    "Adrenal Function",
    "Steroid Hormones",
    "Miscellaneous",
  ];

  return (
    <Container>
      {/* Category Tabs */}
      <div className="flex justify-center items-center mb-6  border-gray-300">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-6 py-2 text-lg font-semibold border-b-2 ${
              selectedCategory === category
                ? "border-black text-white hover:text-white bg-black rounded-full"
                : "border-transparent hover:text-black text-gray-600"
            } `}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1); // Reset to the first page when changing category
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="flex justify-center items-center p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      {filteredArticles.length > articlesPerPage && (
        <div className="flex justify-center items-center mt-10 space-x-2">
          {/* Previous Button */}
          <button
            className={`px-4 py-2 border rounded flex gap-x-2 items-center ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
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
      )}
    </Container>
  );
};

export default AuthorPageWrapper;
