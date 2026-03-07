# Wyrify Investor – oversikt for CTO

Kort teknisk og innholdsoversikt over investor-nettsiden.

---

## Formål

Nettsiden er et **lukket investor-deck** for Wyrify: kun mottakere med brukernavn og passord får tilgang. Brukes til å dele pitch, produkt, marked, teknologi, team og investorkontakt med potensielle investorer.

---

## Teknisk stack

| Område | Valg |
|--------|------|
| **Rammeverk** | React 19 + Vite 7 |
| **Språk** | JavaScript (JSX) |
| **Styling** | Inline styles + `App.css` (inkl. mobil-media queries) |
| **Hosting** | Vercel (CI fra GitHub) |
| **Repo** | GitHub: `Annka72/wyrify-investor` |

Ingen backend: auth er kun frontend (statisk HTML-gate + React).

---

## Autentisering

- **Første lag:** Statisk HTML i `index.html` (generert fra `scripts/gate-index.html` ved build). Bruker ser **kun** innloggingsskjema før noe React lastes.
- **Brukernavn:** `Wyrify`  
- **Passord:** `Wyrify26`
- **Endring av passord:**  
  - HTML-gate: `scripts/gate-index.html` (variablene `USER` og `PASS`).  
  - Reserve (React): `src/AuthGate.jsx` (`INVESTOR_LOGIN`).
- Etter riktig innlogging settes `sessionStorage.wyrify_investor_auth = '1'`, og React-appen lastes (lazy). Ved neste sidevisning i samme fane sjekkes denne nøkkelen, så bruker ikke må logge inn på nytt før fanen lukkes.

---

## Bygg og deploy

- **Build:** `npm run build` → `vite build` + `node scripts/postbuild.cjs`.  
  Postbuild erstatter `dist/index.html` med gaten fra `scripts/gate-index.html` og injiserer riktig script-URL til React-bundle.
- **Output:** `dist/` (statisk). Vercel bygger fra `main` og serverer `dist/`.
- **Cache:** `vercel.json` setter `Cache-Control: no-store` for `/` og `/index.html` slik at innlogging alltid vises med nyeste versjon.

---

## Innhold og struktur (seksjoner)

1. **Overview (Hero)**  
   - Value proposition: «The Future of Payments Is Here».  
   - Kort beskrivelse av Wyrify som non-bank, non-card POS-plattform.  
   - Pills: Instant Settlement, Zero Chargebacks, 0.5% Fee, 1–2 sec Transactions, Any Crypto/Fiat.  
   - CTA: «EXPLORE PLATFORM →», referanse til Q3 2019 Whitepaper.

2. **Key stats**  
   - 40–50% World Population Unbanked (TAM), 60M+ POS dominated by 2 companies, $0 CAC, 1–2s confirmation, 0.5% fee.

3. **The Problem**  
   - Fire kort: Bank Monopoly, Global Exclusion, Crypto Friction, No Real Alternative (VISA/Mastercard, Verifone/Ingenico, unbanked, manglende alternativer).

4. **Product**  
   - Tre søyler: Wyrify Beacon (POS hardware), Wyrify App (customer & merchant), Wyrify Online (e-commerce).  
   - Transaction flow: Customer → Wyrify Beacon → Blockchain (NXChain) → Merchant.  
   - Punkter: 1–2s, zero chargeback, any currency.

5. **Market**  
   - Seks markeder med «Payment Urgency»-bar: Legal Cannabis (US), Casino & Gaming, Adult Entertainment, Pharmaceuticals, Unbanked Populations, Online Micro-Payments.  
   - Korte beskrivelser + pilot/status (f.eks. «Live pilots in California»).

6. **Technology**  
   - PoS-protokoll, Zero-Confirmation Nodes, Transaction Clustering, 30k–40k TPS, Zero-Volatility Clearing.  
   - Technology stack (lag): Consumer, Platform, Transaction, Blockchain, Settlement.  
   - Proof of concept: MobilePay Denmark (GoAppified, 2013).

7. **Business model & financials**  
   - Revenue streams: Transaction Fees (0.5–5%+), Currency Swaps, Exchange Platform, Integration Fees, Joint Ventures.  
   - Investor path (self-funded, listing/IPO, UK entity, FCA).  
   - Competitive moat (fem punkter).

8. **Team**  
   - Ni personer: Henrik Onarheim (CEO & Inventor), Thomas Wong (Cryptology Officer), Kenneth Olin (COO), Dan Sokol, Erik Gravgaard, Wilhelm Castberg, Sean Tabatabai, Erik Eklund, Anisa Budharacha. Rolle og kort bio per person.

9. **Investor relations (CTA + footer)**  
   - «Join the payment revolution», Request Investor Deck, Schedule a Call.  
   - Footer: © 2019 WYRIFY LTD, Whitepaper Q3 – 2019.

---

## Navigasjon og UX

- **Desktop:** Fast toppnav med logo, WYRIFY, lenker (Overview, Product, Market, Technology, Team), «INVESTOR DECK»-badge. Smooth scroll til seksjoner.
- **Mobil (≤768px):** Hamburgermeny; nav-lenker og badge skjult. Hero: mindre typo, CTA full bredde, beacon/glow/grid skjult for ryddig visning.

---

## Viktige filer

| Fil | Rolle |
|-----|--------|
| `scripts/gate-index.html` | Mal for innloggings-HTML (brukernavn/passord). |
| `scripts/postbuild.cjs` | Bytt ut `dist/index.html` med gaten og riktig script-URL. |
| `src/AuthGate.jsx` | Reserve auth + lazy-load av hovedapp. |
| `src/App.jsx` | Hele investor-innholdet (nav, alle seksjoner). |
| `src/App.css` | Globale stiler og mobil-media queries. |
| `vercel.json` | Build/output og cache-headers. |

---

## Fargepalett (ton-i-ton, blåere teal)

- Bakgrunn: `#1D2C2A`  
- Kort/seksjoner: `#243835`, `#1A2826`  
- Accent (lys teal): `#34D4B8`  
- Tekst: `#E0E0E0`, dempet: `#A0A0A0`  
- Ramme: `#2B3B39`  

Paletten er definert i `palette` i `src/App.jsx`.

---

## Sikkerhet og begrensninger

- Auth er **kun frontend**: brukernavn og passord ligger i klartekst i HTML/JS. Tilstrekkelig for «lukket lenke» til investorer, ikke for høyt sensitivt innhold.
- Ingen rate limiting, session timeout eller backend-validering. For strengere krav bør auth flyttes til backend (f.eks. Vercel serverless + session/cookie).

---

*Sist oppdatert: mars 2026*
