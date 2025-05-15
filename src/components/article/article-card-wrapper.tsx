"use client";

import { useRouter } from "next/navigation";

function ArticleCardWrapper({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const router = useRouter();
  return (
    <button
      type="button"
      aria-label="Go to article"
      onClick={() => router.push(`/article/${id}`)}
      className="h-fit w-full rounded-lg border bg-base-300 p-4 px-8 text-left no-underline shadow-sm"
    >
      {children}
    </button>
  );
}

export default ArticleCardWrapper;
