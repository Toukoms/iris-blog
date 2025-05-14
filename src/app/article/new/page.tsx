"use client";

import type { createArticleSchema } from "@/schema/article";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import type { z } from "zod";

type TCreateArticle = z.infer<typeof createArticleSchema>;

function NewArticlePage() {
  const router = useRouter();

  const articleMutation = api.article.createArticle.useMutation({
    onSuccess: (data) => {
      toast.success("Article created successfully");
      router.replace(`/article/${data.id}/edit`);
    },
    onError: (error) => {
      toast.error("Error creating article");
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    articleMutation.mutate({
      title: formData.get("title") as string,
    } as TCreateArticle);
  };

  return (
    <div className="mx-auto max-w-xl ">
      <h2>Create a new article</h2>
      <form onSubmit={handleSubmit} className="flex w-full flex-col space-y-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-2 font-semibold text-sm">
            Title
          </label>
          <input
            type="text"
            placeholder="Add title here"
            name="title"
            className="input w-full"
          />
          {articleMutation.error && (
            <p className="m-0 pt-2 text-error text-sm">
              {articleMutation.error.shape?.data?.zodError?.fieldErrors?.title}
            </p>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Create Article
        </button>
      </form>
    </div>
  );
}

export default NewArticlePage;
