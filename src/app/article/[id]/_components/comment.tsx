"use client";
import { api } from "@/trpc/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CommentProps {
  commentId: string;
  content: string;
  isAuthor: boolean;
  authorName: string | null;
  authorImage: string | null;
  createdAt: string;
}

function Comment({
  commentId,
  content,
  isAuthor,
  authorName,
  authorImage,
  createdAt,
}: CommentProps) {
  console.log("🚀 ~ createdAt:", createdAt);
  const router = useRouter();
  const deleteCommentMutation = api.comment.deleteComment.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      toast.error("Error deleting comment:", error);
    },
  });

  return (
    <div className="flex items-start space-x-4 rounded-lg bg-base-200 p-4 shadow">
      {authorImage ? (
        <Image
          src={authorImage || ""}
          alt="User Avatar"
          width={40}
          height={40}
          className="my-0 rounded-full"
        />
      ) : (
        <div className="avatar avatar-placeholder">
          <div className="w-10 rounded-full bg-neutral text-neutral-content">
            <span className="text-lg">
              {authorName ? authorName.slice(2) : "A"}
            </span>
          </div>
        </div>
      )}
      <div className="flex-1">
        <div className="flex items-center gap-4">
          <h4 className="my-0 text-accent text-xl">{authorName || "Anonym"}</h4>
          <span className="text-gray-500 text-sm">{createdAt}</span>
        </div>
        <p className="my-0 mt-2">{content}</p>
        {isAuthor && (
          <button
            type="button"
            onClick={() => {
              deleteCommentMutation.mutate({ commentId: commentId });
            }}
            className="btn btn-sm btn-error btn-outline mt-2"
            disabled={deleteCommentMutation.isPending}
          >
            {deleteCommentMutation.isPending ? "Deleting..." : "Delete comment"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Comment;
