import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AuthModal from "./registrationModal/AuthModal";
import AppHeader from "./header/AppHeader";
import dataCard from "./data/Data";
import { useDispatch } from "react-redux";
import { initWords, initWordsProgressArr, computeQueue, computeWeakQueue } from "../reduxStore/srsSlice";
import { seed, shuffle } from "../shared/utils/shuffle";
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
