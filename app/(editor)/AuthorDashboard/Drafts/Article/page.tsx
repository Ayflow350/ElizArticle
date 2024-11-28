// app/articles/page.tsx
import getArticles from "@/app/actions/getArticles";
import { SafeArticle } from "@/types";
import AuthorPageWrapper from "@/app/(article)/_components/ArticlesPageWrapper";
import Footer from "@/app/components/Footer";

// Server Component
const ArticlesPage = async () => {
  try {
    const articlesData: SafeArticle[] = await getArticles({
      references: "",
    });

    if (!articlesData || articlesData.length === 0) {
      return <div>No articles</div>;
    }

    return (
      <div>
        <AuthorPageWrapper articles={articlesData} />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error fetching articles:", error);
    return <div>Error fetching articles</div>;
  }
};

export default ArticlesPage;
