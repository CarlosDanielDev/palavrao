import { describe, it, expect } from "vitest";
import { ProfanityFilter } from "../src/index.js";

describe("ProfanityFilter", () => {
  it("should create an instance with default options", () => {
    const filter = new ProfanityFilter();
    expect(filter).toBeInstanceOf(ProfanityFilter);
  });

  it("should return unmodified text when no profanity is found", () => {
    const filter = new ProfanityFilter();
    const result = filter.filter("hello world");

    expect(result.text).toBe("hello world");
    expect(result.hasProfanity).toBe(false);
    expect(result.matches).toEqual([]);
  });

  it("should accept custom replacement character", () => {
    const filter = new ProfanityFilter({ replacementChar: "#" });
    expect(filter).toBeInstanceOf(ProfanityFilter);
  });
});
