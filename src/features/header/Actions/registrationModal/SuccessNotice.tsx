import styles from "./AuthModal.module.scss";
const inlineStyles ={fontWeight: 600, fontSize: ".95rem" }

function SuccessNotice() {
  return (
    <div className={styles["alert-success"]}>
      <div style={inlineStyles}>
        Konto erstellt ✔
      </div>
      <div>
        In Zukunft ist eine echte Anmeldung und Fortschrittsspeicherung geplant.
      </div>
    </div>
  );
}

export default SuccessNotice;
