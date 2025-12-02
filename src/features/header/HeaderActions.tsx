import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import fireImg from "../../assets/fire.png";

type HeaderActionsProps = {
  onOpenAuth: () => void;
};

const HeaderActions = ({ onOpenAuth }: HeaderActionsProps) => {
  return (
    <div className={styles.header__right}>
      <div style={{display: "flex", alignItems: "end"}}>
        <span style={{ marginRight: " 6px"}}>3 дня</span>
        <img style={{height: "31px",}} src={fireImg} alt="" />
      </div>
      <NavLink className={styles.header__btn} to="/impressum">
        Impressum
      </NavLink>
      <button className={styles.header__btn} onClick={() => onOpenAuth()}>
        Регистрация
      </button>
    </div>
  );
};

export default HeaderActions;
