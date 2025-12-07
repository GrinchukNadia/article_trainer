import { createSlice } from "@reduxjs/toolkit";
import { differenceInDays, format } from "date-fns";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { cleanupOldDays, ensureDay } from "../shared/utils/activityGraph";

export type ActivityDay = {
  date: string;
  activeMs: number;
};
export type ActivityState = {
  lastActiveDate: string | null;
  currentStreak: number;
  bestStreak: number;
  totalActiveDays: number;

  byDay: Record<string, ActivityDay>;

  lastActiveStartedAt: number | null;
  isActive: boolean;
};

const initialState: ActivityState = {
  lastActiveDate: null,
  currentStreak: 0,
  bestStreak: 0,
  totalActiveDays: 0,

  byDay: {},

  lastActiveStartedAt: null,
  isActive: false,
};

export const activitySlice = createSlice({
  name: "activity",
  initialState: initialState,
  reducers: {
    registrateActivity: (state) => {
      const today = format(new Date(), "yyyy-MM-dd");

      if (!state.lastActiveDate) {
        state.lastActiveDate = format(new Date(), "yyyy-MM-dd");
        state.currentStreak = 1;
        state.bestStreak = 1;
        state.totalActiveDays = 1;

        ensureDay(state, today);
        cleanupOldDays(state);
        return;
      }
      const lastActiveDate = format(
        new Date(state.lastActiveDate),
        "yyyy-MM-dd"
      );
      const wasActiveYesterday =
        differenceInDays(new Date(today), new Date(lastActiveDate ?? today)) ===
        1;

      if (lastActiveDate === today) {
        ensureDay(state, today);
        cleanupOldDays(state);
        return;
      };

      if (wasActiveYesterday) {
        state.lastActiveDate = today;
        state.currentStreak += 1;
        state.bestStreak =
          state.currentStreak > state.bestStreak
            ? state.currentStreak
            : state.bestStreak;
        state.totalActiveDays += 1;
      } else {
        state.lastActiveDate = today;
        state.currentStreak = 1;
        state.totalActiveDays += 1;
      }

      ensureDay(state, today);
      cleanupOldDays(state);
    },
    startActiveSession: (state) => {
      if(!state.isActive) {
        state.isActive = true;
        state.lastActiveStartedAt = Date.now();
      }
    },
    stopActiveSession: (state) => {
      if(!state.isActive || !state.lastActiveStartedAt) return;

      const now = Date.now();
      const diff = now - state.lastActiveStartedAt;
      const today = format(new Date(), "yyyy-MM-dd");
      const day = ensureDay(state, today);
      day.activeMs += diff;

      state.isActive = false;
      state.lastActiveStartedAt = null;
      cleanupOldDays(state);
    },
  },
});

export const { registrateActivity, startActiveSession, stopActiveSession } = activitySlice.actions;
// export default activitySlice.reducer;

// persist local storage------------------------------------------------------------------------------
const srsPersistConfig = {
  key: "activity_all",
  storage,
};
export default persistReducer(srsPersistConfig, activitySlice.reducer);
// persist local storage------------------------------------------------------------------------------
