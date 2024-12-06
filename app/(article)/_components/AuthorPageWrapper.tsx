"use client";

import { useState, useEffect } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import Container from "@/app/components/Container";
import AuthorCard from "./AuthorCard";
import Link from "next/link";

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
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const articlesPerPage = 9;

  useEffect(() => {
    // Reset pagination when filter changes
    setCurrentPage(1);
  }, [statusFilter]);

  // Filter and paginate articles
  const { data: filteredArticles } = useQuery(
    ["filteredArticles", statusFilter, currentPage],
    () => {
      let filtered = articles;

      // Apply status filter
      if (statusFilter !== "all") {
        filtered = articles.filter(
          (article) => article.status === statusFilter
        );
      }

      // Pagination logic
      const startIndex = (currentPage - 1) * articlesPerPage;
      return filtered.slice(startIndex, startIndex + articlesPerPage);
    },
    {
      keepPreviousData: true,
    }
  );

  // Calculate total pages for the filtered list
  const totalFilteredArticles =
    statusFilter === "all"
      ? articles.length
      : articles.filter((article) => article.status === statusFilter).length;
  const totalPages = Math.ceil(totalFilteredArticles / articlesPerPage);

  return (
    <Container>
      {/* Filter Tabs */}
      <div className="flex justify-center space-x-4 mb-4">
        {["all", "PUBLISHED", "UNPUBLISHED", "DRAFT"].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded ${
              statusFilter === status ? "bg-black text-white" : "bg-gray-200"
            }`}
            onClick={() => setStatusFilter(status)}
          >
            {status === "all"
              ? "All"
              : status.charAt(0) + status.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="flex justify-center items-center p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredArticles?.map((article) => (
            <Link href={`/Article/${article.id}`} key={article.id}>
              <AuthorCard key={article.id} article={article} />
            </Link>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
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
            className={`px-4 py-2 border rounded flex gap-x-2 items-center ${
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
