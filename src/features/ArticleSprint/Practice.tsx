import Modal from "../trainArticles/trainModals/Modal";
import { useEffect } from "react";

import { useSearchParams } from "react-router-dom";
import ArticleSprint from "./ArticleSprint";
import AnotherGame from "./Another";
import Test from "./Test";

const Practice = () => {
  const [params, setSearchParams] = useSearchParams();

  const modalKey = params.get("modal");

  const close = () => {
    const nextParams = new URLSearchParams(params);
    nextParams.delete("modal");
    setSearchParams(nextParams);
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
    <div
      style={{
        width: "80rem",
        display: "flex",
        justifyContent: "center",
        paddingTop: "40px",
      }}
    >
      {modalKey == "sprint" && (
        <Modal variant="sprint">
          <ArticleSprint close={close} />
        </Modal>
      )}
      <div
        style={{
          color: "wheat",
          cursor: "pointer",
          padding: "20px 60px",
          border: "1px solid white",
          width: "max-content",
          height: "max-content",
          margin: "6px",
        }}
        onClick={() => setSearchParams({ modal: "sprint" })}
      >
        Sprint
      </div>

      {modalKey == "another" && (
        <Modal variant="another">
          <AnotherGame close={close} />
        </Modal>
      )}
      <div
        style={{
          color: "wheat",
          cursor: "pointer",
          // cursor: "not-allowed",
          padding: "20px 60px",
          border: "1px solid white",
          width: "max-content",
          height: "max-content",
          margin: "6px",
        }}
        onClick={() => setSearchParams({modal: "another"})}
      >
        Game 2
      </div>

      {modalKey == "test" && (
        <Modal variant="test">
          <Test/>
        </Modal>
      )}
      <div
        style={{
          color: "wheat",
          cursor: "pinter",
          // cursor: "not-allowed",
          padding: "20px 60px",
          border: "1px solid white",
          width: "max-content",
          height: "max-content",
          margin: "6px",
        }}
        onClick={() => setSearchParams({modal: "test"})}
      >
        Game 3
      </div>
    </div>
  );
};

export default Practice;
