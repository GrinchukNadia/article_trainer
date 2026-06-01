import styles from "./Another.module.scss";
// import {
//     useDraggable,
// } from "@dnd-kit/core";
import clsx from "clsx";

function FishCard({
//   id,
  text,
  onPointerDown,
  isDragging,
  scale
}: any) {
//   const fish = useDraggable({ id });

  function getFishStyle() {
    return {
    //   position: "absolute" as const,
    display: "flex" as const,
    margin: "0 30px" as const,
    opacity: isDragging? "0" : "",
    transform: `scale(${scale})`,
  transition: "transform linear 0.2s",


    //   transform: `
    //     translate3d(
    //       ${fish.transform?.x || 0}px,
    //       ${fish.transform?.y || 0}px,
    //       0
    //     )
    //     scale(${fish.isDragging ? 0.4 : 1})
    //   `,

    //   cursor: fish.isDragging
    //     ? "grabbing"
    //     : "grab",

    //   transition: "transform 0.05s linear",

    //   zIndex: fish.isDragging ? 999 : 100,

      touchAction: "none" as const,
      userSelect: "none" as const,
    };
  }

  return (
    <div
        onPointerDown={onPointerDown}
      style={getFishStyle()}
      className={styles.fishCard}
    >
      <div className={clsx(styles.fishLeft, styles.fish_inner)} />
      <div className={clsx(styles.fishMiddle, styles.fish_inner)}>
        {text}
      </div>
      <div className={clsx(styles.fishRight, styles.fish_inner)} />
    </div>
  );
}

export default FishCard;