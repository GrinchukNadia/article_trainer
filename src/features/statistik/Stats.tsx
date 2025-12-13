import { useSelector } from "react-redux";
import styles from "./Stats.module.scss";
import type { RootState } from "../../reduxStore/store";
import { selectBoxWords } from "../../shared/utils/selectBoxWords";
import { selectTopWeakWords } from "../../reduxStore/srsSlice";
import WeekActivityDiagram from "./WeekActivityDiagram";

function Stats() {
  const learnedWords = useSelector((state: RootState) =>
    selectBoxWords(state, 5)
  ).length;

  const topWeakWords = useSelector(selectTopWeakWords);

  const bestSreak = useSelector(
    (state: RootState) => state.activity.bestStreak
  );
  const todayRepeatWords = useSelector(
    (state: RootState) => state.srs.queue.weakIds.length
  );
  return (
    <section className={styles.stats}>
      <div className={styles.card}>
        <div className={styles.card__title}>
          Top-5-Fehlerwörter
        </div>
        <div
          className={styles.card_words_container}
        >
          {topWeakWords.map((word) => (
            <div
              key={word.lemma}
              className={styles.card_words}
            >
              <div>
                {word.article} {word.lemma} - {word.translation}
              </div>
              <div style={{whiteSpace: "nowrap"}}>Gesamtfehler: {word.lapses}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={styles.kpi}
      >
        <div className={styles.card}>
          <div className={styles.kpi_word}>{learnedWords}</div>
          <div>Gelernte Wörter</div>
        </div>
        <div className={styles.card}>
          <div className={styles.kpi_word}>{bestSreak}</div>
          <div>Längste Tagesserie</div>
        </div>
        <div className={styles.card}>
          <div className={styles.kpi_word}>{todayRepeatWords}</div>
          <div>Wiederholungswörter heute</div>
        </div>
      </div>

      <WeekActivityDiagram />
    </section>
  );
}

export default Stats;
