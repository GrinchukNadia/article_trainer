import { NavLink } from "react-router-dom";
import styles from "./CourseTabs.module.scss";

const CourseTabs = () => {
  return (
    <>
      <nav className={styles.tabs}>
        <NavLink to="" className={styles.tabs__btn}>
          Лексика
        </NavLink>
        <NavLink to="grammar" className={styles.tabs__btn}>
          Грамматика
        </NavLink>
        <NavLink to="stats" className={styles.tabs__btn}>
          Статистика
        </NavLink>
      </nav>
    </>
  );
};

export default CourseTabs;
