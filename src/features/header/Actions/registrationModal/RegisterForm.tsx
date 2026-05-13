import { useState } from "react";
import styles from "./AuthModal.module.scss";
import FormField from "./FormField";
import AuthModalHeader from "./AuthModalHeader";
import type { Status } from "./AuthModal";
import { registrateUser } from "../../../api/auth/auth";
import { useDispatch } from "react-redux";
import { safeUser } from "../../../../reduxStore/authSlice";

type RegisterFormType = {
  onClose: () => void;
  setStatus: (value: Status) => void;
};

function RegisterForm(
  {
    onClose,
    setStatus,
  }: RegisterFormType /*{ setSubmitted }: RegisterFormProps*/,
) {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [passRepeat, setPassRepeat] = useState("");
  const [hash, setHash] = useState("");

  const usernameOk = username.length >= 2;
  const passOk = pass.length >= 6;
  const same = pass && pass === passRepeat;
  const canSubmit = usernameOk && passOk && same;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;
    /*setSubmitted(true);*/
  }

  const dispatch = useDispatch();
  

  async function registrate() {
    const response = await registrateUser(username, pass);
    const token = response.token;

    const hash = response.recoveryCode;
    console.log(response);
    setHash(hash);
    dispatch(safeUser(token));
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
              error={
                username && !usernameOk ? "Введите корректное имя." : undefined
              }
            >
              <input
                className={styles.modal__input}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
      ) : (
        <>
          <div>
            <p style={{ color: "red" }}>
              Achtung: Dieser Code wird nur einmal angezeigt.
            </p>
            <p style={{ fontSize: "14px" }}>
              Speichern Sie diesen Code zusammen mit Ihrem Benutzernamen an
              einem sicheren Ort. Falls Sie Ihr Passwort vergessen, ist eine
              Wiederherstellung Ihres Kontos nur mit diesen beiden Angaben
              möglich. Andernfalls müssten Sie ein neues Konto erstellen und Ihr
              bisheriger Lernfortschritt würde verloren gehen.
            </p>

            <p style={{ color: "red" }}>
              Внимание: этот код будет показан только один раз.
            </p>
            <p style={{ fontSize: "14px" }}>
              Сохраните этот код вместе со своим именем пользователя в надежном
              месте. Если вы забудете пароль, восстановить аккаунт можно будет
              только с помощью этих двух данных. Иначе придется создать новый
              аккаунт, и весь прогресс будет потерян.
            </p>
            <div
              style={{
                padding: "20px",
                border: "1px solid  #D3D3D3",
                backgroundColor: "#e9e9e9",
                textAlign: "center",
                fontSize: "20px",
                fontFamily: "sans-serif"
              }}
            >
              {hash}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default RegisterForm;
