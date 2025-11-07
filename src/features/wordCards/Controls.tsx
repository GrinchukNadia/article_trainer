import clsx from "clsx";
import styles from "./ArticleButtons.module.scss";

const controls = [
  { key: "der", className: "article_der", label: "der", arrow: "left" },
  { key: "die", className: "article_die", label: "die", arrow: "right" },
  { key: "das", className: "article_das", label: "das", arrow: "top" },
  { key: "next", className: "article_next", label: "nächste", arrow: "bottom" },
];

export default function Controls() {
  return (
    <>
      {controls.map((c) => (
        <button
          key={c.key}
          type="button"
          className={clsx(styles.article, styles[c.className])}
          data-article={c.key}
          aria-label={
            c.key === "next" ? "Nächste Karte" : `Artikel ${c.label} wählen`
          }
        >
          <div className={clsx(styles.articleArrow, styles[`articleArrow_${c.arrow}`])} />
          <span>{c.label}</span>
        </button>
      ))}
    </>
  );
}
