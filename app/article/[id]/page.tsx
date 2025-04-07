import ArticleDetailContainer from "./_containers/ArtcileDetailContainer";

async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <ArticleDetailContainer id={id} />
    </>
  );
}

export default ArticlePage;
