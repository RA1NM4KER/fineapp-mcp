import { z } from "zod";

const nullableString = z
  .string()
  .nullable()
  .transform((value) => value ?? "");

export const CreativeCardSchema = z.object({
  name: z.string(),
  location: nullableString,
  role: z.string(),
  avatarUrl: nullableString,
  portfolioSlug: z.string(),
  ratePerHour: z.number().nullable(),
  availability: nullableString,
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
  location: nullableString,
  role: z.string(),
  bio: nullableString,
  avatarUrl: nullableString,
  portfolioSlug: z.string(),
  specialties: z.array(z.string()).default([]),
  ratePerHour: z.number().nullable(),
  availability: nullableString,
  active: z.boolean(),
  reviewCount: z.number(),
  averageRating: z.number(),
  profileComplete: z.boolean(),
});

export const CreativeFiltersSchema = z.object({
  specialties: z.array(z.string()),
  locations: z.array(z.string()),
});

export const SessionPackageSchema = z.object({
  id: z.number(),
  creativeSessionTypeId: z.number(),
  packageName: z.string(),
  durationMinutes: z.number().nullable(),
  deliverables: nullableString,
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

export const CreativeSessionTypesSchema = z.array(CreativeSessionTypeSchema);
