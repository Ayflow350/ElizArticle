// app/articles/page.tsx
import getArticles from "@/app/actions/getArticles";
import ArticlesPageWrapper from "../_components/ArticlesPageWrapper";
import { SafeArticle } from "@/types";

// Ensure dynamic data fetching
export const dynamic = "force-dynamic";

// Server Component
const ArticlesPage = async () => {
  try {
    // Fetch the articles server-side
    const articlesData: SafeArticle[] = await getArticles({
      references: "",
    });

    // Handle the case where no articles are found
    if (!articlesData || articlesData.length === 0) {
      return <div>No articles</div>;
    }

    return (
      <div className="mt-[60px]">
        <div className="text-center space-y-5 mb-20">
          <h1 className="font-bold  text-lg text-[#000]">
            ARTICLES - My Research
          </h1>
          <h1 className="font-bold text-2xl  md:text-3xl px-3  lg:text-5xl">
            Articles on optimizing thyroid, adrenal, and steroid hormone
            function and why it is so important for your health.
          </h1>
          <p className="text-gray-600 px-3">
            I decided not to write the book on thyroid and adrenal function
            because too many people need the information now. I prefer writing
            to making videos, and this way, I can also include references.
          </p>
          <p className="text-gray-600 px-3">
            Writing a book would have taken me a couple of years, and since my
            research is ongoing, I've decided to share my articles here and add
            to them as often as possible. This way, you can be part of the
            continuous learning process.
          </p>

          <p className="text-gray-600 px-3">
            The subject matter of the articles will be more varied than
            endocrinology, but it will also provide information on how to eat to
            optimize your health. Per my research, optimum health starts with
            diet and adequate thyroid and adrenal function. But there are a
            myriad of elements that make this work. It's a complex puzzle, and I
            will not only raise issues you would never have associated with
            these two endocrine glands but also explain how they all operate
            together. Subscribe to get full access to my research articles.
          </p>
        </div>
        <ArticlesPageWrapper articles={articlesData} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching articles:", error);
    return <div>Error fetching articles</div>;
  }
};

export default ArticlesPage;
