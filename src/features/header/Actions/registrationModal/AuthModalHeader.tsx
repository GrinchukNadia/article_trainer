import styles from "./AuthModal.module.scss";
import type { HeaderProps } from "./AuthModal";

function AuthModalHeader({onClose, header}: HeaderProps) {
  return (
    <div className={styles["modal__dialog-header"]}>
      <div className={styles.modal__title}>{header}</div>
      <button className={styles.modal__close} style={{color: "black"}} onClick={onClose}>
        ✕
      </button>
    </div>
  );
}

export default AuthModalHeader;
