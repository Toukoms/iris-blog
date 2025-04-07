import { ArticleType } from "@/types/acticle";
import Image from "next/image";
import Link from "next/link";

function Article(props: ArticleType) {
  return (
    <div className="rounded-md border border-gray-200 p-4">
      <Link href={`/article/${props.id}`} className="w-full h-full">
        <h2 className="text-xl font-bold mb-2">{props.title}</h2>
        <p className="flex items-center gap-2 text-xs rounded-full bg-gray-200 w-fit px-2">
          <span>Created At</span>
          <span className="font-semibold">
            {new Date(props.createdAt).toLocaleDateString()}
          </span>
        </p>
        <p className="mt-4 line-clamp-3">{props.description}</p>

        <Image
          src={props.image}
          alt={props.title}
          className="mt-4"
          width={1980}
          height={1980}
          loading="lazy"
        />
      </Link>
    </div>
  );
}

export default Article;
