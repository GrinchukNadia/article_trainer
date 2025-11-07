import styles from "./LearnArticles.module.scss"

type LEARN_ARTICLES_TYPES ={area: string, onClick: () => void, title: string, description: string}
function LearnArticles({area, onClick, title, description}: LEARN_ARTICLES_TYPES) {
  return (
    <div style={{gridArea: area, cursor: "pointer"}} className={styles.learn} onClick={onClick}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default LearnArticles
