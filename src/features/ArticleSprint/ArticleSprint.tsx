import CloseTrain from "../trainArticles/shared/CloseTrain";
import Timer from "./Timer";
import { useEffect } from "react";
import { FallingSprint } from "./FallingSprint";
import styles from "./ArticleSprint.module.scss";
import { useState } from "react";

function ArticleSprint({close}: any) {

  const [phase, setPhase] = useState("idle");
  const [answered, setAnswered] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);


  useEffect(() => {
    if (phase !== "idle") return;
  }, [phase ]);

  const handleRestart = () => {
    setPhase("running");
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
      <Timer value={0} max={60} setPhase={setPhase} />
      <FallingSprint setAnswered={setAnswered} setCorrect={setCorrect} setWrong={setWrong} />
    </div>
  );
}

export default ArticleSprint;
