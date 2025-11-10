import styles from "./Train.module.scss";
import { modalMap } from "../TrainWords/Modal/modals";
import { useSearchParams } from "react-router-dom";
import Modal from "../TrainWords/Modal/Modal";
import TrainWords from "../TrainWords/TrainWords";

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

      {modalKey && modalKey in modalMap && (
        <Modal>
          {modalMap[modalKey as keyof typeof modalMap] ({ close })}
        </Modal>
      )}
    </div>
  );
};

export default Train;
