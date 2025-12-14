import styles from "./Train.module.scss";
import { modalMap } from "./trainModals/modals";
import { useSearchParams } from "react-router-dom";
import Modal from "./trainModals/Modal";
import TilesGrid from "./trainTiles/TilesGrid";

const Train = () => {
  const [params, setParams] = useSearchParams();
  const modalKey = params.get("modal");

  const close = () => {
    params.delete("modal");
    setParams(params, { replace: false });
  };
  return (
    <div className={styles.train}>
      <TilesGrid />

      {modalKey && modalKey in modalMap && (
        <Modal variant={modalKey as "learnArticles" | "einEineTrainer" | "articleSprint" | "mistakeReview"  | "pluralTrainer" | "translateMaster"}  >
          {modalMap[modalKey as keyof typeof modalMap] ({ close })}
        </Modal>
      )}
    </div>
  );
};

export default Train;
