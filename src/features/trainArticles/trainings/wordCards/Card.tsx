import { memo, useEffect, useState } from "react";
import Controls from "./Controls";
import clsx from "clsx";
import styles from "./Card.module.scss";
import type { CardItem, Choice } from "./cardTrain.types";

type CardProps = {
  animation: string;
  className: string;
  word: string;
  translation: string;
  article: string;
  onAnimationStart: () => void;
  onAnimationEnd: () => void;
  handleAnswer: (choice: Choice) => void;
  current: CardItem;
};

function Card({
  animation,
  word,
  translation = ". . . . . . . .",
  className: className = "",
  article = "___",
  onAnimationStart,
  onAnimationEnd,
  handleAnswer,
  current
}: CardProps) {
  const animationStyle = { animationName: animation };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!current) return;
      if (e.key === "ArrowLeft") handleAnswer("der");
      if (e.key === "ArrowRight") handleAnswer("die");
      if (e.key === "ArrowUp") handleAnswer("das");
      if (e.key === "ArrowDown") handleAnswer("next");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [current, handleAnswer]);

  // const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.card}>
      <div
        onAnimationStart={onAnimationStart}
        onAnimationEnd={onAnimationEnd}
        style={animationStyle}
        className={clsx(styles.inner, className)}
        tabIndex={0}
      >
        {/* <div
          style={{
            display: "flex",
            width: "100%",
            gap: "1rem",
            justifyContent: "center",
            borderRadius: "6px 6px 0 0",
          }}
        >
          <div>lapses: {0}</div>
          <div> mistakes: {0} </div>
        </div> */}

        <div className={styles.img}>
          <div className={styles.inner_img}>
            {/* {!loaded && ( */}
              {/* <div className={styles.loader_body}>
                <div className={styles.loader}></div>
              </div> */}
            {/* )} */}
            <img
              // onLoad={() => setLoaded(true)}
              // className={loaded ? styles.show : styles.hide}
              className={styles.hide}
              // loading="lazy"
              alt=""
            />
          </div>
        </div>

        <span className={styles.line}></span>

        <Controls handleAnswer={handleAnswer} />

        <div className={styles.inner_text}>
          <div className={styles.card_word}>
            <div>
              <span className={styles.cardArticle}>{article}</span> {word}
            </div>
            <div className={styles.inner_translate} aria-live="polite">
              {translation}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// memo: перерисовывать карточку только при изменении пропсов
export default memo(Card);
