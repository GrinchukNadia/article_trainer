import styles from "./WeekActivityDiagram.module.scss";
type dailyActivityType = {
  dailyActivity: number[]
}


function WeekActivityDiagram({dailyActivity}: dailyActivityType) {
  const WEEK_DAYS_RU = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

  const getWeekDays = () => {
    const day = new Date().getDay();
    const result = [];
    for (let i = 1; i <= 7; i++) {
      result.push(WEEK_DAYS_RU[(day + i) % 7]);
    }
    return result;
  };

  return (
    <section style={{ display: "grid", gap: "1.8rem" }}>
      <div className={styles.card}>
        <h2 style={{ marginBottom: ".5rem" }}>Fortschritt Diagramm</h2>

        <div className={styles.chart}>
          <div className={styles.chart__grid} />

          <div className={styles.chart__bars}>
            {dailyActivity.map((p: number, i:number) => (
              <div
                key={i}
                className={styles.chart__bar}
                style={{ height: `${p === 0 ? 5 : p}%`}}
                title={`${getWeekDays()[i]}: ${p}%`}
              />
            ))}
          </div>

          <div className={styles.chart__labels}>
            {getWeekDays().map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
        </div>

        <p className={styles.kpi__hint} style={{ marginTop: ".5rem" }}>
          Dieses Diagramm visualisiert deine tägliche Genauigkeit beim Lernen in den letzten sieben Tagen.
        </p>
      </div>
    </section>
  );
}

export default WeekActivityDiagram;
