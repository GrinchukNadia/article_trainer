import { useState } from "react";
import DaysStreak from "../schared/DaysStreak";
import styles from "./HeaderBurger.module.scss";
import Burger from "./Burger";

type HeaderActionsProps = {
  onOpenAuth: (value: boolean) => void;
};

function HeaderBurger({onOpenAuth}:HeaderActionsProps) {
  const [openBurger, onOpenBurger] = useState(false);
  return (
    <div className={styles.burger}>
      <DaysStreak />
      <div className={styles.burger_icon} onClick={() => onOpenBurger(true)}>
        <span className={styles.burger_line}></span>
      </div>
      {openBurger && <Burger onClose={() => onOpenBurger(false)} onOpenAuth={onOpenAuth} />}
    </div>
  );
}

export default HeaderBurger;
