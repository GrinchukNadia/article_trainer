import styles from "./Train.module.scss";
import { modalMap } from "./trainModals/modals";
import { useSearchParams } from "react-router-dom";
import Modal from "./trainModals/Modal";
import TilesGrid from "./trainTiles/TilesGrid";
import { useEffect } from "react";

const Train = () => {
  const [params, setParams] = useSearchParams();
  const modalKey = params.get("modal");

  const close = () => {
    params.delete("modal");
    setParams(params, { replace: false });
  };

  useEffect(() => {
    if (!modalKey) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [modalKey]);

  return (
    <div className={styles.train}>
      <TilesGrid />

      {modalKey && modalKey in modalMap && (
        <Modal
          variant={
            modalKey as
              | "learnArticles"
              | "einEineTrainer"
              | "grammar"
              | "mistakeReview"
              | "pluralTrainer"
              | "translateMaster"
          }
        >
          {modalMap[modalKey as keyof typeof modalMap]({ close })}
        </Modal>
      )}
    </div>
  );
};

export default Train;
