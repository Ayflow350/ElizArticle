"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/app/components/inputs/article";
import toast, { Toaster } from "react-hot-toast";
import Editor from "../_components/editor";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import ImageUpload from "../_components/imageUpload";
import { ClipLoader } from "react-spinners"; // Import the ClipLoader component
import Footer from "@/app/components/Footer";
import { MdPreview, MdSave } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

const ArticleForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [introContent, setIntroContent] = useState("");
  const [mainContent, setMainContent] = useState("");
  const router = useRouter();

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
    // Initialize the router
    setIsLoading(true);

    const articleData = {
      ...data,
      content: introContent, // Map intro content to main content
      references: mainContent, // Map references content
      minutesRead: Number(data.minutesRead) || 0, // Ensure minutesRead is a number
    };

    try {
      const response = await axios.post("/api/createArticle", articleData);

      // Assuming the response contains the article ID
      const { id } = response.data;

      toast.success("Article posted successfully!");

      // Navigate to the new article page
      router.push(`/AuthorDashboard/PublishArticle/Article/${id}`);
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
      <div className="flex justify-center items-center min-h-screen px-4 relative">
        {/* Overlay and spinner during loading */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
            <ClipLoader color="#fff" size={100} />{" "}
            {/* Increased size of spinner */}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full max-w-4xl mx-auto relative"
        >
          <h1 className="mx-auto font-bold text-4xl my-5 text-center">
            Create a New Article
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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

            <div className="relative w-full">
              <h1 className="text-lg font-bold mb-1">Category *</h1>
              <div className="relative">
                <select
                  id="category"
                  {...register("category", { required: true })}
                  disabled={isLoading}
                  className={`
        peer h-14 w-[450px] md:w-[400px] px-4 pr-10 text-lg text-[#1C1B1F] bg-white border rounded-lg outline-none transition-all duration-300
        ${errors.category ? "border-rose-500" : "border-[#79747E]"}
        ${errors.category ? "focus:border-rose-500" : "focus:border-black"}
        disabled:opacity-70 disabled:cursor-not-allowed appearance-none
      `}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="Thyroid Function">Thyroid Function</option>
                  <option value="Adrenal Function">Adrenal Function</option>
                  <option value="Steroid Hormones">Steroid Hormones</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                  {/* Add more categories as needed */}
                </select>

                {/* Custom dropdown icon */}
                <span className="absolute inset-y-0 right-1 lg:right-12 flex items-center pointer-events-none text-black">
                  <FaAngleDown />
                </span>
              </div>

              {errors.category && (
                <span className="text-rose-500 text-sm mt-1">
                  Category is required.
                </span>
              )}
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

          <div className="my-5">
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

          {/* Center the submit button */}
          <div className="flex justify-center items-center mt-6">
            <Button
              type="submit"
              disabled={isLoading}
              icon={<MdPreview />}
              label="Preview Article"
            />
          </div>

          <Toaster />
        </form>
      </div>

      <Footer />
    </Container>
  );
};

export default ArticleForm;
