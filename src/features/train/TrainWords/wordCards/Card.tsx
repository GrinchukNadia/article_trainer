import { memo, useEffect, useState } from "react";
import Controls from "./Controls";
import styles from "./Cards.module.scss";
import clsx from "clsx";
import type { CardItem } from "./useCardTrain";
// import type { CardItem } from "../../../../shared/types/words";
import type { Choice } from "./useCardTrain";

type CardProps = {
  animation: string;
  className: string;
  word: string;
  link: string;
  translation: string;
  article: string;
  onAnimationStart: () => void;
  onAnimationEnd: () => void;
  handleAnswer: (choice:Choice) => void;
  current: CardItem;
};

function Card({
  animation,
  className: className = "",
  word,
  link,
  translation = ". . . . . . . .",
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

  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.card}>
      <div
        onAnimationStart={onAnimationStart}
        onAnimationEnd={onAnimationEnd}
        style={animationStyle}
        className={clsx(styles.inner, className)}
        tabIndex={0}
      >
        <Controls />
        {link && (
          <div className={styles.inner_img}>
            {!loaded && <div className={styles.loader_body}><div className={styles.loader} ></div></div>}
            <img onLoad={() => setLoaded(true)} className={loaded ? styles.show : styles.hide} loading="lazy" alt="" src={link} />
          </div>
        )}

        <div className={styles.inner_text}>
          <div>
            <span className={styles.cardArticle}>{article}</span> {word}
          </div>
          <div className={styles.inner_translate} aria-live="polite">
            {translation}
          </div>
        </div>
      </div>
    </div>
  );
}

// memo: перерисовывать карточку только при изменении пропсов
export default memo(Card);
