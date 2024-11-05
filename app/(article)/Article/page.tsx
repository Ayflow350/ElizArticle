// app/articles/page.tsx
import getCurrentUser from "@/app/actions/getCurrentUser";
import getArticles, { IArticleParams } from "@/app/actions/getArticles";
import ArticlesPageWrapper from "../_components/ArticlesPageWrapper";
import { SafeArticle } from "@/types";

const ArticlesPage = async ({ params }: { params: IArticleParams }) => {
  const articlesData: SafeArticle[] = await getArticles(params); // Explicitly typed as SafeArticle[]
  const currentUser = await getCurrentUser();

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
