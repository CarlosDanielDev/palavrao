/**
 * Computes the Levenshtein distance between two strings using the
 * Wagner-Fischer algorithm optimised to a single-row buffer (O(min(m,n)) space).
 *
 * When `maxDistance` is provided the function terminates early and returns
 * `maxDistance + 1` as soon as the minimum possible distance exceeds the
 * threshold — this keeps the hot-path fast for profanity filtering.
 */
export function levenshtein(
  a: string,
  b: string,
  maxDistance?: number,
): number {
  // Fast paths
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  // Ensure `a` is the shorter string so the row buffer is as small as possible.
  if (a.length > b.length) {
    [a, b] = [b, a];
  }

  const aLen = a.length;
  const bLen = b.length;

  // If the length difference alone exceeds the threshold we can bail out.
  if (maxDistance !== undefined && bLen - aLen > maxDistance) {
    return maxDistance + 1;
  }

  // Single-row buffer (indices 0 … aLen).
  const row = new Array<number>(aLen + 1);
  for (let i = 0; i <= aLen; i++) row[i] = i;

  for (let j = 1; j <= bLen; j++) {
    let prev = row[0];
    row[0] = j;

    let rowMin = row[0];

    for (let i = 1; i <= aLen; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const current = Math.min(
        row[i] + 1, // deletion
        row[i - 1] + 1, // insertion
        prev + cost, // substitution
      );
      prev = row[i];
      row[i] = current;

      if (current < rowMin) rowMin = current;
    }

    // Early termination: every cell in this row exceeds the threshold.
    if (maxDistance !== undefined && rowMin > maxDistance) {
      return maxDistance + 1;
    }
  }

  return row[aLen];
}

/**
 * Returns the normalised Levenshtein distance — a value in [0, 1] where
 * 0 means identical strings and 1 means completely different.
 *
 * Defined as `distance / max(|a|, |b|)`.  Returns 0 when both strings are empty.
 */
export function normalizedLevenshtein(a: string, b: string): number {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 0;
  return levenshtein(a, b) / maxLen;
}
