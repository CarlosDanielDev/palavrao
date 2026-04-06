export type WordList = readonly string[];

export interface FilterOptions {
  /** Replace matched words with a placeholder character */
  replacementChar?: string;
}

export interface FilterResult {
  /** The filtered text */
  text: string;
  /** Whether any profanity was detected */
  hasProfanity: boolean;
  /** List of matched profane words */
  matches: string[];
}
