import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";

export default function Modal({ children }: { children: React.ReactNode }) {
  const el = (
    <div className={styles.modal_backdrop}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
  return createPortal(el, document.body);
}
