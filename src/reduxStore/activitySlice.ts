import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

export type ActivityDay = {
  date: string;
  activeMs: number;
};
export type ActivityState = {
  currentStreak: number;

  lastActiveStartedAt: number | null;
  isActive: boolean;
};

const initialState: ActivityState = {
  currentStreak: 0,
  lastActiveStartedAt: null,
  isActive: false,
  
};

export const activitySlice = createSlice({
  name: "activity",
  initialState: initialState,
  reducers: {
    startActiveSession: (state) => {
      if (!state.isActive) {
        state.isActive = true;
        state.lastActiveStartedAt = Date.now();
      }
    },
    stopActiveSession: (state) => {
      if (!state.isActive || !state.lastActiveStartedAt) return;
      state.isActive = false;
      state.lastActiveStartedAt = null;
    },
  },
});

export const { startActiveSession, stopActiveSession } = activitySlice.actions;

// persist local storage------------------------------------------------------------------------------
const srsPersistConfig = {
  key: "activity_all",
  storage,
};
export default persistReducer(srsPersistConfig, activitySlice.reducer);
// persist local storage------------------------------------------------------------------------------