import type { CreativeCardsParams } from "../types/creative.js";

const BASE_URL = "https://fineapple-api-production.up.railway.app";

export function creativeCardsUrl({
  page = 0,
  size = 8,
  search,
}: CreativeCardsParams = {}) {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
    sort: "displayOrder,asc",
    active: "1",
  });

  if (search?.trim()) {
    params.set("search", search.trim());
  }

  return `${BASE_URL}/api/creatives/cards?${params.toString()}`;
}

export function creativeProfileBySlugUrl(slug: string) {
  return `${BASE_URL}/api/creatives/slug/${encodeURIComponent(slug)}`;
}

export function creativeSessionTypesUrl(creativeId: number) {
  return `${BASE_URL}/api/session-types/creative/${creativeId}/full`;
}
