import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

const CourseTabs = () => {
  return (
    <>
      <nav className={styles.tabs}>
        <NavLink to="train" className={styles.tabs__btn}>
          Тренировки
        </NavLink>
        <NavLink to="mistakes" className={styles.tabs__btn}>
          Ошибки
        </NavLink>
        <NavLink to="stats" className={styles.tabs__btn}>
          Статистика
        </NavLink>
      </nav>
    </>
  );
};

export default CourseTabs;
