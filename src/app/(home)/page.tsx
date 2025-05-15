import ArticleCard from "@/components/article/article-card";
import { api } from "@/trpc/server";

export default async function Home() {
  const articles = await api.article.getArticles();
  return (
    <div>
      <h2>Articles</h2>
      <p>
        Welcome to the Iris Blog! Here you can find the latest tech news and
        articles.
      </p>

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles !== null && articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))
        ) : (
          <p className="w-full text-center text-accent">
            No article for the moment. Stay tuned for more updates!
          </p>
        )}
      </div>
    </div>
  );
}
