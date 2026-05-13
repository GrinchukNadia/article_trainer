import styles from "./Tile.module.scss";
import clsx from "clsx";

type LEARN_ARTICLES_TYPES = {
  area: string;
  onClick: () => void;
  title: string;
  description: string;
  url: string;
  size: string;
  disabled: boolean;
};
function Tile({
  area,
  onClick,
  title,
  description,
  url,
  size,
  disabled
}: LEARN_ARTICLES_TYPES) {
  let sizePx = "";
  if (size === "x-big") {
    sizePx = "410px";
  } else if (size === "big") {
    sizePx = "346px";
  } else {
    sizePx = "166px";
  }
  return (
    <div
      style={{
        gridArea: area,
        backgroundImage: "url(" + url + ")",
        backgroundSize: sizePx
      }}
      className={clsx(styles.learn, {
        [styles.disabled]: disabled})}
      onClick={onClick}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Tile;
