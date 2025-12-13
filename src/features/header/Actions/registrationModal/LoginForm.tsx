import { useState } from "react";
import styles from "./AuthModal.module.scss";
import FormField from "./FormField";
import FormCheckbox from "./FormCheckbox";
type LoginFormProps = {
  setSubmitted: (value: boolean) => void;
};

function LoginForm({ setSubmitted }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passRepeat, setPassRepeat] = useState("");
  const [accepted, setAccepted] = useState(false);

  const emailOk = /.+@.+\..+/.test(email);
  const passOk = pass.length >= 6;
  const same = pass && pass === passRepeat;
  const canSubmit = emailOk && passOk && same && accepted;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  }
  return (
    <form onSubmit={onSubmit}>
      <FormField
        label="E-mail"
        className={styles.modal__row}
        error={email && !emailOk ? "Введите корректный e-mail." : undefined}
      >
        <input
          className={styles.modal__input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </FormField>

      <FormField
        label="Passwort (mind. 6 Zeichen)"
        className={styles.modal__row}
      >
        <input
          className={styles.modal__input}
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
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
        />
      </FormField>

      <FormCheckbox accepted={accepted} setAccepted={setAccepted}/>

      <div className={styles.modal__actions}>
        <button
          className={styles.modal__submit}
          type="submit"
          disabled={!canSubmit}
        >
          Registrieren
        </button>
      </div>
    </form>
  );
}

export default LoginForm;