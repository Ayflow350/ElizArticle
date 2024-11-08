// app/articles/[id]/page.tsx (server component)
import getArticleById from "@/app/actions/getArticlesById"; // Ensure this function runs server-side
import ArticleClient from "../../../../(article)/Article/ArticleClient"; // Adjust path if needed
import AuthorClient from "../AuthorClient";

const ArticlePage = async ({ params }: { params: { id: string } }) => {
  const articleId = params.id;
  const article = await getArticleById({ articleId });

  if (!article) {
    return <div>No article found</div>;
  }

  return (
    <div className="mt-[100px]">
      <AuthorClient article={article} />
    </div>
  );
};

export default ArticlePage;
