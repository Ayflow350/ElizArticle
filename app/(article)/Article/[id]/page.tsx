// app/Article/[id]/page.tsx

import getArticleById from "@/app/actions/getArticlesById"; // Ensure this path is correct
import getCurrentUser from "@/app/actions/getCurrentUser"; // Assuming you have a function to get the current user
import ArticleClient from "../ArticleClient"; // Create this component for displaying the article details

interface IParams {
  id?: string; // The ID of the article
}

const ArticlePage = async ({ params }: { params: IParams }) => {
  const article = await getArticleById({ articleId: params.id });
  const currentUser = await getCurrentUser(); // Fetch the current user if needed

  if (!article) {
    return <div>No article</div>; // Show an empty state if the article is not found
  }

  return (
    <div className="mt-[100px]">
      <ArticleClient
        article={article} // Pass the article data to a client component
        currentUser={currentUser} // Optional: if you want to show user-specific content
      />
    </div>
  );
};

export default ArticlePage;
