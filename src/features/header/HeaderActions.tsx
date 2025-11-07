import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

type HeaderActionsProps = {
  onOpenAuth: () => void;
};

const HeaderActions = ({ onOpenAuth }: HeaderActionsProps) => {
  return (
    <div className={styles.header__right}>
      <NavLink className="btn btn--ghost" to="/impressum">
        Impressum
      </NavLink>
      <button className="btn btn--ghost" onClick={() => onOpenAuth()}>
        Регистрация
      </button>
    </div>
  );
};

export default HeaderActions;
