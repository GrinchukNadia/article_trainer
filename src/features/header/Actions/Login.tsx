import styles from "./Header.module.scss";
import { useDispatch } from "react-redux";
import { removeUser } from "../../../reduxStore/authSlice";

type LoginProps = {
  token: string | null,
  onOpenAuth:(arg: boolean) => void
}
const Login = ({token, onOpenAuth}:LoginProps )=> {
  const dispatch = useDispatch();

  return token ? (
    <button
      className={styles.actions_btn}
      onClick={() => {
        dispatch(removeUser());
        onOpenAuth(false);
      }}
    >
      Log out
    </button>
  ) : (
    <button className={styles.actions_btn} onClick={() => onOpenAuth(true)}>
      Log in
    </button>
  );
};

export default Login;
