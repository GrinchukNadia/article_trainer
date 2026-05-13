import CloseTrain from "../../shared/CloseTrain";
import Card from "./Card";
import { useCardTrain } from "./useCardTrain";
import styles from "./CardBody.module.scss";
import { useEffect } from "react";

export default function CardBody({ close }: { close?: () => void }) {
  const {
    current,
    index,
    state,
    loadNext,
    onAnimationStart,
    onAnimationEnd,
    handleAnswer,
  } = useCardTrain("train");

  
  useEffect(() => {
    if (current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        loadNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [current, loadNext]);

  if (!current) {
    return (
      <div className={styles.continueLearning}>
        <div className="container">
          <div>
            <CloseTrain close={close} />
          </div>
          <button autoFocus onClick={loadNext} className="finish">
            Noch 10 Wörter lernen
          </button>
          <div className={styles.hint}>
            <span>Нажми </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="36"
              height="36"
              viewBox="0 0 256 256"
            >
              <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                <path
                  d="M 90 24.25 c 0 -0.896 -0.342 -1.792 -1.025 -2.475 c -1.366 -1.367 -3.583 -1.367 -4.949 0 L 45 60.8 L 5.975 21.775 c -1.367 -1.367 -3.583 -1.367 -4.95 0 c -1.366 1.367 -1.366 3.583 0 4.95 l 41.5 41.5 c 1.366 1.367 3.583 1.367 4.949 0 l 41.5 -41.5 C 89.658 26.042 90 25.146 90 24.25 z"
                  transform=" matrix(1 0 0 1 0 0) "
                  stroke-linecap="round"
                />
              </g>
            </svg>
            <span> что бы продолжить</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cardBody}>
      <CloseTrain close={close} />
      <Card
        key={index}
        animation={state.animation}
        word={current.lemma}
        translation={state.translation}
        article={state.article}
        className={state.cardClass}
        onAnimationStart={onAnimationStart}
        onAnimationEnd={onAnimationEnd}
        handleAnswer={handleAnswer}
        current={current}
      />
    </div>
  );
}
