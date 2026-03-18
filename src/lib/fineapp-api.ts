import {
  type CreativeCardsParams,
  type CreativeCardsResponse,
  type CreativeFilters,
  type CreativeProfile,
  type CreativeSessionTypes,
} from "../types/creative.js";
import type { RequestsParams, RequestsResponse } from "../types/request.js";
import {
  CreativeCardsResponseSchema,
  CreativeFiltersSchema,
  CreativeProfileSchema,
  CreativeSessionTypesSchema,
} from "../schemas/creative.js";
import { RequestsResponseSchema } from "../schemas/request.js";
import {
  creativeCardsUrl,
  creativeFiltersUrl,
  creativeProfileBySlugUrl,
  creativeSessionTypesUrl,
  requestsUrl,
} from "./endpoints.js";
import { requestJson } from "./request-client.js";

const CLOUDINARY_BASE = "https://res.cloudinary.com/dij1mb8eb/image/upload/";

function normalizeAvatarUrl(value: string): string {
  if (!value) return "";
  if (value.startsWith("https://")) return value;
  return `${CLOUDINARY_BASE}${value}`;
}

export async function fetchCreativeCards({
  page = 0,
  size = 8,
  search,
  category,
}: CreativeCardsParams = {}): Promise<CreativeCardsResponse> {
  const params: CreativeCardsParams = {
    page,
    size,
    ...(search !== undefined ? { search } : {}),
    ...(category !== undefined ? { category } : {}),
  };

  const parsed = await requestJson(
    creativeCardsUrl(params),
    CreativeCardsResponseSchema
  );

  return {
    ...parsed,
    content: parsed.content.map((creative) => ({
      ...creative,
      avatarUrl: normalizeAvatarUrl(creative.avatarUrl),
    })),
  };
}

export async function fetchCreativeProfileBySlug(
  slug: string
): Promise<CreativeProfile> {
  const parsed = await requestJson(
    creativeProfileBySlugUrl(slug),
    CreativeProfileSchema
  );

  return {
    ...parsed,
    avatarUrl: normalizeAvatarUrl(parsed.avatarUrl),
  };
}

export async function fetchCreativeSessionTypes(
  creativeId: number
): Promise<CreativeSessionTypes> {
  return requestJson(
    creativeSessionTypesUrl(creativeId),
    CreativeSessionTypesSchema
  );
}

export async function fetchCreativeFilters(): Promise<CreativeFilters> {
  return requestJson(creativeFiltersUrl(), CreativeFiltersSchema);
}

export async function fetchRequests({
  page = 0,
  size = 12,
}: RequestsParams = {}): Promise<RequestsResponse> {
  return requestJson(requestsUrl({ page, size }), RequestsResponseSchema);
}
