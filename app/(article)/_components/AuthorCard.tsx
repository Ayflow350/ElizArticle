import { useState, useEffect } from "react";
import Link from "next/link";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";
import { CgPen } from "react-icons/cg";
import Modal from "@/app/components/Modals/Modal"; // Assuming you already have a Modal component
import toast from "react-hot-toast";

interface Article {
  id: string;
  picture: string;
  category: string;
  title: string;
  minutesRead: number;
  content: string;
  status: string; // Now this field will be used for publishing/unpublishing logic
}

export const dynamic = "force-dynamic";

const getPreviewText = (text: string, wordLimit: number = 25) => {
  let cleanedText = text.trim().replace(/<p\s*>\s*<\/p>/g, "");
  const words = cleanedText.split(" ").slice(0, wordLimit);
  return words.join(" ") + (words.length >= wordLimit ? "..." : "");
};

const AuthorCard: React.FC<{ article: Article }> = ({ article }) => {
  const [watermarkVisible, setWatermarkVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // To control modal visibility
  const [isLoading, setIsLoading] = useState(false); // To handle loading state
  const [unpublishModalOpen, setUnpublishModalOpen] = useState(false); // Modal state for unpublishing
  const [publishModalOpen, setPublishModalOpen] = useState(false); // Modal state for publishing

  useEffect(() => {
    const handlePrintScreen = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen") {
        setWatermarkVisible(true);
        toast.error("Screenshots are restricted by policy."); // Toast notification
      }
    };

    document.addEventListener("keydown", handlePrintScreen);
    return () => {
      document.removeEventListener("keydown", handlePrintScreen);
    };
  }, []);

  const previewContent = getPreviewText(article.content);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the navigation
    setModalOpen(true); // Show the modal on delete click
  };

  const handleUnpublishClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the default behavior
    setUnpublishModalOpen(true); // Show the unpublish modal
  };

  const handlePublishClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the default behavior
    setPublishModalOpen(true); // Show the publish modal
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Close delete modal
    setUnpublishModalOpen(false); // Close unpublish modal
    setPublishModalOpen(false); // Close publish modal
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/deleteArticle", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: article.id }),
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(
          data.error || "An error occurred while deleting the article"
        );
      } else {
        toast.success("Article deleted successfully");
        window.location.reload();
      }
    } catch (error) {
      toast.error("An error occurred while deleting the article");
    } finally {
      setIsLoading(false);
      setModalOpen(false);
    }
  };

  const handleUnpublishArticle = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/unpublishArticle", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ articleId: article.id }), // Sending the article ID
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(
          data.error || "An error occurred while unpublishing the article"
        );
      } else {
        toast.success("Article unpublished successfully");
        window.location.reload();
      }
    } catch (error) {
      toast.error("An error occurred while unpublishing the article");
    } finally {
      setIsLoading(false);
      setUnpublishModalOpen(false); // Close the modal after unpublishing
    }
  };

  const handlePublishArticle = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/publishArticle", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ articleId: article.id }), // Sending the article ID
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(
          data.error || "An error occurred while publishing the article"
        );
      } else {
        toast.success("Article published successfully");
        window.location.reload();
      }
    } catch (error) {
      toast.error("An error occurred while publishing the article");
    } finally {
      setIsLoading(false);
      setPublishModalOpen(false); // Close the modal after publishing
    }
  };

  return (
    <>
      <div className="cursor-pointer flex flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-200 relative w-[400px] h-[550px]">
        <img
          src={article.picture}
          alt={article.title}
          className="w-full h-[250px] object-cover"
        />
        <div className="px-4 py-3 flex flex-col flex-grow">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-white bg-black rounded-full px-3 py-1">
              {article.category}
            </span>
            <span className="text-sm text-gray-500">
              {article.minutesRead} min read
            </span>
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
            {article.title}
          </h2>
          <div
            className="text-sm text-gray-600 mb-4 overflow-hidden line-clamp-3"
            dangerouslySetInnerHTML={{ __html: article.content }}
          ></div>
          <div className="flex justify-between space-x-2 mt-auto">
            <Link
              href={`/AuthorDashboard/editArticle/${article.id}`}
              className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-md hover:bg-blue-700 transition"
            >
              <CgPen className="mr-2" />
              Edit
            </Link>
            <button
              onClick={
                article.status === "PUBLISHED"
                  ? handleUnpublishClick
                  : handlePublishClick
              } // Toggle between unpublish and publish
              className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-md hover:bg-yellow-600 transition"
            >
              <IoMdEyeOff className="mr-2" />
              {article.status === "PUBLISHED" ? "Unpublish" : "Publish"}
              {/* Toggle the button text based on status */}
            </button>
            <button
              onClick={handleDeleteClick} // Trigger modal when clicked
              className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-md hover:bg-red-700 transition"
            >
              <MdOutlineDeleteOutline className="mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Modal for confirming delete */}
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleConfirmDelete}
        title="Confirm Deletion"
        paragraph="Are you sure you want to delete this article?"
        actionLabel="Delete"
        isLoading={isLoading}
      />

      {/* Modal for unpublishing */}
      <Modal
        isOpen={unpublishModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleUnpublishArticle}
        title="Confirm Unpublish"
        paragraph="Are you sure you want to unpublish this article?"
        actionLabel="Unpublish"
        isLoading={isLoading}
      />

      {/* Modal for publishing */}
      <Modal
        isOpen={publishModalOpen}
        onClose={handleCloseModal}
        onSubmit={handlePublishArticle}
        title="Confirm Publish"
        paragraph="Are you sure you want to publish this article?"
        actionLabel="Publish"
        isLoading={isLoading}
      />
    </>
  );
};

export default AuthorCard;
