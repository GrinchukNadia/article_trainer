import styles from "./Mistakes.module.scss";

function Mistakes() {
  const data = [
    { type: "Артикль", count: 18, hint: "der/die/das" },
    { type: "Падеж", count: 11, hint: "Akk/Dat" },
    { type: "Форма глагола", count: 7, hint: "Präsens" },
    { type: "Порядок слов", count: 5, hint: "V2" },
  ];
  return (
    <div className={styles.mistakes}>
      <h2>⚠️ Dies ist ein Demonstrationsprototyp.</h2>
      <section className={styles.grid_2}>
        {data.map((m) => (
          <div key={m.type} className={styles.card}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div className={styles.kpi__hint}>Тип ошибки ()</div>
                <div style={{ fontWeight: 600, fontSize: "1.05rem" }}>
                  {m.type}
                </div>
              </div>
              <span className={styles.badge}>{m.count}</span>
            </div>

            <div className={styles.kpi__hint} style={{ marginTop: ".5rem" }}>
              Подсказка: {m.hint}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".75rem",
                marginTop: ".75rem",
              }}
            >
              <button className="btn btn--primary" style={{ flex: 1 }}>
                Быстрый дрилл →
              </button>
              <button className="btn btn--ghost">⟵ Каталог</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Mistakes;
