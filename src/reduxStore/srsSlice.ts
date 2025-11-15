import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SrsState } from "./srsTypes";
import {
  computeProgress,
  UtsTimeNow,
  type AnswerUpdate,
} from "../shared/utils/srsUtils";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const initialState: SrsState = {
  words: {
    byId: {},
    allIds: [],
  },
  progress: {
    byId: {},
  },
  queue: {
    todayIds: [],
  },
};

export const srsSlice = createSlice({
  name: "srs",
  initialState,
  reducers: {
    // normalizes word array into byId map and allIds list for efficient lookups and updates
    initWords(state, action) {
      const wordsList = action.payload;
      state.words.byId = {};
      state.words.allIds = [];

      for (const word of wordsList) {
        state.words.byId[word.id] = word;
        state.words.allIds.push(word.id);
      }
    },

    // creates initial progress array for all new words
    initWordsProgressArr(
      state,
      action: PayloadAction<{ dateIso?: string } | undefined>
    ) {
      const nowIso = action?.payload?.dateIso ?? UtsTimeNow();
      for (const id of state.words.allIds) {
        if (!state.progress.byId[id]) {
          state.progress.byId[id] = {
            wordId: id,
            box: 0,
            streak: 0,
            lapses: 0,
            nextDue: nowIso,
            mastered: false,
          };
        }
      }
    },

    // builds a list of words whose review time has arrived (today’s study queue)
    computeQueue(
      state,
      action: PayloadAction<{ dateIso?: string } | undefined>
    ) {
      
      let queueAll: string[] = [];
      const reviwWordsList = [];
      const newWordsList = [];

      const nowIso = action?.payload?.dateIso ?? UtsTimeNow();
      const now = new Date(nowIso);
      
      for (const id in state.words.byId) {
        const progress = state.progress.byId[id];
        const lapses = state.progress.byId[id]?.lapses
        if (!progress) continue;
        
        // Convert the stored ISO date string into a Date object for comparison
        const nextDue = new Date(progress.nextDue);

        if (now >= nextDue && lapses === 0) {
          newWordsList.push(id);
        }
        if(now >= nextDue && lapses > 0) {
          reviwWordsList.push(id);
        }
      }
      queueAll = [...reviwWordsList, ...newWordsList].slice(0, 10);
      state.queue.todayIds = queueAll;
    },

    // lazily update today's queue: add word if due again, remove if not due anymore
    recordAnswer(state, action: PayloadAction<AnswerUpdate>) {
      const { wordId } = action.payload;
      const current = state.progress.byId[wordId];

      const next = computeProgress(current, action.payload);
      state.progress.byId[wordId] = next;

    },
  },
});

export const { initWords, initWordsProgressArr, computeQueue, recordAnswer } =
  srsSlice.actions;
// export default srsSlice.reducer;


// persist local storage------------------------------------------------------------------------------
const srsPersistConfig = {
  key: "srs_all",
  storage,
}
export default persistReducer(srsPersistConfig, srsSlice.reducer);
// persist local storage------------------------------------------------------------------------------


// selectors
export const selectWordsСount = (state: { srs: SrsState }) =>
  state.srs.words.allIds.length;
export const selectWordById = (state: { srs: SrsState }, id: string) =>
  state.srs.words.byId[id];
export const selectAllWords = (state: { srs: SrsState }) =>
  state.srs.words.allIds;
export const selectProgressById = (state: { srs: SrsState }, id: string) =>
  state.srs.progress.byId[id];
export const selectQueue = (state: { srs: SrsState }) =>
  state.srs.queue.todayIds;

export const selectQueueWithData = createSelector(
  [selectQueue, (s) => s],
  (ids, s) =>
    ids.map((id) => ({
      word: selectWordById(s, id)!,
      prog: selectProgressById(s, id)!,
    }))
);
