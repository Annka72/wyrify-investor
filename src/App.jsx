import { useState, useEffect, useRef } from "react";
import "./App.css";
import { QRCodeSVG } from "qrcode.react";
import BeaconIllustration from "./BeaconIllustration.jsx";
import NetworkIllustration from "./NetworkIllustration.jsx";
import translations from "./translations.js";

// Puddergrønn fargepalett – lys, luftig og elegant
const palette = {
  bg: "#F2F7F4",
  bgCard: "#FFFFFF",
  bgSection: "#E8F0EC",
  teal: "#289A85",
  tealLight: "#30BFA0",
  tealBright: "#1E8C74",
  seafoam: "#1E8C74",
  metalDark: "#F5FAF7",
  accent: "#289A85",
  accentDim: "#34A890",
  border: "#D0DDD7",
  text: "#2D3B36",
  textMuted: "#6B7F78",
  textBright: "#1A2E28",
  gold: "#3D8B7A",
  gradBlue: "#F2F7F4",
  gradTeal: "#F2F7F4",
  gradMid: "#F2F7F4",
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

/* Modal-komponent for knapper */
const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: palette.bgCard, border: `1px solid ${palette.border}`, borderRadius: 8, padding: "2.5rem", maxWidth: 600, width: "100%", maxHeight: "80vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 600, color: palette.textBright, margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "1.5rem", color: palette.textMuted, cursor: "pointer", padding: "0.25rem" }}>&times;</button>
        </div>
        <div style={{ color: palette.text, fontSize: "0.92rem", lineHeight: 1.8 }}>{children}</div>
      </div>
    </div>
  );
};

