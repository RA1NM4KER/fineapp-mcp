import { fetchRequests } from "../lib/fineapp-api.js";
import type { RequestsParams } from "../types/request.js";

export async function getRequests({
  page = 0,
  size = 12,
  status,
}: RequestsParams = {}) {
  const result = await fetchRequests({ page, size });

  if (!status) {
    return result;
  }

  return {
    ...result,
    content: result.content.filter((request) => request.status === status),
    numberOfElements: result.content.filter(
      (request) => request.status === status
    ).length,
  };
}
