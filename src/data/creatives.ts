import {
  fetchCreativeCards,
  fetchCreativeFilters,
  fetchCreativeProfileBySlug,
  fetchCreativeSessionTypes,
} from "../lib/fineapp-api.js";
import type { FindCreativesParams } from "../types/creative.js";

function includesQuery(value: string, query?: string) {
  return query ? value.toLowerCase().includes(query) : true;
}

export async function getCreatives(page = 0, size = 8, category?: string) {
  return fetchCreativeCards({
    page,
    size,
    ...(category !== undefined ? { category } : {}),
  });
}

export async function searchCreatives(
  search: string,
  page = 0,
  size = 8,
  category?: string
) {
  return fetchCreativeCards({
    page,
    size,
    search,
    ...(category !== undefined ? { category } : {}),
  });
}

export async function getCreativeProfile(slug: string) {
  return fetchCreativeProfileBySlug(slug);
}

export async function getCreativeSessionTypes(creativeId: number) {
  return fetchCreativeSessionTypes(creativeId);
}

export async function getCreativeFullDetails(slug: string) {
  const profile = await fetchCreativeProfileBySlug(slug);
  const sessionTypes = await fetchCreativeSessionTypes(profile.id);

  return {
    profile,
    sessionTypes,
  };
}

export async function getCreativeFilters() {
  return fetchCreativeFilters();
}

export async function findCreatives({
  role,
  location,
  page = 0,
  size = 50,
}: FindCreativesParams) {
  const result = await fetchCreativeCards({ page, size });

  const roleQuery = role?.toLowerCase().trim();
  const locationQuery = location?.toLowerCase().trim();

  return {
    ...result,
    content: result.content.filter(
      (creative) =>
        includesQuery(creative.role, roleQuery) &&
        includesQuery(creative.location, locationQuery)
    ),
  };
}
