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
        <strong>Projektbeschreibung:</strong> Dies ist ein nichtkommerzielles Lernprojekt 
        zum Üben und Lernen deutscher Artikel. Die Inhalte dienen ausschließlich Bildungs- und Übungszwecken.
      </p>
      <p>
        <strong>Hinweis:</strong> Dieses Projekt wird als persönliches Freizeitprojekt entwickelt. Trotz großer Sorgfalt 
        können Fehler oder technische Probleme nicht vollständig ausgeschlossen werden.
      </p>
      <p>
        <strong>Feedback:</strong>Bei entdeckten Fehlern sowie Vorschlägen oder Wünschen kann gerne per E-Mail Kontakt aufgenommen werden.
      </p>
      <p>
        <strong>Haftungsausschluss:</strong> Trotz sorgfältiger inhaltlicher Kontrolle übernehme ich keine Haftung für die Inhalte 
        externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
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
