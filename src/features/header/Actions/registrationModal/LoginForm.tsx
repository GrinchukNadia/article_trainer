import { useState } from "react";
import styles from "./AuthModal.module.scss";
import FormField from "./FormField";
import AuthModalHeader from "./AuthModalHeader";
import { useDispatch } from "react-redux";
import { safeUser } from "../../../../reduxStore/authSlice";
import { loginUser } from "../../../api/auth/auth";
import type { Status } from "./AuthModal";


type LoginFormProps = {
  onClose: () => void;
  setStatus: (value: Status) => void;
  changePassIsSuccess: boolean;
  setChangePassIsSuccess: (value: boolean) => void;
};

function LoginForm({onClose, setStatus, changePassIsSuccess, setChangePassIsSuccess}: LoginFormProps) {
  const dispatch = useDispatch();
  const [pass, setPass] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  async function login() {
    try {
      const {token}  = await loginUser(username, pass);
      dispatch(safeUser(token));
      setStatus("success");
      setChangePassIsSuccess(false);
    } catch {
      setErrorMessage("Benutzername oder Passwort ist falsch");
    }
  }

  return (
    <>
      <AuthModalHeader onClose={onClose} header={changePassIsSuccess ? "Noch einmal anmelden" : "Anmelden" } />

      <form onSubmit={onSubmit}>
        <FormField label="Username" className={styles.modal__row}>
          <input
            className={styles.modal__input}
            type="text"
            value={username}
            onChange={(e) => {
              setErrorMessage("");
              setUsername(e.target.value);
            }}
            placeholder="Имя"
          />
        </FormField>

        <FormField label="Passwort" className={styles.modal__row}>
          <input
            className={styles.modal__input}
            type="password"
            value={pass}
            onChange={(e) => {
              setErrorMessage("");
              setPass(e.target.value);
            }}
            placeholder="Пароль"
          />
        </FormField>

        <div style={{ color: "red", marginBottom: "8px" }}>{errorMessage}</div>

        <div style={{ display: "flex", marginBottom: "16px", justifyContent: "space-between" }}>
          <div>
            <button
              className={styles.modal__submit}
              type="submit"
              disabled={pass.length < 6 || username.length < 2}
              onClick={() => login()}
            >
              Anmelden
            </button>
          </div>

          {!changePassIsSuccess && (<div>
            <button
              className={styles.modal__submit}
              onClick={() => setStatus("changePass")}
            >
              Passwort ändern
            </button>
          </div>
          )
          }

        </div>

        <div style={{ textAlign: "center", fontSize: "12px" }}>
          Noch kein Account? ↓
        </div>
      </form>
    </>
  );
}

export default LoginForm;