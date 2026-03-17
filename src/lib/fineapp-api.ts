import {
  CreativeCardsResponseSchema,
  type CreativeCardsResponse,
} from "../types/creative.js";

const BASE_URL = "https://fineapple-api-production.up.railway.app";

type FetchCreativeCardsParams = {
  page?: number;
  size?: number;
  search?: string;
};

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
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`FineApp API request failed: ${response.status}`);
  }

  const json = await response.json();
  return CreativeCardsResponseSchema.parse(json);
}
