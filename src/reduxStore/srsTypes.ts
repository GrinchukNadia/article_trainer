import type { CardBase, WordsProgress } from "../shared/types/words";

type WordsState = {
  byId: Record<string, CardBase>;
  allIds: string[];
};
type ProgressState = { byId: Record<string, WordsProgress> };
type QueueState ={ todayIds: string[], weakIds: string[] };

export type SrsState = {
  words: WordsState;
  progress: ProgressState;
  queue: QueueState;
};

export type BoxIndex = 0 | 1 | 2 | 3 | 4 | 5;
