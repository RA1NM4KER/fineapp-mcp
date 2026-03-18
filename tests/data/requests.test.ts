import * as fineappApi from "../../src/lib/fineapp-api.js";
import { getRequests } from "../../src/data/requests.js";
import { describe, it, expect, vi } from "vitest";

describe("data/requests", () => {
  it("returns all requests when no status is provided", async () => {
    vi.spyOn(fineappApi, "fetchRequests").mockResolvedValue({
      content: [
        {
          id: "1",
          title: "Graduation photos",
          description: "",
          category: "photography",
          location: "Stellenbosch",
          budget: 500,
          timeline: "2025-12-09",
          status: "OPEN",
          proposalsCount: 3,
          createdAt: "2025-11-27T08:20:36",
          expiresAt: "2025-12-27T08:20:36",
          clientName: "Kara",
          clientId: "99",
        },
      ],
      last: true,
      totalPages: 1,
      totalElements: 1,
      size: 12,
      number: 0,
      first: true,
      numberOfElements: 1,
      empty: false,
    });

    const result = await getRequests({ page: 0, size: 12 });

    expect(result.content).toHaveLength(1);
  });

  it("filters requests by status", async () => {
    vi.spyOn(fineappApi, "fetchRequests").mockResolvedValue({
      content: [
        {
          id: "1",
          title: "Graduation photos",
          description: "",
          category: "photography",
          location: "Stellenbosch",
          budget: 500,
          timeline: "2025-12-09",
          status: "OPEN",
          proposalsCount: 3,
          createdAt: "2025-11-27T08:20:36",
          expiresAt: "2025-12-27T08:20:36",
          clientName: "Kara",
          clientId: "99",
        },
        {
          id: "2",
          title: "Event coverage",
          description: "",
          category: "videography",
          location: "Cape Town",
          budget: null,
          timeline: "2025-10-16",
          status: "COMPLETED",
          proposalsCount: 1,
          createdAt: "2025-09-12T11:36:36",
          expiresAt: "2025-10-12T11:36:36",
          clientName: "FineApp",
          clientId: "58",
        },
      ],
      last: true,
      totalPages: 1,
      totalElements: 2,
      size: 12,
      number: 0,
      first: true,
      numberOfElements: 2,
      empty: false,
    });

    const result = await getRequests({
      page: 0,
      size: 12,
      status: "OPEN",
    });

    expect(result.content).toHaveLength(1);
    expect(result.content[0]!.status).toBe("OPEN");
    expect(result.numberOfElements).toBe(1);
  });
});
