"use client";

import { ArticleType } from "@/types/acticle";
import { useEffect, useState } from "react";
import Articles from "@/mocks/articles.json";
import Article from "@/components/Article";

function ArticleContainer() {
  const [articles, setArticles] = useState<ArticleType[] | null>(null);

  useEffect(() => {
    async function getArticles(): Promise<ArticleType[]> {
      const res = await fetch("/api/articles");

      return res.json();
    }

    getArticles().then((articles) => {
      if (articles) {
        setArticles(articles);
      }
    });
  }, []);

  return (
    <>
      {articles === null && <p>Loading...</p>}
      {articles && articles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Article key={article.id} {...article} />
          ))}
        </div>
      )}
      {articles && articles.length === 0 && <p>No articles found</p>}
    </>
  );
}

export default ArticleContainer;
