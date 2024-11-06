"use client";
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Link from "next/link";
export const dynamic = "force-dynamic";

export const dynamicParams = true;

interface Article {
  id: string;
  picture: string;
  category: string;
  title: string;
  author: string;
  datePublished: string;
  minutesRead: number;
  content: string;
  references: string[];
}

async function fetchArticles(): Promise<Article[]> {
  const { data } = await axios.get("/api/fetchArticle");
  return data;
}

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => (
  <Link
    href={`/AuthorDashboard/Article/${article.id}`}
    className="border p-4 rounded shadow-md"
  >
    <h1 className="text-lg font-bold">{article.title}</h1>
    <img
      src={article.picture}
      alt={article.title}
      className="w-full h-auto rounded"
    />
    <p className="mt-2">{article.content}</p>
    <p className="mt-2">By {article.author}</p>
    <p className="text-gray-500">{article.minutesRead} min read</p>
    <p className="text-gray-500">{article.datePublished}</p>
    <p className="text-gray-500">{article.category}</p>
    <hr className="my-2" />
  </Link>
);

const ArticlesPage = () => {
  const {
    data: articles,
    isLoading,
    isError,
  } = useQuery<Article[]>("articles", fetchArticles, {
    staleTime: 1000 * 60 * 5,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  if (isLoading) return <p>Loading articles...</p>;
  if (isError) return <p>Error loading articles!</p>;

  // Pagination logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles?.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalPages = Math.ceil((articles?.length || 0) / articlesPerPage);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {currentArticles?.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          className={`px-4 py-2 border rounded ${
            currentPage === 1 ? "disabled" : ""
          }`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className={`px-4 py-2 border rounded ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ArticlesPage;
