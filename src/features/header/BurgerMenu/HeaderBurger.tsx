import { useState } from "react";
import DaysStreak from "../schared/DaysStreak";
import styles from "./HeaderBurger.module.scss";
import Burger from "./Burger";

function HeaderBurger() {
  const [openBurger, onOpenBurger] = useState(false);
  return (
    <div className={styles.burger}>
      <DaysStreak />
      <div className={styles.burger_icon} onClick={() => onOpenBurger(true)}>
        <span className={styles.burger_line}></span>
      </div>
      {openBurger && <Burger onClose={() => onOpenBurger(false)} />}
    </div>
  );
}

export default HeaderBurger;
