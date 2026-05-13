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
};

function LoginForm(
  {
    onClose, setStatus
  }: LoginFormProps
) {
  const [pass, setPass] = useState("");
  const [username, setUsername] = useState("");
  const [hash, setHash] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  async function login() {
    try {
      const response = await loginUser(username, pass);
      const token = response.token;

      console.log(token);
      console.log(Boolean(token));

      setHash(hash);
      dispatch(safeUser(token));
      setStatus("success");
    } catch (e: any) {
      setErrorMessage(e.message);
    }
  }

  return (
    <>
          <AuthModalHeader onClose={onClose} header={"Login"} />

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

            <div style={{ color: "red" }}>{errorMessage}</div>

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

            <br />
            <div style={{ textAlign: "center", fontSize: "12px" }}>
              Noch kein Account? ↓
            </div>
          </form>
        </>
  );
}

export default LoginForm;
