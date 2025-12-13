import DaysStreak from "../schared/DaysStreak";
import styles from "./HeaderBurger.module.scss";

function HeaderBurger() {
  return (
    <div className={styles.burger}>
        <DaysStreak />
        <span className={styles.burger_line}></span>
    </div>
  )
}

export default HeaderBurger

