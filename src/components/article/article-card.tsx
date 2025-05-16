import { auth } from "@/server/auth";
import type { Article } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { BiEdit, BiTrash } from "react-icons/bi";

async function ArticleCard(
  article: Article & { authorImage?: string; authorName: string }
) {
  const session = await auth();
  const user = session?.user;

  const { id, title, authorImage, authorName, description, updatedAt } =
    article;

  return (
    <div className="h-fit w-full rounded-lg border bg-base-300 p-4 px-8 pb-6 text-left no-underline shadow-sm">
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
            className="my-0 mt-4 line-clamp-1 w-full font-bold text-lg"
          >
            {title}
          </Link>
          <div>
            <span className="my-0 text-slate-400 text-sm">
              {new Date(updatedAt).toLocaleDateString()}
            </span>
            {" | "}
            <span className="text-slate-400 text-sm">
              author: <b className="text-accent text-base">{authorName}</b>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 mb-4 line-clamp-4 text-lg">
        {description ? (
          description
        ) : (
          <span className="text-error">No description</span>
        )}
      </div>

      {user?.id === article.authorId && (
        <div className="flex justify-end gap-4">
          <Link
            href={`/article/${id}/edit`}
            prefetch={false}
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
