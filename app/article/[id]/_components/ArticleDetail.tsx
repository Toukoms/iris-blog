import { ArticleType } from "@/types/article";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import ReturnBack from "./ReturnBack";

function ArticleDetail(props: ArticleType) {
  return (
    <article className="prose prose-lg w-full max-w-none">
      <ReturnBack />
      <h1 className="text-4xl lg:text-6xl mt-6 lg:mt-8 text-center">
        {props.title}
      </h1>
      <div className="my-4 relative w-full h-80 rounded-md border overflow-hidden">
        <Image
          src={props.image}
          alt={props.title}
          className="w-full h-full absolute object-cover object-center"
          width={1980}
          height={1980}
          loading="lazy"
        />
      </div>
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
