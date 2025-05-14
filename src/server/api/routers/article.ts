import { createArticleSchema, editArticleSchema } from "@/schema/article";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const articleRouter = createTRPCRouter({
  getArticles: publicProcedure.query(({ ctx }) => {
    return ctx.db.article.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  getArticleById: publicProcedure
    .input(z.string().cuid())
    .query(({ ctx, input }) => {
      return ctx.db.article.findUnique({
        where: {
          id: input,
        },
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      });
    }),
  createArticle: protectedProcedure
    .input(createArticleSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.article.create({
        data: {
          title: input.title,
          authorId: ctx.session.user.id,
        },
      });
    }),
  updateArticle: protectedProcedure
    .input(editArticleSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.article.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          content: input.content,
          published: input.published,
        },
      });
    }),
});
