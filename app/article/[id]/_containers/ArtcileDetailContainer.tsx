"use client";
import { useState, useEffect } from "react";
import { ArticleType } from "@/types/acticle";
import ArticleDetail from "../_components/ArticleDetail";

const ArticleDetailContainer = ({ id }: { id: string }) => {
  const [article, setArticle] = useState<ArticleType | null>(null);

  useEffect(() => {
    async function getArticleById(): Promise<ArticleType> {
      const res = await fetch("/api/articles/" + id);
      return res.json();
    }

    getArticleById().then((data) => {
      if (data) {
        setArticle(data);
      }
    });
  }, []);

  return (
    <>{article === null ? <p>Loading...</p> : <ArticleDetail {...article} />}</>
  );
};

export default ArticleDetailContainer;
