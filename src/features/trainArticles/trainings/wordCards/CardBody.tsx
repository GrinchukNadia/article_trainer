import CloseTrain from "../../shared/CloseTrain";
import Card from "./Card";
import { useCardTrain } from "./useCardTrain";
import styles from "./CardBody.module.scss";
import { useEffect } from "react";
import ArrowDown from "../../../../assets/svg/ArrowDown";
import clsx from "clsx";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../reduxStore/store";

export default function CardBody({ close }: { close?: () => void }) {
  const {
    current,
    index,
    state,
    loadNext,
    onAnimationStart,
    onAnimationEnd,
    handleAnswer
  } = useCardTrain();

  const token = useSelector((state: RootState) => state.auth.token)

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

  if (!token) {
    return (
      <div className={clsx(styles.continueLearning, styles.beforRegistration)}>
        <div>
          <CloseTrain close={close} />
        </div>
        <button style={{cursor: "auto"}}>
          Registriere dich und beginne mit dem Lernen
        </button>

      </div>
    )
  }

  if (!current) {
    return (
      <div className={styles.continueLearning}>
        <div className="container">
          <div>
            <CloseTrain close={close} />
          </div>
          <button autoFocus onClick={loadNext}>
            Noch 10 Wörter lernen
          </button>
          <div className={styles.hint}>
            <span>Нажми </span>
            <ArrowDown />
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
        selectedArticles={state.selectedArticles}
        answered={state.answered}
      />
    </div>
  );
}
