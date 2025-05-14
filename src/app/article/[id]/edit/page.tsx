"use client";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import type { editArticleSchema } from "@/schema/article";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { z } from "zod";

type TEditArticleForm = z.infer<typeof editArticleSchema>;
type Params = Promise<{ id: string }>;

function EditArticlePage(props: { params: Params }) {
  const params = use(props.params);
  const id = params.id;

  const router = useRouter();

  if (!id) {
    router.back();
  }

  const articleQuery = api.article.getArticleById.useQuery(id);

  const updateArticleMutation = api.article.updateArticle.useMutation({
    onSuccess: () => {
      toast.success("Article saved successfully");
      router.push(`/article/${id}`);
    },
    onError: (error) => {
      toast.error("Error updating article:", error);
    },
  });

  const [formData, setFormData] = useState<TEditArticleForm>({
    id: id,
    title: "",
    content: "<h2>Start writing here</h2>",
    published: false,
  });
  console.log("🚀 ~ EditArticlePage ~ formData.content:", formData.content);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateArticleMutation.mutate({
      ...formData,
    });
  };

  useEffect(() => {
    if (articleQuery.isSuccess && articleQuery.data) {
      setFormData({
        id: articleQuery.data.id,
        title: articleQuery.data.title,
        content: articleQuery.data.content as string,
        published: articleQuery.data.published,
      });
    }
  }, [articleQuery.data, articleQuery.isSuccess]);

  if (articleQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (articleQuery.isError) {
    return <div>Error getting article</div>;
  }

  return (
    <div className="mx-auto my-8 max-w-4xl rounded-md border p-4 shadow-sm">
      <h2 className="mt-4">Edit Article</h2>
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Article title</legend>
          <input
            type="text"
            className="input w-full max-w-xl"
            placeholder="My awesome article"
            name="title"
            defaultValue={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <p className="label">You can edit your article title here</p>
        </fieldset>

        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Article content</legend>
          <div className="w-full">
            <SimpleEditor
              content={articleQuery.data?.content || formData.content}
              onChange={(value) => setFormData({ ...formData, content: value })}
            />
          </div>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Published</legend>
          <input
            type="checkbox"
            className="checkbox"
            name="published"
            defaultChecked={formData.published}
            onChange={(e) =>
              setFormData({ ...formData, published: e.target.checked })
            }
          />
          <p className="label">Check this box to publish your article</p>
        </fieldset>

        <button type="submit" className="btn btn-primary">
          {updateArticleMutation.isPending ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}

export default EditArticlePage;
