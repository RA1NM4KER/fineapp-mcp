import {
  type CreativeCardsParams,
  type CreativeCardsResponse,
  type CreativeFilters,
  type CreativeProfile,
  type CreativeSessionTypes,
} from "../types/creative.js";
import {
  creativeCardsUrl,
  creativeFiltersUrl,
  creativeProfileBySlugUrl,
  creativeSessionTypesUrl,
  requestsUrl,
} from "./endpoints.js";
import {
  CreativeCardsResponseSchema,
  CreativeFiltersSchema,
  CreativeProfileSchema,
  CreativeSessionTypesSchema,
} from "../schemas/creative.js";
import type { RequestsParams, RequestsResponse } from "../types/request.js";
import { RequestsResponseSchema } from "../schemas/request.js";

const CLOUDINARY_BASE = "https://res.cloudinary.com/dij1mb8eb/image/upload/";

function normalizeAvatarUrl(value: string): string {
  if (!value) return "";
  if (value.startsWith("https://")) return value;
  return `${CLOUDINARY_BASE}${value}`;
}

async function fetchJson<T>(
  url: string,
  schema: { parse: (input: unknown) => T }
): Promise<T> {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`FineApp API request failed: ${response.status}`);
  }

  const json = await response.json();
  return schema.parse(json);
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

  const parsed = await fetchJson(
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
  const parsed = await fetchJson(
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
  return fetchJson(
    creativeSessionTypesUrl(creativeId),
    CreativeSessionTypesSchema
  );
}

export async function fetchCreativeFilters(): Promise<CreativeFilters> {
  return fetchJson(creativeFiltersUrl(), CreativeFiltersSchema);
}

export async function fetchRequests({
  page = 0,
  size = 12,
}: RequestsParams = {}): Promise<RequestsResponse> {
  return await fetchJson(requestsUrl({ page, size }), RequestsResponseSchema);
}
