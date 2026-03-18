import { z } from "zod";

export const pageSchema = z.number().int().min(0).default(0);
export const listSizeSchema = z.number().int().min(1).max(50).default(8);
export const findSizeSchema = z.number().int().min(1).max(100).default(50);
