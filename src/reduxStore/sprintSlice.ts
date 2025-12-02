import { createSlice } from "@reduxjs/toolkit";
import type { SptintPhase } from "../features/train/TrainWords/ArticleSprint/useRunningPhase";
import { shuffle } from "../shared/utils/shuffle";

type SprintAnswer = {
  wordId: string;
  isCorrect: boolean;
  timeStamp: number;
};
type SprintState = {
  phase: SptintPhase;

  duration: number;
  timeLeft: number;

  queue: string[];
  index: number;

  answered: number;
  correct: number;
  wrong: number;

  history: SprintAnswer[];
};

const initialState: SprintState = {
  phase: "idle",

  duration: 60,
  timeLeft: 60,

  queue: [],
  index: 0,

  answered: 0,
  correct: 0,
  wrong: 0,

  history: [],
};

export const sprintSlice = createSlice({
  name: "sprint",
  initialState: initialState,
  reducers: {
    startSprint(
      state,
      action: { payload: { queue: string[]; duration?: number } }
    ) {
      const { queue, duration } = action.payload;
      state.phase = "running";
      state.queue = shuffle(queue, Math.random().toString());
      state.duration = duration ?? 60;
      state.timeLeft = duration ?? 60;
      state.index = 0;
      state.answered = 0;
      state.correct = 0;
      state.wrong = 0;
      state.history = [];
    },
    timerSprint(state) {
      if (state.phase !== "running") return;

      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
      if (state.timeLeft === 0) {
        state.phase = "finished";
      }
    },
    recordAnswerSprint(state, action: { payload: { isCorrect: boolean } }) {
      if (state.phase !== "running") return;
      const wordId = state.queue[state.index];
      if (!wordId) return;
      state.answered += 1;

      if (action.payload.isCorrect) {
        state.correct += 1;
      } else {
        state.wrong += 1;
      }

      state.history.push({
        wordId,
        isCorrect: action.payload.isCorrect,
        timeStamp: Date.now(),
      });

      state.index += 1;

      if (state.index >= state.queue.length) {
        state.queue = shuffle(state.queue, Math.random().toString());
        state.index = 0;
      }
    },
    finishSprint(state) {
      state.phase = "finished";
    },
    resetSprint() {
      return initialState;
    },
  },
});

export const { startSprint, timerSprint, recordAnswerSprint, finishSprint, resetSprint } =
  sprintSlice.actions;
export default sprintSlice.reducer;
