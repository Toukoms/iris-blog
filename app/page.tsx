import ArticleContainer from "@/containers/ArticleContainer";

export const revalidate = 10; // ISR every 10 seconds

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Welcome to IRIS BLOG
      </h1>
      <ArticleContainer />
    </>
  );
}
