import ReturnBack from "./_components/ReturnBack";
import ArticleDetailContainer from "./_containers/ArtcileDetailContainer";

async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <ReturnBack />
      <ArticleDetailContainer id={id} />
    </>
  );
}

export default ArticlePage;
