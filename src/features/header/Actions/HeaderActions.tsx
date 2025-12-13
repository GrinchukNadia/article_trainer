import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import DaysStreak from "../schared/DaysStreak";

type HeaderActionsProps = {
  onOpenAuth: () => void;
};

const HeaderActions = ({ onOpenAuth }: HeaderActionsProps) => {
  

  return (
    <div className={styles.actions}>
      <DaysStreak />
      <NavLink className={styles.actions_btn} to="/impressum">
        Impressum
      </NavLink>
      <button className={styles.actions_btn} onClick={() => onOpenAuth()}>
        Регистрация
      </button>
    </div>
  );
};

export default HeaderActions;