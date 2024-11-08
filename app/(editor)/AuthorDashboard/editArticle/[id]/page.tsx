import getArticleById from "@/app/actions/getArticlesById";
import EditArticleClient from "../editArticleClient";

const EditArticle = async ({ params }: { params: { id: string } }) => {
  const articleId = params.id;
  const article = await getArticleById({ articleId });

  if (!article) {
    return <div>No article found</div>;
  }

  return (
    <div className="mt-[100px]">
      <EditArticleClient article={article} />
    </div>
  );
};

export default EditArticle;
