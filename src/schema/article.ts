import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string().min(8).max(255),
});

export const editArticleSchema = createArticleSchema.extend({
  id: z.string().cuid(),
  markdownContent: z.string().min(42),
  jsonContent: z.string(),
  published: z.boolean().optional(),
});
