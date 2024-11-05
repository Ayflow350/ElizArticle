"use client";
import React, { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic"; // Dynamically import ReactQuill
import axios from "axios";
import { Article } from "@/app/types/types";

// Dynamically import ReactQuill only for the client-side
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const EditArticleForm: React.FC<{ article: Article; onClose: () => void }> = ({
  article,
  onClose,
}) => {
  const [formData, setFormData] = useState<Article>(article);

  useEffect(() => {
    setFormData(article);
  }, [article]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.put(`/api/fetchArticle/${article.id}`, formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl font-bold">Edit Article</h2>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Title"
        className="border p-2 w-full mb-2"
        required
      />
      {ReactQuill && (
        <ReactQuill
          value={formData.content}
          onChange={handleContentChange}
          placeholder="Content"
          className="mb-2"
          theme="snow"
          style={{ height: "600px" }}
        />
      )}
      <input
        type="text"
        name="author"
        value={formData.author}
        onChange={handleInputChange}
        placeholder="Author"
        className="border p-2 w-full mb-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Save Changes
      </button>
      <button
        type="button"
        onClick={onClose}
        className="ml-2 bg-red-500 text-white p-2 rounded"
      >
        Cancel
      </button>
    </form>
  );
};

export default EditArticleForm;
