import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BiEdit, BiTrash } from "react-icons/bi";
import Comment from "./_components/comment";
import CommentInput from "./_components/comment-input";

export const revalidate = 120;

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
    return <div>Loading...</div>;
  }

  if (!isAuthor && !article.published) {
    redirect("/");
  }

  return (
    <div className="mx-auto mt-16 mb-8 max-w-7xl">
      <div className="mb-8 w-full">
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

      <blockquote>{article.description}</blockquote>

      <div className="px-4">
        <div
          /* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(article.content || ""),
          }}
        />
      </div>

      <div className="divider my-8" />
      <CommentInput articleId={article.id} />
      <div className="mt-8 flex flex-col gap-4">
        {article.comments && article.comments.length > 0 ? (
          article.comments.map((comment) => (
            <Comment
              key={comment.id}
              commentId={comment.id}
              content={comment.content}
              authorName={comment.author?.name || ""}
              authorImage={comment.author?.image || ""}
              createdAt={new Date(comment.createdAt).toLocaleDateString()}
              isAuthor={user?.id === comment.authorId}
            />
          ))
        ) : (
          <p className="mt-8 text-center text-secondary">
            No comments yet. Be the first to leave a comment.
          </p>
        )}
      </div>
    </div>
  );
}

export default ArticleViewPage;
