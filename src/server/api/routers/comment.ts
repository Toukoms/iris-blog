import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const commentRouter = createTRPCRouter({
  getCommentsByArticleId: publicProcedure
    .input(z.object({ articleId: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const comments = await ctx.db.comment.findMany({
        where: { articleId: input.articleId },
        include: { author: true },
        orderBy: { createdAt: "desc" },
      });
      return comments;
    }),

  createComment: publicProcedure
    .input(
      z.object({
        articleId: z.string().cuid(),
        content: z.string().min(3),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.comment.create({
        data: {
          content: input.content,
          authorId: ctx.session ? ctx.session.user.id : null,
          articleId: input.articleId,
        },
      });
    }),
  deleteComment: protectedProcedure
    .input(z.object({ commentId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.db.comment.delete({
        where: { id: input.commentId },
      });
      return comment;
    }),
});
