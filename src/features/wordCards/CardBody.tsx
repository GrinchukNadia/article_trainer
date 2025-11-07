import CloseTrain from "../trainList/TrainWords/CloseTrain";
import Card from "./Card";
import { useCardTrain } from "./useCardTrain";

export default function Body({close}: {close: () => void}) {
  const { current, state, onAnimationStart, onAnimationEnd, handleAnswer } =
    useCardTrain();

  if (!current) {
    return (
      <div className="body">
        <div className="container">
          <div className="finish">🎉 Fertig! Keine Karten mehr.</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{height: "100vh", overflow: "hidden"}}>
      <CloseTrain close={close} />
      <Card
        key={state.index}
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
