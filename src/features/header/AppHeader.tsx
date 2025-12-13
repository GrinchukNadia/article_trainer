import HeaderBrand from "./Logo/HeaderBrand";
import HeaderActions from "./Actions/HeaderActions";
import CourseTabs from "./CourseTabs/CourseTabs";
import HeaderBurger from "./BurgerMenu/HeaderBurger";
import styles from "./AppHeader.module.scss";

type Props = {
  onOpenAuth: () => void;
};

const AppHeader = ({ onOpenAuth }: Props) => {

  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <HeaderBrand />

        <CourseTabs />

        <HeaderActions onOpenAuth={onOpenAuth} />

        <HeaderBurger />
      </div>
    </header>
  );
};

export default AppHeader;
