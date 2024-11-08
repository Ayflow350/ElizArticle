// components/ArticleCard.tsx
import Container from "@/app/components/Container";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
export const dynamic = "force-dynamic";

interface Article {
  id: string;
  picture: string;
  category: string;
  title: string;
  minutesRead: number;
  content: string;
}

const AuthorCard: React.FC<{ article: Article }> = ({ article }) => (
  <Link href={`/AuthorDashboard/Article/${article.id}`} passHref>
    <div className="cursor-pointer flex-col items-center">
      <img
        src={article.picture}
        alt={article.title}
        className="w-full h-[300px] translate-x-3 mb-3 rounded-md"
      />

      <div className="flex gap-x-2 text-black justify-between rounded-full p-3 w-auto mb-3">
        <h1 className="text-[#ffff] bg-black rounded-full font-bold px-2">
          {article.category}
        </h1>
        <h1>{article.minutesRead} min read</h1>
      </div>

      <h1 className="text-lg font-bold">{article.title}</h1>
      <p className="my-3">{article.content}</p>
      <button className="rounded-lg bg-black gap-x-1 text-white p-3 flex flex-row justify-center items-center">
        Read more
        <MdArrowOutward />
      </button>
    </div>
  </Link>
);

export default AuthorCard;
