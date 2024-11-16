"use client";

import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const Editor: React.FC<{
  title: string;
  content: string;
  onContentChange: (content: string) => void;
  onClose: () => void;
}> = ({ title, content, onContentChange, onClose }) => {
  const [value, setValue] = useState(content);

  useEffect(() => {
    setValue(content);
  }, [content]);

  const handleContentChange = (content: string) => {
    setValue(content);
    onContentChange(content);
  };

  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", "image", "clean"],
  ];

  const sanitizedContent = DOMPurify.sanitize(value);

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-2">{title}</h1>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleContentChange}
        modules={{ toolbar: { container: toolbarOptions } }}
        className="w-full max-w-[900px] h-[300px] border bg-white border-gray-400 rounded-lg overflow-y-auto"
      />
    </div>
  );
};

export default Editor;
