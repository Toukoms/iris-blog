import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string().min(8).max(255),
});

export const editArticleSchema = createArticleSchema.extend({
  content: z.string(),
  published: z.boolean().optional(),
});
