import { afterEach, describe, expect, it, vi } from "vitest";
import { requestJson } from "../../src/lib/request-client.js";

describe("lib/request-client", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns parsed json on success", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ value: 42 }),
    } as Response);

    const schema = {
      parse: vi.fn((input: unknown) => input as { value: number }),
    };

    const result = await requestJson("https://example.com/test", schema);

    expect(result).toEqual({ value: 42 });
    expect(schema.parse).toHaveBeenCalledWith({ value: 42 });
  });

  it("throws on non-ok 4xx response without retrying", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 401,
    } as Response);

    const schema = {
      parse: vi.fn(),
    };

    await expect(
      requestJson("https://example.com/test", schema)
    ).rejects.toThrow("FineApp API request failed: 401");

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("retries on 5xx response and succeeds", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce({
        ok: false,
        status: 503,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ value: 99 }),
      } as Response);

    const schema = {
      parse: vi.fn((input: unknown) => input as { value: number }),
    };

    const result = await requestJson("https://example.com/test", schema);

    expect(result).toEqual({ value: 99 });
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it("retries on 429 response and succeeds", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce({
        ok: false,
        status: 429,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ value: 7 }),
      } as Response);

    const schema = {
      parse: vi.fn((input: unknown) => input as { value: number }),
    };

    const result = await requestJson("https://example.com/test", schema);

    expect(result).toEqual({ value: 7 });
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it("throws when schema parsing fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ value: 42 }),
    } as Response);

    const schema = {
      parse: vi.fn(() => {
        throw new Error("schema failed");
      }),
    };

    await expect(
      requestJson("https://example.com/test", schema)
    ).rejects.toThrow("schema failed");
  });
});
