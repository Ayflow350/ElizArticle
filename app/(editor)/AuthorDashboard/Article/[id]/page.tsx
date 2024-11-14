import getArticleById from "@/app/actions/getArticlesById"; // Ensure this function runs server-side
import AuthorClient from "../AuthorClient";

// Helper function to fetch article data
const fetchArticleData = async (articleId: string) => {
  console.log("Fetching article with ID:", articleId); // Log articleId
  const article = await getArticleById({ articleId });
  console.log("Fetched article:", article); // Log the result of the fetch
  return article;
};

// Updated ArticlePage with awaited params
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>; // Expect `params.id` to be a string, not an array
}) {
  // Wait for params to resolve and directly access `id`
  const { id: articleId } = await params;

  // Log the articleId for debugging
  console.log("Resolved articleId:", articleId); // This should give the full ID

  // Fetch article by ID
  const article = await fetchArticleData(articleId);

  // Handle case where article is not found
  if (!article) {
    return <div>No article found</div>;
  }

  // Render the article if found
  return (
    <div className="mt-[100px]">
      <AuthorClient article={article} />
    </div>
  );
}
