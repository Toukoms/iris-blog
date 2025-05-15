import { auth } from "@/server/auth";
import type { Article } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { BiEdit, BiTrash } from "react-icons/bi";
import ReactMarkdown from "react-markdown";

async function ArticleCard(article: Article) {
  const session = await auth();
  if (!session?.user.id) return;
  const user = session.user;

  const { id, title, markdownContent, updatedAt } = article;

  return (
    <div className="h-fit w-full rounded-lg border bg-base-300 p-4 px-8 text-left no-underline shadow-sm">
      <div className="flex gap-4">
        {user.image ? (
          <Image
            src={user.image}
            alt="User Avatar"
            className="my-0 mt-4 h-12 w-12 rounded-full"
            width={640}
            height={640}
          />
        ) : (
          <div className="h-12 w-12">
            <span>{user.name?.slice(0, 2)}</span>
          </div>
        )}
        <div>
          <Link
            href={`/article/${id}`}
            className="my-0 mt-2 font-bold text-lg no-underline"
          >
            {title}
          </Link>
          <p className="my-0 text-slate-400 text-sm">
            {new Date(updatedAt).toLocaleDateString()}
          </p>
          {markdownContent ? (
            <div className="mb-4 line-clamp-3 h-20 overflow-hidden text-sm">
              <ReactMarkdown>{markdownContent}</ReactMarkdown>
            </div>
          ) : (
            <p className="my-2 h-20 text-accent text-sm italic">No content</p>
          )}
        </div>
      </div>
      {user.id === article.authorId && (
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
