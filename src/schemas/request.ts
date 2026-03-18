import { z } from "zod";

const nullableString = z
  .string()
  .nullable()
  .transform((value) => value ?? "");
const nullableNumber = z.number().nullable();

export const RequestStatusSchema = z.enum([
  "OPEN",
  "IN_PROGRESS",
  "ACCEPTED",
  "COMPLETED",
  "CANCELLED",
  "EXPIRED",
]);

export const ClientRequestSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: nullableString,
  category: z.string(),
  location: nullableString,
  budget: nullableNumber,
  timeline: nullableString,
  status: RequestStatusSchema,
  proposalsCount: z.number(),
  createdAt: z.string(),
  expiresAt: z.string(),
  clientName: z.string(),
  clientId: z.string(),
});

export const RequestsResponseSchema = z.object({
  content: z.array(ClientRequestSchema),
  last: z.boolean(),
  totalPages: z.number(),
  totalElements: z.number(),
  size: z.number(),
  number: z.number(),
  first: z.boolean(),
  numberOfElements: z.number(),
  empty: z.boolean(),
});
