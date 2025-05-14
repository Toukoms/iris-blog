import { api } from "@/trpc/server";
import ReactMarkdown from "react-markdown";

async function ArticleViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await api.article.getArticleById(id);

  if (!article) {
    return <div>Loading</div>;
  }

  return (
    <div className="mt-12 mb-8">
      <div>
        <h1 className="mb-4">{article.title}</h1>
        <div className="mb-4 ml-2 flex items-center gap-2">
          <p className="my-0 text-sm">
            By{" "}
            <span className="font-semibold text-accent">
              {article.author.name}
            </span>
          </p>
          {" | "}
          <p className="my-0 text-sm">
            Created at : {new Date(article.createdAt).toLocaleDateString()}
          </p>
          {" | "}
          <p className="my-0 text-sm">
            Updated at : {new Date(article.updatedAt).toLocaleDateString()}
          </p>
          {!article.published && (
            <div className="badge badge-accent ml-4">Draft</div>
          )}
        </div>
      </div>

      <ReactMarkdown>{article.content}</ReactMarkdown>
    </div>
  );
}

export default ArticleViewPage;
