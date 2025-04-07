import { ArticleType } from "@/types/acticle";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

function ArticleDetail(props: ArticleType) {
  return (
    <article className="prose prose-lg">
      <Image
        src={props.image}
        alt={props.title}
        className="my-4 w-full aspect-video object-cover"
        width={1980}
        height={1980}
        loading="lazy"
      />
      <h1 className="sr-only">{props.title}</h1>
      <div className="flex items-center justify-between">
        <p className="flex items-center text-zinc-500">
          <span className="text-sm">Created at </span>
          <span className="font-semibold">{props.createdAt}</span>
        </p>
      </div>
      <div className="mt-4">
        <ReactMarkdown>{props.content}</ReactMarkdown>
      </div>
    </article>
  );
}

export default ArticleDetail;
