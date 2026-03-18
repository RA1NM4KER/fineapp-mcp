import { z } from "zod";

export const CreativeCardSchema = z.object({
  name: z.string(),
  location: z
    .string()
    .nullable()
    .transform((value) => value ?? ""),
  role: z.string(),
  avatarUrl: z
    .string()
    .nullable()
    .transform((value) => value ?? ""),
  portfolioSlug: z.string(),
  ratePerHour: z.number().nullable(),
  availability: z
    .string()
    .nullable()
    .transform((value) => value ?? ""),
  reviewCount: z.number(),
  averageRating: z.number(),
  lowestAmount: z.number().nullable(),
});

export const CreativeCardsResponseSchema = z.object({
  content: z.array(CreativeCardSchema),
  number: z.number(),
  size: z.number(),
  first: z.boolean(),
  last: z.boolean(),
});

export type CreativeCardsResponse = z.infer<typeof CreativeCardsResponseSchema>;
