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
        updatedAt: "desc",
      },
      include: {
        author: {
          select: {
            image: true,
            name: true,
          },
        },
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
          comments: {
            orderBy: {
              createdAt: "desc",
            },
            select: {
              id: true,
              content: true,
              createdAt: true,
              authorId: true,
              author: true,
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
          description: input.description,
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
          description: input.description,
          content: input.content,
          published: input.published,
        },
      });
    }),
  deleteArticleById: protectedProcedure
    .input(z.string().cuid())
    .mutation(({ ctx, input }) => {
      return ctx.db.article.delete({
        where: {
          id: input,
        },
      });
    }),
  getUserArticles: publicProcedure
    .input(z.string().cuid())
    .query(({ ctx, input }) => {
      return ctx.db.article.findMany({
        where: {
          authorId: input,
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
    }),
});
