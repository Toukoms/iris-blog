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

      {articles !== null && articles.length > 0 ? (
        articles.map((article) => (
          <div key={article.id} className="grid w-full grid-cols-1">
            <ArticleCard
              {...article}
              authorName={article.author.name || ""}
              authorImage={article.author.image || ""}
            />
          </div>
        ))
      ) : (
        <p className="w-full text-center text-accent">
          No article for the moment. Stay tuned for more updates!
        </p>
      )}
    </div>
  );
}
