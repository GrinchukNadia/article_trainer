import {useState} from "react";
import { Outlet } from "react-router-dom";
import AuthModal from "./registrationModal/AuthModal";
import AppHeader from "./header/AppHeader";

export default function AppLayout() {
  const [authOpen, setAuthOpen] = useState(false);

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
      