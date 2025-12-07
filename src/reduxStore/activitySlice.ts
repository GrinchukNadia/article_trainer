import { createSlice } from "@reduxjs/toolkit";
import {differenceInDays, format} from 'date-fns'
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";


type ActivityState = {
    lastActiveDate: string | null,
    currentStreak: number,
    bestStreak: number, 
    totalActiveDays: number
}

const initialState: ActivityState = {
    lastActiveDate: null,
    currentStreak: 0,
    bestStreak: 0,
    totalActiveDays: 0
}

export const activitySlice = createSlice({
    name: "activity",
    initialState: initialState,
    reducers: {
        registrateActivity: (state) => {
            const today = format(new Date(), 'yyyy-MM-dd'); 

            if(!state.lastActiveDate) {
                state.lastActiveDate = format(new Date(), 'yyyy-MM-dd'); 
                state.currentStreak = 1;
                state.bestStreak = 1;
                state.totalActiveDays = 1;
            }
            const lastActiveDate = format(new Date(state.lastActiveDate), 'yyyy-MM-dd');
            const wasActiveYesterday = differenceInDays(new Date(today), new Date(lastActiveDate ?? today)) === 1;

            if(lastActiveDate === today) return;
            if(wasActiveYesterday) {
                state.lastActiveDate = today;
                state.currentStreak += 1;
                state.bestStreak =  state.currentStreak > state.bestStreak ? state.currentStreak : state.bestStreak;
                state.totalActiveDays += 1;
            } else {
                state.lastActiveDate = today;
                state.currentStreak = 1;
                state.totalActiveDays += 1;
            }
        }
    }
});

export const {registrateActivity} = activitySlice.actions;
// export default activitySlice.reducer;

// persist local storage------------------------------------------------------------------------------
const srsPersistConfig = {
  key: "activity_all",
  storage,
};
export default persistReducer(srsPersistConfig, activitySlice.reducer);
// persist local storage------------------------------------------------------------------------------