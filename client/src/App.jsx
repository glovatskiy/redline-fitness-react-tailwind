import { useEffect, useState } from "react";

import Header from "./components/Header";
import AuthModal from "./components/AuthModal";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Trainers from "./components/Trainers";
import Classes from "./components/Classes";
import Editorial from "./components/Editorial";
import Membership from "./components/Membership";
import FindYourRed from "./components/FindYourRed";
import Footer from "./components/Footer";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [redRoom, setRedRoom] = useState(false);

  // Authentication state
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Restore the login session when the page loads or refreshes
  useEffect(() => {
    const controller = new AbortController();

    const checkSession = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/me`, {
          credentials: "include",
          signal: controller.signal,
        });

        if (!response.ok) {
          setUser(null);
          return;
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Session check failed:", error);
          setUser(null);
        }
      } finally {
        if (!controller.signal.aborted) {
          setAuthLoading(false);
        }
      }
    };

    checkSession();

    return () => controller.abort();
  }, []);

  // End the login session on the backend
  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Could not log out. Please try again.");
    }
  };

  return (
    <div className={redRoom ? "red-room" : ""}>
      <Header
        redRoom={redRoom}
        setRedRoom={setRedRoom}
        user={user}
        authLoading={authLoading}
        onOpenAuth={() => setAuthOpen(true)}
        onLogout={handleLogout}
      />

      <main>
        <Hero redRoom={redRoom} />
        <Ticker redRoom={redRoom} />
        <Trainers redRoom={redRoom} />
        <Classes redRoom={redRoom} />
        <Editorial redRoom={redRoom} />
        <Membership redRoom={redRoom} />
        <FindYourRed redRoom={redRoom} />
      </main>

      <Footer redRoom={redRoom} />

      {/* Display login/signup form when requested */}
      {authOpen && (
        <AuthModal onClose={() => setAuthOpen(false)} onLogin={setUser} />
      )}
    </div>
  );
}

export default App;
