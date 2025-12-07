import { useSelector } from "react-redux";
import styles from "./Statistik.module.scss";
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
    (state: RootState) => state.srs.queue.todayIds.length
  );
  return (
    <section className={styles.stats}>
      <div className={styles.card}>
        <div style={{ margin: ".5rem 0", fontWeight: 600, fontSize: "1.4rem" }}>
          Top-5-Fehlerwörter
        </div>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "space-between",
          }}
        >
          {topWeakWords.map((word) => (
            <div
              key={word.lemma}
              style={{
                color: "black",
                display: "flex",
                flexDirection: "column",
                gap: ".5rem",
              }}
            >
              <div>
                {word.article} {word.lemma} - {word.translation}
              </div>
              <div>Gesamtfehler: {word.lapses}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
          padding: "1rem 0",
        }}
      >
        <div className={styles.card}>
          <div className={styles.kpi}>{learnedWords}</div>
          <div className={styles.kpi__hint}>Gelernte Wörter</div>
        </div>
        <div className={styles.card}>
          <div className={styles.kpi}>{bestSreak}</div>
          <div className={styles.kpi__hint}>Längste Tagesserie</div>
        </div>
        <div className={styles.card}>
          <div className={styles.kpi}>{todayRepeatWords}</div>
          <div className={styles.kpi__hint}>Wiederholungswörter heute</div>
        </div>
      </div>

      <WeekActivityDiagram />
    </section>
  );
}

export default Stats;
