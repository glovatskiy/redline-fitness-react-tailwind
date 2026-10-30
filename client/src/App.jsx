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

// STRIPE-CHECKOUT: Verify payment status using the backend and PostgreSQL.
function CheckoutSuccess({ redRoom, user, authLoading, onOpenAuth }) {
  const sessionId = new URLSearchParams(window.location.search).get(
    "session_id",
  );

  // STRIPE-CHECKOUT: Payment verification state.
  const [payment, setPayment] = useState({
    status: "loading",
    orderId: null,
    membershipName: null,
    error: null,
  });

  // STRIPE-CHECKOUT: Check the authenticated user's order.
  // Retry pending orders because the Stripe webhook may arrive slightly later.
  useEffect(() => {
    if (authLoading) return;

    if (!sessionId) {
      setPayment({
        status: "invalid",
        orderId: null,
        membershipName: null,
        error: "No checkout session was provided.",
      });
      return;
    }

    if (!user) {
      setPayment({
        status: "unauthorized",
        orderId: null,
        membershipName: null,
        error: "Please log in to view your payment confirmation.",
      });
      return;
    }

    const controller = new AbortController();
    let timeoutId;
    let attempts = 0;
    const maxAttempts = 10;

    const checkPayment = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/checkout/status?session_id=${encodeURIComponent(sessionId)}`,
          {
            credentials: "include",
            signal: controller.signal,
          },
        );

        if (response.status === 401) {
          setPayment({
            status: "unauthorized",
            orderId: null,
            membershipName: null,
            error: "Your session has expired. Please log in again.",
          });
          return;
        }

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));

          throw new Error(data.error || "Could not verify your payment.");
        }

        const data = await response.json();

        // STRIPE-CHECKOUT: Only the database's paid status confirms payment.
        if (data.status === "paid") {
          setPayment({
            status: "paid",
            orderId: data.orderId,
            membershipName: data.membershipName,
            error: null,
          });
          return;
        }

        if (data.status === "pending") {
          setPayment({
            status: "pending",
            orderId: data.orderId,
            membershipName: data.membershipName,
            error: null,
          });

          attempts += 1;

          if (attempts < maxAttempts) {
            timeoutId = setTimeout(checkPayment, 2000);
          }

          return;
        }

        // STRIPE-CHECKOUT: Handle other order statuses without claiming success.
        setPayment({
          status: "other",
          orderId: data.orderId,
          membershipName: data.membershipName,
          error: `Order status: ${data.status}`,
        });
      } catch (error) {
        if (error.name === "AbortError") return;

        console.error("Payment verification failed:", error);

        setPayment({
          status: "error",
          orderId: null,
          membershipName: null,
          error: error.message,
        });
      }
    };

    setPayment({
      status: "loading",
      orderId: null,
      membershipName: null,
      error: null,
    });

    checkPayment();

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [sessionId, user, authLoading]);

  // STRIPE-CHECKOUT: Messages based on verified payment state.
  const isPaid = payment.status === "paid";

  let heading = "THANK YOU.";
  let message = "Checking your payment status...";

  if (isPaid) {
    heading = "PAYMENT CONFIRMED.";
    message = payment.membershipName
      ? `Your ${payment.membershipName} purchase was successful. Welcome to REDLINE.`
      : "Your purchase was successful. Welcome to REDLINE.";
  } else if (payment.status === "pending") {
    heading = "PAYMENT PROCESSING.";
    message =
      "We are waiting for payment confirmation from Stripe. This may take a moment.";
  } else if (payment.status === "unauthorized") {
    heading = "LOGIN REQUIRED.";
    message = payment.error;
  } else if (
    payment.status === "invalid" ||
    payment.status === "error" ||
    payment.status === "other"
  ) {
    heading = "CONFIRMATION UNAVAILABLE.";
    message = payment.error;
  }

  return (
    <main
      className={`
        flex min-h-[70vh] flex-col items-center justify-center
        px-5 py-20 text-center text-[#f5f5f1]
        ${redRoom ? "bg-[#1a0000]" : "bg-[#1e1e1e]"}
      `}
    >
      <p
        className={`
          mb-4 font-body text-xs font-bold tracking-[3px]
          ${redRoom ? "text-[#ff0000]" : "text-[#c40000]"}
        `}
      >
        STRIPE CHECKOUT
      </p>

      <h1 className="font-heading text-[clamp(40px,8vw,72px)] leading-none">
        {heading}
      </h1>

      <p className="mt-6 max-w-lg font-body text-sm leading-7 text-[#a0a0a0]">
        {message}
      </p>

      {/* STRIPE-CHECKOUT: Show order number only after verification. */}
      {isPaid && payment.orderId && (
        <p className="mt-4 font-body text-xs tracking-[2px] text-[#a0a0a0]">
          ORDER #{payment.orderId}
        </p>
      )}

      {/* STRIPE-CHECKOUT: Allow the customer to log in again. */}
      {payment.status === "unauthorized" && (
        <button
          type="button"
          onClick={onOpenAuth}
          className={`
            mt-8 border border-transparent px-8 py-4
            font-body text-xs font-bold tracking-[2px]
            text-[#f5f5f1] transition-colors duration-300
            ${
              redRoom
                ? "bg-[#ff0000] hover:bg-[#ff3030]"
                : "bg-[#c40000] hover:bg-[#ff0000]"
            }
          `}
        >
          LOG IN
        </button>
      )}

      <a
        href="/#membership"
        className={`
          mt-10 border border-transparent px-8 py-4
          font-body text-xs font-bold tracking-[2px]
          text-[#f5f5f1] transition-colors duration-300
          ${
            redRoom
              ? "bg-[#ff0000] hover:bg-[#ff3030]"
              : "bg-[#c40000] hover:bg-[#ff0000]"
          }
        `}
      >
        BACK TO MEMBERSHIPS
      </a>
    </main>
  );
}

function App() {
  const [redRoom, setRedRoom] = useState(false);

  // Authentication state
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // STRIPE-CHECKOUT: Identify the payment return URL
  const isCheckoutSuccess = window.location.pathname === "/checkout/success";

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

      {/* STRIPE-CHECKOUT: Show checkout return page instead of homepage */}
      {isCheckoutSuccess ? (
        <CheckoutSuccess
          redRoom={redRoom}
          user={user}
          authLoading={authLoading}
          onOpenAuth={() => setAuthOpen(true)}
        />
      ) : (
        <main>
          <Hero redRoom={redRoom} />
          <Ticker redRoom={redRoom} />
          <Trainers redRoom={redRoom} />
          <Classes redRoom={redRoom} />
          <Editorial redRoom={redRoom} />
          <Membership redRoom={redRoom} />
          <FindYourRed redRoom={redRoom} />
        </main>
      )}

      <Footer redRoom={redRoom} />

      {/* Display login/signup form when requested */}
      {authOpen && (
        <AuthModal onClose={() => setAuthOpen(false)} onLogin={setUser} />
      )}
    </div>
  );
}

export default App;
