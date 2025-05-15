"use client";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";

function ArticleDeleteConfirmationPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const router = useRouter();

	const { id } = use(params);
	const articleQuery = api.article.getArticleById.useQuery(id);
	const deleteArticleMutation = api.article.deleteArticleById.useMutation({
		onSuccess: () => {
			toast.success("Article deleted successfully");
			router.replace("/");
		},
		onError: (error) => {
			toast.error("Error deleting article:", error);
		},
	});
	const { data, status } = useSession();
	const user = data?.user;
	const [article, setArticle] =
		useState<NonNullable<typeof articleQuery.data>>();

	useEffect(() => {
		if (articleQuery.isSuccess && articleQuery.data) {
			setArticle(articleQuery.data);
		}
		if (articleQuery.isError || articleQuery.data === null) {
			router.replace("/");
		}
	}, [articleQuery.isSuccess, articleQuery.isError, articleQuery.data, router]);

	if (articleQuery.isLoading || !article) {
		return <p>Loading...</p>;
	}

	if (
		status === "unauthenticated" ||
		!user ||
		!articleQuery.data ||
		articleQuery.data.authorId !== user.id
	) {
		router.replace("/");
	}

	return (
		<div>
			<div>
				<p className="text-xl">
					Do you really want to delete the <b>"{article.title}"</b> article?
				</p>
				<div className="flex w-fit space-x-4">
					<Link
						href={`/article/${article.id}`}
						className="btn btn-outline no-underline"
					>
						Cancel
					</Link>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							deleteArticleMutation.mutate(article.id);
						}}
					>
						<button
							className="btn btn-error"
							type="submit"
							disabled={deleteArticleMutation.isPending}
						>
							Delete
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default ArticleDeleteConfirmationPage;
