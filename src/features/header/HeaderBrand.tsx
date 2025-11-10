import { useNavigate } from "react-router-dom";
import styles from './Header.module.scss'

type HeaderBrandProps = {
  inCourse: boolean;
};

const HeaderBrand = ({ inCourse }: HeaderBrandProps) => {
  const navigate = useNavigate();
  return (
    <div className={styles.header__brand}>
      <button
        onClick={() => (navigate("/"), window.scrollTo(0, 0))}
        className={styles['header__brand-button']}
        title={inCourse ? "Вернутся в каталог курсов" : "LiongoStein (MVP)"}
      >
        LingoStein (MVP)
      </button>
    </div>
  );
};

export default HeaderBrand;
