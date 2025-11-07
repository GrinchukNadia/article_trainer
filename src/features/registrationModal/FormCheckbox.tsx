import styles from "./FormCheckbox.module.scss";

type FormCheckboxProps = {
    accepted: boolean;
    setAccepted: (value: boolean) => void;
}

function FormCheckbox({accepted, setAccepted}: FormCheckboxProps) {
  return (
    <label
        className={styles.form__checkbox}
      >
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
        />
        Ich akzeptiere die Nutzungsbedingungen (Testmodus)
      </label>
  )
}

export default FormCheckbox
