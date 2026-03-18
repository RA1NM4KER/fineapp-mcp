import { afterEach, describe, expect, it, vi } from "vitest";
import {
  fetchCreativeCards,
  fetchCreativeFilters,
  fetchCreativeProfileBySlug,
  fetchCreativeSessionTypes,
  fetchRequests,
} from "../../src/lib/fineapp-api.js";

describe("lib/fineapp-api", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetchCreativeCards calls the correct endpoint with search and category", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        content: [],
        number: 0,
        size: 8,
        first: true,
        last: true,
      }),
    } as Response);

    await fetchCreativeCards({
      page: 0,
      size: 8,
      search: "videographer",
      category: "photographer",
    });

    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "/api/creatives/cards?page=0&size=8&sort=displayOrder%2Casc&active=1&search=videographer&category=photographer"
      ),
      {
        headers: { Accept: "application/json" },
      }
    );
  });

  it("fetchCreativeCards normalizes partial avatar urls", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        content: [
          {
            name: "A",
            location: "Stellenbosch",
            role: "photographer",
            avatarUrl: "v1754676849/users/profile-images/14.jpg",
            portfolioSlug: "a",
            ratePerHour: null,
            availability: "",
            reviewCount: 0,
            averageRating: 0,
            lowestAmount: null,
          },
        ],
        number: 0,
        size: 8,
        first: true,
        last: true,
      }),
    } as Response);

    const result = await fetchCreativeCards();

    expect(result.content[0]!.avatarUrl).toBe(
      "https://res.cloudinary.com/dij1mb8eb/image/upload/v1754676849/users/profile-images/14.jpg"
    );
  });

  it("fetchCreativeCards keeps full https avatar urls unchanged", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        content: [
          {
            name: "A",
            location: "Stellenbosch",
            role: "photographer",
            avatarUrl:
              "https://res.cloudinary.com/dij1mb8eb/image/upload/v1764685465/users/profile-images/116.jpg",
            portfolioSlug: "a",
            ratePerHour: null,
            availability: "",
            reviewCount: 0,
            averageRating: 0,
            lowestAmount: null,
          },
        ],
        number: 0,
        size: 8,
        first: true,
        last: true,
      }),
    } as Response);

    const result = await fetchCreativeCards();

    expect(result.content[0]!.avatarUrl).toBe(
      "https://res.cloudinary.com/dij1mb8eb/image/upload/v1764685465/users/profile-images/116.jpg"
    );
  });

  it("fetchCreativeCards throws on non-ok response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 401,
    } as Response);

    await expect(fetchCreativeCards()).rejects.toThrow(
      "FineApp API request failed: 401"
    );
  });

  it("fetchCreativeProfileBySlug calls the correct endpoint and normalizes avatar", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        id: 12,
        name: "Chichi",
        email: "x@example.com",
        location: "Stellenbosch",
        role: "photographer",
        bio: "",
        avatarUrl: "v1755623423/users/profile-images/12.jpg",
        portfolioSlug: "chichi",
        specialties: ["photographer"],
        ratePerHour: null,
        availability: "",
        active: true,
        reviewCount: 0,
        averageRating: 0,
        profileComplete: true,
      }),
    } as Response);

    const result = await fetchCreativeProfileBySlug("chichi");

    expect(fetchSpy).toHaveBeenCalledWith(
      "https://fineapple-api-production.up.railway.app/api/creatives/slug/chichi",
      {
        headers: { Accept: "application/json" },
      }
    );

    expect(result.avatarUrl).toBe(
      "https://res.cloudinary.com/dij1mb8eb/image/upload/v1755623423/users/profile-images/12.jpg"
    );
  });

  it("fetchCreativeSessionTypes calls the correct endpoint", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => [
        {
          id: 1,
          sessionTypeId: 20,
          sessionTypeName: "Couple shoot",
          isAvailable: true,
          packages: [],
        },
      ],
    } as Response);

    const result = await fetchCreativeSessionTypes(7);

    expect(fetchSpy).toHaveBeenCalledWith(
      "https://fineapple-api-production.up.railway.app/api/session-types/creative/7/full",
      {
        headers: { Accept: "application/json" },
      }
    );
    expect(result[0]!.sessionTypeName).toBe("Couple shoot");
  });

  it("fetchCreativeFilters calls the correct endpoint", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        specialties: ["photographer", "videographer"],
        locations: ["stellenbosch, south africa", ""],
      }),
    } as Response);

    const result = await fetchCreativeFilters();

    expect(fetchSpy).toHaveBeenCalledWith(
      "https://fineapple-api-production.up.railway.app/api/creatives/filters",
      {
        headers: { Accept: "application/json" },
      }
    );
    expect(result.specialties).toContain("photographer");
  });

  it("fetchRequests calls the correct endpoint", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
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
      }),
    } as Response);

    const result = await fetchRequests({ page: 0, size: 12 });

    expect(fetchSpy).toHaveBeenCalledWith(
      "https://fineapple-api-production.up.railway.app/api/requests?page=0&size=12",
      {
        headers: { Accept: "application/json" },
      }
    );
    expect(result.content).toHaveLength(1);
  });

  it("fetchCreativeCards throws when schema parsing fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        content: "not-an-array",
        number: 0,
        size: 8,
        first: true,
        last: true,
      }),
    } as Response);

    await expect(fetchCreativeCards()).rejects.toThrow();
  });
});
