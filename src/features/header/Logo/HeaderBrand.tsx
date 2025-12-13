import { useNavigate } from "react-router-dom";
import styles from './HeaderBrand.module.scss'


const HeaderBrand = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.brand}>
      <button
        onClick={() => (navigate("/"), window.scrollTo(0, 0))}
        className={styles['brand-button']}
        title={"LiongoStein (MVP)"}
      >
        LingoStein (MVP)
      </button>
    </div>
  );
};

export default HeaderBrand;
