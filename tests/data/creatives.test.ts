import * as fineappApi from "../../src/lib/fineapp-api.js";
import {
  findCreatives,
  getCreativeFilters,
  getCreativeFullDetails,
  getCreativeProfile,
  getCreativeSessionTypes,
  getCreatives,
  searchCreatives,
} from "../../src/data/creatives.js";
import { describe, it, expect, vi } from "vitest";

describe("data/creatives", () => {
  it("getCreatives delegates to fetchCreativeCards", async () => {
    const spy = vi.spyOn(fineappApi, "fetchCreativeCards").mockResolvedValue({
      content: [],
      number: 0,
      size: 8,
      first: true,
      last: true,
    });

    const result = await getCreatives(0, 8, "photographer");

    expect(spy).toHaveBeenCalledWith({
      page: 0,
      size: 8,
      category: "photographer",
    });
    expect(result).toEqual({
      content: [],
      number: 0,
      size: 8,
      first: true,
      last: true,
    });
  });

  it("searchCreatives delegates to fetchCreativeCards", async () => {
    const spy = vi.spyOn(fineappApi, "fetchCreativeCards").mockResolvedValue({
      content: [],
      number: 0,
      size: 8,
      first: true,
      last: true,
    });

    await searchCreatives("videographer", 0, 8, "videographer");

    expect(spy).toHaveBeenCalledWith({
      page: 0,
      size: 8,
      search: "videographer",
      category: "videographer",
    });
  });

  it("getCreativeProfile delegates to fetchCreativeProfileBySlug", async () => {
    const spy = vi
      .spyOn(fineappApi, "fetchCreativeProfileBySlug")
      .mockResolvedValue({
        id: 12,
        name: "Chichi",
        email: "x@example.com",
        location: "Stellenbosch",
        role: "photographer",
        bio: "",
        avatarUrl: "",
        portfolioSlug: "chichi",
        specialties: ["photographer"],
        ratePerHour: null,
        availability: "",
        active: true,
        reviewCount: 0,
        averageRating: 0,
        profileComplete: true,
      });

    const result = await getCreativeProfile("chichi");

    expect(spy).toHaveBeenCalledWith("chichi");
    expect(result.portfolioSlug).toBe("chichi");
  });

  it("getCreativeSessionTypes delegates to fetchCreativeSessionTypes", async () => {
    const spy = vi
      .spyOn(fineappApi, "fetchCreativeSessionTypes")
      .mockResolvedValue([]);

    const result = await getCreativeSessionTypes(7);

    expect(spy).toHaveBeenCalledWith(7);
    expect(result).toEqual([]);
  });

  it("getCreativeFullDetails combines profile and session types", async () => {
    vi.spyOn(fineappApi, "fetchCreativeProfileBySlug").mockResolvedValue({
      id: 12,
      name: "Chichi",
      email: "x@example.com",
      location: "Stellenbosch",
      role: "photographer",
      bio: "",
      avatarUrl: "",
      portfolioSlug: "chichi",
      specialties: ["photographer"],
      ratePerHour: null,
      availability: "",
      active: true,
      reviewCount: 0,
      averageRating: 0,
      profileComplete: true,
    });

    vi.spyOn(fineappApi, "fetchCreativeSessionTypes").mockResolvedValue([
      {
        id: 1,
        sessionTypeId: 20,
        sessionTypeName: "Couple shoot",
        isAvailable: true,
        packages: [],
      },
    ]);

    const result = await getCreativeFullDetails("chichi");

    expect(result.profile.id).toBe(12);
    expect(result.sessionTypes).toHaveLength(1);
    expect(result.sessionTypes[0]!.sessionTypeName).toBe("Couple shoot");
  });

  it("getCreativeFilters delegates to fetchCreativeFilters", async () => {
    const spy = vi.spyOn(fineappApi, "fetchCreativeFilters").mockResolvedValue({
      specialties: ["photographer", "videographer"],
      locations: ["stellenbosch, south africa"],
    });

    const result = await getCreativeFilters();

    expect(spy).toHaveBeenCalled();
    expect(result.specialties).toContain("photographer");
  });

  it("findCreatives filters by role and location", async () => {
    vi.spyOn(fineappApi, "fetchCreativeCards").mockResolvedValue({
      content: [
        {
          name: "A",
          location: "Stellenbosch, South Africa",
          role: "photographer, videographer",
          avatarUrl: "",
          portfolioSlug: "a",
          ratePerHour: null,
          availability: "",
          reviewCount: 0,
          averageRating: 0,
          lowestAmount: null,
        },
        {
          name: "B",
          location: "Cape Town, South Africa",
          role: "photographer",
          avatarUrl: "",
          portfolioSlug: "b",
          ratePerHour: null,
          availability: "",
          reviewCount: 0,
          averageRating: 0,
          lowestAmount: null,
        },
      ],
      number: 0,
      size: 50,
      first: true,
      last: true,
    });

    const result = await findCreatives({
      role: "videographer",
      location: "stellenbosch",
      page: 0,
      size: 50,
    });

    expect(result.content).toHaveLength(1);
    expect(result.content[0]!.portfolioSlug).toBe("a");
  });

  it("findCreatives passes category through to fetchCreativeCards", async () => {
    const spy = vi.spyOn(fineappApi, "fetchCreativeCards").mockResolvedValue({
      content: [],
      number: 0,
      size: 50,
      first: true,
      last: true,
    });

    await findCreatives({
      role: "photographer",
      category: "photographer",
      page: 0,
      size: 50,
    });

    expect(spy).toHaveBeenCalledWith({
      page: 0,
      size: 50,
      category: "photographer",
    });
  });
});
