import { useState, useEffect, useRef } from "react";
import "./App.css";

// Ton-i-ton fargepalett med blåere teal (mindre grønn i lyseste accent)
const palette = {
  bg: "#1D2C2A",
  bgCard: "#243835",
  bgSection: "#1A2826",
  teal: "#289A85",
  tealLight: "#30BFA0",
  tealBright: "#34D4B8",
  seafoam: "#34D4B8",
  metalDark: "#152C28",
  accent: "#34D4B8",
  accentDim: "#2AAD98",
  border: "#2B3B39",
  text: "#E0E0E0",
  textMuted: "#A0A0A0",
  textBright: "#E0E0E0",
  gold: "#5A9E8E",
  gradBlue: "#1D2C2A",
  gradTeal: "#1D2C2A",
  gradMid: "#1D2C2A",
};

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
};

const NAV_ITEMS = ["Overview", "Product", "Market", "Technology", "Team"];

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="wyrify-app" style={{ background: palette.bg, color: palette.text, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Space+Mono:wght@400;700&display=swap');
        .wyrify-app * { box-sizing: border-box; }
        .wyrify-app .nav-link { color: ${palette.textMuted}; text-decoration: none; font-family: 'Space Mono', monospace; font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; transition: color 0.3s; cursor: pointer; }
        .wyrify-app .nav-link:hover { color: ${palette.accent}; }
        .wyrify-app .stat-card { background: linear-gradient(135deg, ${palette.bgCard}, ${palette.bgSection}); border: 1px solid ${palette.border}; border-radius: 3px; padding: 2rem; transition: border-color 0.3s, transform 0.3s; }
        .wyrify-app .stat-card:hover { border-color: ${palette.tealBright}; transform: translateY(-4px); }
        .wyrify-app .feature-pill { display: inline-flex; align-items: center; gap: 0.5rem; background: ${palette.border}88; border: 1px solid ${palette.border}; border-radius: 2rem; padding: 0.4rem 1rem; font-family: 'Space Mono', monospace; font-size: 0.7rem; color: ${palette.tealBright}; letter-spacing: 0.08em; }
        .wyrify-app .section-divider { height: 1px; background: linear-gradient(90deg, transparent, ${palette.border}, transparent); margin: 0; }
        .wyrify-app .glow-text { text-shadow: 0 0 40px ${palette.accent}44; }
        .wyrify-app .team-card { background: linear-gradient(135deg, ${palette.bgCard}, ${palette.metalDark}); border: 1px solid ${palette.border}; border-radius: 4px; padding: 1.5rem; transition: all 0.3s; }
        .wyrify-app .team-card:hover { border-color: ${palette.tealBright}44; background: ${palette.bgCard}; }
        .wyrify-app .market-bar { height: 6px; background: linear-gradient(90deg, ${palette.accent}, ${palette.teal}); border-radius: 3px; }
        .wyrify-app .ticker { font-family: 'Space Mono', monospace; font-size: 0.65rem; color: ${palette.accentDim}; letter-spacing: 0.1em; }
        .wyrify-app .hero-grid { position: absolute; inset: 0; background-image: linear-gradient(${palette.border}18 1px, transparent 1px), linear-gradient(90deg, ${palette.border}18 1px, transparent 1px); background-size: 60px 60px; }
        .wyrify-app .noise-overlay { position: absolute; inset: 0; opacity: 0.025; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size: 200px 200px; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes pulse-ring { 0% { transform: scale(0.9); opacity: 1; } 100% { transform: scale(1.8); opacity: 0; } }
        .wyrify-app .float-anim { animation: float 6s ease-in-out infinite; }
        ::selection { background: ${palette.tealBright}33; color: ${palette.accent}; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${palette.bg}; }
        ::-webkit-scrollbar-thumb { background: ${palette.teal}; border-radius: 2px; }
      `}</style>

      {/* NAV */}
      <nav className="nav-wrap" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrollY > 60 ? `${palette.bg}ef` : "transparent",
        backdropFilter: scrollY > 60 ? "blur(20px)" : "none",
        borderBottom: scrollY > 60 ? `1px solid ${palette.border}` : "none",
        transition: "all 0.4s",
        padding: "1rem 2.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap",
      }}>
        <div className="nav-brand" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: 28, height: 28, position: "relative" }}>
            <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
              <polygon points="14,2 26,8 26,20 14,26 2,20 2,8" fill="none" stroke={palette.accent} strokeWidth="1.5"/>
              <polygon points="14,6 22,10 22,18 14,22 6,18 6,10" fill={palette.teal + "66"} stroke={palette.tealBright} strokeWidth="1"/>
              <circle cx="14" cy="14" r="3" fill={palette.accent}/>
            </svg>
          </div>
          <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: "0.95rem", color: palette.textBright, letterSpacing: "0.15em" }}>WYRIFY</span>
          <span className="ticker nav-ticker">WYR</span>
        </div>
        <div className="nav-desktop-links" style={{ display: "flex", gap: "2rem" }}>
          {NAV_ITEMS.map((n) => (
            <span key={n} className="nav-link" onClick={() => scrollTo(n.toLowerCase())}>{n}</span>
          ))}
        </div>
        <div className="nav-investor-badge" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: palette.accent, boxShadow: `0 0 8px ${palette.accent}` }}/>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: palette.textMuted }}>INVESTOR DECK</span>
        </div>
        <button type="button" className="nav-mobile-toggle" aria-label="Meny" onClick={() => setMobileMenuOpen((o) => !o)} style={{ display: "none", background: "none", border: "none", padding: "0.5rem", cursor: "pointer", color: palette.text }}>
          {mobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          )}
        </button>
        <div className={`nav-mobile-menu ${mobileMenuOpen ? "" : "nav-mobile-menu--closed"}`} style={{ width: "100%", flexDirection: "column", gap: "0.75rem", paddingTop: "1rem", borderTop: `1px solid ${palette.border}` }}>
          {NAV_ITEMS.map((n) => (
            <span key={n} className="nav-link" style={{ padding: "0.5rem 0", fontSize: "0.85rem" }} onClick={() => scrollTo(n.toLowerCase())}>{n}</span>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="overview" className="hero-section" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", padding: "0 5vw", background: `linear-gradient(145deg, ${palette.bgCard} 0%, ${palette.bg} 40%, ${palette.bgSection} 100%)` }}>
        <div className="hero-glow" style={{ position: "absolute", left: "-10%", top: "-15%", width: "55vw", height: "55vw", borderRadius: "50%", background: `radial-gradient(circle, ${palette.border}44 0%, ${palette.bg}55 40%, transparent 70%)`, filter: "blur(40px)", pointerEvents: "none" }}/>
        <div className="hero-glow" style={{ position: "absolute", right: "-5%", bottom: "-10%", width: "40vw", height: "40vw", borderRadius: "50%", background: `radial-gradient(circle, ${palette.bg}33 0%, transparent 70%)`, filter: "blur(60px)", pointerEvents: "none" }}/>
        <div className="hero-grid"/>
        <div className="noise-overlay"/>
        <div className="hero-glow" style={{ position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)", width: "min(45vw, 520px)", height: "min(45vw, 520px)", opacity: 0.1, borderRadius: "50%", background: `radial-gradient(circle, ${palette.tealBright}, transparent 70%)`, filter: "blur(60px)" }}/>

        <div className="hero-beacon float-anim" style={{ position: "absolute", right: "10%", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", justifyContent: "center", width: 320, height: 320 }}>
          {[1, 1.5, 2, 2.5].map((s, i) => (
            <div key={i} style={{ position: "absolute", width: 80 * s, height: 80 * s, borderRadius: "50%", border: `1px solid ${palette.tealBright}${Math.floor(40 - i * 8).toString(16).padStart(2,"0")}`, animation: `pulse-ring ${2 + i * 0.5}s ease-out ${i * 0.4}s infinite` }}/>
          ))}
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, ${palette.teal}, ${palette.tealBright})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 40px ${palette.accent}88, 0 0 80px ${palette.teal}44` }}>
            <svg viewBox="0 0 40 40" fill="none" width="42" height="42">
              <circle cx="20" cy="20" r="8" fill={palette.bg}/>
              <path d="M20 5 L35 12 L35 28 L20 35 L5 28 L5 12 Z" stroke={palette.accent} strokeWidth="1.5" fill="none"/>
              <circle cx="20" cy="20" r="3" fill={palette.accent}/>
            </svg>
          </div>
        </div>

        <div className="hero-content" style={{ position: "relative", zIndex: 2, maxWidth: 680 }}>
          <div className="hero-label" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.accentDim, letterSpacing: "0.2em", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div className="hero-label-line" style={{ width: 24, height: 1, background: palette.accentDim }}/>
            CRYPTOCURRENCY TRANSACTION HARDWARE
            <div className="hero-label-line" style={{ width: 24, height: 1, background: palette.accentDim }}/>
          </div>

          <h1 className="glow-text hero-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3.5rem, 7vw, 6rem)", fontWeight: 300, lineHeight: 0.95, color: palette.textBright, marginBottom: "0.25rem", letterSpacing: "-0.02em" }}>
            The Future<br/>
            <span style={{ fontStyle: "italic", color: palette.seafoam }}>of Payments</span><br/>
            <span style={{ fontWeight: 600 }}>Is Here</span>
          </h1>

          <p className="hero-description" style={{ fontSize: "1.1rem", color: palette.textMuted, lineHeight: 1.7, marginTop: "2rem", maxWidth: 520, fontWeight: 300 }}>
            Wyrify is the world's first non-bank, non-card instant-transaction retail POS platform — replacing the VISA/Mastercard monopoly with blockchain-powered hardware that works anywhere, for anyone.
          </p>

          <div className="hero-pills" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "2rem" }}>
            {["Instant Settlement", "Zero Chargebacks", "0.5% Fee", "1–2 sec Transactions", "Any Crypto/Fiat"].map(tag => (
              <span key={tag} className="feature-pill">{tag}</span>
            ))}
          </div>

          <div className="hero-cta-wrap" style={{ display: "flex", gap: "1.5rem", marginTop: "3rem", alignItems: "center" }}>
            <button onClick={() => scrollTo("product")} style={{ background: palette.accent, border: "none", color: "#0a1612", padding: "0.85rem 2.5rem", fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.1em", cursor: "pointer", borderRadius: "6px", boxShadow: `0 4px 24px ${palette.accent}55` }}>
              EXPLORE PLATFORM →
            </button>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.textMuted }}>Q3 2019 Whitepaper</span>
          </div>
        </div>
      </section>

      <div className="section-divider"/>

      {/* KEY STATS */}
      <section style={{ padding: "5rem 5vw", background: `linear-gradient(160deg, ${palette.bgCard} 0%, ${palette.bg} 100%)` }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", maxWidth: 1100, margin: "0 auto" }}>
          {[
            { value: "40–50%", label: "World Population Unbanked", sub: "TAM" },
            { value: "60M+", label: "POS Terminals Dominated by 2 Companies", sub: "Verifone + Ingenico" },
            { value: "$0", label: "Customer Acquisition Cost", sub: "Free beacons" },
            { value: "1–2s", label: "Transaction Confirmation Speed", sub: "vs 3–5 days traditional" },
            { value: "0.5%", label: "Transaction Fee", sub: "vs 3%+ card fees" },
          ].map((s, i) => (
            <Reveal key={s.value} delay={i * 0.1}>
              <div className="stat-card" style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.8rem", fontWeight: 700, color: palette.accent, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: "0.8rem", color: palette.textMuted, marginTop: "0.5rem", lineHeight: 1.4 }}>{s.label}</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: palette.tealBright, marginTop: "0.4rem", letterSpacing: "0.08em" }}>{s.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="section-divider"/>

      {/* THE PROBLEM */}
      <section style={{ padding: "6rem 5vw" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.accentDim, letterSpacing: "0.2em", marginBottom: "1rem" }}>THE PROBLEM</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, color: palette.textBright, marginBottom: "3rem" }}>
              A broken, monopolized<br/><span style={{ fontStyle: "italic", color: palette.seafoam }}>payment ecosystem</span>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            {[
              { icon: "🏦", title: "Bank Monopoly", body: "VISA & Mastercard dominate 90%+ of industrial POS terminals via Verifone and Ingenico. Fees are high, chargebacks are common, and settlement takes days." },
              { icon: "🌍", title: "Global Exclusion", body: "40–50% of the world's population has no access to banking services. Traditional payment systems are too costly to serve micro-transaction markets." },
              { icon: "⚡", title: "Crypto Friction", body: "Cryptocurrencies are slow, expensive, and complex. Without merchant infrastructure, mainstream traction is impossible." },
              { icon: "🔒", title: "No Real Alternative", body: "The POS terminal market has never faced genuine competition. The plastic card monopoly has persisted because no viable replacement existed — until now." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.15}>
                <div style={{ background: `linear-gradient(135deg, ${palette.bgCard}, ${palette.bgSection})`, border: `1px solid ${palette.border}`, borderRadius: "4px", padding: "2rem" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{item.icon}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: palette.textBright, marginBottom: "0.75rem" }}>{item.title}</h3>
                  <p style={{ color: palette.textMuted, lineHeight: 1.7, fontSize: "0.9rem" }}>{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"/>

      {/* PRODUCT */}
      <section id="product" style={{ padding: "6rem 5vw", background: `linear-gradient(155deg, ${palette.bgCard} 0%, ${palette.bg} 60%, ${palette.bgSection} 100%)` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.accentDim, letterSpacing: "0.2em", marginBottom: "1rem" }}>THE PRODUCT</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, color: palette.textBright, marginBottom: "1rem" }}>
              A complete payment platform,<br/><span style={{ fontStyle: "italic", color: palette.seafoam }}>reimagined from the ground up</span>
            </h2>
            <p style={{ color: palette.textMuted, maxWidth: 620, lineHeight: 1.7, marginBottom: "3.5rem" }}>
              Wyrify combines a Bluetooth BLE hardware beacon, mobile apps, and an online checkout solution — all running on a proprietary proof-of-stake blockchain with 1–2 second confirmation times.
            </p>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "4rem" }}>
            {[
              { num: "01", title: "Wyrify Beacon", subtitle: "POS Hardware", desc: "A Bluetooth Low Energy merchant terminal that replaces traditional card readers. Merchants pay nothing upfront. Customers pay via the Wyrify app — no card, no bank, no friction. Free to receive, 0.5% to transact.", features: ["BLE / NFC", "Instant settlement", "Any crypto accepted", "Zero chargeback risk"], color: palette.accent },
              { num: "02", title: "Wyrify App", subtitle: "Customer & Merchant", desc: "A mobile wallet supporting any cryptocurrency or fiat currency. Customers hold and spend digital assets at any Wyrify-enabled merchant. Merchants receive confirmation in seconds with value locked immediately.", features: ["Multi-currency wallet", "1-click payments", "Merchant dashboard", "KYC / UBO built-in"], color: palette.seafoam },
              { num: "03", title: "Wyrify Online", subtitle: "E-Commerce Solution", desc: "Plug-in online checkout via phone number. Customers get an app notification, approve the transaction, and settlement is instant. Zero chargebacks. Fixed rates at time of transaction. Easy API integration.", features: ["No chargebacks", "Instant clearing", "Micro-payments", "Loyalty ready"], color: palette.gold },
            ].map((p, i) => (
              <Reveal key={p.num} delay={i * 0.15}>
                <div style={{ background: `linear-gradient(135deg, ${palette.bgCard}, ${palette.bgSection})`, border: `1px solid ${palette.border}`, borderRadius: "4px", padding: "2rem", height: "100%", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${p.color}, transparent)` }}/>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: p.color, letterSpacing: "0.15em", marginBottom: "0.5rem" }}>{p.num} — {p.subtitle}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 600, color: palette.textBright, marginBottom: "1rem" }}>{p.title}</h3>
                  <p style={{ color: palette.textMuted, fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>{p.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {p.features.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: p.color, flexShrink: 0 }}/>
                        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", color: palette.textMuted }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{ background: `linear-gradient(135deg, ${palette.bgCard}, ${palette.bgSection})`, border: `1px solid ${palette.border}`, borderRadius: "4px", padding: "2.5rem" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.accentDim, letterSpacing: "0.15em", marginBottom: "2rem", textAlign: "center" }}>TRANSACTION FLOW</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0", flexWrap: "wrap" }}>
                {[
                  { label: "Customer", sub: "App / Wallet", icon: "📱" },
                  null,
                  { label: "Wyrify Beacon", sub: "BLE Signal", icon: "📡" },
                  null,
                  { label: "Blockchain", sub: "NXChain Node", icon: "⛓️" },
                  null,
                  { label: "Merchant Account", sub: "Instant Settlement", icon: "🏪" },
                ].map((item, i) => (
                  item === null ? (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0 0.5rem" }}>
                      <div style={{ width: 30, height: 1, background: `linear-gradient(90deg, ${palette.teal}, ${palette.accent})` }}/>
                      <div style={{ color: palette.accent, fontSize: "0.7rem" }}>▶</div>
                    </div>
                  ) : (
                    <div key={i} style={{ textAlign: "center", padding: "1rem 1.25rem", background: palette.bgSection, border: `1px solid ${palette.border}`, borderRadius: "4px", minWidth: 110 }}>
                      <div style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}>{item.icon}</div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: palette.textBright, fontWeight: 700 }}>{item.label}</div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", color: palette.textMuted, marginTop: "0.2rem" }}>{item.sub}</div>
                    </div>
                  )
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "2rem", flexWrap: "wrap" }}>
                {[["⚡ 1–2 seconds", "Transaction speed"], ["🔒 Zero chargeback", "Immutable ledger"], ["💱 Any currency", "Fiat & crypto"]].map(([val, label]) => (
                  <div key={label} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", color: palette.accent }}>{val}</div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: palette.textMuted, marginTop: "0.2rem" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="section-divider"/>

      {/* MARKET */}
      <section id="market" style={{ padding: "6rem 5vw" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.accentDim, letterSpacing: "0.2em", marginBottom: "1rem" }}>THE MARKET</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, color: palette.textBright, marginBottom: "1rem" }}>
              Target verticals with<br/><span style={{ fontStyle: "italic", color: palette.seafoam }}>immediate payment problems</span>
            </h2>
            <p style={{ color: palette.textMuted, maxWidth: 620, lineHeight: 1.7, marginBottom: "3.5rem" }}>
              Rather than compete broadly, Wyrify targets underserved sectors where payments are expensive, blocked, or unavailable — creating rapid, captive adoption.
            </p>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {[
              { icon: "🌿", title: "Legal Cannabis (US)", urgency: 95, desc: "Banks are federally regulated and cannot serve the marijuana industry. Cash-only operations worth billions are ripe for a digital payment alternative. Wyrify solves this with anonymous, instant crypto payments.", pilot: "Live pilots in California" },
              { icon: "🎰", title: "Casino & Gaming", urgency: 85, desc: "International fund movement, winnings management, and instant in-seat payments. Wyrify beacons allow players to stay at their tables while conducting secure transactions.", pilot: "Asia pilot underway" },
              { icon: "🔞", title: "Adult Entertainment", urgency: 80, desc: "High chargeback rates, payment processor restrictions, and piracy losses. Wyrify enables anonymous payments for memberships, content, and live services at drastically lower fees.", pilot: "Platform integration" },
              { icon: "💊", title: "Pharmaceuticals", urgency: 75, desc: "Controlled substances require specialized payment handling. Wyrify's blockchain-verified, instant settlement system provides the compliance and speed pharma merchants need.", pilot: "20+ signed contracts" },
              { icon: "🌍", title: "Unbanked Populations", urgency: 90, desc: "3 billion people lack basic financial services. Any merchant can become a banking point using Wyrify. Our agent network enables P2P transactions, micro-loans, and savings.", pilot: "African gov. discussions" },
              { icon: "🛒", title: "Online Micro-Payments", urgency: 70, desc: "Tipping, betting, paid content appreciation — the web needs a micro-payment layer. Wyrify's backbone handles instant sub-dollar transactions at near-zero cost.", pilot: "API ready" },
            ].map((m, i) => (
              <Reveal key={m.title} delay={i * 0.1}>
                <div className="stat-card" style={{ padding: "1.75rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div style={{ fontSize: "1.8rem" }}>{m.icon}</div>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: palette.tealBright, background: `${palette.teal}22`, padding: "0.2rem 0.5rem", borderRadius: "2px" }}>{m.pilot}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 600, color: palette.textBright, marginBottom: "0.5rem" }}>{m.title}</h3>
                  <div style={{ marginBottom: "0.75rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: palette.textMuted }}>PAYMENT URGENCY</span>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: palette.accent }}>{m.urgency}%</span>
                    </div>
                    <div style={{ height: 4, background: palette.border, borderRadius: 2 }}>
                      <div className="market-bar" style={{ width: `${m.urgency}%`, transition: "width 1.5s ease" }}/>
                    </div>
                  </div>
                  <p style={{ color: palette.textMuted, fontSize: "0.83rem", lineHeight: 1.6 }}>{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"/>

      {/* TECHNOLOGY */}
      <section id="technology" style={{ padding: "6rem 5vw", background: `linear-gradient(155deg, ${palette.bgCard} 0%, ${palette.bg} 60%, ${palette.bgSection} 100%)` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.accentDim, letterSpacing: "0.2em", marginBottom: "1rem" }}>TECHNOLOGY</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, color: palette.textBright, marginBottom: "1rem" }}>
              Proprietary blockchain,<br/><span style={{ fontStyle: "italic", color: palette.seafoam }}>built for commerce</span>
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start", marginTop: "3rem" }}>
            <div>
              {[
                { label: "Proof-of-Stake Protocol", icon: "⛓", desc: "Blackcoin-based PoS node network with dynamic sequencing — eliminates energy-wasting mining while ensuring fast, secure transactions." },
                { label: "Zero-Confirmation Nodes", icon: "⚡", desc: "Trusted nodes receive 'Droplet' dynamic sequencing — enabling zero-confirmation blocks that mint instantly without waiting for network consensus." },
                { label: "Transaction Clustering", icon: "🔄", desc: "Transactions cluster into wallet-to-wallet transfers every second, maintaining full blockchain traceability while achieving massive throughput." },
                { label: "30,000–40,000 TPS", icon: "📊", desc: "Anticipated transactions per second on current node network — far exceeding Bitcoin (7 TPS) or Ethereum (15–45 TPS). Scalable by design." },
                { label: "Zero-Volatility Clearing", icon: "💱", desc: "A fixed-price layer sits above the volatile crypto layer. Merchants charge in fiat, receive fixed-value settlement — eliminating all crypto volatility risk." },
              ].map((t, i) => (
                <Reveal key={t.label} delay={i * 0.1}>
                  <div style={{ display: "flex", gap: "1rem", padding: "1.25rem 0", borderBottom: `1px solid ${palette.border}` }}>
                    <div style={{ width: 40, height: 40, background: `${palette.teal}33`, border: `1px solid ${palette.border}`, borderRadius: "3px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "1.1rem" }}>{t.icon}</div>
                    <div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", color: palette.textBright, fontWeight: 700, marginBottom: "0.3rem" }}>{t.label}</div>
                      <div style={{ color: palette.textMuted, fontSize: "0.83rem", lineHeight: 1.6 }}>{t.desc}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div>
              <Reveal delay={0.2}>
                <div style={{ background: `linear-gradient(135deg, ${palette.bgCard}, ${palette.bgSection})`, border: `1px solid ${palette.border}`, borderRadius: "4px", padding: "2rem" }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: palette.accentDim, letterSpacing: "0.15em", marginBottom: "1.5rem" }}>TECHNOLOGY STACK</div>
                  {[
                    { layer: "Consumer Layer", items: ["Wyrify App (iOS/Android)", "Merchant App", "Online Checkout SDK"], color: palette.seafoam },
                    { layer: "Platform Layer", items: ["Wyrify POS Platform", "Exchange & Wallet", "KYC / UBO Engine"], color: palette.tealBright },
                    { layer: "Transaction Layer", items: ["Transactional Middleware", "Node Sequencing Matrix", "Clustering Engine"], color: palette.accent },
                    { layer: "Blockchain Layer", items: ["NXChain / WBC Blockchain", "PoS Protocol", "Proof-of-Stake Nodes"], color: palette.gold },
                    { layer: "Settlement Layer", items: ["Fiat Banking Integration", "Crypto Exchange", "Fixed-Price Clearing"], color: palette.teal },
                  ].reverse().map((l) => (
                    <div key={l.layer} style={{ marginBottom: "0.75rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                        <div style={{ width: 8, height: 8, background: l.color, borderRadius: "1px" }}/>
                        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", color: l.color, letterSpacing: "0.1em" }}>{l.layer}</span>
                      </div>
                      <div style={{ background: `${l.color}11`, border: `1px solid ${l.color}33`, borderRadius: "3px", padding: "0.6rem 0.75rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                        {l.items.map(item => (
                          <span key={item} style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", color: palette.textMuted }}>{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div style={{ marginTop: "1.5rem", background: `${palette.gold}11`, border: `1px solid ${palette.gold}44`, borderRadius: "4px", padding: "1.5rem" }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", color: palette.gold, letterSpacing: "0.12em", marginBottom: "0.75rem" }}>PROOF OF CONCEPT — DENMARK</div>
                  <p style={{ color: palette.textMuted, fontSize: "0.83rem", lineHeight: 1.6 }}>
                    In 2013, GoAppified created beacon-based payments for MobilePay™ in Denmark. Within <strong style={{ color: palette.textBright }}>two years, 80% of the paying population</strong> had the app. Competitors with 40% market share shut down. Cash use collapsed in small stores. Wyrify has taken this proven model and transformed it for global cryptocurrency use.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"/>

      {/* BUSINESS MODEL */}
      <section style={{ padding: "6rem 5vw" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.accentDim, letterSpacing: "0.2em", marginBottom: "1rem" }}>BUSINESS MODEL & FINANCIALS</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, color: palette.textBright, marginBottom: "3rem" }}>
              Multiple revenue streams,<br/><span style={{ fontStyle: "italic", color: palette.seafoam }}>structurally advantaged</span>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {[
              { stream: "Transaction Fees", rate: "0.5% – 5%+", note: "Base 0.5% for standard merchants, up to 5%+ for high-risk verticals. 50%+ cheaper than competitors.", icon: "💸" },
              { stream: "Currency Swaps", rate: "FX Spread", note: "Revenue on cryptocurrency-to-fiat and fiat-to-cryptocurrency conversions via the integrated exchange.", icon: "💱" },
              { stream: "Exchange Platform", rate: "Trading Fees", note: "Proprietary crypto exchange integrated into the Wyrify platform, capturing additional margin on coin movements.", icon: "📈" },
              { stream: "Integration Fees", rate: "Licensing", note: "White-label implementations, API integrations, and tailored enterprise builds for large customers with custom requirements.", icon: "🔧" },
              { stream: "Joint Ventures", rate: "Revenue Splits", note: "Profit-sharing with industrial players integrating Wyrify into their existing payment infrastructures.", icon: "🤝" },
            ].map((s, i) => (
              <Reveal key={s.stream} delay={i * 0.1}>
                <div className="stat-card">
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>{s.icon}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 600, color: palette.textBright, marginBottom: "0.25rem" }}>{s.stream}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: palette.accent, marginBottom: "0.75rem" }}>{s.rate}</div>
                  <p style={{ color: palette.textMuted, fontSize: "0.82rem", lineHeight: 1.6 }}>{s.note}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div style={{ marginTop: "3rem", background: `linear-gradient(135deg, ${palette.bgCard}, ${palette.bgSection})`, border: `1px solid ${palette.border}`, borderRadius: "4px", padding: "2.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: palette.textBright, marginBottom: "1rem" }}>Investor Path</h3>
                <p style={{ color: palette.textMuted, fontSize: "0.88rem", lineHeight: 1.7 }}>
                  Wyrify is self-funded from founders through initial operations. The company is pursuing listing on German/UK exchanges or a full IPO, pending the success of its initial customer deployments and operational milestones. Founded as a UK entity with FCA engagement and cross-jurisdictional options under consideration.
                </p>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: palette.textBright, marginBottom: "1rem" }}>Competitive Moat</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {[
                    "Only platform fully replacing bank + card at the POS",
                    "Merchant cost of acquisition: ~$3–5 per unit",
                    "No minimum transaction limits — serves micro-payments",
                    "Fixed-rate settlements remove volatility risk for merchants",
                    "Partners with several billion-dollar turnover customers",
                  ].map(p => (
                    <div key={p} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                      <div style={{ color: palette.accent, marginTop: "0.15rem", flexShrink: 0 }}>✓</div>
                      <span style={{ color: palette.textMuted, fontSize: "0.82rem" }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="section-divider"/>

      {/* TEAM */}
      <section id="team" style={{ padding: "6rem 5vw", background: `linear-gradient(155deg, ${palette.bgCard} 0%, ${palette.bg} 60%, ${palette.bgSection} 100%)` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.accentDim, letterSpacing: "0.2em", marginBottom: "1rem" }}>THE TEAM</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, color: palette.textBright, marginBottom: "3rem" }}>
              Industry veterans,<br/><span style={{ fontStyle: "italic", color: palette.seafoam }}>global reach</span>
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {[
              { name: "Henrik Onarheim", role: "CEO & Inventor", detail: "Inventor of the Wyrify platform and NXChain technology. Designed the blockchain transaction layer alongside Thomas Wong.", flag: "🇬🇧" },
              { name: "Thomas Wong", role: "Cryptology Officer", detail: "Security expert, lecturer and cryptographer. Constructed the entire NXChain blockchain platform and primary Wyrify backbones.", flag: "🔐" },
              { name: "Kenneth Olin", role: "COO", detail: "Former operational banking executive with broad technical experience and key involvement in Wyrify development from the beginning.", flag: "🏦" },
              { name: "Dan Sokol", role: "Chief Strategy Advisor", detail: "Long-time technical advisor to Apple co-founder Steve Wozniak. Rare expertise in the intersection of payment hardware and blockchain.", flag: "🍎" },
              { name: "Erik Gravgaard", role: "Chairman / Legal", detail: "Corporate and commercial lawyer specialising in online ventures, gaming, and casino. Legal advisor to the Wyrify project since 2013.", flag: "⚖️" },
              { name: "Wilhelm Castberg", role: "Hardware Advisor", detail: "Director at Atea (ATEA:OSE). Built some of Scandinavia's largest IT broker technology platforms. On the project since 2013.", flag: "🇳🇴" },
              { name: "Sean Tabatabai", role: "CEO NXChain", detail: "CEO of NXChain (NXCN:QB), the first listed digital currency/blockchain company. US cannabis market specialist.", flag: "🌿" },
              { name: "Erik Eklund", role: "Head of Sales, US", detail: "Brought in most of Wyrify's US beta customers since 2014. Manages a pipeline spanning millions of prospective users.", flag: "🇺🇸" },
              { name: "Anisa Budharacha", role: "Sales Asia / ME", detail: "Key ASEAN and Middle East contact covering banking, insurance, and government registry services. Primary door-opener in Asia.", flag: "🌏" },
            ].map((member, i) => (
              <Reveal key={member.name} delay={i * 0.08}>
                <div className="team-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 600, color: palette.textBright }}>{member.name}</div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", color: palette.tealBright, marginTop: "0.15rem", letterSpacing: "0.08em" }}>{member.role}</div>
                    </div>
                    <span style={{ fontSize: "1.2rem" }}>{member.flag}</span>
                  </div>
                  <p style={{ color: palette.textMuted, fontSize: "0.8rem", lineHeight: 1.6, marginTop: "0.75rem" }}>{member.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"/>

      {/* CTA / FOOTER */}
      <section style={{ padding: "8rem 5vw", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, opacity: 0.08, borderRadius: "50%", background: `radial-gradient(circle, ${palette.tealBright}, transparent 70%)`, filter: "blur(80px)", pointerEvents: "none" }}/>
        <Reveal>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.accentDim, letterSpacing: "0.2em", marginBottom: "1.5rem" }}>INVESTOR RELATIONS</div>
          <h2 className="glow-text" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 300, color: palette.textBright, lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Join the payment<br/><span style={{ fontStyle: "italic", color: palette.seafoam }}>revolution</span>
          </h2>
          <p style={{ color: palette.textMuted, maxWidth: 500, margin: "0 auto", lineHeight: 1.7, marginBottom: "3rem" }}>
            Wyrify is seeking strategic partners and investors to accelerate global rollout. The window to enter the POS disruption opportunity is open now.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <div style={{ background: palette.accent, padding: "1rem 2.5rem", borderRadius: "6px", fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#0a1612", letterSpacing: "0.1em", cursor: "pointer", boxShadow: `0 4px 20px ${palette.accent}44` }}>
              REQUEST INVESTOR DECK
            </div>
            <div style={{ border: `1px solid ${palette.border}`, padding: "1rem 2.5rem", borderRadius: "2px", fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: palette.textMuted, letterSpacing: "0.1em", cursor: "pointer" }}>
              SCHEDULE A CALL
            </div>
          </div>
        </Reveal>

        <div style={{ marginTop: "6rem", paddingTop: "3rem", borderTop: `1px solid ${palette.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <svg viewBox="0 0 28 28" fill="none" width="22" height="22">
              <polygon points="14,2 26,8 26,20 14,26 2,20 2,8" fill="none" stroke={palette.accent} strokeWidth="1.5"/>
              <circle cx="14" cy="14" r="3" fill={palette.accent}/>
            </svg>
            <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: "0.85rem", color: palette.textBright }}>WYRIFY</span>
          </div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: palette.textMuted }}>
            © 2019 WYRIFY LTD · ALL RIGHTS RESERVED · CONFIDENTIAL INVESTOR DOCUMENT
          </div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: palette.textMuted }}>
            Whitepaper Q3 – 2019
          </div>
        </div>
      </section>
    </div>
  );
}
