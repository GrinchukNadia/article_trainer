import { useEffect, useState } from "react";
import styles from "./AuthModal.module.scss";
import FormField from "./FormField";
import AuthModalHeader from "./AuthModalHeader";
import type { Status } from "./AuthModal";
import { checkUserName, registrateUser } from "../../../api/auth/auth";
import { useDispatch } from "react-redux";
import { safeUser } from "../../../../reduxStore/authSlice";
import RecoveryData from "./RecoveryData";

type RegisterFormType = {
  onClose: () => void;
  setStatus: (value: Status) => void;
  username: string;
  setUsername: (value: string) => void;
  hash: string;
  setHash: (value: string) => void;
};

function RegisterForm(
  {
    onClose,
    setStatus,
    username, 
    setUsername,
    hash,
    setHash
  }: RegisterFormType /*{ setSubmitted }: RegisterFormProps*/,
) {
  
  const dispatch = useDispatch();
  const [pass, setPass] = useState("");
  const [passRepeat, setPassRepeat] = useState("");
  const [isUniqueUsername, setIsUniqueUserName] = useState(true);

  const usernameOk = username.length >= 2;
  const passOk = pass.length >= 6;
  const same = pass && pass === passRepeat;
  const canSubmit = usernameOk && passOk && same;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;
  }


  useEffect(() => {
    if(!username.trim()) {
      setIsUniqueUserName(true);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const response = await checkUserName(username);
      setIsUniqueUserName(response.isUnique);
      } catch (error) {
        console.error(error)
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [username])

  async function registrate() {
    const response = await registrateUser(username, pass);
    setHash(response.recoveryCode);
    dispatch(safeUser(response.token));
  }

  return (
    <>
      {hash.length < 1 ? (
        <>
          <AuthModalHeader onClose={onClose} header={"Registrieren"} />
          <form onSubmit={onSubmit}>
            <FormField
              label="Username"
              className={styles.modal__row}
              error={username && username.length < 2
                ? "Der Benutzername ist zu kurz."
                : username.length >= 2 && !isUniqueUsername
                  ? "Dieser Benutzername ist nicht verfügbar."
                  : ""
              }
            >
              <input
                className={styles.modal__input}
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value) }}
                placeholder="Имя"
              />
            </FormField>

            <FormField
              label={"Passwort (mind. 6 Zeichen)"}
              className={styles.modal__row}
            >
              <input
                className={styles.modal__input}
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Пароль"
              />
            </FormField>

            <FormField
              label="Passwort wiederholen"
              className={styles.modal__row}
              error={passRepeat && !same ? "Пароли не совпадают." : undefined}
            >
              <input
                className={styles.modal__input}
                type="password"
                value={passRepeat}
                onChange={(e) => setPassRepeat(e.target.value)}
                placeholder="Повторить пароль"
              />
            </FormField>

            <div>
              <button
                onClick={() => {
                  registrate();
                  setStatus("code");
                }}
                className={styles.modal__submit}
                type="submit"
                disabled={!canSubmit}
              >
                Registrieren
              </button>
            </div>

            <br />
            <div style={{ textAlign: "center", fontSize: "12px" }}>
              Hast du shon ein Account? ↓
            </div>
          </form>
        </>
      ) : <RecoveryData username={username} hash={hash} />
      }
    </>
  );
}

export default RegisterForm;
