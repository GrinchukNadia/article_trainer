import { useState } from "react";
import AuthModal from "../Actions/registrationModal/AuthModal";
import styles from "./Burger.module.scss";
import { NavLink } from "react-router-dom";

type onClose = () => void;
function Burger({ onClose }: { onClose: onClose }) {
  const [authOpen, setAuthOpen] = useState(false);
  return (
    <div className={styles.container}>
      <button onClick={onClose}>X</button>
      <NavLink onClick={onClose} to="" className={styles.tabs__btn}>
        Лексика
      </NavLink>
      <NavLink onClick={onClose} to="grammar" className={styles.tabs__btn}>
        Грамматика
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
