import { useSelector } from "react-redux";
import styles from "./weekActivityDiagram.module.scss";
import type { RootState } from "../../reduxStore/store";
import { format, subDays } from "date-fns";
import { createSelector } from "@reduxjs/toolkit";

function WeekActivityDiagram() {
  const WEEK_DAYS_RU = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const getWeekDays = () => {
    const day = new Date().getDay();
    const result = [];
    for (let i = 1; i <= 7; i++) {
      result.push(WEEK_DAYS_RU[(day + i) % 7]);
    }
    return result;
  };
  const calculateActivityPercents = (minutesArr: number[]) => {
    if (minutesArr.length === 0) return [];
    const max = Math.max(...minutesArr, 1);
    return minutesArr.map((min) => {
      if (min === 0) return 0;
      const raw = (min / max) * 100;

      const MIN_PERCENT = 10;
      return Math.max(raw, MIN_PERCENT);
    });
  };
  const activityArr = (state: RootState) => state.activity.byDay;

  const selectWeekMinutes = createSelector([activityArr], (byDay) => {
    const today = new Date();
    const result: number[] = [];

    // идём 6 дней назад → сегодня (итого 7 дней)
    for (let i = 6; i >= 0; i--) {
      const d = subDays(today, i);
      const key = format(d, "yyyy-MM-dd");

      const day = byDay[key];
      const minutes = day ? Math.round(day.activeMs / 60000) : 0;

      result.push(minutes);
    }

    return result;
  });

  const weekMinutes = useSelector(selectWeekMinutes);
  const weekProcents = calculateActivityPercents(weekMinutes);

  return (
    <section style={{ display: "grid", gap: "1.8rem" }}>
      <div className={styles.card}>
        <h2 style={{ marginBottom: ".5rem" }}>Fortschritt (Demo-Diagramm)</h2>

        <div className={styles.chart}>
          <div className={styles.chart__grid} />

          <div className={styles.chart__bars}>
            {weekProcents.map((p, i) => (
              <div
                key={i}
                className={styles.chart__bar}
                style={{ height: `${p === 0 ? 5 : p}%` }}
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
          Demo-Visualisierung mit festen Werten zur Darstellung des
          Interface-Layouts.
        </p>
      </div>
    </section>
  );
}

export default WeekActivityDiagram;
