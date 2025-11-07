import { useNavigate } from "react-router-dom";
import styles from "./Impressum.module.scss";

const Impressum = () => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.impressum_container}
    >
      <h1 className={styles.impressum_header}>Impressum</h1>

      <p>
        <strong>Projektname:</strong> LingoStein (MVP)
      </p>
      <p>
        <strong>Entwicklerin:</strong> Nadezda Grinchuk
      </p>
      <p>
        <strong>Kontakt:</strong> info@lingostein.example
      </p>
      <p>
        <strong>Verantwortlich für den Inhalt:</strong> Nadezda Grinchuk
      </p>
      <p>
        <strong>Zweck des Projekts:</strong> Dies ist ein nichtkommerzielles
        Lernprojekt zum Erlernen der deutschen Sprache. Die Inhalte dienen
        ausschließlich zu Bildungszwecken.
      </p>
      <p>
        <strong>Haftungsausschluss:</strong> Trotz sorgfältiger inhaltlicher
        Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links.
        Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber
        verantwortlich.
      </p>

      <div style={{ marginTop: "2rem" }}>
        <button
          onClick={() => navigate(-1)}
          className={styles.tabs__btn}
        >
          ← Zurück
        </button>
      </div>
    </div>
  );
};

export default Impressum;
