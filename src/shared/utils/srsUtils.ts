import type { BoxIndex } from "../../reduxStore/srsTypes";
import type { WordsProgress } from "../types/words";

// box intervals for space repetition system
export const BOX_INTERVALS_DAYS = [0, 1, 2, 4, 7, 15] as const;

// limiting box index to 0 - length of array
export const limitBoxIndex = (number: number): BoxIndex =>
  Math.max(0, Math.min(BOX_INTERVALS_DAYS.length - 1, number)) as BoxIndex;

//  getting current date in UTC
export const UtsTimeNow = () => new Date().toISOString();

// adding days and returning in UTC
const addDaysUtsIso = (iso: string, days: number) => {
  const date = new Date(iso);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString();
};

type Previous = WordsProgress | undefined;
export type AnswerUpdate = {
  wordId: string;
  correct: boolean;
  dateNow?: string;
};

export const computeProgress = (
  prev: Previous,
  arg: AnswerUpdate
): WordsProgress => {
  const currentIso = arg.dateNow ?? UtsTimeNow();

  // if previous was undefine creating initial progress
  const initialProgress = prev ?? {
    wordId: arg.wordId,
    box: 0,
    streak: 0,
    lapses: 0,
    nextDue: addDaysUtsIso(currentIso, BOX_INTERVALS_DAYS[0]),
    mastered: false,
  };

  let { box, streak, lapses } = initialProgress;

  if (arg.correct) {
    streak += 1;
    box = limitBoxIndex(box + 1);
    lapses = prev?.lapses ?? 0;
    console.log(lapses)
  } else {
    streak = 0;
    box = limitBoxIndex(box - 1);
    lapses = (prev?.lapses ?? 0) + 1;
    console.log(lapses)
  }

  let nextRepetition = "";

  if (lapses >=1 && streak === 1) {
    nextRepetition = currentIso;
  } else {
    nextRepetition = addDaysUtsIso(currentIso, BOX_INTERVALS_DAYS[box]);
  }

  const mastered = box === BOX_INTERVALS_DAYS.length - 1;

  return {
    ...initialProgress,
    box,
    streak,
    lapses,
    nextDue: nextRepetition,
    mastered,
  };
};
