import styles from "./Statistik.module.scss";

function Stats() {
  return (
    <section className={styles.stats}>
      <h2 style={{ marginBottom: ".5rem" }}>
        ⚠️ Dies ist ein Demonstrationsprototyp.
      </h2>

      <div className={styles.card}>
        <div style={{ marginBottom: ".5rem", fontWeight: 600 }}>
          Erfolge (in Entwicklung)
        </div>
        <p className={styles.kpi__hint}>
          Hier werden Auszeichnungen für Aktivität, Serien und besondere Erfolge
          angezeigt.
        </p>
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
          <div className={styles.kpi}>42</div>
          <div className={styles.kpi__hint}>Gelernte Wörter</div>
        </div>
        <div className={styles.card}>
          <div className={styles.kpi}>7</div>
          <div className={styles.kpi__hint}>Tage in Folge</div>
        </div>
        <div className={styles.card}>
          <div className={styles.kpi}>12%</div>
          <div className={styles.kpi__hint}>Fehler beim Wiederholen</div>
        </div>
      </div>

      <section style={{ display: "grid", gap: "1.5rem" }}>
        <div className={styles.card}>
          <h2 style={{ marginBottom: ".5rem" }}>Fortschritt (Demo-Diagramm)</h2>

          <div className={styles.chart}>
            <div className={styles.chart__grid} />

            <div className={styles.chart__bars}>
              <div
                className={styles.chart__bar}
                style={{ height: "35%" }}
                title="Пн: 35%"
              />
              <div
                className={styles.chart__bar}
                style={{ height: "62%" }}
                title="Вт: 62%"
              />
              <div
                className={styles.chart__bar}
                style={{ height: "48%" }}
                title="Ср: 48%"
              />
              <div
                className={styles.chart__bar}
                style={{ height: "75%" }}
                title="Чт: 75%"
              />
              <div
                className={styles.chart__bar}
                style={{ height: "55%" }}
                title="Пт: 55%"
              />
              <div
                className={styles.chart__bar}
                style={{ height: "90%" }}
                title="Сб: 90%"
              />
              <div
                className={styles.chart__bar}
                style={{ height: "68%" }}
                title="Вс: 68%"
              />
            </div>

            <div className={styles.chart__labels}>
              <span>Пн</span>
              <span>Вт</span>
              <span>Ср</span>
              <span>Чт</span>
              <span>Пт</span>
              <span>Сб</span>
              <span>Вс</span>
            </div>
          </div>

          <p className={styles.kpi__hint} style={{ marginTop: ".5rem" }}>
            Demo-Visualisierung mit festen Werten zur Darstellung des
            Interface-Layouts.
          </p>
        </div>
      </section>
    </section>
  );
}

export default Stats;
