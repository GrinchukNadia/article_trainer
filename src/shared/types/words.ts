export type Gender = "der" | "die" | "das";

export type CardBase = {
  id: string;
  lemma: string;
  gender: Gender;
  translation: string;
  level: number;
  lapses: number;
  media: { image: string };
};

export type SrsStatus= "new" |"learning" | "review" | "mastered";
export type WordSrsRaw = {
    status: SrsStatus;
    streak: number;
    intervalDays: number;
    lapses: number;
    dueAt: string | null;
    reps: number;
}

export type CardItem = CardBase & {src: WordSrsRaw};

export type WordsDataSrs = {
    wordId: string;
    status: SrsStatus;
    streak: number;
    lapses: number;
    intervalDays: number;
    dueAt: string | null;
    reps: number;
}

export type WordsProgress = {
  wordId: string;
  box: number;
  streak: number;
  lapses: number ;
  nextDue: string;
  lastReviewed?: string;
  mastered: boolean;
};

