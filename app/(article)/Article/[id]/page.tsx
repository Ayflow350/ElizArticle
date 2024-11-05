import getArticleById from "@/app/actions/getArticlesById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ArticleClient from "../ArticleClient";

interface IParams {
  id?: string;
}

const ArticlePage = async ({ params }: { params: { id: string } }) => {
  const article = await getArticleById({ articleId: params.id });
  const currentUser = await getCurrentUser();

  if (!article) {
    return <div>No article</div>;
  }

  return (
    <div className="mt-[100px]">
      <ArticleClient article={article} currentUser={currentUser} />
    </div>
  );
};

export default ArticlePage;
