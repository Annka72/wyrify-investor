import { useState, Suspense, lazy } from "react";

// Brukernavn og passord du sender til investorer
const INVESTOR_LOGIN = { username: "Wyrify", password: "Wyrify26" };

const styles = {
  bg: "#1B2A2E",
  bgCard: "#223538",
  border: "#2E4245",
  text: "#C8D5D0",
  textMuted: "#8A9E97",
  accent: "#4DB897",
};

// Investor-appen lastes først ETTER innlogging (ikke med første sidevisning)
const App = lazy(() => import("./App.jsx"));
const AUTH_KEY = "wyrify_investor_auth";

export default function AuthGate() {
  const [authenticated, setAuthenticated] = useState(() => typeof window !== "undefined" && (localStorage.getItem(AUTH_KEY) === "1" || sessionStorage.getItem(AUTH_KEY) === "1"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (username === INVESTOR_LOGIN.username && password === INVESTOR_LOGIN.password) {
      if (typeof window !== "undefined") {
        if (remember) {
          localStorage.setItem(AUTH_KEY, "1");
        } else {
          sessionStorage.setItem(AUTH_KEY, "1");
        }
      }
      setAuthenticated(true);
    } else {
      setError("Feil brukernavn eller passord.");
    }
  };

  if (authenticated) {
    return (
      <Suspense fallback={<div style={{ minHeight: "100vh", background: styles.bg, display: "flex", alignItems: "center", justifyContent: "center", color: styles.text }}>Laster...</div>}>
        <App />
      </Suspense>
    );
  }

  return (
    <div style={{ background: styles.bg, color: styles.text, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 320, background: styles.bgCard, border: `1px solid ${styles.border}`, borderRadius: 8, padding: "2rem" }}>
        <h1 style={{ fontFamily: "system-ui, sans-serif", fontSize: "1rem", letterSpacing: "0.15em", marginBottom: "1.5rem", color: styles.text }}>WYRIFY INVESTOR</h1>
        <p style={{ fontSize: "0.85rem", color: styles.textMuted, marginBottom: "1.5rem" }}>Logg inn med brukernavn og passord du har fått.</p>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontSize: "0.75rem", color: styles.textMuted, marginBottom: "0.35rem" }}>Brukernavn</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
            style={{ width: "100%", padding: "0.6rem 0.75rem", background: "#192527", border: `1px solid ${styles.border}`, borderRadius: 6, color: styles.text, fontSize: "0.95rem" }}
          />
        </div>
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ display: "block", fontSize: "0.75rem", color: styles.textMuted, marginBottom: "0.35rem" }}>Passord</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            style={{ width: "100%", padding: "0.6rem 0.75rem", background: "#192527", border: `1px solid ${styles.border}`, borderRadius: 6, color: styles.text, fontSize: "0.95rem" }}
          />
        </div>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem", cursor: "pointer", fontSize: "0.8rem", color: styles.textMuted }}>
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} style={{ accentColor: styles.accent, cursor: "pointer" }} />
          Husk meg
        </label>
        {error && <p style={{ color: "#e57373", fontSize: "0.8rem", marginBottom: "1rem" }}>{error}</p>}
        <button type="submit" style={{ width: "100%", padding: "0.75rem", background: styles.accent, color: "#FFFFFF", border: "none", borderRadius: 6, fontSize: "0.9rem", fontWeight: 600, cursor: "pointer" }}>Logg inn</button>
      </form>
    </div>
  );
}
