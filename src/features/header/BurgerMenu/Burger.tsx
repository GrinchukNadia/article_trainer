import Login from "../Actions/Login";
import styles from "./Burger.module.scss";
import { NavLink } from "react-router-dom";
import {  useSelector } from "react-redux";
import type { RootState } from "../../../reduxStore/store";


type BurgerProps = {
  onClose: () => void,
  onOpenAuth: (value: boolean) => void
};
function Burger({ onClose, onOpenAuth }:BurgerProps) {
   const token = useSelector((state: RootState) => {
    return state.auth.token;
  });
  return (
    <div className={styles.container}>
      <button onClick={onClose}>X</button>
      <Login token={token} onOpenAuth={onOpenAuth}/>
      <NavLink onClick={onClose} to="" className={styles.tabs__btn}>
        Лексика
      </NavLink>
      <NavLink onClick={onClose} to="practice" className={styles.tabs__btn}>
        Практика
      </NavLink>
      <NavLink onClick={onClose} to="stats" className={styles.tabs__btn}>
        Статистика
      </NavLink>
      <NavLink onClick={onClose} to="/impressum">
        Impressum
      </NavLink>
    </div>
  );
}

export default Burger;
