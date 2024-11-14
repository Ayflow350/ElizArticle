import { useEffect, useState } from "react";
import Container from "@/app/components/Container";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

interface Article {
  id: string;
  picture: string;
  category: string;
  title: string;
  minutesRead: number;
  content: string;
}

export const dynamic = "force-dynamic";

// Function to extract the first N words from content and add line breaks
const getPreviewText = (
  text: string,
  wordLimit: number = 25,
  wordsPerLine: number = 10
) => {
  let cleanedText = text.trim().replace(/<p\s*>\s*<\/p>/g, "");
  const words = cleanedText.split(" ").slice(0, wordLimit);
  const lines = [];
  for (let i = 0; i < words.length; i += wordsPerLine) {
    lines.push(words.slice(i, i + wordsPerLine).join(" "));
  }
  return lines.join("<br>") + (words.length >= wordLimit ? "..." : "");
};

const AuthorCard: React.FC<{ article: Article }> = ({ article }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [watermarkVisible, setWatermarkVisible] = useState(false);

  useEffect(() => {
    const disableCopy = (e: ClipboardEvent) => e.preventDefault();
    const disableKeyboardShortcuts = (e: KeyboardEvent) => {
      if (
        ((e.ctrlKey || e.metaKey) && ["c", "p", "s"].includes(e.key)) ||
        e.ctrlKey ||
        (e.metaKey && e.shiftKey && ["I", "J"].includes(e.key)) ||
        e.key === "F12"
      ) {
        e.preventDefault();
        alert("Subscribe - this is membership only");
      }
    };

    const disableRightClick = (e: MouseEvent) => {
      e.preventDefault();
      alert("Subscribe - this is membership only");
    };

    const detectDevTools = () => {
      if (
        window.outerWidth - window.innerWidth > 160 ||
        window.outerHeight - window.innerHeight > 160
      ) {
        alert("Developer Tools is not allowed!");
      }
    };

    const disableLongPress = (e: TouchEvent) => {
      e.preventDefault();
    };

    const handlePrintScreen = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen") {
        setWatermarkVisible(true);
        alert("Screenshots are restricted by policy.");
      }
    };

    setIsMobile(window.innerWidth < 768);

    if (!isMobile) {
      document.addEventListener("copy", disableCopy);
      document.addEventListener("keydown", disableKeyboardShortcuts);
      document.addEventListener("contextmenu", disableRightClick);
      window.addEventListener("resize", detectDevTools);
      document.addEventListener("touchstart", disableLongPress);
      document.addEventListener("touchend", disableLongPress);
      document.addEventListener("keydown", handlePrintScreen);
    }

    return () => {
      document.removeEventListener("copy", disableCopy);
      document.removeEventListener("keydown", disableKeyboardShortcuts);
      document.removeEventListener("contextmenu", disableRightClick);
      window.removeEventListener("resize", detectDevTools);
      document.removeEventListener("touchstart", disableLongPress);
      document.removeEventListener("touchend", disableLongPress);
      document.removeEventListener("keydown", handlePrintScreen);
    };
  }, [isMobile]);

  const previewContent = getPreviewText(article.content);

  return (
    <Link href={`/Article/${article.id}`} passHref>
      <div className="cursor-pointer flex-col items-center relative">
        <div
          className={`watermark-overlay ${watermarkVisible ? "visible" : ""}`}
        >
          Confidential
        </div>
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
        <p
          className="my-3"
          dangerouslySetInnerHTML={{ __html: previewContent }}
        ></p>
        <button className="rounded-lg bg-black gap-x-1 text-white p-3 flex flex-row justify-center items-center">
          Read more
          <MdArrowOutward />
        </button>
      </div>
    </Link>
  );
};

export default AuthorCard;
