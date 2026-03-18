import {
  creativeCardsUrl,
  creativeFiltersUrl,
  creativeProfileBySlugUrl,
  creativeSessionTypesUrl,
  requestsUrl,
} from "../../src/lib/endpoints.js";
import { describe, it, expect } from "vitest";

describe("endpoints", () => {
  it("builds creative cards url with defaults", () => {
    const url = creativeCardsUrl();

    expect(url).toContain("/api/creatives/cards?");
    expect(url).toContain("page=0");
    expect(url).toContain("size=8");
    expect(url).toContain("sort=displayOrder%2Casc");
    expect(url).toContain("active=1");
  });

  it("builds creative cards url with search and category", () => {
    const url = creativeCardsUrl({
      page: 2,
      size: 12,
      search: "videographer",
      category: "photographer",
    });

    expect(url).toContain("page=2");
    expect(url).toContain("size=12");
    expect(url).toContain("search=videographer");
    expect(url).toContain("category=photographer");
  });

  it("builds creative profile url", () => {
    expect(creativeProfileBySlugUrl("chichi")).toBe(
      "https://fineapple-api-production.up.railway.app/api/creatives/slug/chichi"
    );
  });

  it("builds creative session types url", () => {
    expect(creativeSessionTypesUrl(7)).toBe(
      "https://fineapple-api-production.up.railway.app/api/session-types/creative/7/full"
    );
  });

  it("builds creative filters url", () => {
    expect(creativeFiltersUrl()).toBe(
      "https://fineapple-api-production.up.railway.app/api/creatives/filters"
    );
  });

  it("builds requests url", () => {
    const url = requestsUrl({ page: 1, size: 20 });

    expect(url).toBe(
      "https://fineapple-api-production.up.railway.app/api/requests?page=1&size=20"
    );
  });
});
