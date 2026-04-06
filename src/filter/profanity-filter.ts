import type { FilterOptions, FilterResult } from "../types/index.js";

const DEFAULT_REPLACEMENT_CHAR = "*";

export class ProfanityFilter {
  readonly replacementChar: string;

  constructor(options: FilterOptions = {}) {
    this.replacementChar = options.replacementChar ?? DEFAULT_REPLACEMENT_CHAR;
  }

  filter(text: string): FilterResult {
    return {
      text,
      hasProfanity: false,
      matches: [],
    };
  }
}
