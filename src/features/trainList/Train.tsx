import TrainGrammar from "./TrainGrammar/TrainGrammar";
import TrainWords from "./TrainWords/TrainWords";
import styles from "./Train.module.scss";
import { modalMap } from "./TrainWords/modals";
import { useSearchParams } from "react-router-dom";
import Modal from "./TrainWords/Modal";

const Train = () => {
  const [params, setParams] = useSearchParams();
  const modalKey = params.get("modal");

  const close = () => {
    params.delete("modal");
    setParams(params, { replace: false });
  };
  return (
    <div className={styles.train}>
      <TrainWords />
      <TrainGrammar />

      {modalKey && modalKey in modalMap && (
        <Modal>
          {modalMap[modalKey as keyof typeof modalMap] ({ close })}
        </Modal>
      )}
    </div>
  );
};

export default Train;
