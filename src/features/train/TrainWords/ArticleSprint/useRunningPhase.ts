import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../reduxStore/store";
import { timerSprint } from "../../../../reduxStore/sprintSlice";

export type SptintPhase = "idle" | "running" | "finished";

export const useRunningPhase = () => {
  const dispatch = useDispatch();
  const { phase, timeLeft, duration } = useSelector(
    (state: RootState) => state.sprint
  );

  useEffect(() => {
    if (phase !== "running") return;
    
    const timer = setInterval(() => {
      dispatch(timerSprint());
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch, phase]);

  const value = useMemo(() => duration - timeLeft, [duration, timeLeft]);

  return { value, max: duration };
};
