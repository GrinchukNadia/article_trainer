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
      {/* <div style={{width: "100vw", height: "100vh", position: "absolute", top: 0, left: 0, backgroundColor: "#fd552b", padding: " 30px 60px", fontSize: "1.6rem", fontWeight: "light"}}>
      <p>Nach dem Schließen können der Benutzername und der Wiederherstellungscode nicht erneut angezeigt werden.</p>

      <button style={{border: "none", fontSize: "2rem", padding: "6px 16px", margin: "20px"}} 
      // onClick={() => setStatus("code")}
      >Zurück</button>
      <button  style={{border: "none", fontSize: "2rem", padding: "6px 16px", marginRight: "20px"}}
      // onClick={() => setStatus("success")}
      >Ich habe den Code und den Benutzernamen gespeichert</button>
    </div> */}

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </div>
  );
}
