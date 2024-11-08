"use client";

import axios from "axios";
import { useState } from "react";
import Input from "@/app/components/inputs/article";
import toast, { Toaster } from "react-hot-toast";
import Editor from "../_components/editor";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import ImageUpload from "../_components/imageUpload";
export const dynamic = "force-dynamic";

export const dynamicParams = true;

const ArticleForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [introContent, setIntroContent] = useState("");
  const [mainContent, setMainContent] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      picture: "",
      category: "",
      title: "",
      author: "",
      datePublished: new Date("October 22, 2024"),
      minutesRead: 0,
      content: "",
      references: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    const articleData = {
      ...data,
      content: introContent, // Map intro content to main content
      references: mainContent, // Map references content
    };

    try {
      await axios.post("/api/createArticle", articleData);
      toast.success("Article posted successfully!");
    } catch (error) {
      console.error("Error uploading article:", error);
      toast.error("Something went wrong while posting the article.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (url: string) => {
    setValue("picture", url);
  };

  return (
    <Container>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-[1000px]"
      >
        <h1 className="mx-auto font-bold text-4xl my-5">
          Create a New Article
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h1 className="text-lg font-bold mb-2">Title *</h1>
            <Input
              id="title"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              placeholder="Enter the article title"
            />
          </div>

          <div>
            <h1 className="text-lg font-bold mb-1">Category *</h1>
            <Input
              id="category"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              placeholder="Select a category"
            />
          </div>

          <div>
            <h1 className="text-lg font-bold mb-1">Author *</h1>
            <Input
              id="author"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              placeholder="Enter the author's name"
            />
          </div>

          <div>
            <h1 className="text-lg font-bold mb-1">Minutes read *</h1>
            <Input
              id="minutesRead"
              type="number"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              placeholder="Enter estimated minutes to read"
            />
          </div>
        </div>

        <div className="w-[900px] my-5">
          <ImageUpload
            value={getValues("picture")}
            onChange={handleImageChange}
          />
        </div>

        {errors.content && (
          <span className="text-rose-500">Content is required.</span>
        )}

        {/* Editor for main article content */}
        <Editor
          title="Article Content"
          content={introContent}
          onContentChange={setIntroContent}
          onClose={() => {}}
        />

        {/* Editor for references */}
        <Editor
          title="References"
          content={mainContent}
          onContentChange={setMainContent}
          onClose={() => {}}
        />

        <Button type="submit" disabled={isLoading} label="Post Article" />
        <Toaster />
      </form>
    </Container>
  );
};

export default ArticleForm;
