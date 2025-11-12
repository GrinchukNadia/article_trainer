import {  useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AuthModal from "./registrationModal/AuthModal";
import AppHeader from "./header/AppHeader";
import dataCard from "./data/Data";
import { useDispatch } from "react-redux";
import { initWords, initWordsProgressArr, computeQueue } from "../reduxStore/srsSlice";

export default function AppLayout() {
  const [authOpen, setAuthOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const cardsArr = Array.isArray(dataCard) ? dataCard : [];
      dispatch(initWords(cardsArr));
      dispatch(initWordsProgressArr());
      dispatch(computeQueue());
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
