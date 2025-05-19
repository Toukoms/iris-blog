import ArticleCard from "@/components/article/article-card";
import CreateArticleButton from "@/components/article/create-article-btn";
import { api } from "@/trpc/server";

export default async function Home() {
	const articles = await api.article.getArticles();
	return (
		<div>
			<div className="mt-8 flex justify-between">
				<div>
					<h2 className="my-0 font-semibold text-2xl">Articles</h2>
					<p>Here are the latest articles:</p>
				</div>

				<CreateArticleButton />
			</div>

			{articles !== null && articles.length > 0 ? (
				<div className="grid w-full grid-cols-1 gap-4">
					{articles.map((article) => (
						<ArticleCard
							key={article.id}
							{...article}
							authorName={article.author.name || ""}
							authorImage={article.author.image || ""}
						/>
					))}
				</div>
			) : (
				<p className="w-full text-center text-accent">
					No article for the moment. Stay tuned for more updates!
				</p>
			)}
		</div>
	);
}
