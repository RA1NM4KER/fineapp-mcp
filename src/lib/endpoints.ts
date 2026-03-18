import type { CreativeCardsParams } from "../types/creative.js";
import type { RequestsParams } from "../types/request.js";

const BASE_URL = "https://fineapple-api-production.up.railway.app/api";

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

  return `${BASE_URL}/creatives/cards?${params.toString()}`;
}

export function creativeProfileBySlugUrl(slug: string) {
  return `${BASE_URL}/creatives/slug/${encodeURIComponent(slug)}`;
}

export function creativeSessionTypesUrl(creativeId: number) {
  return `${BASE_URL}/session-types/creative/${creativeId}/full`;
}

export function requestsUrl({ page = 0, size = 12 }: RequestsParams = {}) {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  return `${BASE_URL}/requests?${params.toString()}`;
}
