"use client";
import { useParams } from "next/navigation";
import getArticleById from "@/app/actions/getArticlesById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ArticleClient from "../ArticleClient";

const ArticlePage = async () => {
  const params = useParams();
  const articleId = Array.isArray(params?.id) ? params.id[0] : params?.id; // Ensure articleId is a string or undefined
  const article = await getArticleById({ articleId });
  const currentUser = await getCurrentUser();

  if (!article) {
    return <div>No article found</div>;
  }

  return (
    <div className="mt-[100px]">
      <ArticleClient article={article} currentUser={currentUser} />
    </div>
  );
};

export default ArticlePage;
