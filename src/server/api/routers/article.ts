import { createArticleSchema } from "@/schema/article";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const articleRouter = createTRPCRouter({
  getArticles: publicProcedure.query(({ ctx }) => {
    return ctx.db.article.findMany();
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
});
