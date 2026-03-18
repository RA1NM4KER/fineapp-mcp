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

export const CreativeProfileSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z
    .string()
    .email()
    .nullable()
    .or(z.literal(""))
    .transform((value) => value ?? ""),
  location: z
    .string()
    .nullable()
    .transform((value) => value ?? ""),
  role: z.string(),
  bio: z
    .string()
    .nullable()
    .transform((value) => value ?? ""),
  avatarUrl: z
    .string()
    .nullable()
    .transform((value) => value ?? ""),
  portfolioSlug: z.string(),
  specialties: z.array(z.string()).default([]),
  ratePerHour: z.number().nullable(),
  availability: z
    .string()
    .nullable()
    .transform((value) => value ?? ""),
  active: z.boolean(),
  reviewCount: z.number(),
  averageRating: z.number(),
  profileComplete: z.boolean(),
});

export const SessionPackageSchema = z.object({
  id: z.number(),
  creativeSessionTypeId: z.number(),
  packageName: z.string(),
  durationMinutes: z.number().nullable(),
  deliverables: z
    .string()
    .nullable()
    .transform((value) => value ?? ""),
  price: z.number(),
  isAvailable: z.boolean(),
  displayOrder: z.number(),
});

export const CreativeSessionTypeSchema = z.object({
  id: z.number(),
  sessionTypeId: z.number(),
  sessionTypeName: z.string(),
  isAvailable: z.boolean(),
  packages: z.array(SessionPackageSchema),
});

export type CreativeCardsParams = {
  page?: number;
  size?: number;
  search?: string;
};

export const CreativeSessionTypesSchema = z.array(CreativeSessionTypeSchema);

export type CreativeCardsResponse = z.infer<typeof CreativeCardsResponseSchema>;
export type CreativeProfile = z.infer<typeof CreativeProfileSchema>;
export type CreativeSessionTypes = z.infer<typeof CreativeSessionTypesSchema>;
