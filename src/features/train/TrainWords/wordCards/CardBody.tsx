import { useDispatch } from "react-redux";
import CloseTrain from "../CloseTrain";
import Card from "./Card";
import { useCardTrain } from "./useCardTrain";
import { computeQueue } from "../../../../reduxStore/srsSlice";

export default function CardBody({ close }: { close?: () => void }) {
  const { current, index, state, onAnimationStart, onAnimationEnd, handleAnswer } =
    useCardTrain();

  const dispatch = useDispatch();

  if (!current) {
    return (
      <div className="body">
        <div className="container">
          <button onClick={() => {dispatch(computeQueue())}} className="finish">
            Noch 10 Wörter lernen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
        width: "100%",
        maxWidth: "80rem",
      }}
    >
      <CloseTrain close={close} />
      <Card
        key={index}
        animation={state.animation}
        word={current.lemma}
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
