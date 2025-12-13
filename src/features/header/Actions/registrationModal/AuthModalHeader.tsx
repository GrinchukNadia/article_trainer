import styles from "./AuthModal.module.scss";
import type { AuthModalProps } from "./AuthModal";

function AuthModalHeader({onClose}: Pick<AuthModalProps, 'onClose'>) {
  return (
    <div className={styles["modal__dialog-header"]}>
      <div className={styles.modal__title}>Registrierung (Testmodus)</div>
      <button className={styles.modal__close} onClick={onClose}>
        ✕
      </button>
    </div>
  );
}

export default AuthModalHeader;
