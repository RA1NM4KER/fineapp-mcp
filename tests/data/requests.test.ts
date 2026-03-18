import { describe, expect, it, vi } from "vitest";
import * as api from "../../src/lib/fineapp-api.js";
import { findRequests, getRequests } from "../../src/data/requests.js";

describe("data/requests", () => {
  it("returns all requests when no status is provided", async () => {
    vi.spyOn(api, "fetchRequests").mockResolvedValue({
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
    vi.spyOn(api, "fetchRequests").mockResolvedValue({
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

  it("findRequests filters by category and location", async () => {
    vi.spyOn(api, "fetchRequests").mockResolvedValue({
      content: [
        {
          id: "1",
          title: "Graduation photos",
          description: "",
          category: "photography",
          location: "Stellenbosch, South Africa",
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
          location: "Cape Town, South Africa",
          budget: null,
          timeline: "2025-10-16",
          status: "OPEN",
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

    const result = await findRequests({
      category: "photography",
      location: "stellenbosch",
      page: 0,
      size: 12,
    });

    expect(result.content).toHaveLength(1);
    expect(result.content[0]!.id).toBe("1");
  });

  it("findRequests filters by status too", async () => {
    vi.spyOn(api, "fetchRequests").mockResolvedValue({
      content: [
        {
          id: "1",
          title: "Graduation photos",
          description: "",
          category: "photography",
          location: "Stellenbosch, South Africa",
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
          title: "Graduation photos",
          description: "",
          category: "photography",
          location: "Stellenbosch, South Africa",
          budget: 500,
          timeline: "2025-12-10",
          status: "COMPLETED",
          proposalsCount: 2,
          createdAt: "2025-11-20T08:20:36",
          expiresAt: "2025-12-20T08:20:36",
          clientName: "Someone",
          clientId: "88",
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

    const result = await findRequests({
      category: "photography",
      location: "stellenbosch",
      status: "OPEN",
      page: 0,
      size: 12,
    });

    expect(result.content).toHaveLength(1);
    expect(result.content[0]!.status).toBe("OPEN");
  });
});
