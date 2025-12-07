import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AuthModal from "./registrationModal/AuthModal";
import AppHeader from "./header/AppHeader";
import dataCard from "./data/Data";
import { useDispatch } from "react-redux";
import { initWords, initWordsProgressArr, computeQueue, computeWeakQueue } from "../reduxStore/srsSlice";
import { seed, shuffle } from "../shared/utils/shuffle";
import { startActiveSession, stopActiveSession } from "../reduxStore/activitySlice";
// import type { RootState } from "../reduxStore/store";

export default function AppLayout() {
  const [authOpen, setAuthOpen] = useState(false);

  const dispatch = useDispatch();
  // useSelector((reduxState: RootState) => console.log(reduxState));

  useEffect(() => {
    try {
      const cardsArr = Array.isArray(dataCard) ? dataCard : [];
      const shuffledcardsArr = shuffle(cardsArr, seed)
      dispatch(initWords(shuffledcardsArr));
      dispatch(initWordsProgressArr());
      dispatch(computeQueue());
      dispatch(computeWeakQueue());
    } catch (e) {
      console.log(e);
    }
  }, [dispatch]);

    useEffect(() => {
    const onFocus = () => dispatch(startActiveSession());
    const onBlur = () => dispatch(stopActiveSession());

    const onVisibilityChange = () => {
      if (document.hidden) dispatch(stopActiveSession());
      else dispatch(startActiveSession());
    };

    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", onVisibilityChange);

    // при монтировании сразу запускаем
    dispatch(startActiveSession());

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div className="app">
      <AppHeader onOpenAuth={() => setAuthOpen(true)} />
      <main>
        <Outlet />
      </main>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </div>
  );
}
