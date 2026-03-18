import { z } from "zod";
import {
  CreativeCardsResponseSchema,
  CreativeProfileSchema,
  CreativeSessionTypesSchema,
} from "../schemas/creative.js";

export type CreativeCardsParams = {
  page?: number;
  size?: number;
  search?: string;
};

export type FindCreativesParams = {
  role?: string;
  location?: string;
  page?: number;
  size?: number;
};

export type CreativeCardsResponse = z.infer<typeof CreativeCardsResponseSchema>;
export type CreativeProfile = z.infer<typeof CreativeProfileSchema>;
export type CreativeSessionTypes = z.infer<typeof CreativeSessionTypesSchema>;