const PRODUCT_COLORS = [palette.accent, palette.seafoam, palette.gold];
const MARKET_COLORS = [palette.accent, palette.tealBright, palette.seafoam, palette.gold, palette.teal, palette.accentDim];
const STACK_COLORS = [palette.seafoam, palette.tealBright, palette.accent, palette.gold, palette.teal];

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [lang, setLang] = useState("no");

  const t = translations[lang];

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
        .wyrify-app .stat-card { background: ${palette.bgCard}; border: 1px solid ${palette.border}; border-radius: 3px; padding: 2rem; transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s; }
        .wyrify-app .stat-card:hover { border-color: ${palette.accent}; transform: translateY(-4px); box-shadow: 0 8px 24px rgba(40,154,133,0.08); }
        .wyrify-app .feature-pill { display: inline-flex; align-items: center; gap: 0.5rem; background: ${palette.bgSection}; border: 1px solid ${palette.border}; border-radius: 2rem; padding: 0.4rem 1rem; font-family: 'Space Mono', monospace; font-size: 0.7rem; color: ${palette.tealBright}; letter-spacing: 0.08em; }
        .wyrify-app .section-divider { height: 1px; background: linear-gradient(90deg, transparent, ${palette.border}, transparent); margin: 0; }
        .wyrify-app .glow-text { text-shadow: none; }
        .wyrify-app .team-card { background: ${palette.bgCard}; border: 1px solid ${palette.border}; border-radius: 4px; padding: 1.5rem; transition: all 0.3s; }
        .wyrify-app .team-card:hover { border-color: ${palette.accent}; box-shadow: 0 4px 16px rgba(40,154,133,0.08); }
        .wyrify-app .market-bar { height: 6px; background: linear-gradient(90deg, ${palette.accent}, ${palette.teal}); border-radius: 3px; }
        .wyrify-app .ticker { font-family: 'Space Mono', monospace; font-size: 0.65rem; color: ${palette.accentDim}; letter-spacing: 0.1em; }
        .wyrify-app .hero-grid { position: absolute; inset: 0; background-image: linear-gradient(${palette.border}33 1px, transparent 1px), linear-gradient(90deg, ${palette.border}33 1px, transparent 1px); background-size: 60px 60px; }
        .wyrify-app .noise-overlay { position: absolute; inset: 0; opacity: 0.015; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size: 200px 200px; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes pulse-ring { 0% { transform: scale(0.9); opacity: 1; } 100% { transform: scale(1.8); opacity: 0; } }
        .wyrify-app .float-anim { animation: float 6s ease-in-out infinite; }
        ::selection { background: ${palette.accent}22; color: ${palette.tealBright}; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${palette.bgSection}; }
        ::-webkit-scrollbar-thumb { background: ${palette.border}; border-radius: 2px; }
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
              <path d="M4,5 C4,14 7.5,17 11,17 C14.5,17 14.5,14 14.5,10" stroke={palette.accent} strokeWidth="2" strokeLinecap="round" fill="none"/>
              <path d="M12,6 C12,14 15.5,17 19,17 C22.5,17 24,14 24,10" stroke={palette.accent} strokeWidth="2" strokeLinecap="round" fill="none"/>
              <path d="M24,10 C24,15 24,22 19,25" stroke={palette.accent} strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
          <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: "0.95rem", color: palette.textBright, letterSpacing: "0.15em" }}>WYRIFY</span>
        </div>
        <div className="nav-desktop-links" style={{ display: "flex", gap: "2rem" }}>
          {t.nav.items.map((n) => (
            <span key={n.id} className="nav-link" onClick={() => scrollTo(n.id)}>{n.label}</span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            type="button"
            onClick={() => setLang(lang === "no" ? "en" : "no")}
            style={{
              background: "none",
              border: `1px solid ${palette.border}`,
              borderRadius: "3px",
              padding: "0.25rem 0.6rem",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.65rem",
              fontWeight: 700,
              color: palette.accent,
              cursor: "pointer",
              letterSpacing: "0.08em",
              transition: "border-color 0.3s, color 0.3s",
            }}
          >
            {lang === "no" ? "EN" : "NO"}
          </button>
          <div className="nav-investor-badge" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: palette.accent, boxShadow: `0 0 8px ${palette.accent}66` }}/>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: palette.textMuted }}>{t.nav.investorBadge}</span>
          </div>
        </div>
        <button type="button" className="nav-mobile-toggle" aria-label={t.nav.menuAriaLabel} onClick={() => setMobileMenuOpen((o) => !o)} style={{ display: "none", background: "none", border: "none", padding: "0.5rem", cursor: "pointer", color: palette.text }}>
          {mobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          )}
        </button>
        <div className={`nav-mobile-menu ${mobileMenuOpen ? "" : "nav-mobile-menu--closed"}`} style={{ width: "100%", flexDirection: "column", gap: "0.75rem", paddingTop: "1rem", borderTop: `1px solid ${palette.border}` }}>
          {t.nav.items.map((n) => (
            <span key={n.id} className="nav-link" style={{ padding: "0.5rem 0", fontSize: "0.85rem" }} onClick={() => scrollTo(n.id)}>{n.label}</span>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="oversikt" className="hero-section" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", padding: "0 5vw", background: `linear-gradient(145deg, ${palette.bgCard} 0%, ${palette.bg} 40%, ${palette.bgSection} 100%)` }}>
        <div className="hero-glow" style={{ position: "absolute", left: "-10%", top: "-15%", width: "55vw", height: "55vw", borderRadius: "50%", background: `radial-gradient(circle, ${palette.accent}11 0%, transparent 70%)`, filter: "blur(60px)", pointerEvents: "none" }}/>
        <div className="hero-grid"/>
        <div className="noise-overlay"/>

        <div className="hero-beacon float-anim" style={{ position: "absolute", right: "10%", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", justifyContent: "center", width: 320, height: 320 }}>
          {[1, 1.5, 2, 2.5].map((s, i) => (
            <div key={i} style={{ position: "absolute", width: 80 * s, height: 80 * s, borderRadius: "50%", border: `1px solid ${palette.accent}${Math.floor(30 - i * 6).toString(16).padStart(2,"0")}`, animation: `pulse-ring ${2 + i * 0.5}s ease-out ${i * 0.4}s infinite` }}/>
          ))}
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, ${palette.teal}, ${palette.tealBright})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 30px ${palette.accent}33, 0 0 60px ${palette.teal}22` }}>
            <svg viewBox="0 0 40 40" fill="none" width="42" height="42">
              <path d="M6,8 C6,20 11,25 16,25 C21,25 21,20 21,15" stroke={palette.bgCard} strokeWidth="2.8" strokeLinecap="round" fill="none"/>
              <path d="M17,10 C17,20 22,25 27,25 C32,25 34,20 34,15" stroke={palette.bgCard} strokeWidth="2.8" strokeLinecap="round" fill="none"/>
              <path d="M34,15 C34,22 34,32 27,36" stroke={palette.bgCard} strokeWidth="2.8" strokeLinecap="round" fill="none"/>
            </svg>
          </div>
        </div>

        <div className="hero-content" style={{ position: "relative", zIndex: 2, maxWidth: 680 }}>
          <div className="hero-label" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.accentDim, letterSpacing: "0.2em", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div className="hero-label-line" style={{ width: 24, height: 1, background: palette.accentDim }}/>
            {t.hero.label}
            <div className="hero-label-line" style={{ width: 24, height: 1, background: palette.accentDim }}/>
          </div>

          <h1 className="glow-text hero-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3.5rem, 7vw, 6rem)", fontWeight: 300, lineHeight: 0.95, color: palette.textBright, marginBottom: "0.25rem", letterSpacing: "-0.02em" }}>
            {t.hero.titleLine1}<br/>
            <span style={{ fontStyle: "italic", color: palette.seafoam }}>{t.hero.titleLine2}</span><br/>
            <span style={{ fontWeight: 600 }}>{t.hero.titleLine3}</span>
          </h1>

          <p className="hero-description" style={{ fontSize: "1.1rem", color: palette.textMuted, lineHeight: 1.7, marginTop: "2rem", maxWidth: 520, fontWeight: 300 }}>
            {t.hero.description}
          </p>

          <div className="hero-pills" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "2rem" }}>
            {t.hero.pills.map(tag => (
              <span key={tag} className="feature-pill">{tag}</span>
            ))}
          </div>

          <div className="hero-cta-wrap" style={{ display: "flex", gap: "1.5rem", marginTop: "3rem", alignItems: "center" }}>
            <button onClick={() => scrollTo("produkt")} style={{ background: palette.accent, border: "none", color: "#FFFFFF", padding: "0.85rem 2.5rem", fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.1em", cursor: "pointer", borderRadius: "6px", boxShadow: `0 4px 16px ${palette.accent}33` }}>
              {t.hero.ctaExplore}
            </button>
            <button onClick={() => setModal("whitepaper")} style={{ background: "none", border: `1px solid ${palette.border}`, padding: "0.85rem 2.5rem", fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.1em", cursor: "pointer", borderRadius: "6px", color: palette.textMuted }}>
              {t.hero.ctaWhitepaper}
            </button>
          </div>
        </div>
      </section>

      <div className="section-divider"/>

      {/* KEY STATS */}
      <section style={{ padding: "5rem 5vw", background: palette.bg }}>
        <div className="wyrify-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", maxWidth: 1100, margin: "0 auto" }}>
          {t.stats.map((s, i) => (
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

      {/* NETWORK ILLUSTRATION */}
      <section style={{ padding: "5rem 5vw", background: palette.bgSection }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.accentDim, letterSpacing: "0.2em", marginBottom: "1rem", textAlign: "center" }}>{t.network.label}</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, color: palette.textBright, marginBottom: "2.5rem", textAlign: "center" }}>
              {t.network.titleLine1}<br/><span style={{ fontStyle: "italic", color: palette.seafoam }}>{t.network.titleLine2}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <NetworkIllustration lang={lang} />
          </Reveal>
        </div>
      </section>

      <div className="section-divider"/>

      {/* THE PROBLEM */}
      <section style={{ padding: "6rem 5vw" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.accentDim, letterSpacing: "0.2em", marginBottom: "1rem" }}>{t.problem.label}</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, color: palette.textBright, marginBottom: "1rem" }}>
              {t.problem.titleLine1}<br/><span style={{ fontStyle: "italic", color: palette.seafoam }}>{t.problem.titleLine2}</span>
            </h2>
            <p style={{ color: palette.textMuted, maxWidth: 620, lineHeight: 1.7, marginBottom: "3rem" }}>
              {t.problem.description}
            </p>
          </Reveal>
          <div className="wyrify-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            {t.problem.cards.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.15}>
                <div style={{ background: palette.bgCard, border: `1px solid ${palette.border}`, borderRadius: "4px", padding: "2rem" }}>
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
      <section id="produkt" style={{ padding: "6rem 5vw", background: palette.bgSection }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.accentDim, letterSpacing: "0.2em", marginBottom: "1rem" }}>{t.product.label}</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, color: palette.textBright, marginBottom: "1rem" }}>
              {t.product.titleLine1}<br/><span style={{ fontStyle: "italic", color: palette.seafoam }}>{t.product.titleLine2}</span>
            </h2>
            <p style={{ color: palette.textMuted, maxWidth: 620, lineHeight: 1.7, marginBottom: "1.5rem" }}>
              {t.product.description}
            </p>
            <div style={{ marginTop: "2rem", marginBottom: "3rem" }}>
              <BeaconIllustration lang={lang} />
            </div>
          </Reveal>

          <div className="wyrify-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "4rem" }}>
            {t.product.cards.map((pc, i) => (
              <Reveal key={pc.num} delay={i * 0.15}>
                <div style={{ background: palette.bgCard, border: `1px solid ${palette.border}`, borderRadius: "4px", padding: "2rem", height: "100%", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${PRODUCT_COLORS[i]}, transparent)` }}/>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: PRODUCT_COLORS[i], letterSpacing: "0.15em", marginBottom: "0.5rem" }}>{pc.num} — {pc.subtitle}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 600, color: palette.textBright, marginBottom: "1rem" }}>{pc.title}</h3>
                  <p style={{ color: palette.textMuted, fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>{pc.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {pc.features.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: PRODUCT_COLORS[i], flexShrink: 0 }}/>
                        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", color: palette.textMuted }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{ background: palette.bgCard, border: `1px solid ${palette.border}`, borderRadius: "4px", padding: "2.5rem" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.accentDim, letterSpacing: "0.15em", marginBottom: "2rem", textAlign: "center" }}>{t.product.flowLabel}</div>
              <div className="wyrify-flow" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0", flexWrap: "wrap" }}>
                {t.product.flowSteps.map((step, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center" }}>
                    {i > 0 && (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0 0.5rem" }}>
                        <div style={{ width: 30, height: 1, background: `linear-gradient(90deg, ${palette.teal}, ${palette.accent})` }}/>
                        <div style={{ color: palette.accent, fontSize: "0.7rem" }}>▶</div>
                      </div>
                    )}
                    <div style={{ textAlign: "center", padding: "1rem 1.25rem", background: palette.bgSection, border: `1px solid ${palette.border}`, borderRadius: "4px", minWidth: 110 }}>
                      <div style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}>{step.icon}</div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: palette.textBright, fontWeight: 700 }}>{step.label}</div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.58rem", color: palette.textMuted, marginTop: "0.2rem" }}>{step.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "2rem", flexWrap: "wrap" }}>
                {t.product.flowStats.map(([val, label]) => (
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
      <section id="marked" style={{ padding: "6rem 5vw" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.accentDim, letterSpacing: "0.2em", marginBottom: "1rem" }}>{t.market.label}</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, color: palette.textBright, marginBottom: "1rem" }}>
              {t.market.titleLine1}<br/><span style={{ fontStyle: "italic", color: palette.seafoam }}>{t.market.titleLine2}</span>
            </h2>
            <p style={{ color: palette.textMuted, maxWidth: 620, lineHeight: 1.7, marginBottom: "3.5rem" }}>
              {t.market.description}
            </p>
          </Reveal>

          <div className="wyrify-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {t.market.cards.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.1}>
                <div className="stat-card" style={{ padding: "1.75rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div style={{ fontSize: "1.8rem" }}>{m.icon}</div>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: palette.tealBright, background: `${palette.accent}11`, padding: "0.2rem 0.5rem", borderRadius: "2px" }}>{m.pilot}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 600, color: palette.textBright, marginBottom: "0.5rem" }}>{m.title}</h3>
                  <div style={{ marginBottom: "0.75rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: palette.textMuted }}>{t.market.urgencyLabel}</span>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: palette.accent }}>{m.urgency}%</span>
                    </div>
                    <div style={{ height: 4, background: palette.bgSection, borderRadius: 2 }}>
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
      <section id="teknologi" style={{ padding: "6rem 5vw", background: palette.bgSection }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.accentDim, letterSpacing: "0.2em", marginBottom: "1rem" }}>{t.technology.label}</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, color: palette.textBright, marginBottom: "1rem" }}>
              {t.technology.titleLine1}<br/><span style={{ fontStyle: "italic", color: palette.seafoam }}>{t.technology.titleLine2}</span>
            </h2>
          </Reveal>

          <div className="wyrify-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start", marginTop: "3rem" }}>
            <div>
              {t.technology.items.map((ti, i) => (
                <Reveal key={ti.label} delay={i * 0.1}>
                  <div style={{ display: "flex", gap: "1rem", padding: "1.25rem 0", borderBottom: `1px solid ${palette.border}` }}>
                    <div style={{ width: 40, height: 40, background: `${palette.accent}15`, border: `1px solid ${palette.border}`, borderRadius: "3px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "1.1rem" }}>{ti.icon}</div>
                    <div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", color: palette.textBright, fontWeight: 700, marginBottom: "0.3rem" }}>{ti.label}</div>
                      <div style={{ color: palette.textMuted, fontSize: "0.83rem", lineHeight: 1.6 }}>{ti.desc}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div>
              <Reveal delay={0.2}>
                <div style={{ background: palette.bgCard, border: `1px solid ${palette.border}`, borderRadius: "4px", padding: "2rem" }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: palette.accentDim, letterSpacing: "0.15em", marginBottom: "1.5rem" }}>{t.technology.stackLabel}</div>
                  {[...t.technology.stackLayers].reverse().map((l, idx) => {
                    const colorIdx = t.technology.stackLayers.length - 1 - idx;
                    const color = STACK_COLORS[colorIdx];
                    return (
                      <div key={l.layer} style={{ marginBottom: "0.75rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                          <div style={{ width: 8, height: 8, background: color, borderRadius: "1px" }}/>
                          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", color: color, letterSpacing: "0.1em" }}>{l.layer}</span>
                        </div>
                        <div style={{ background: `${color}08`, border: `1px solid ${color}22`, borderRadius: "3px", padding: "0.6rem 0.75rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                          {l.items.map(item => (
                            <span key={item} style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", color: palette.textMuted }}>{item}</span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div style={{ marginTop: "1.5rem", background: `${palette.accent}08`, border: `1px solid ${palette.accent}22`, borderRadius: "4px", padding: "1.5rem" }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", color: palette.accent, letterSpacing: "0.12em", marginBottom: "0.75rem" }}>{t.technology.proofLabel}</div>
                  <p style={{ color: palette.textMuted, fontSize: "0.83rem", lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: t.technology.proofText }} />
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
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.accentDim, letterSpacing: "0.2em", marginBottom: "1rem" }}>{t.business.label}</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, color: palette.textBright, marginBottom: "1rem" }}>
              {t.business.titleLine1}<br/><span style={{ fontStyle: "italic", color: palette.seafoam }}>{t.business.titleLine2}</span>
            </h2>
            <p style={{ color: palette.textMuted, maxWidth: 620, lineHeight: 1.7, marginBottom: "3rem" }}>
              {t.business.description}
            </p>
          </Reveal>
          <div className="wyrify-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {t.business.streams.map((s, i) => (
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
            <div className="wyrify-grid" style={{ marginTop: "3rem", background: palette.bgCard, border: `1px solid ${palette.border}`, borderRadius: "4px", padding: "2.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: palette.textBright, marginBottom: "1rem" }}>{t.business.investorTitle}</h3>
                <p style={{ color: palette.textMuted, fontSize: "0.88rem", lineHeight: 1.7 }}>
                  {t.business.investorText}
                </p>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: palette.textBright, marginBottom: "1rem" }}>{t.business.advantageTitle}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {t.business.advantages.map(adv => (
                    <div key={adv} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                      <div style={{ color: palette.accent, marginTop: "0.15rem", flexShrink: 0 }}>✓</div>
                      <span style={{ color: palette.textMuted, fontSize: "0.82rem" }}>{adv}</span>
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
      <section id="team" style={{ padding: "6rem 5vw", background: palette.bgSection }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.accentDim, letterSpacing: "0.2em", marginBottom: "1rem" }}>{t.team.label}</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, color: palette.textBright, marginBottom: "1rem" }}>
              {t.team.titleLine1}<br/><span style={{ fontStyle: "italic", color: palette.seafoam }}>{t.team.titleLine2}</span>
            </h2>
            <p style={{ color: palette.textMuted, maxWidth: 620, lineHeight: 1.7, marginBottom: "3rem" }}>
              {t.team.description}
            </p>
          </Reveal>

          <div className="wyrify-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {t.team.members.map((member, i) => (
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
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, opacity: 0.06, borderRadius: "50%", background: `radial-gradient(circle, ${palette.accent}, transparent 70%)`, filter: "blur(80px)", pointerEvents: "none" }}/>
        <Reveal>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.accentDim, letterSpacing: "0.2em", marginBottom: "1.5rem" }}>{t.cta.label}</div>
          <h2 className="glow-text" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 300, color: palette.textBright, lineHeight: 1.1, marginBottom: "1.5rem" }}>
            {t.cta.titleLine1}<br/><span style={{ fontStyle: "italic", color: palette.seafoam }}>{t.cta.titleLine2}</span>
          </h2>
          <p style={{ color: palette.textMuted, maxWidth: 500, margin: "0 auto", lineHeight: 1.7, marginBottom: "3rem" }}>
            {t.cta.description}
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setModal("deck")} style={{ background: palette.accent, padding: "1rem 2.5rem", borderRadius: "6px", fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#FFFFFF", letterSpacing: "0.1em", cursor: "pointer", boxShadow: `0 4px 16px ${palette.accent}22`, border: "none" }}>
              {t.cta.ctaDeck}
            </button>
            <button onClick={() => setModal("call")} style={{ border: `1px solid ${palette.border}`, background: palette.bgCard, padding: "1rem 2.5rem", borderRadius: "6px", fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: palette.textMuted, letterSpacing: "0.1em", cursor: "pointer" }}>
              {t.cta.ctaCall}
            </button>
          </div>
        </Reveal>

        {/* QR-kode for deling */}
        <div style={{ marginTop: "4rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ background: palette.bgCard, padding: "1rem", borderRadius: "8px", border: `1px solid ${palette.border}` }}>
            <QRCodeSVG
              value="https://wyrify-investor-deploy.vercel.app/"
              size={120}
              bgColor={palette.bgCard}
              fgColor={palette.textBright}
              level="M"
            />
          </div>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: palette.textMuted, letterSpacing: "0.08em" }}>{t.cta.qrLabel}</span>
        </div>

        <div className="wyrify-footer" style={{ marginTop: "4rem", paddingTop: "3rem", borderTop: `1px solid ${palette.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <svg viewBox="0 0 28 28" fill="none" width="22" height="22">
              <path d="M4,5 C4,14 7.5,17 11,17 C14.5,17 14.5,14 14.5,10" stroke={palette.accent} strokeWidth="2" strokeLinecap="round" fill="none"/>
              <path d="M12,6 C12,14 15.5,17 19,17 C22.5,17 24,14 24,10" stroke={palette.accent} strokeWidth="2" strokeLinecap="round" fill="none"/>
              <path d="M24,10 C24,15 24,22 19,25" stroke={palette.accent} strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
            <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: "0.85rem", color: palette.textBright }}>WYRIFY</span>
          </div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: palette.textMuted }}>
            {t.footer.copyright}
          </div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: palette.textMuted }}>
            {t.footer.version}
          </div>
        </div>
      </section>

      {/* MODALER */}
      <Modal open={modal === "whitepaper"} onClose={() => setModal(null)} title={t.modals.whitepaper.title}>
        <p><strong>{t.modals.whitepaper.intro}</strong></p>
        <p>{t.modals.whitepaper.body}</p>
        <p style={{ marginTop: "1rem" }}><strong>{t.modals.whitepaper.principlesTitle}</strong></p>
        <ul style={{ paddingLeft: "1.25rem", marginTop: "0.5rem" }}>
          {t.modals.whitepaper.principles.map(p => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <p style={{ marginTop: "1rem" }}>{t.modals.whitepaper.techNote}</p>
        <p style={{ marginTop: "1rem", fontSize: "0.82rem", color: palette.textMuted }}>{t.modals.whitepaper.contactNote}</p>
      </Modal>

      <Modal open={modal === "deck"} onClose={() => setModal(null)} title={t.modals.deck.title}>
        <p>{t.modals.deck.intro}</p>
        <ul style={{ paddingLeft: "1.25rem", marginTop: "0.75rem" }}>
          {t.modals.deck.items.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p style={{ marginTop: "1rem" }}>{t.modals.deck.contactIntro}</p>
        <p style={{ marginTop: "0.75rem" }}>
          <strong>{t.modals.deck.emailLabel}</strong> investors@wyrify.com<br/>
          <strong>{t.modals.deck.phoneLabel}</strong> +44 (0) 20 7946 0958
        </p>
        <p style={{ marginTop: "1rem", fontSize: "0.82rem", color: palette.textMuted }}>{t.modals.deck.contactNote}</p>
      </Modal>

      <Modal open={modal === "call"} onClose={() => setModal(null)} title={t.modals.call.title}>
        <p>{t.modals.call.intro}</p>
        <p style={{ marginTop: "1rem" }}><strong>{t.modals.call.coversTitle}</strong></p>
        <ul style={{ paddingLeft: "1.25rem", marginTop: "0.5rem" }}>
          {t.modals.call.covers.map(c => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <p style={{ marginTop: "1rem" }}>{t.modals.call.contactIntro}</p>
        <p style={{ marginTop: "0.75rem" }}>
          <strong>{t.modals.call.emailLabel}</strong> investors@wyrify.com<br/>
          <strong>{t.modals.call.phoneLabel}</strong> +44 (0) 20 7946 0958
        </p>
        <p style={{ marginTop: "1rem", fontSize: "0.82rem", color: palette.textMuted }}>{t.modals.call.contactNote}</p>
      </Modal>
    </div>
  );
}
