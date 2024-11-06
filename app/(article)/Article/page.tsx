// app/articles/page.tsx
"use client";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getArticles from "@/app/actions/getArticles";
import ArticlesPageWrapper from "../_components/ArticlesPageWrapper";
import { SafeArticle } from "@/types";

const ArticlesPage = async () => {
  const articlesData: SafeArticle[] = await getArticles({});

  if (!articlesData || articlesData.length === 0) {
    return <div>No articles</div>;
  }

  return (
    <div className="mt-[100px] bg-blue-400">
      <ArticlesPageWrapper articles={articlesData} />
    </div>
  );
};

export default ArticlesPage;
