import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";
import clsx from "clsx";

type ModalProps = {
  children: React.ReactNode,
  variant: "learnArticles" | "einEineTrainer" | "grammar" | "mistakeReview"  | "pluralTrainer" | "translateMaster" | "sprint"
};
export default function Modal({ children, variant }: ModalProps) {
  const el = (
    <div className={styles.modal_backdrop}>
      <div className={clsx(styles.modal, variant && styles[variant])} onClick={(e) => e.stopPropagation()}>
      <span className={styles.top}></span>
        {children}
      </div>
    </div>
  );
  return createPortal(el, document.body);
}
