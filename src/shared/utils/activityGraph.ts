import type { ActivityState } from "../../reduxStore/activitySlice";

const MAX_DAYS = 7;
const DAY_MS = 24 * 60 * 60 * 1000;

export const ensureDay = (state: ActivityState, date: string) => {
    let day = state.byDay[date];

    if(!day) {
        day = { date, activeMs: 0 };
        state.byDay[date] = day;
    }
    return day;
}   

export const cleanupOldDays = (state: ActivityState) => {
    const now = new Date();

    for(const key of Object.keys(state.byDay)) {
        const date = new Date(key);
        if(now.getTime() - date.getTime() > (MAX_DAYS - 1) * DAY_MS) {
            delete state.byDay[key];
        }
    }
}