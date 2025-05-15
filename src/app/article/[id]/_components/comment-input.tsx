"use client";
import { api } from "@/trpc/react";
import type { User } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsSendFill } from "react-icons/bs";
import { toast } from "react-toastify";

function CommentInput({ articleId }: { articleId: string }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [user, setUser] = useState<User | null>(null);
  const [comment, setComment] = useState<string>("");
  const createCommentMutation = api.comment.createComment.useMutation({
    onSuccess: () => {
      setComment("");
      router.refresh();
    },
    onError: (error) => {
      toast.error("Error creating comment:", error);
    },
  });

  useEffect(() => {
    if (session) {
      setUser(session.user);
    } else {
      setUser(null);
    }
  }, [session]);

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment) {
      createCommentMutation.mutate({ articleId, content: comment });
    }
  };

  return (
    <div>
      <h2 className="font-semibold text-lg">Leave a Comment</h2>
      <div>
        <div className="mt-4 flex items-start gap-4">
          {user?.image ? (
            <Image
              src={user.image || ""}
              alt="User Avatar"
              width={40}
              height={40}
              className="my-0 rounded-full"
            />
          ) : (
            <div className="avatar avatar-placeholder">
              <div className="w-12 rounded-full bg-neutral text-neutral-content">
                <span className="text-2xl">
                  {user ? user.name?.slice(2) : "A"}
                </span>
              </div>
            </div>
          )}
          <form className="flex-1" onSubmit={handleCommentSubmit}>
            <p className="my-0 mb-3 text-sm">
              Comment as{" "}
              <span className="font-semibold text-accent">
                {user?.name || "Guest"}
              </span>
            </p>
            <textarea
              className="textarea textarea-bordered w-full resize-none"
              placeholder="Write your comment here..."
              rows={3}
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-sm btn-primary mt-2"
              disabled={!comment || createCommentMutation.isPending}
            >
              {createCommentMutation.isPending ? "Sending..." : "Post Comment"}
              <BsSendFill />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CommentInput;
