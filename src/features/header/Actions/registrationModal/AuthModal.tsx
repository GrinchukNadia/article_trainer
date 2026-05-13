import { useState } from "react";
import styles from "./AuthModal.module.scss";
import LoginForm from "./LoginForm";
import SuccessNotice from "./SuccessNotice";
import RegisterForm from "./RegisterForm";
export interface AuthModalProps {
  onClose: () => void;
}

export type Status = "register" | "login" | "code" | "success";
export type HeaderProps = Pick<AuthModalProps, "onClose"> & {
  header: string;
};

function AuthModal({ onClose }: AuthModalProps) {
  const [status, setStatus] = useState<Status>("login");


  function modal(status: Status) {
    switch (status) {
      case "register": return <RegisterForm onClose={onClose} setStatus={setStatus} />;
      case "code": return <RegisterForm onClose={onClose} setStatus={setStatus} />;
      case "login": return <LoginForm onClose={onClose} setStatus={setStatus} />;
      case "success": return <SuccessNotice />;
      default: return null;
    }
  }
  function renderButtenAction(status: Status) {
    switch (status) {
      case "register":
        return (
          <button className={styles.modal__actions} type="button" onClick={() => setStatus("login")}>
            Anmelden
          </button>
        );
      case "login":
        return (
          <button className={styles.modal__actions} type="button" onClick={() => setStatus("register")}>
            Registrieren
          </button>
        );
      case "success":
        return (
          <button className={styles.modal__actions} type="button" onClick={onClose}>
            Lernen starten
          </button>
        );
      case "code":
        return (
          <button className={styles.modal__actions} type="button" onClick={onClose}>
            Lernen 
          </button>
        );
      default:
        return null;
    }
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modal__overlay} onClick={onClose} />
      <div style={{ zIndex: 1 }}>
        <div className={styles.modal__dialog}>
          {modal(status)}
        </div>
        {renderButtenAction(status)}
      </div>

    </div>
  );
}

export default AuthModal;
