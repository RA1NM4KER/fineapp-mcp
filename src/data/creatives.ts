import { fetchCreativeCards } from "../lib/fineapp-api.js";

export async function getCreatives(page = 0, size = 8) {
  return fetchCreativeCards({ page, size });
}

export async function searchCreatives(search: string, page = 0, size = 8) {
  return fetchCreativeCards({ page, size, search });
}
