import TrainGrammar from "./TrainGrammar"
import TrainWords from "./TrainWords"
import styles from "./Train.module.scss"

const Train = () => {
  return (
    <div className={styles.train}>
    <TrainGrammar />
    <TrainWords />
    </div>
  )
}

export default Train
