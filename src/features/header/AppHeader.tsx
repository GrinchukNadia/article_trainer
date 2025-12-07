import HeaderBrand from "./HeaderBrand";
import HeaderActions from "./HeaderActions";
import CourseTabs from "./CourseTabs";
import styles from "./Header.module.scss";

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
      </div>
    </header>
  );
};

export default AppHeader;
