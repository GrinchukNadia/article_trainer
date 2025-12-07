import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import fireImg from "../../assets/fire.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { registrateActivity } from "../../reduxStore/activitySlice";
import type { RootState } from "../../reduxStore/store";
import { pluralizeDay } from "../../shared/utils/pluralizeDays";

type HeaderActionsProps = {
  onOpenAuth: () => void;
};

const HeaderActions = ({ onOpenAuth }: HeaderActionsProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(registrateActivity());
  }, [dispatch]);

  const activeDays = useSelector((state: RootState) => state.activity.totalActiveDays);

  return (
    <div className={styles.header__right}>
      <div style={{ display: "flex", alignItems: "end" }}>
        <span style={{ marginRight: " 6px" }}>{pluralizeDay(activeDays)}</span>
        <img style={{ height: "31px" }} src={fireImg} alt="" />
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