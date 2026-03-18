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

export async function findCreatives({
  role,
  location,
  page = 0,
  size = 50,
}: {
  role?: string;
  location?: string;
  page?: number;
  size?: number;
}) {
  const result = await fetchCreativeCards({ page, size });

  const roleQuery = role?.toLowerCase().trim();
  const locationQuery = location?.toLowerCase().trim();

  return {
    ...result,
    content: result.content.filter((creative) => {
      const matchesRole = roleQuery
        ? creative.role.toLowerCase().includes(roleQuery)
        : true;

      const matchesLocation = locationQuery
        ? creative.location.toLowerCase().includes(locationQuery)
        : true;

      return matchesRole && matchesLocation;
    }),
  };
}
