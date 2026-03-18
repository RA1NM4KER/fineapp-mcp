import {
  CreativeCardsResponseSchema,
  CreativeProfileSchema,
  CreativeSessionTypesSchema,
  type CreativeCardsResponse,
  type CreativeProfile,
  type CreativeSessionTypes,
} from "../types/creative.js";

const BASE_URL = "https://fineapple-api-production.up.railway.app";
const CLOUDINARY_BASE = "https://res.cloudinary.com/dij1mb8eb/image/upload/";

type FetchCreativeCardsParams = {
  page?: number;
  size?: number;
  search?: string;
};

function normalizeAvatarUrl(value: string): string {
  if (!value) return "";
  if (value.startsWith("https://")) return value;
  return `${CLOUDINARY_BASE}${value}`;
}

export async function fetchCreativeCards({
  page = 0,
  size = 8,
  search,
}: FetchCreativeCardsParams = {}): Promise<CreativeCardsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
    sort: "displayOrder,asc",
    active: "1",
  });

  if (search?.trim()) {
    params.set("search", search.trim());
  }

  const response = await fetch(
    `${BASE_URL}/api/creatives/cards?${params.toString()}`,
    {
      headers: { Accept: "application/json" },
    }
  );

  if (!response.ok) {
    throw new Error(`FineApp API request failed: ${response.status}`);
  }

  const json = await response.json();
  const parsed = CreativeCardsResponseSchema.parse(json);

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
  const response = await fetch(
    `${BASE_URL}/api/creatives/slug/${encodeURIComponent(slug)}`,
    {
      headers: { Accept: "application/json" },
    }
  );

  if (!response.ok) {
    throw new Error(
      `FineApp creative profile request failed: ${response.status}`
    );
  }

  const json = await response.json();
  const parsed = CreativeProfileSchema.parse(json);

  return {
    ...parsed,
    avatarUrl: normalizeAvatarUrl(parsed.avatarUrl),
  };
}

export async function fetchCreativeSessionTypes(
  creativeId: number
): Promise<CreativeSessionTypes> {
  const response = await fetch(
    `${BASE_URL}/api/session-types/creative/${creativeId}/full`,
    {
      headers: { Accept: "application/json" },
    }
  );

  if (!response.ok) {
    throw new Error(
      `FineApp creative session types request failed: ${response.status}`
    );
  }

  const json = await response.json();
  return CreativeSessionTypesSchema.parse(json);
}
