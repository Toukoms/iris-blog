import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string().min(8).max(255),
});

export const editArticleSchema = createArticleSchema.extend({
  id: z.string().cuid(),
  content: z.string().min(12),
  published: z.boolean().optional(),
});
