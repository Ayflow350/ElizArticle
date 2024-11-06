// app/articles/page.tsx
import getArticles from "@/app/actions/getArticles";
import ArticlesPageWrapper from "../_components/ArticlesPageWrapper";
import { SafeArticle } from "@/types";

// Server Component
const ArticlesPage = async () => {
  try {
    // Fetch the articles server-side
    const articlesData: SafeArticle[] = await getArticles({});

    // Handle the case where no articles are found
    if (!articlesData || articlesData.length === 0) {
      return <div>No articles</div>;
    }

    return (
      <div className="mt-[100px] ">
        <ArticlesPageWrapper articles={articlesData} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching articles:", error);
    return <div>Error fetching articles</div>;
  }
};

export default ArticlesPage;
