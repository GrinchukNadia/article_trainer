import { useDispatch } from "react-redux";
import CloseTrain from "../CloseTrain";
import Card from "../wordCards/Card";
import { useCardTrain } from "../wordCards/useCardTrain";
import styles from "./Mistakes.module.scss";
import { computeWeakQueue } from "../../../../reduxStore/srsSlice";

function MistakeReview({ close }: { close?: () => void }) {
  const {
    current,
    index,
    state,
    onAnimationStart,
    onAnimationEnd,
    handleAnswer,
  } = useCardTrain("weakReview");


// -----------------------------повторение логики из CardBody-----------------------------------------------------------------

  const dispatch = useDispatch();
    if (!current) {
      const moreWordsHandler = (
        e:
          | React.KeyboardEvent<HTMLButtonElement>
          | React.MouseEvent<HTMLButtonElement>
      ) => {
        if (e.type === "click") {
          dispatch(computeWeakQueue());
          return;
        }
        if ("key" in e && e.key === "Enter") {
          dispatch(computeWeakQueue());
        }
      };
          return (
      <div className={styles.continueLearning}>
        <div className="container">
          <div>
            <CloseTrain close={close} />
          </div>
          <button
            autoFocus
            onClick={(e) => moreWordsHandler(e)}
            onKeyDown={(e) => moreWordsHandler(e)}
            className="finish"
          >
            Noch 10 Wörter lernen
          </button>
          <div className={styles.hint}>
            <span>Нажми </span>
            <svg width="34" height="34" fill="#ffffff00" viewBox="0 0 24 24" className="icon">
              <path  stroke="#ffffffff" stroke-linecap="round" stroke-linejoin="round" d="M15.5 9.00001V15H8.5M8.5 15L9.5 14M8.5 15L9.5 16M13 5H17.5C18.0523 5 18.5 5.44772 18.5 6V18C18.5 18.5523 18.0523 19 17.5 19H6.5C5.94772 19 5.5 18.5523 5.5 18V12C5.5 11.4477 5.94772 11 6.5 11H12V6C12 5.44771 12.4477 5 13 5Z" />
            </svg>
            <span> что бы отработать еще 10 ошибок</span>
          </div>
        </div>
      </div>
    );
  }

// -----------------------------повторение логики из CardBody-----------------------------------------------------------------
  return (
    <div  className={styles.mistakes}>
      <CloseTrain close={close} />
      <Card
        key={index}
        animation={state.animation}
        word={current.lemma}
        id={current.id}
        link={current.media.image}
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

export default MistakeReview;


