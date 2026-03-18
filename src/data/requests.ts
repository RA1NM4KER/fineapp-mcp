import { fetchRequests } from "../lib/fineapp-api.js";
import type { RequestsParams } from "../types/request.js";

type FindRequestsParams = {
  category?: string;
  location?: string;
  status?: RequestsParams["status"];
  page?: number;
  size?: number;
};

function includesQuery(value: string, query?: string) {
  return query ? value.toLowerCase().includes(query) : true;
}

export async function getRequests({
  page = 0,
  size = 12,
  status,
}: RequestsParams = {}) {
  const result = await fetchRequests({ page, size });

  if (!status) {
    return result;
  }

  const filtered = result.content.filter(
    (request) => request.status === status
  );

  return {
    ...result,
    content: filtered,
    numberOfElements: filtered.length,
  };
}

export async function findRequests({
  category,
  location,
  status,
  page = 0,
  size = 12,
}: FindRequestsParams) {
  const result = await fetchRequests({ page, size });

  const categoryQuery = category?.toLowerCase().trim();
  const locationQuery = location?.toLowerCase().trim();

  const filtered = result.content.filter((request) => {
    const matchesCategory = includesQuery(request.category, categoryQuery);
    const matchesLocation = includesQuery(request.location, locationQuery);
    const matchesStatus = status ? request.status === status : true;

    return matchesCategory && matchesLocation && matchesStatus;
  });

  return {
    ...result,
    content: filtered,
    numberOfElements: filtered.length,
  };
}
