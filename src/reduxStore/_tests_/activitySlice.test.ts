import { describe, it, expect, vi } from "vitest";
import {
  activitySlice,
  registrateActivity,
  startActiveSession,
  stopActiveSession,
} from "../activitySlice";

describe("activitySlice", () => {
  it("first day creates a streak equal to one day", () => {
    const state = activitySlice.reducer(undefined, registrateActivity());
    expect(state.currentStreak).toBe(1);
    expect(state.bestStreak).toBe(1);
  });
});

describe("activity streak", () => {
  it("streak increases by 1 on each active day", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-12-11"));
    let state = activitySlice.reducer(undefined, registrateActivity());
    vi.setSystemTime(new Date("2025-12-12"));
    state = activitySlice.reducer(state, registrateActivity());
    expect(state.currentStreak).toBe(2);
    vi.setSystemTime(new Date("2025-12-13"));
    state = activitySlice.reducer(state, registrateActivity());
    expect(state.currentStreak).toBe(3);

    vi.useRealTimers();
  });

  it("streak resets to one day after inactivity", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-12-11"));
    let state = activitySlice.reducer(undefined, registrateActivity());
    vi.setSystemTime(new Date("2025-12-12"));
    state = activitySlice.reducer(state, registrateActivity());
    expect(state.currentStreak).toBe(2);
    vi.setSystemTime(new Date("2025-12-13"));
    state = activitySlice.reducer(state, registrateActivity());
    expect(state.currentStreak).toBe(3);
    vi.setSystemTime(new Date("2025-12-15"));
    state = activitySlice.reducer(state, registrateActivity());
    expect(state.currentStreak).toBe(1);
    vi.useRealTimers();
  });
});

describe("start active session", () => {
  it("activity is enabled when the session starts", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-12-12T10:00:00.000Z"));
    const state = activitySlice.reducer(undefined, startActiveSession());
    expect(state.isActive).toBe(true);
    expect(state.lastActiveStartedAt).toBe(1765533600000);
    vi.useRealTimers();
  });

  it("activity is disabled when the session stops", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-12-12T10:00:00.000Z"));
    const state = activitySlice.reducer(undefined, stopActiveSession());
    expect(state.isActive).toBe(false);
    expect(state.lastActiveStartedAt).toBe(null);
    vi.useRealTimers();
  });

  it("activity remains unchanged on repeated session starts", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-12-12T10:00:00.000Z"));
    let state = activitySlice.reducer(undefined, startActiveSession());
    state = activitySlice.reducer(state, startActiveSession());
    state = activitySlice.reducer(state, startActiveSession());
    expect(state.isActive).toBe(true);
    expect(state.lastActiveStartedAt).toBe(1765533600000);
    vi.useRealTimers();
  });

  it("activity time is saved when the session stops", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-12-12T10:00:00.000Z"));
    let state = activitySlice.reducer(undefined, startActiveSession());
    vi.setSystemTime(new Date("2025-12-12T10:01:00.000Z"));
    state = activitySlice.reducer(state, stopActiveSession());
    expect(state.byDay["2025-12-12"].activeMs).toBe(60000);
    vi.useRealTimers();
  });

  it("activity milliseconds are accumulated on repeated session starts", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-12-12T10:00:00.000Z"));
    let state = activitySlice.reducer(undefined, startActiveSession());

    vi.setSystemTime(new Date("2025-12-12T10:01:00.000Z"));
    state = activitySlice.reducer(state, stopActiveSession());
    
    vi.setSystemTime(new Date("2025-12-12T11:00:00.000Z"));
    state = activitySlice.reducer(state, startActiveSession());
    
    vi.setSystemTime(new Date("2025-12-12T11:01:00.000Z"));
    state = activitySlice.reducer(state, stopActiveSession());

    expect(state.byDay["2025-12-12"].activeMs).toBe(120000);

    vi.useRealTimers();
  });
});
