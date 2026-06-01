import clsx from "clsx";
import styles from "./Controls.module.scss";
import type { Choice } from "./cardTrain.types";

type ControlItem = {
  key: Choice;
  className: string;
  label: string;
  arrow: "left" | "right" | "top" | "bottom";
};
type ControlsProps = {
  handleAnswer: (choice: Choice) => void;
  selectedArticles: string[];
  answered: boolean;
};
const controls: ControlItem[] = [
  { key: "der", className: "article_der", label: "der", arrow: "left" },
  { key: "die", className: "article_die", label: "die", arrow: "right" },
  { key: "das", className: "article_das", label: "das", arrow: "top" },
  { key: "next", className: "article_next", label: "nächste", arrow: "bottom" },
];


export default function Controls({ handleAnswer, selectedArticles, answered }: ControlsProps) {
  console.log(answered)
  return (
    <>
      {controls.map((c) => (
        <div
          onClick={() => handleAnswer(c.key)}
          key={c.key}
              
          className={clsx(
            styles.article, 
            styles[c.className], 
            selectedArticles.includes(c.key) &&
             (answered
              ? c.key === selectedArticles[selectedArticles.length -1]
                ? "correct"
                : "wrong"
              :"wrong"
             ),
             answered && !selectedArticles.includes(c.key) && c.key !== "next" && "blocked",
             !answered && c.key === "next" && "blocked",
            
          )}
        >
          <button
            type="button"
            data-article={c.key}
            // Accessibility label for screen readers.
            aria-label={
              c.key === "next" ? "Nächste Karte" : `Artikel ${c.label} wählen`
            }
            className={clsx(
              styles.articleArrow,
              styles[`articleArrow_${c.arrow}`],
            )}
          />
          <span>{c.label}</span>
        </div>
      ))}
    </>
  );
}
