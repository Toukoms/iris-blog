import { auth } from "@/server/auth";
import type { Article } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { BiEdit, BiTrash } from "react-icons/bi";
import ReactMarkdown from "react-markdown";

async function ArticleCard(
  article: Article & { authorImage?: string; authorName: string }
) {
  const session = await auth();
  const user = session?.user;

  const { id, title, authorImage, authorName, markdownContent, updatedAt } =
    article;

  return (
    <div className="h-fit w-full rounded-lg border bg-base-300 p-4 px-8 text-left no-underline shadow-sm">
      <div className="flex gap-4">
        {authorImage ? (
          <Image
            src={authorImage}
            alt="User Avatar"
            className="my-0 mt-4 h-16 w-16 rounded-full"
            width={640}
            height={640}
          />
        ) : (
          <div className="avatar placeholder">
            <div className="w-10 rounded-full bg-neutral-focus text-neutral-content">
              <span>{authorName.slice(2)}</span>
            </div>
          </div>
        )}
        <div>
          <Link
            href={`/article/${id}`}
            className="my-0 mt-2 font-bold text-lg no-underline"
          >
            {title}
          </Link>
          <div>
            <span className="my-0 text-slate-400 text-sm">
              {new Date(updatedAt).toLocaleDateString()}
            </span>
            {" | "}
            <span className="text-slate-400">
              author: <b className="text-accent">{authorName}</b>
            </span>
          </div>

          {markdownContent ? (
            <div className="mb-4 line-clamp-3 h-20 overflow-hidden text-sm">
              <ReactMarkdown>{markdownContent.slice(0, 240)}</ReactMarkdown>
            </div>
          ) : (
            <p className="my-2 h-20 text-accent text-sm italic">No content</p>
          )}
        </div>
      </div>
      {user?.id === article.authorId && (
        <div className="flex justify-end gap-4">
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
  );
}

export default ArticleCard;
