// app/articles/page.tsx
"use client";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getArticles from "@/app/actions/getArticles";
import ArticlesPageWrapper from "../_components/ArticlesPageWrapper";
import { SafeArticle } from "@/types";
export const dynamic = "force-dynamic";

const ArticlesPage = async () => {
  // Pass an empty object if there are no specific params for filtering articles
  const articlesData: SafeArticle[] = await getArticles({});

  if (!articlesData || articlesData.length === 0) {
    return <div>No articles</div>;
  }

  return (
    <div className="mt-[100px]">
      <ArticlesPageWrapper articles={articlesData} />
    </div>
  );
};

export default ArticlesPage;
