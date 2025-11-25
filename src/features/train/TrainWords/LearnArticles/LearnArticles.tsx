import styles from "./LearnArticles.module.scss";

type LEARN_ARTICLES_TYPES = {
  area: string;
  onClick: () => void;
  title: string;
  description: string;
  url: string;
  size: string;
};
function LearnArticles({
  area,
  onClick,
  title,
  description,
  url,
  size,
}: LEARN_ARTICLES_TYPES) {
  return (
    <div
      style={{
        gridArea: area,
        backgroundImage: "url(" + url + ")",
        backgroundSize: size === "big" ? "360px" : "166px",
      }}
      className={styles.learn}
      onClick={onClick}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default LearnArticles;
