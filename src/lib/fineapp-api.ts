import {
  CreativeCardsResponseSchema,
  CreativeProfileSchema,
  CreativeSessionTypesSchema,
  type CreativeCardsResponse,
  type CreativeProfile,
  type CreativeSessionTypes,
  type CreativeCardsParams,
} from "../types/creative.js";
import {
  creativeCardsUrl,
  creativeProfileBySlugUrl,
  creativeSessionTypesUrl,
} from "./endpoints.js";

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
}: CreativeCardsParams = {}): Promise<CreativeCardsResponse> {
  const parsed = await fetchJson(
    creativeCardsUrl(
      search === undefined ? { page, size } : { page, size, search }
    ),
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
