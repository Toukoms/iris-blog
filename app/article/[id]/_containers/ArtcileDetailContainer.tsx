import { ArticleType } from "@/types/article";
import ArticleDetail from "../_components/ArticleDetail";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

async function getArticleById(id: string) {
  const res = await fetch(`${BASE_URL}/api/articles/${id}`, {
    cache: "no-store",
  });
  const article: ArticleType = await res.json();
  return article;
}

const ArticleDetailContainer = async ({ id }: { id: string }) => {
  const article = await getArticleById(id);

  return (
    <>{article === null ? <p>Loading...</p> : <ArticleDetail {...article} />}</>
  );
};

export default ArticleDetailContainer;
