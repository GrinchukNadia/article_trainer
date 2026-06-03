import styles from "./Stats.module.scss";
import WeekActivityDiagram from "./WeekActivityDiagram";
import { useEffect, useState } from "react";
import { getDailyActivity, getStats } from "../api/stats/stats";
import type { DifficultWords } from "../api/stats/stats";

type WeakWord = {
  article: string,
  lemma: string,
  translation: string,
  wrongCount: number
}

function Stats() {
  const [topWeakWords, setTopWeakWords] = useState<DifficultWords[]>([]);
  const [learnedWords, setLearnedWords] = useState(0);
  const [bestSreak, setBestStreak] = useState(0);
  const [todayRepeatWords, setTodayRepeatWords] = useState(0);
  const [dailyActivity, setDailyActivity] = useState([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const loadStats = async() => {
      try{
        const {difficultWords, learnedWords, dueToday, bestStreak} = await getStats();

        const dailyActivityData = await getDailyActivity();

        setTopWeakWords(difficultWords);
        setLearnedWords(learnedWords)
        setTodayRepeatWords(dueToday);
        setBestStreak(bestStreak);

        setDailyActivity(dailyActivityData);
      } catch(error) {
        console.error("Failed to load streak", error)
      }
    }

    loadStats();
  }, [])

  return (
    <section className={styles.stats}>
      <div className={styles.card}>
        <div className={styles.card__title}>
          Top-5-Fehlerwörter
        </div>
        <div
          className={styles.card_words_container}
        >
          {topWeakWords.map((word: WeakWord) => (
            <div
              key={word.lemma}
              className={styles.card_words}
            >
              <div>
                {word.article} {word.lemma} - {word.translation}
              </div>
              <div style={{whiteSpace: "nowrap"}}>Gesamtfehler: {word.wrongCount}</div>
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
          <div className={styles.kpi_title}>Wiederholungswörter heute</div>
        </div>
      </div>

      <WeekActivityDiagram dailyActivity={dailyActivity} />
    </section>
  );
}

export default Stats;