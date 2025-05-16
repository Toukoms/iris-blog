"use client";

import { createArticleSchema } from "@/schema/article";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type { z } from "zod";

type TCreateArticle = z.infer<typeof createArticleSchema>;

function NewArticlePage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    setError,
  } = useForm<TCreateArticle>({
    resolver: zodResolver(createArticleSchema),
  });

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.back();
      }
    });
  }, [router]);

  const createArticle = api.article.createArticle.useMutation({
    onSuccess: (data) => {
      toast.success("Article created successfully");
      router.replace(`/article/${data.id}/edit`);
    },
    onError: (error) => {
      if (error.data?.zodError) {
        const { fieldErrors } = error.data.zodError;
        for (const [field, errors] of Object.entries(fieldErrors)) {
          if (errors) {
            for (const error of errors) {
              setError(field as keyof TCreateArticle, {
                type: "server",
                message: error,
              });
            }
          }
        }
      }
    },
  });

  const onSubmit: SubmitHandler<TCreateArticle> = async ({ title }) => {
    createArticle.mutate({
      title: title,
    });
  };

  return (
    <div className="mx-auto max-w-xl ">
      <h2>Create a new article</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col space-y-4"
      >
        <fieldset className="fieldset mb-0">
          <legend className="fieldset-legend">Article title</legend>
          <input
            type="text"
            className="input w-full"
            placeholder="My awesome article"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title?.message && (
            <p className="my-0 mt-2 text-error text-sm">
              {errors.title.message}
            </p>
          )}
          <p className="label my-0">
            You can edit article title later in the article editor.
          </p>
        </fieldset>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Creating article..." : "Create article"}
        </button>
      </form>
    </div>
  );
}

export default NewArticlePage;
