import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import DaysStreak from "../schared/DaysStreak";
import type { RootState } from "../../../reduxStore/store";
import {  useSelector } from "react-redux";
import Login from "./Login";

type HeaderActionsProps = {
  onOpenAuth: (value: boolean) => void;
};

const HeaderActions = ({ onOpenAuth }: HeaderActionsProps) => {
  const token = useSelector((state: RootState) => {
    return state.auth.token;
  });  

  return (
    <div className={styles.actions}>
      <DaysStreak />
      <NavLink className={styles.actions_btn} to="/impressum">
        Impressum
      </NavLink>

      <Login token={token} onOpenAuth={onOpenAuth}/>
    </div>
  );
};

export default HeaderActions;
