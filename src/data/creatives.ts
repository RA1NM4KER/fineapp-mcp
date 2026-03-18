import {
  fetchCreativeCards,
  fetchCreativeProfileBySlug,
  fetchCreativeSessionTypes,
} from "../lib/fineapp-api.js";

export async function getCreatives(page = 0, size = 8) {
  return fetchCreativeCards({ page, size });
}

export async function searchCreatives(search: string, page = 0, size = 8) {
  return fetchCreativeCards({ page, size, search });
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
