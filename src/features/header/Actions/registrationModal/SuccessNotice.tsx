import styles from "./AuthModal.module.scss";
const inlineStyles ={fontWeight: 600, fontSize: ".95rem" }

function SuccessNotice() {
  return (
    <div className={styles["alert-success"]}>
      <div style={inlineStyles}>
        Erfolgreich eingeloggt ✔
      </div>
      <div>
        Starte jetzt dein Training!
      </div>
    </div>
  );
}

export default SuccessNotice;
