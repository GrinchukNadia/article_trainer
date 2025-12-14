import Data from "../../../data/Data";
import styles from "./EinEineCard.module.scss";

function EinEineCard() {
  const exampleWort = Data[0];
  return (
    <div className={styles.container}>

      <div className={styles.article}>
        <div className={styles.article_choice}>
          <button>Ein </button>
          <span>⟵</span>
        </div>

        <div className={styles.article_answered}>
          <div className={styles.article_answered_word}>
            Ein {exampleWort.lemma}
          </div>
          <div className={styles.article_answered_translation}>
            {exampleWort.translation}
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.card_image}>
          <img src={exampleWort.media.image} alt={exampleWort.lemma} />
        </div>
        <div className={styles.card_word}>
          <span>____</span>
          {exampleWort.lemma}
        </div>
        <div className={styles.card_translation}>{exampleWort.translation}</div>
      </div>

      <div className={styles.article}>
        <div className={styles.article_choice}>
          <button>Eine</button>
          <span style={{ display: "inline-block", transform: "scaleX(-1)" }}>
            ⟵
          </span>
        </div>

        <div className={styles.article_answered}>
          <div className={styles.article_answered_word}>
            Eine {exampleWort.lemma}
          </div>
          <div className={styles.article_answered_translation}>
            {exampleWort.translation}
          </div>
        </div>
      </div>

    </div>
  );
}

export default EinEineCard;
