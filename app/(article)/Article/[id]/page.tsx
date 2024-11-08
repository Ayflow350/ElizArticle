import getArticleById from "@/app/actions/getArticlesById";
import ArticleClient from "../ArticleClient";

const ArticlePage = async ({ params }: { params: { id: string } }) => {
  const articleId = params.id;
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
