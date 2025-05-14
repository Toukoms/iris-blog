import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BiEdit, BiTrash } from "react-icons/bi";
import ReactMarkdown from "react-markdown";

async function ArticleViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await api.article.getArticleById(id);
  const session = await auth();
  const user = session?.user;
  const isAuthor = user?.id === article?.authorId;

  if (!article) {
    return <div>Loading</div>;
  }

  if (!isAuthor && !article.published) {
    redirect("/");
  }

  return (
    <div className="mt-12 mb-8">
      <div className="flex w-full gap-4">
        <div className="w-full flex-1">
          <h1 className="mb-4">{article.title}</h1>
          <div className="mb-4 ml-2 flex items-center gap-2">
            <p className="my-0 text-sm">
              By{" "}
              <span className="font-semibold text-accent">
                {article.author.name}
              </span>
            </p>
            {" | "}
            <p className="my-0 text-sm">
              Created at : {new Date(article.createdAt).toLocaleDateString()}
            </p>
            {" | "}
            <p className="my-0 text-sm">
              Updated at : {new Date(article.updatedAt).toLocaleDateString()}
            </p>
            {!article.published && (
              <div className="badge badge-accent ml-4">Draft</div>
            )}
          </div>
        </div>
        {isAuthor && (
          <div className="flex gap-4">
            <Link
              href={`/article/${id}/edit`}
              className="btn btn-sm btn-outline btn-primary btn-square"
            >
              <BiEdit />
            </Link>
            <Link
              href={`/article/${id}/delete`}
              className="btn btn-sm btn-outline btn-error btn-square"
            >
              <BiTrash />
            </Link>
          </div>
        )}
      </div>

      <ReactMarkdown>{article.content}</ReactMarkdown>
    </div>
  );
}

export default ArticleViewPage;
