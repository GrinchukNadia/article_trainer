import seedrandom from "seedrandom";

export const seed = "1234";

export function shuffle<T>(arr: T[], seed: string): T[] {
  const rng = seedrandom(seed);
  const copy = [...arr];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
