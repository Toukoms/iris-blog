"use client";

import type { createArticleSchema } from "@/schema/article";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import type { z } from "zod";

type TCreateArticle = z.infer<typeof createArticleSchema>;

function NewArticlePage() {
	const router = useRouter();

	const articleMutation = api.article.createArticle.useMutation({
		onSuccess: (data) => {
			toast.success("Article created successfully");
			router.replace(`/article/${data.id}/edit`);
		},
		onError: (error) => {
			toast.error("Error creating article");
		},
	});

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget as HTMLFormElement);

		articleMutation.mutate({
			title: formData.get("title") as string,
		} as TCreateArticle);
	};

	return (
		<div className="mx-auto max-w-xl ">
			<h2>Create a new article</h2>
			<form onSubmit={handleSubmit} className="flex w-full flex-col space-y-4">
				<fieldset className="fieldset mb-0">
					<legend className="fieldset-legend">Article title</legend>
					<input
						type="text"
						className="input w-full"
						placeholder="My awesome article"
						name="title"
						required
					/>
					<p className="label my-0">
						You can edit article title later in the article editor.
					</p>
				</fieldset>

				<p className="my-4 h-8 pt-2 text-error text-sm">
					{articleMutation.error?.shape?.data?.zodError?.fieldErrors?.title}
				</p>

				<button type="submit" className="btn btn-primary">
					{articleMutation.isPending ? "Creating article..." : "Create article"}
				</button>
			</form>
		</div>
	);
}

export default NewArticlePage;
