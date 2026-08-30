/**
 * Minimal Lehmer/Park-Miller PRNG. Deterministic per seed so mock datasets
 * stay stable across re-renders and server/client hydration.
 */
export function seeded(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function next(): number {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
