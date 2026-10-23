import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function AuthModal({ onClose, onLogin }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Update form values as the user types
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Send login or signup details to the Express backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = mode === "login" ? "login" : "signup";

      const response = await fetch(`${API_URL}/api/auth/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(
          mode === "login"
            ? {
                email: form.email,
                password: form.password,
              }
            : form,
        ),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      // Update the signed-in user in App.jsx
      onLogin(data.user);
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 px-4"
      role="presentation"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        className="relative w-full max-w-md border border-white/15 bg-[#121212] p-6 text-[#f5f5f1] shadow-2xl sm:p-10"
      >
        {/* Close modal */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close authentication form"
          className="absolute top-4 right-4 text-2xl text-white/60 hover:text-white"
        >
          ×
        </button>

        {/* Title */}
        <h2
          id="auth-title"
          className="mb-2 font-heading text-4xl tracking-wider"
        >
          {mode === "login" ? "WELCOME BACK" : "JOIN REDLINE"}
        </h2>

        <p className="mb-8 text-sm text-white/50">
          {mode === "login"
            ? "Sign in to your REDLINE account."
            : "Create your REDLINE account."}
        </p>

        {/* Authentication form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === "signup" && (
            <div>
              <label
                htmlFor="auth-name"
                className="mb-2 block text-xs tracking-wider"
              >
                NAME
              </label>
              <input
                id="auth-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                required
                maxLength={100}
                className="w-full border border-white/20 bg-[#1c1c1c] p-3 text-white outline-none focus:border-[#c40000]"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="auth-email"
              className="mb-2 block text-xs tracking-wider"
            >
              EMAIL
            </label>
            <input
              id="auth-email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
              maxLength={255}
              className="w-full border border-white/20 bg-[#1c1c1c] p-3 text-white outline-none focus:border-[#c40000]"
            />
          </div>

          <div>
            <label
              htmlFor="auth-password"
              className="mb-2 block text-xs tracking-wider"
            >
              PASSWORD
            </label>
            <input
              id="auth-password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              required
              minLength={mode === "signup" ? 8 : undefined}
              className="w-full border border-white/20 bg-[#1c1c1c] p-3 text-white outline-none focus:border-[#c40000]"
            />
          </div>

          {/* Display backend validation errors */}
          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c40000] py-3 font-semibold tracking-wider text-white transition-colors hover:bg-red-600 disabled:opacity-50"
          >
            {loading
              ? "PLEASE WAIT..."
              : mode === "login"
                ? "LOG IN"
                : "CREATE ACCOUNT"}
          </button>
        </form>

        {/* Switch between login and signup */}
        <p className="mt-6 text-center text-sm text-white/60">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            type="button"
            className="font-semibold text-[#ff3030] hover:underline"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError("");
            }}
          >
            {mode === "login" ? "SIGN UP" : "LOG IN"}
          </button>
        </p>
      </section>
    </div>
  );
}

export default AuthModal;
