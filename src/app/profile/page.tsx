import ArticleCard from "@/components/article/article-card";
import LogoutButton from "@/components/auth/logout-btn";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export const revalidate = 120;

async function ProfilePage() {
  const session = await auth();
  const authenticated = session?.user !== undefined;
  const user = session?.user;

  if (!authenticated) {
    redirect("/");
  }

  const articles = await api.article.getUserArticles();

  return (
    <div>
      <div>
        <h2 className="capitalize">Profile: information and articles</h2>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {user?.image ? (
              <Image
                src={user?.image}
                alt="User Avatar"
                className="my-0 h-32 w-32 rounded-full"
                width={640}
                height={640}
              />
            ) : (
              <div className="avatar placeholder">
                <div className="w-10 rounded-full bg-neutral text-neutral-content">
                  <span>{user?.name?.slice(2)}</span>
                </div>
              </div>
            )}
            <div className="flex h-fit flex-col gap-2">
              <h2 className="my-0 font-semibold text-xl">{user?.name}</h2>
              <p>{user?.email}</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="font-semibold text-2xl">Articles</h2>
        <p>Here are the articles you have written:</p>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
