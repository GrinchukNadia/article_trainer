import { useDispatch, useSelector } from "react-redux";
import CloseTrain from "../CloseTrain";
import Timer from "./Timer";
import { useRunningPhase } from "./useRunningPhase";
import type { RootState } from "../../../../reduxStore/store";
import { useEffect } from "react";
import { startSprint } from "../../../../reduxStore/sprintSlice";
import { FallingSprint } from "./FallingSprint";
import styles from "./ArticleSprint.module.scss";

function ArticleSprint({ close }: { close: () => void }) {
  const dispatch = useDispatch();
  const sprintWordsIds = useSelector(
    (state: RootState) => state.srs.words.allIds
  );
  const sprint = useSelector((state: RootState) => state.sprint);
  const { phase, answered, correct, wrong } = sprint;

  useEffect(() => {
    if (phase !== "idle") return;
    if (sprintWordsIds.length === 0) return;
    dispatch(startSprint({ queue: sprintWordsIds, duration: 60 }));
  }, [dispatch, phase, sprintWordsIds]);

  const { value, max } = useRunningPhase();

  const handleRestart = () => {
    if (sprintWordsIds.length === 0) return;
    dispatch(startSprint({ queue: sprintWordsIds, duration: 60 }));
  };

  if (phase === "finished") {
    return (
      <>
        <CloseTrain close={close} />
        <div className={styles.sprint_result}>
          <h2>Спринт завершён!</h2>
          <p>Всего ответов: {answered}</p>
          <p>Правильных: {correct}</p>
          <p>Ошибок: {wrong}</p>

          <button onClick={handleRestart}>Тренироваться ещё</button>
        </div>
      </>
    );
  }

  return (
    <div style={{ width: "80rem",height: "100%"}}>
      <CloseTrain close={close} />
      <Timer value={value} max={max} />
      <FallingSprint />
    </div>
  );
}

export default ArticleSprint;
