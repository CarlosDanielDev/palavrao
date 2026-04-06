import { describe, it, expect } from "vitest";
import { ptBRWordList } from "../src/index.js";

describe("pt-BR word list", () => {
  it("should contain at least 50 base forms", () => {
    expect(ptBRWordList.length).toBeGreaterThanOrEqual(50);
  });

  it("should be sorted alphabetically", () => {
    const sorted = [...ptBRWordList].sort((a, b) =>
      a.localeCompare(b, "pt-BR"),
    );
    expect(ptBRWordList).toEqual(sorted);
  });

  it("should have no duplicates", () => {
    const unique = new Set(ptBRWordList);
    expect(unique.size).toBe(ptBRWordList.length);
  });

  it("should have all entries in lowercase", () => {
    for (const word of ptBRWordList) {
      expect(word).toBe(word.toLowerCase());
    }
  });

  it("should have no entries with accents (normalized form)", () => {
    for (const word of ptBRWordList) {
      const normalized = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      expect(word).toBe(normalized);
    }
  });

  it("should be importable as a typed readonly array", () => {
    expect(Array.isArray(ptBRWordList)).toBe(true);
  });
});
