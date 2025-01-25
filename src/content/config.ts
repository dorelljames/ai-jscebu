import { defineCollection, z } from "astro:content";

const curriculumCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    author: z.object({
      name: z.string(),
      avatar: z.string().optional(),
    }),
    image: z.string().optional(),
    topics: z.array(z.string()),
    duration: z.string().optional(), // e.g. "2 hours"
    level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
    prerequisites: z.array(z.string()).optional(),
    parentModule: z.string().optional(), // For subpages to reference their parent module
  }),
});

export const collections = {
  curriculum: curriculumCollection,
};
