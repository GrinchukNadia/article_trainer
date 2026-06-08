import styles from "./FishCard.module.scss";
import clsx from "clsx";

function FishCard({
  text,
  onPointerDown,
  isDragging,
  scale
}: any) {

  function getFishStyle() {
    return {
      display: "flex" as const,
      margin: "0 30px" as const,
      opacity: isDragging ? "0" : "",
      transform: `scale(${scale})`,
      transition: "transform linear 0.2s",
      touchAction: "none" as const,
      userSelect: "none" as const,
    };
  }

  return (
    <div
      onPointerDown={onPointerDown}
      style={getFishStyle()}
      className={styles.fish}
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