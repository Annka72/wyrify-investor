import { useState, useEffect, useRef } from "react";
import "./App.css";
import { QRCodeSVG } from "qrcode.react";
import BeaconIllustration from "./BeaconIllustration.jsx";
import NetworkIllustration from "./NetworkIllustration.jsx";

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

const NAV_ITEMS = [
  { label: "Oversikt", id: "oversikt" },
  { label: "Produkt", id: "produkt" },
  { label: "Marked", id: "marked" },
  { label: "Teknologi", id: "teknologi" },
  { label: "Team", id: "team" },
];

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modal, setModal] = useState(null);

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
          {NAV_ITEMS.map((n) => (
            <span key={n.id} className="nav-link" onClick={() => scrollTo(n.id)}>{n.label}</span>
          ))}
        </div>
        <div className="nav-investor-badge" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: palette.accent, boxShadow: `0 0 8px ${palette.accent}66` }}/>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: palette.textMuted }}>INVESTORPRESENTASJON</span>
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
            OFFLINE BETALINGSINFRASTRUKTUR
            <div className="hero-label-line" style={{ width: 24, height: 1, background: palette.accentDim }}/>
          </div>

          <h1 className="glow-text hero-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3.5rem, 7vw, 6rem)", fontWeight: 300, lineHeight: 0.95, color: palette.textBright, marginBottom: "0.25rem", letterSpacing: "-0.02em" }}>
            Betaling uten<br/>
            <span style={{ fontStyle: "italic", color: palette.seafoam }}>bank eller kort</span><br/>
            <span style={{ fontWeight: 600 }}>Overalt</span>
          </h1>

          <p className="hero-description" style={{ fontSize: "1.1rem", color: palette.textMuted, lineHeight: 1.7, marginTop: "2rem", maxWidth: 520, fontWeight: 300 }}>
            Wyrify er verdens første betalingsplattform som fungerer helt uten bankkort, uten VISA eller Mastercard, og uten internettforbindelse. Vår Bluetooth-baserte beacon-teknologi gjør det mulig å gjennomføre sikre transaksjoner offline — på under to sekunder.
          </p>

          <div className="hero-pills" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "2rem" }}>
            {["Offline-betaling", "Ingen bankkort", "0,5 % gebyr", "1–2 sek. transaksjoner", "Krypto & fiat"].map(tag => (
              <span key={tag} className="feature-pill">{tag}</span>
            ))}
          </div>

          <div className="hero-cta-wrap" style={{ display: "flex", gap: "1.5rem", marginTop: "3rem", alignItems: "center" }}>
            <button onClick={() => scrollTo("produkt")} style={{ background: palette.accent, border: "none", color: "#FFFFFF", padding: "0.85rem 2.5rem", fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.1em", cursor: "pointer", borderRadius: "6px", boxShadow: `0 4px 16px ${palette.accent}33` }}>
              UTFORSK PLATTFORMEN →
            </button>
            <button onClick={() => setModal("whitepaper")} style={{ background: "none", border: `1px solid ${palette.border}`, padding: "0.85rem 2.5rem", fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.1em", cursor: "pointer", borderRadius: "6px", color: palette.textMuted }}>
              WHITEPAPER
            </button>
          </div>
        </div>
      </section>

      <div className="section-divider"/>

      {/* KEY STATS */}
      <section style={{ padding: "5rem 5vw", background: palette.bg }}>
        <div className="wyrify-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", maxWidth: 1100, margin: "0 auto" }}>
          {[
            { value: "3 mrd+", label: "Mennesker uten tilgang til banktjenester globalt", sub: "MÅLGRUPPE" },
            { value: "60M+", label: "POS-terminaler kontrollert av kun to selskaper", sub: "Verifone + Ingenico" },
            { value: "$0", label: "Kostnad for kunden å komme i gang", sub: "Gratis beacon" },
            { value: "1–2s", label: "Transaksjonstid — også uten nettforbindelse", sub: "vs 3–5 dager tradisjonelt" },
            { value: "0,5 %", label: "Transaksjonsgebyr", sub: "vs 3 %+ kortgebyr" },
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

      {/* NETWORK ILLUSTRATION */}
      <section style={{ padding: "5rem 5vw", background: palette.bgSection }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.accentDim, letterSpacing: "0.2em", marginBottom: "1rem", textAlign: "center" }}>SLIK FUNGERER DET</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, color: palette.textBright, marginBottom: "2.5rem", textAlign: "center" }}>
              Fra forhandler til kunde,<br/><span style={{ fontStyle: "italic", color: palette.seafoam }}>via blokkjeden</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <NetworkIllustration />
          </Reveal>
        </div>
      </section>

      <div className="section-divider"/>

      {/* THE PROBLEM */}
      <section style={{ padding: "6rem 5vw" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.accentDim, letterSpacing: "0.2em", marginBottom: "1rem" }}>PROBLEMET</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, color: palette.textBright, marginBottom: "1rem" }}>
              Et betalingssystem bygget<br/><span style={{ fontStyle: "italic", color: palette.seafoam }}>for en annen tid</span>
            </h2>
            <p style={{ color: palette.textMuted, maxWidth: 620, lineHeight: 1.7, marginBottom: "3rem" }}>
              Dagens betalingsinfrastruktur er sentralisert, dyr og ekskluderende. Milliarder av mennesker er utestengt fra det globale økonomiske systemet, og selv de som har tilgang betaler overpris for trege tjenester.
            </p>
          </Reveal>
          <div className="wyrify-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            {[
              { icon: "🏦", title: "Kortmonopolet", body: "VISA og Mastercard kontrollerer over 90 % av alle POS-terminaler gjennom Verifone og Ingenico. Gebyrene er høye (ofte 3 %+), oppgjøret tar dager, og tilbakebetalinger (chargebacks) koster butikkene milliarder hvert år. Systemet er designet for kortutstedernes profitt — ikke for forbrukerne eller selgerne." },
              { icon: "🌍", title: "Global ekskludering", body: "Over tre milliarder mennesker har ingen bankkonto, og dermed ingen mulighet til å delta i digital økonomi. Tradisjonelle betalingssystemer krever bankforbindelse, kredittvurdering og fysisk infrastruktur som ikke finnes i store deler av verden. Disse menneskene er låst ute — ikke fordi teknologien ikke finnes, men fordi den aldri ble laget for dem." },
              { icon: "📡", title: "Avhengighet av nettforbindelse", body: "Nesten alle moderne betalingsløsninger krever stabil internettilgang. I områder med dårlig dekning — utkantstrøk, utviklingsland, festivaler, skip, fjellområder — faller betalingssystemet sammen. Wyrify er designet for å fungere offline via Bluetooth, uavhengig av nettverkstilgang." },
              { icon: "🔒", title: "Ingen reelt alternativ — før nå", body: "POS-markedet har aldri hatt ekte konkurranse. Plastkortet har dominert i over 50 år, og selv nye fintech-løsninger er bygget oppå det samme gamle kortnettverket. Wyrify er fundamentalt annerledes: en fullverdig betalingsplattform som erstatter hele verdikjeden — fra terminal til oppgjør — uten kort, uten bank, uten nettforbindelse." },
            ].map((item, i) => (
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
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.accentDim, letterSpacing: "0.2em", marginBottom: "1rem" }}>PRODUKTET</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, color: palette.textBright, marginBottom: "1rem" }}>
              En komplett betalingsplattform,<br/><span style={{ fontStyle: "italic", color: palette.seafoam }}>bygget fra grunnen av</span>
            </h2>
            <p style={{ color: palette.textMuted, maxWidth: 620, lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Wyrify kombinerer en Bluetooth BLE-basert hardware-beacon, mobilapper for kunder og forhandlere, og en online betalingsløsning — alt drevet av en proprietær proof-of-stake-blokkjede med 1–2 sekunders bekreftelsestid. Plattformen fungerer offline, uten bankkort og uten avhengighet av VISA eller Mastercard.
            </p>
            <div style={{ marginTop: "2rem", marginBottom: "3rem" }}>
              <BeaconIllustration />
            </div>
          </Reveal>

          <div className="wyrify-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "4rem" }}>
            {[
              { num: "01", title: "Wyrify Beacon", subtitle: "POS-hardware", desc: "En Bluetooth Low Energy-terminal som erstatter tradisjonelle kortlesere fullstendig. Forhandlere mottar beaconen gratis og betaler kun 0,5 % per transaksjon. Kunder betaler via Wyrify-appen — uten kort, uten bank, uten nettforbindelse. Beaconen kommuniserer direkte med kundens telefon over BLE, og transaksjonen bekreftes på 1–2 sekunder. Selv uten internett gjennomføres betalingen trygt, og synkroniseres til blokkjeden når tilkobling gjenopprettes.", features: ["BLE / NFC — fungerer offline", "Umiddelbart oppgjør", "Alle kryptovalutaer akseptert", "Null risiko for tilbakebetaling"], color: palette.accent },
              { num: "02", title: "Wyrify App", subtitle: "Kunde & forhandler", desc: "En mobil lommebok som støtter alle kryptovalutaer og fiat-valutaer. Kunder kan holde, veksle og bruke digitale verdier hos enhver Wyrify-tilkoblet forhandler. Forhandlere får bekreftelse på sekunder, med verdi låst umiddelbart. Appen inkluderer innebygd KYC/UBO-verifisering og et komplett dashbord for transaksjonshistorikk og rapportering.", features: ["Flervaluta-lommebok", "Betal med ett klikk", "Forhandler-dashbord", "Innebygd KYC / UBO"], color: palette.seafoam },
              { num: "03", title: "Wyrify Online", subtitle: "Netthandelsløsning", desc: "En plug-in betalingsløsning for netthandel som fungerer via telefonnummer. Kunden mottar en app-varsling, godkjenner transaksjonen, og oppgjøret skjer umiddelbart. Ingen tilbakebetalinger. Fastlåste kurser ved transaksjonstidspunkt. Enkel API-integrasjon for alle e-handelsplattformer, med støtte for mikrobetalinger ned til brøkdeler av en krone.", features: ["Null tilbakebetalinger", "Umiddelbar clearing", "Mikrobetalinger", "Lojalitetsprogram-klar"], color: palette.gold },
            ].map((p, i) => (
              <Reveal key={p.num} delay={i * 0.15}>
                <div style={{ background: palette.bgCard, border: `1px solid ${palette.border}`, borderRadius: "4px", padding: "2rem", height: "100%", position: "relative", overflow: "hidden" }}>
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
            <div style={{ background: palette.bgCard, border: `1px solid ${palette.border}`, borderRadius: "4px", padding: "2.5rem" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.accentDim, letterSpacing: "0.15em", marginBottom: "2rem", textAlign: "center" }}>TRANSAKSJONSFLYT</div>
              <div className="wyrify-flow" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0", flexWrap: "wrap" }}>
                {[
                  { label: "Kunde", sub: "App / Lommebok", icon: "📱" },
                  null,
                  { label: "Wyrify Beacon", sub: "BLE-signal (offline)", icon: "📡" },
                  null,
                  { label: "Blokkjede", sub: "NXChain-node", icon: "⛓️" },
                  null,
                  { label: "Forhandlerkonto", sub: "Umiddelbart oppgjør", icon: "🏪" },
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
                {[["⚡ 1–2 sekunder", "Transaksjonstid"], ["📡 Fungerer offline", "Via Bluetooth BLE"], ["💱 Alle valutaer", "Fiat & krypto"]].map(([val, label]) => (
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
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.accentDim, letterSpacing: "0.2em", marginBottom: "1rem" }}>MARKEDET</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, color: palette.textBright, marginBottom: "1rem" }}>
              Målrettede vertikaler med<br/><span style={{ fontStyle: "italic", color: palette.seafoam }}>akutte betalingsbehov</span>
            </h2>
            <p style={{ color: palette.textMuted, maxWidth: 620, lineHeight: 1.7, marginBottom: "3.5rem" }}>
              Wyrify konkurrerer ikke bredt mot etablerte betalingssystemer. I stedet retter vi oss mot underserviserte sektorer der betalinger er dyre, utilgjengelige eller direkte blokkert — og skaper rask, organisk adopsjon i markeder som desperat trenger en løsning.
            </p>
          </Reveal>

          <div className="wyrify-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {[
              { icon: "🌍", title: "Befolkning uten banktjenester", urgency: 95, desc: "Over tre milliarder mennesker mangler grunnleggende finansielle tjenester. Med Wyrify kan enhver forhandler bli et bankpunkt. Vår agentmodell muliggjør person-til-person-transaksjoner, mikrolån og sparing — alt via en mobiltelefon og en beacon, uten behov for bankkonto eller internettforbindelse.", pilot: "Dialog med afrikanske myndigheter", color: palette.accent },
              { icon: "💊", title: "Farmasøytisk industri", urgency: 85, desc: "Kontrollerte substanser krever spesialisert betalingshåndtering med strenge krav til sporbarhet og compliance. Wyrify sin blokkjedeverifiserte, umiddelbare oppgjørsløsning gir farmasøytiske forhandlere den kombinasjonen av etterlevelse, sikkerhet og hastighet de trenger for å operere effektivt.", pilot: "20+ signerte kontrakter", color: palette.tealBright },
              { icon: "🎰", title: "Casino og spill", urgency: 80, desc: "Internasjonal pengeflyt, gevinsthåndtering og umiddelbare betalinger direkte ved spillebordene. Wyrify-beacons lar spillere gjennomføre sikre transaksjoner uten å forlate plassen sin — med full sporbarhet og umiddelbart oppgjør til operatøren.", pilot: "Pilotprogram i Asia", color: palette.seafoam },
              { icon: "🏪", title: "Detaljhandel i områder uten dekning", urgency: 90, desc: "Butikker i utkantstrøk, på markeder, festivaler og i utviklingsland trenger betalingsløsninger som fungerer uten stabil internettforbindelse. Wyrify sin offline Bluetooth-beacon gjør det mulig å ta imot digitale betalinger selv der mobilnettet svikter.", pilot: "Pilotprosjekter i Skandinavia", color: palette.gold },
              { icon: "🛒", title: "Mikrobetalinger på nett", urgency: 75, desc: "Tips, donasjoner, digitalt innhold og abonnementer til svært lave beløp — nettet trenger et mikrobetalingslag. Wyrify sin infrastruktur håndterer transaksjoner helt ned til brøkdeler av en krone, med nesten null kostnad og umiddelbar bekreftelse.", pilot: "API klar", color: palette.teal },
              { icon: "🚢", title: "Maritim og offshore", urgency: 70, desc: "Skip, oljeplattformer og avsidesliggende arbeidsplasser har begrenset nettilgang. Wyrify sin offline-kapabilitet gjør det mulig å gjennomføre betalinger, lønnsutbetalinger og innkjøp selv midt på havet — med synkronisering til blokkjeden når tilkobling gjenopprettes.", pilot: "I utredning", color: palette.accentDim },
            ].map((m, i) => (
              <Reveal key={m.title} delay={i * 0.1}>
                <div className="stat-card" style={{ padding: "1.75rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div style={{ fontSize: "1.8rem" }}>{m.icon}</div>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: palette.tealBright, background: `${palette.accent}11`, padding: "0.2rem 0.5rem", borderRadius: "2px" }}>{m.pilot}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 600, color: palette.textBright, marginBottom: "0.5rem" }}>{m.title}</h3>
                  <div style={{ marginBottom: "0.75rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: palette.textMuted }}>BETALINGSBEHOV</span>
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
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.accentDim, letterSpacing: "0.2em", marginBottom: "1rem" }}>TEKNOLOGI</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, color: palette.textBright, marginBottom: "1rem" }}>
              Proprietær blokkjede,<br/><span style={{ fontStyle: "italic", color: palette.seafoam }}>bygget for handel</span>
            </h2>
          </Reveal>

          <div className="wyrify-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start", marginTop: "3rem" }}>
            <div>
              {[
                { label: "Proof-of-Stake-protokoll", icon: "⛓", desc: "Blackcoin-basert PoS-nodenettverk med dynamisk sekvensering. Eliminerer energikrevende mining, og sikrer raske, sikre transaksjoner med lavt strømforbruk. Nettverket er desentralisert og skalerbart." },
                { label: "Nullbekreftelses-noder", icon: "⚡", desc: "Betrodde noder mottar «Droplet»-dynamisk sekvensering — dette muliggjør null-bekreftelses-blokker som preges umiddelbart, uten å vente på nettverkskonsensus. Resultatet er at transaksjoner bekreftes på under to sekunder." },
                { label: "Transaksjonsklynging", icon: "🔄", desc: "Transaksjoner grupperes i lommebok-til-lommebok-overføringer hvert sekund, mens full blokkjedesporbarhet opprettholdes. Dette gir enorm gjennomstrømning uten å ofre transparens eller sikkerhet." },
                { label: "30 000–40 000 TPS", icon: "📊", desc: "Forventet transaksjonskapasitet per sekund på nåværende nodenettverk — langt over Bitcoin (7 TPS) og Ethereum (15–45 TPS). Arkitekturen er designet for horisontal skalering etter behov." },
                { label: "Nullvolatilitets-clearing", icon: "💱", desc: "Et fastprislag over det volatile krypto-laget. Forhandlere fakturerer i fiat og mottar oppgjør til fast verdi — all kryptovolatilitetsrisiko elimineres fullstendig for selgeren. Kunden kan betale i valgfri kryptovaluta." },
              ].map((t, i) => (
                <Reveal key={t.label} delay={i * 0.1}>
                  <div style={{ display: "flex", gap: "1rem", padding: "1.25rem 0", borderBottom: `1px solid ${palette.border}` }}>
                    <div style={{ width: 40, height: 40, background: `${palette.accent}15`, border: `1px solid ${palette.border}`, borderRadius: "3px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "1.1rem" }}>{t.icon}</div>
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
                <div style={{ background: palette.bgCard, border: `1px solid ${palette.border}`, borderRadius: "4px", padding: "2rem" }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: palette.accentDim, letterSpacing: "0.15em", marginBottom: "1.5rem" }}>TEKNOLOGISTAKK</div>
                  {[
                    { layer: "Forbrukerlag", items: ["Wyrify App (iOS/Android)", "Forhandler-app", "Netthandel-SDK"], color: palette.seafoam },
                    { layer: "Plattformlag", items: ["Wyrify POS-plattform", "Veksling & lommebok", "KYC / UBO-motor"], color: palette.tealBright },
                    { layer: "Transaksjonslag", items: ["Transaksjonsmellomvare", "Nodesekvensering", "Klystringsmotor"], color: palette.accent },
                    { layer: "Blokkjedelag", items: ["NXChain / WBC", "PoS-protokoll", "PoS-noder"], color: palette.gold },
                    { layer: "Oppgjørslag", items: ["Fiat-bankintegrasjon", "Kryptoveksling", "Fastpris-clearing"], color: palette.teal },
                  ].reverse().map((l) => (
                    <div key={l.layer} style={{ marginBottom: "0.75rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                        <div style={{ width: 8, height: 8, background: l.color, borderRadius: "1px" }}/>
                        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", color: l.color, letterSpacing: "0.1em" }}>{l.layer}</span>
                      </div>
                      <div style={{ background: `${l.color}08`, border: `1px solid ${l.color}22`, borderRadius: "3px", padding: "0.6rem 0.75rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                        {l.items.map(item => (
                          <span key={item} style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", color: palette.textMuted }}>{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div style={{ marginTop: "1.5rem", background: `${palette.accent}08`, border: `1px solid ${palette.accent}22`, borderRadius: "4px", padding: "1.5rem" }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.62rem", color: palette.accent, letterSpacing: "0.12em", marginBottom: "0.75rem" }}>KONSEPTBEVIS — DANMARK</div>
                  <p style={{ color: palette.textMuted, fontSize: "0.83rem", lineHeight: 1.6 }}>
                    I 2013 utviklet GoAppified beacon-baserte betalinger for MobilePay™ i Danmark. Innen <strong style={{ color: palette.textBright }}>to år hadde 80 % av den betalende befolkningen</strong> appen. Konkurrenter med 40 % markedsandel la ned. Kontantbruken i småbutikker kollapset. Wyrify har tatt denne velprøvde modellen og transformert den for global bruk med kryptovaluta og offline-funksjonalitet.
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
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.accentDim, letterSpacing: "0.2em", marginBottom: "1rem" }}>FORRETNINGSMODELL</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, color: palette.textBright, marginBottom: "1rem" }}>
              Flere inntektsstrømmer,<br/><span style={{ fontStyle: "italic", color: palette.seafoam }}>strukturelt fordelaktig</span>
            </h2>
            <p style={{ color: palette.textMuted, maxWidth: 620, lineHeight: 1.7, marginBottom: "3rem" }}>
              Wyrify genererer inntekter fra hver transaksjon, hver valutaveksling og hver integrasjon. Modellen er designet for å skalere globalt med minimale marginalkostnader.
            </p>
          </Reveal>
          <div className="wyrify-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {[
              { stream: "Transaksjonsgebyrer", rate: "0,5 % – 5 %+", note: "Grunngebyr på 0,5 % for standardforhandlere, opptil 5 %+ for høyrisikobransjer. Over 50 % billigere enn tradisjonelle kortgebyrer — og med umiddelbart oppgjør inkludert.", icon: "💸" },
              { stream: "Valutaveksling", rate: "Valutaspread", note: "Inntekter på krypto-til-fiat og fiat-til-krypto-konverteringer via den integrerte vekslingsplattformen. Hver transaksjon som krysser valutagrenser genererer spread-inntekt.", icon: "💱" },
              { stream: "Vekslingsplattform", rate: "Handelsgebyrer", note: "Proprietær kryptobørs integrert i Wyrify-plattformen, som fanger ytterligere margin på alle myntbevegelser og vekslinger innad i økosystemet.", icon: "📈" },
              { stream: "Integrasjonsgebyrer", rate: "Lisensiering", note: "Merkevare-tilpassede implementeringer, API-integrasjoner og skreddersydde enterpriseløsninger for store kunder med spesialtilpassede behov og høye transaksjonsvolumer.", icon: "🔧" },
              { stream: "Samarbeidsprosjekter", rate: "Inntektsdeling", note: "Profittdeling med industrielle aktører som integrerer Wyrify i sine eksisterende betalingsinfrastrukturer, inkludert telekommunikasjon, bank og detaljhandel.", icon: "🤝" },
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
            <div className="wyrify-grid" style={{ marginTop: "3rem", background: palette.bgCard, border: `1px solid ${palette.border}`, borderRadius: "4px", padding: "2.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: palette.textBright, marginBottom: "1rem" }}>Investorløp</h3>
                <p style={{ color: palette.textMuted, fontSize: "0.88rem", lineHeight: 1.7 }}>
                  Wyrify er selvfinansiert av grunnleggerne gjennom den innledende driftsfasen. Selskapet vurderer notering på tyske og britiske børser, alternativt en full børsnotering (IPO), avhengig av resultatene fra de første kundeutrullingene og operasjonelle milepæler. Selskapet er etablert som en britisk enhet med pågående FCA-dialog, og kryssjurisdiksjonelle alternativer er under vurdering.
                </p>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: palette.textBright, marginBottom: "1rem" }}>Konkurransefortrinn</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {[
                    "Eneste plattform som fullt ut erstatter bank + kort ved POS",
                    "Fungerer offline — ingen avhengighet av internett",
                    "Forhandlerkostnad per enhet: ca. $3–5",
                    "Ingen minstegrense — støtter mikrobetalinger",
                    "Fastprisoppgjør fjerner all volatilitetsrisiko for forhandlere",
                    "Samarbeidspartnere med milliardomsetning",
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
      <section id="team" style={{ padding: "6rem 5vw", background: palette.bgSection }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.accentDim, letterSpacing: "0.2em", marginBottom: "1rem" }}>TEAMET</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, color: palette.textBright, marginBottom: "1rem" }}>
              Industriveteraner,<br/><span style={{ fontStyle: "italic", color: palette.seafoam }}>global rekkevidde</span>
            </h2>
            <p style={{ color: palette.textMuted, maxWidth: 620, lineHeight: 1.7, marginBottom: "3rem" }}>
              Wyrify er bygget av et tverrfaglig team med dyp erfaring innen betalingsteknologi, kryptografi, maskinvare og internasjonal forretningsutvikling. Sammen dekker teamet hele verdikjeden — fra blokkjedeprotokoll til salgspipeline.
            </p>
          </Reveal>

          <div className="wyrify-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {[
              { name: "Henrik Onarheim", role: "CEO & oppfinner", detail: "Oppfinner av Wyrify-plattformen og NXChain-teknologien. Designet blokkjedens transaksjonslag sammen med Thomas Wong. Har ledet prosjektet fra idé til fungerende prototyp og internasjonale pilotprosjekter.", flag: "🇬🇧" },
              { name: "Thomas Wong", role: "Kryptologisjef", detail: "Sikkerhetsekspert, foreleser og kryptograf. Har bygget hele NXChain-blokkjedeplattformen og Wyrify sine primære teknologiske ryggrader. Spesialist på kryptografisk protokolldesign og sikker transaksjonshåndtering.", flag: "🔐" },
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
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, opacity: 0.06, borderRadius: "50%", background: `radial-gradient(circle, ${palette.accent}, transparent 70%)`, filter: "blur(80px)", pointerEvents: "none" }}/>
        <Reveal>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: palette.accentDim, letterSpacing: "0.2em", marginBottom: "1.5rem" }}>INVESTORRELASJONER</div>
          <h2 className="glow-text" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 300, color: palette.textBright, lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Bli med på betalings-<br/><span style={{ fontStyle: "italic", color: palette.seafoam }}>revolusjonen</span>
          </h2>
          <p style={{ color: palette.textMuted, maxWidth: 500, margin: "0 auto", lineHeight: 1.7, marginBottom: "3rem" }}>
            Wyrify søker strategiske partnere og investorer for å akselerere den globale utrullingen. Vinduet for å entre POS-disrupsjonsmuligheten er åpent nå. Ta kontakt for å lære mer om hvordan du kan bli en del av fremtidens betalingsinfrastruktur.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setModal("deck")} style={{ background: palette.accent, padding: "1rem 2.5rem", borderRadius: "6px", fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#FFFFFF", letterSpacing: "0.1em", cursor: "pointer", boxShadow: `0 4px 16px ${palette.accent}22`, border: "none" }}>
              BE OM INVESTOR-PRESENTASJON
            </button>
            <button onClick={() => setModal("call")} style={{ border: `1px solid ${palette.border}`, background: palette.bgCard, padding: "1rem 2.5rem", borderRadius: "6px", fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: palette.textMuted, letterSpacing: "0.1em", cursor: "pointer" }}>
              BOOK ET MØTE
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
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: palette.textMuted, letterSpacing: "0.08em" }}>SKANN FOR Å DELE</span>
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
            © 2025 WYRIFY LTD · ALLE RETTIGHETER FORBEHOLDT · KONFIDENSIELT INVESTORDOKUMENT
          </div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: palette.textMuted }}>
            Investorpresentasjon v1.0
          </div>
        </div>
      </section>

      {/* MODALER */}
      <Modal open={modal === "whitepaper"} onClose={() => setModal(null)} title="Wyrify — Whitepaper">
        <p><strong>Wyrify — Fremtidens betalingsinfrastruktur</strong></p>
        <p>Wyrify er en komplett betalingsplattform som erstatter tradisjonelle kortterminaler med Bluetooth-basert beacon-teknologi. Plattformen fungerer uavhengig av VISA, Mastercard og bankinfrastruktur.</p>
        <p style={{ marginTop: "1rem" }}><strong>Nøkkelprinsipper:</strong></p>
        <ul style={{ paddingLeft: "1.25rem", marginTop: "0.5rem" }}>
          <li>Offline-først: Transaksjoner gjennomføres via Bluetooth BLE uten internettforbindelse</li>
          <li>Umiddelbart oppgjør: 1–2 sekunder, sammenlignet med 3–5 dager for tradisjonelle kort</li>
          <li>Null tilbakebetalingsrisiko: Blokkjedebasert, irreversibel bekreftelse</li>
          <li>Universell tilgang: Fungerer for alle — uavhengig av bankkonto eller kredittvurdering</li>
          <li>Fastpris-clearing: Forhandlere er beskyttet mot kryptovolatilitet</li>
        </ul>
        <p style={{ marginTop: "1rem" }}>Plattformen er bygget på NXChain, en proprietær proof-of-stake-blokkjede med kapasitet på 30 000–40 000 transaksjoner per sekund. Systemet er designet for å skalere horisontalt etter behov.</p>
        <p style={{ marginTop: "1rem", fontSize: "0.82rem", color: palette.textMuted }}>For fullstendig whitepaper, ta kontakt med investorrelasjoner.</p>
      </Modal>

      <Modal open={modal === "deck"} onClose={() => setModal(null)} title="Be om investor-presentasjon">
        <p>Takk for din interesse i Wyrify. Vår detaljerte investor-presentasjon inkluderer:</p>
        <ul style={{ paddingLeft: "1.25rem", marginTop: "0.75rem" }}>
          <li>Komplett markedsanalyse og konkurransebildet</li>
          <li>Detaljert teknisk arkitekturoversikt</li>
          <li>Finansielle fremskrivninger og inntektsmodell</li>
          <li>Utrullingsplan og milepæler</li>
          <li>Teamets fullstendige bakgrunn og track record</li>
        </ul>
        <p style={{ marginTop: "1rem" }}>For å motta presentasjonen, vennligst kontakt oss:</p>
        <p style={{ marginTop: "0.75rem" }}>
          <strong>E-post:</strong> investors@wyrify.com<br/>
          <strong>Telefon:</strong> +44 (0) 20 7946 0958
        </p>
        <p style={{ marginTop: "1rem", fontSize: "0.82rem", color: palette.textMuted }}>Vi behandler alle henvendelser konfidensielt og svarer vanligvis innen 24 timer.</p>
      </Modal>

      <Modal open={modal === "call"} onClose={() => setModal(null)} title="Book et møte">
        <p>Vi tilbyr personlige gjennomganger av Wyrify-plattformen for kvalifiserte investorer og strategiske partnere.</p>
        <p style={{ marginTop: "1rem" }}><strong>Hva møtet dekker:</strong></p>
        <ul style={{ paddingLeft: "1.25rem", marginTop: "0.5rem" }}>
          <li>Live demonstrasjon av beacon-teknologien</li>
          <li>Gjennomgang av teknisk arkitektur og blokkjede</li>
          <li>Forretningsmodell og vekstutsikter</li>
          <li>Investeringsmuligheter og strukturer</li>
          <li>Spørsmål og svar med teamet</li>
        </ul>
        <p style={{ marginTop: "1rem" }}>For å booke tid, kontakt oss direkte:</p>
        <p style={{ marginTop: "0.75rem" }}>
          <strong>E-post:</strong> investors@wyrify.com<br/>
          <strong>Telefon:</strong> +44 (0) 20 7946 0958
        </p>
        <p style={{ marginTop: "1rem", fontSize: "0.82rem", color: palette.textMuted }}>Møter kan gjennomføres digitalt (Zoom/Teams) eller fysisk etter avtale.</p>
      </Modal>
    </div>
  );
}
