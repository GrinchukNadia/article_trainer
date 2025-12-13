import { useState } from "react";
import styles from "./AuthModal.module.scss";
import AuthModalHeader from "./AuthModalHeader";
import LoginForm from "./LoginForm";
import SuccessNotice from "./SuccessNotice";
export interface AuthModalProps {
  onClose: () => void;
}

function AuthModal({ onClose }: AuthModalProps) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className={styles.modal}>
      <div className={styles.modal__overlay} onClick={onClose} />
      <div className={styles.modal__dialog}>
        <AuthModalHeader onClose={onClose} />

        {!submitted ? (
          <LoginForm setSubmitted={setSubmitted} />
        ) : (
          <SuccessNotice />
        )}
      </div>
    </div>
  );
}

export default AuthModal;
