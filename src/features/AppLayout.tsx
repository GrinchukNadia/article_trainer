import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AuthModal from "./header/Actions/registrationModal/AuthModal";
import AppHeader from "./header/AppHeader";
import { useDispatch } from "react-redux";
import {
  startActiveSession,
  stopActiveSession,
} from "../reduxStore/activitySlice";


export default function AppLayout() {
  const [authOpen, setAuthOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
    } catch (e) {
      console.log(e);
    }
  }, [dispatch]);

  useEffect(() => {
    const start = () => {
      dispatch(startActiveSession());
    }
    const stop = () => {
      dispatch(stopActiveSession());
    };
    const onFocus = () => start();
    const onBlur = () => stop();

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", onVisibilityChange);

    // при монтировании сразу запускаем
    start();

    return () => {
      stop();
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [dispatch]);

  return (
    <div className="app">
      <AppHeader onOpenAuth={setAuthOpen}  />
      <main>
        <Outlet />
      </main>
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </div>
  );
}
