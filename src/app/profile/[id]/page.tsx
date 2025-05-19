import ArticleCard from "@/components/article/article-card";
import CreateArticleButton from "@/components/article/create-article-btn";
import LogoutButton from "@/components/auth/logout-btn";
import { api } from "@/trpc/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export const revalidate = 120;

async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await api.user.getUserById(id);

  if (!user) {
    redirect("/");
  }

  const articles = await api.article.getUserArticles(id);

  return (
    <div>
      <div>
        <h2 className="capitalize">Profile: information and articles</h2>
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-4">
            {user?.image ? (
              <Image
                src={user?.image}
                alt="User Avatar"
                className="my-0 h-32 w-32 rounded-full"
                width={640}
                height={640}
              />
            ) : (
              <div className="avatar avatar-placeholder">
                <div className="w-32 rounded-full bg-neutral text-neutral-content">
                  <span>{user?.name?.slice(2)}</span>
                </div>
              </div>
            )}
            <div className="mt-4 flex flex-col justify-start gap-1">
              <p className="my-0 font-semibold text-3xl">{user?.name}</p>
              <p className="my-0 text-secondary text-sm">{user?.email}</p>
              <LogoutButton />
            </div>
          </div>

          <div>
            <CreateArticleButton />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="font-semibold text-2xl">Articles</h2>
        <p>Here are the articles you have written:</p>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {articles && articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard
              key={article.id}
              {...article}
              authorName={user?.name || ""}
              authorImage={user?.image || ""}
            />
          ))
        ) : (
          <q className="mt-8 block text-center text-accent">
            You don't yet write article, click to "Create Article" button above
            to start your journey in writing
          </q>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
