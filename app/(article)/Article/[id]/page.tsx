// app/articles/[id]/page.tsx (server component)
import getArticleById from "@/app/actions/getArticlesById"; // Ensure this function runs server-side
import ArticleClient from "../ArticleClient"; // Adjust path if needed

const ArticlePage = async ({ params }: { params: { id: string } }) => {
  const articleId = params.id; // params.id will be a string, since it's from dynamic route
  const article = await getArticleById({ articleId });

  if (!article) {
    return <div>No article found</div>;
  }

  return (
    <div className="mt-[100px]">
      <ArticleClient article={article} />
    </div>
  );
};

export default ArticlePage;
