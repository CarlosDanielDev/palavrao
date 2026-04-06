import { describe, it, expect } from "vitest";
import { levenshtein, normalizedLevenshtein } from "../src/core/levenshtein.js";

describe("levenshtein", () => {
  it("returns 3 for 'kitten' → 'sitting'", () => {
    expect(levenshtein("kitten", "sitting")).toBe(3);
  });

  it("returns length of the other string when one is empty", () => {
    expect(levenshtein("", "abc")).toBe(3);
    expect(levenshtein("abc", "")).toBe(3);
  });

  it("returns 0 for identical strings", () => {
    expect(levenshtein("abc", "abc")).toBe(0);
  });

  it("returns 0 for two empty strings", () => {
    expect(levenshtein("", "")).toBe(0);
  });

  it("handles single character difference", () => {
    expect(levenshtein("cat", "car")).toBe(1);
    expect(levenshtein("a", "b")).toBe(1);
  });

  it("handles unicode characters", () => {
    expect(levenshtein("café", "cafe")).toBe(1);
    expect(levenshtein("über", "uber")).toBe(1);
    expect(levenshtein("ação", "acao")).toBe(2);
  });

  it("is symmetric", () => {
    expect(levenshtein("abc", "def")).toBe(levenshtein("def", "abc"));
    expect(levenshtein("kitten", "sitting")).toBe(
      levenshtein("sitting", "kitten"),
    );
  });

  describe("early termination (maxDistance)", () => {
    it("returns exact distance when within threshold", () => {
      expect(levenshtein("kitten", "sitting", 5)).toBe(3);
      expect(levenshtein("kitten", "sitting", 3)).toBe(3);
    });

    it("returns maxDistance + 1 when distance exceeds threshold", () => {
      expect(levenshtein("kitten", "sitting", 2)).toBe(3);
      expect(levenshtein("abc", "xyz", 1)).toBe(2);
    });

    it("terminates early based on length difference alone", () => {
      expect(levenshtein("a", "abcdef", 2)).toBe(3);
    });

    it("handles threshold of 0", () => {
      expect(levenshtein("abc", "abc", 0)).toBe(0);
      expect(levenshtein("abc", "abd", 0)).toBe(1);
    });
  });
});

describe("normalizedLevenshtein", () => {
  it("returns 0 for identical strings", () => {
    expect(normalizedLevenshtein("abc", "abc")).toBe(0);
  });

  it("returns 0 for two empty strings", () => {
    expect(normalizedLevenshtein("", "")).toBe(0);
  });

  it("returns 1 for completely different single-char strings", () => {
    expect(normalizedLevenshtein("a", "b")).toBe(1);
  });

  it("returns a value between 0 and 1", () => {
    const result = normalizedLevenshtein("kitten", "sitting");
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(1);
    expect(result).toBeCloseTo(3 / 7);
  });

  it("returns 1 when one string is empty", () => {
    expect(normalizedLevenshtein("abc", "")).toBe(1);
    expect(normalizedLevenshtein("", "abc")).toBe(1);
  });
});
