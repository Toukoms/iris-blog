import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUserById: publicProcedure
    .input(z.string().cuid())
    .query(({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: {
          id: input,
        },
        select: {
          name: true,
          image: true,
          email: true,
        },
      });
    }),
});
