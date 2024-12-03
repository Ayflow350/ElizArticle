// app/articles/page.tsx
import getArticles from "@/app/actions/getArticles";
import ArticlesPageWrapper from "../_components/ArticlesPageWrapper";
import { SafeArticle } from "@/types";
import Footer from "@/app/components/Footer";
import Container from "@/app/components/Container";

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
      <div className="mt-[30px]">
        <div className=" space-y-5 mb-20">
          <h1 className=" text-center font-bold border-t border-b  bg-black text-white text-[70px] lg:text-[160px] ">
            THE RESEARCH
          </h1>
          <Container>
            <h1 className=" text-left font-bold text-2xl  md:text-3xl px-3 mb-6  lg:text-5xl">
              Articles on optimizing thyroid, adrenal, and steroid hormone
              functions
            </h1>
            <p className=" text-left  text-[16px] lg:text-lg text-gray-600 px-3 indent-8 mb-4 ">
              I decided not to write the book on thyroid and adrenal function
              because too many people need the information now. I prefer writing
              to making videos, and this way, I can also include references.
              Writing a book would have taken me a couple of years, and since my
              research is ongoing, I've decided to share my articles here and
              add to them as often as possible. This way, you can be part of the
              continuous learning process.
            </p>

            <p className="text-gray-600 text-[16px] px-3 lg:text-lg indent-8 ">
              The subject matter of the articles will be more varied than
              endocrinology, but it will also provide information on how to eat
              to optimize your health. Per my research, optimum health starts
              with diet and adequate thyroid and adrenal function. But there are
              a myriad of elements that make this work. It's a complex puzzle,
              and I will not only raise issues you would never have associated
              with these two endocrine glands but also explain how they all
              operate together. Subscribe to get full access to my research
              articles.
            </p>
          </Container>
        </div>
        <ArticlesPageWrapper articles={articlesData} />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error fetching articles:", error);
    return <div>Error fetching articles</div>;
  }
};

export default ArticlesPage;
