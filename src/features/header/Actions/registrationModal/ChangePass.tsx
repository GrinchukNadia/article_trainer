import { useState } from "react";
import styles from "./AuthModal.module.scss";
import FormField from "./FormField";
import AuthModalHeader from "./AuthModalHeader";
import type { Status } from "./AuthModal";
import { changePasswordRequest } from "../../../api/auth/auth";
import {  validateInput } from "./validation";


type ChangePassProps = {
  onClose: () => void;
  setStatus: (value: Status) => void;
  setChangePassIsSuccess: (value: boolean) => void;
};

function ChangePass(
  {
    onClose, setStatus, setChangePassIsSuccess
  }: ChangePassProps
) {

  const [username, setUsername] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [pass, setPass] = useState("");
  const [passRepeat, setPassRepeat] = useState("");

  // const dispatch = useDispatch();
  
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  async function changePassword() {
    try {
      const response = await changePasswordRequest(username, recoveryCode, passRepeat);

      setStatus("login");
      setChangePassIsSuccess(true);
      console.log(response);
    } catch (e: any) {
      setErrorMessage(e.message)
    }
  }

  return (
    <>
      <AuthModalHeader onClose={onClose} header={"Passwort ändern"} />

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

        <FormField label="Recovery code" className={styles.modal__row}>
          <input
            className={styles.modal__input}
            type="text"
            value={recoveryCode}
            onChange={(e) => {
              setErrorMessage("");
              setRecoveryCode(e.target.value);
            }}
            placeholder="Код восстановления"
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
        <FormField label="Passwort wiederholen" className={styles.modal__row}>
          <input
            className={styles.modal__input}
            type="password"
            value={passRepeat}
            onChange={(e) => {
              setErrorMessage("");
              setPassRepeat(e.target.value);
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
              disabled={!(username.length > 2 && pass===passRepeat && recoveryCode.length === 8 && pass.length >= 6)}
              onClick={() => changePassword()}
            // type="changePass"
            // onClick={() => login()}
            >
              Passwort ändern
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default ChangePass;
