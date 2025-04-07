import { ArticleType } from "@/types/article";
import ArticleDetail from "../_components/ArticleDetail";

async function getArticleById(id: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/articles/" + id
  );
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
