import styles from "./CloseTrain.module.scss"

function CloseTrain({close}: {close: () => void}) {
  return (
    <button className={styles.close} onClick={close}>
      <span>x</span>
    </button>
  )
}

export default CloseTrain
