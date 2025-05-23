"use client";
import { editArticleSchema } from "@/schema/article";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "react-toastify";
import type { z } from "zod";

type TEditArticleForm = z.infer<typeof editArticleSchema>;
type Params = Promise<{ id: string }>;

const welcomeText = "<h2>Start writing here...</h2>";

function EditArticlePage(props: { params: Params }) {
  const router = useRouter();
  const params = use(props.params);
  const id = params.id;

  if (!id) {
    router.back();
  }

  const articleQuery = api.article.getArticleById.useQuery(id, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    gcTime: 0,
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
    setValue,
  } = useForm<TEditArticleForm>({
    resolver: zodResolver(editArticleSchema),
  });

  useEffect(() => {
    if (articleQuery.isSuccess && articleQuery.data) {
      getSession().then((session) => {
        if (!session) {
          toast.error("You need to be logged in to edit an article");
          router.back();
          return;
        }
        const user = session?.user;
        const isAuthor = user?.id === articleQuery.data?.authorId;
        if (!isAuthor) {
          toast.error("You are not the author of this article");
          router.back();
          return;
        }
      });

      // add default value
      const keys = Object.keys(
        editArticleSchema.shape
      ) as (keyof TEditArticleForm)[];
      for (const key of keys) {
        if (articleQuery.data[key] !== null) {
          setValue(key, articleQuery.data[key]);
        }
      }
    } else if (articleQuery.isError || articleQuery.data === null) {
      router.back();
      return;
    }
  }, [
    articleQuery.isSuccess,
    articleQuery.data,
    articleQuery.isError,
    router,
    setValue,
  ]);

  const updateArticle = api.article.updateArticle.useMutation({
    onSuccess: () => {
      toast.success("Article saved successfully");
      router.push(`/article/${id}`);
    },
    onError: (error) => {
      if (error.data?.zodError) {
        const { fieldErrors } = error.data.zodError;
        for (const [field, errors] of Object.entries(fieldErrors)) {
          if (errors) {
            for (const error of errors) {
              if (field in editArticleSchema.shape) {
                setError(field as keyof TEditArticleForm, {
                  type: "server",
                  message: error,
                });
              } else {
                setError("root", {
                  type: "server",
                  message: error,
                });
              }
            }
          }
        }
      }
    },
  });

  const onSubmit: SubmitHandler<TEditArticleForm> = (data) => {
    updateArticle.mutate(data);
  };

  if (articleQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (articleQuery.isError) {
    return <div>Error getting article</div>;
  }

  return (
    <div className="mx-auto my-8 max-w-4xl rounded-md border p-4 shadow-sm">
      <h2 className="mt-4">Edit Article</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Title</legend>
          <input
            type="text"
            className="input w-full max-w-xl"
            placeholder="My awesome article"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title?.message && (
            <p className="my-0 mt-2 text-error text-sm">
              {errors.title.message}
            </p>
          )}
          <p className="label my-0">You can edit your article title here</p>
        </fieldset>

        <fieldset className="fieldset mb-0">
          <legend className="fieldset-legend">Description</legend>
          <textarea
            className="textarea w-full resize-none"
            rows={3}
            placeholder="Write a short description of your article..."
            {...register("description", { required: "Title is required" })}
          />
          {errors.title?.message && (
            <p className="my-0 mt-2 text-error text-sm">
              {errors.title.message}
            </p>
          )}
          <p className="label my-0">
            You can edit your article description here.
          </p>
        </fieldset>

        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Content</legend>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <div className="w-full">
                <ReactQuill
                  theme="snow"
                  modules={{
                    toolbar: [
                      [{ header: [2, 3, 4, false] }],
                      ["bold", "italic", "underline", "strike"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "image"],
                      ["clean"],
                    ],
                  }}
                  value={field.value || welcomeText}
                  onChange={(value) => field.onChange(value)}
                />
              </div>
            )}
          />
          {errors.content?.message && (
            <p className="my-0 mt-2 text-error text-sm">
              {errors.content.message}
            </p>
          )}
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Published</legend>
          <input
            type="checkbox"
            className="checkbox"
            {...register("published")}
          />
          <p className="label">Check this box to publish your article</p>
          {errors.published?.message && (
            <p className="my-0 mt-2 text-error text-sm">
              {errors.published.message}
            </p>
          )}
        </fieldset>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={updateArticle.isPending}
        >
          {updateArticle.isPending ? "Saving..." : "Save"}
        </button>

        {errors.root?.message && (
          <p className="my-0 mt-2 text-error text-sm">{errors.root.message}</p>
        )}
      </form>
    </div>
  );
}

export default EditArticlePage;
