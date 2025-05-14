import { auth } from "@/server/auth";
import type { Article } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { BiEdit, BiTrash } from "react-icons/bi";

async function ArticleCard(article: Article) {
	const session = await auth();
	if (!session?.user.id) return;
	const user = session.user;

	const { id, title, content, createdAt, updatedAt } = article;

	return (
		<div className="h-fit w-full rounded-lg border bg-base-300 p-4 px-8 shadow-sm">
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
					<h3 className="my-0 mt-2 font-bold text-lg">{title}</h3>
					<p className="my-0 text-slate-400 text-sm">
						{new Date(createdAt).toLocaleDateString()}
					</p>
					<p className="line-clamp-3 min-h-16 text-lg">{content}</p>
				</div>
			</div>
			{user.id === article.authorId && (
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
	);
}

export default ArticleCard;
