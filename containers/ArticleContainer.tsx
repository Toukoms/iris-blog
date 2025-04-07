import { ArticleType } from "@/types/article";
import Article from "@/components/Article";

async function getArticles() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/articles");
  const articles: ArticleType[] = await res.json();
  return articles;
}

async function ArticleContainer() {
  const articles = await getArticles();

  return (
    <>
      {articles === null ? (
        <p>Loading...</p>
      ) : articles && articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Article key={article.id} {...article} />
          ))}
        </div>
      ) : (
        articles && articles.length === 0 && <p>No articles found</p>
      )}
    </>
  );
}

export default ArticleContainer;
