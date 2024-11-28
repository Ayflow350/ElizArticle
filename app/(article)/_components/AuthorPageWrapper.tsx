"use client";

import { useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import Container from "@/app/components/Container";
import AuthorCard from "./AuthorCard";

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
  const [statusFilter, setStatusFilter] = useState<string>("all"); // Added state for filter
  const articlesPerPage = 9;

  // React Query to handle filtered articles
  const { data: filteredArticles } = useQuery(
    ["filteredArticles", statusFilter, articles],
    () => {
      let currentArticles = articles;

      // Filtering articles based on the status selected
      if (statusFilter !== "all") {
        currentArticles = currentArticles.filter(
          (article) => article.status === statusFilter
        );
      }

      // Pagination logic
      const indexOfLastArticle = currentPage * articlesPerPage;
      const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
      return currentArticles.slice(indexOfFirstArticle, indexOfLastArticle);
    },
    {
      keepPreviousData: true, // Keeps previous data while new data is loading
    }
  );

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  return (
    <Container>
      {/* Filter Tabs */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            statusFilter === "all" ? "bg-black text-white" : "bg-gray-200"
          }`}
          onClick={() => setStatusFilter("all")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded ${
            statusFilter === "PUBLISHED" ? "bg-black text-white" : "bg-gray-200"
          }`}
          onClick={() => setStatusFilter("PUBLISHED")}
        >
          Published
        </button>
        <button
          className={`px-4 py-2 rounded ${
            statusFilter === "UNPUBLISHED"
              ? "bg-black text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setStatusFilter("UNPUBLISHED")}
        >
          Unpublished
        </button>
        <button
          className={`px-4 py-2 rounded ${
            statusFilter === "DRAFT" ? "bg-black text-white" : "bg-gray-200"
          }`}
          onClick={() => setStatusFilter("DRAFT")}
        >
          Draft
        </button>
      </div>

      <div className="flex justify-center items-center p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredArticles?.map((article) => (
            <AuthorCard key={article.id} article={article} />
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
    </Container>
  );
};

export default AuthorPageWrapper;
