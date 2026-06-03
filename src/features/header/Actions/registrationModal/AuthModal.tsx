import { useState } from "react";
import styles from "./AuthModal.module.scss";
import LoginForm from "./LoginForm";
// import SuccessNotice from "./SuccessNotice";
import RegisterForm from "./RegisterForm";
import ChangePass from "./ChangePass";
import SuccessNotice from "./SuccessNotice";
import SafeCheck from "./SafeCheck";
export interface AuthModalProps {
  onClose: () => void;
}

export type Status = "register" | "login" | "check" | "code" | "success" | "changePass";
export type HeaderProps = Pick<AuthModalProps, "onClose"> & {
  header: string;
};

function AuthModal({ onClose }: AuthModalProps) {
  const [status, setStatus] = useState<Status>("login");
  const [changePassIsSuccess, setChangePassIsSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [hash, setHash] = useState("");


  function modal(status: Status) {
    switch (status) {
      case "register": return <RegisterForm onClose={onClose} setStatus={setStatus} username= {username} setUsername={setUsername} hash={hash} setHash={setHash} />;
      case "code": return <RegisterForm onClose={onClose} setStatus={setStatus} username= {username} setUsername={setUsername} hash={hash} setHash={setHash} />;
      case "check": return <SafeCheck setStatus={setStatus}  />;
      case "login": return <LoginForm onClose={onClose} setStatus={setStatus} changePassIsSuccess={changePassIsSuccess}  setChangePassIsSuccess={setChangePassIsSuccess}/>;
      case "success": return <SuccessNotice />;
      case "changePass": return <ChangePass onClose={onClose} setStatus={setStatus} setChangePassIsSuccess={setChangePassIsSuccess} />;
      default: return null;
    }
  }
  function renderButtonAction(status: Status) {
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
        case "check":
          return (
            <></>
          );
      case "success":
        return (
          <button className={styles.modal__actions} type="button" onClick={onClose}>
            Lernen starten
          </button>
        );
      case "code":
        return (<></>
          // <button className={styles.modal__actions} type="button" onClick={() => setStatus("check")}>
          //   Lernen 
          // </button>
        );
      default:
        return null;
    }
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modal__overlay} onClick={() => status === "code" ? setStatus("check") : () =>onClose()} />
      <div style={{ zIndex: 1 }}>
        <div className={styles.modal__dialog}>
          {modal(status)}
        </div>
        {renderButtonAction(status)}
      </div>

    </div>
  );
}

export default AuthModal;
