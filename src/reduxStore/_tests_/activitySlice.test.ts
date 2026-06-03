import { describe, it, expect, vi } from "vitest";
import {
  activitySlice,
  startActiveSession,
  stopActiveSession,
} from "../activitySlice";


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

});
