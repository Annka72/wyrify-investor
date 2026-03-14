import translations from "./translations.js";

const p = {
  bg: "#1B2A2E",
  accent: "#4DB897",
  teal: "#4DB897",
  tealBright: "#5CCAA6",
  border: "#2E4245",
  text: "#C8D5D0",
  textMuted: "#8A9E97",
  light: "#192527",
  chain: "#8A9E97",
  chainLight: "#6B8A82",
  flow: "#4DB897",
  bgCard: "#223538",
};

/* En enkelt kjedelenke (X-form) */
const ChainLink = ({ x, y, rotation = 0, scale = 1 }) => (
  <g transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${scale})`}>
    <ellipse rx="8" ry="5" fill="none" stroke={p.chain} strokeWidth="2.2" />
  </g>
);

/* Animert kjede langs en rett linje */
const AnimatedChain = ({ x1, y1, x2, y2, id, delay = 0 }) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  const count = Math.floor(len / 14);

  return (
    <g>
      {/* Kjedelenker */}
      {Array.from({ length: count }).map((_, i) => {
        const t = (i + 0.5) / count;
        const cx = x1 + dx * t;
        const cy = y1 + dy * t;
        const rot = angle + (i % 2 === 0 ? 30 : -30);
        return <ChainLink key={i} x={cx} y={cy} rotation={rot} scale={0.9} />;
      })}

      {/* Animert "puls" som reiser langs kjeden */}
      <circle r="5" fill={p.accent} opacity="0.8">
        <animateMotion
          dur="2.5s"
          begin={`${delay}s`}
          repeatCount="indefinite"
          path={`M${x1},${y1} L${x2},${y2}`}
        />
        <animate attributeName="opacity" values="0;0.9;0.9;0" dur="2.5s" begin={`${delay}s`} repeatCount="indefinite" />
        <animate attributeName="r" values="3;6;3" dur="2.5s" begin={`${delay}s`} repeatCount="indefinite" />
      </circle>
      <circle r="5" fill={p.accent} opacity="0">
        <animateMotion
          dur="2.5s"
          begin={`${delay + 1.2}s`}
          repeatCount="indefinite"
          path={`M${x1},${y1} L${x2},${y2}`}
        />
        <animate attributeName="opacity" values="0;0.7;0.7;0" dur="2.5s" begin={`${delay + 1.2}s`} repeatCount="indefinite" />
        <animate attributeName="r" values="3;5;3" dur="2.5s" begin={`${delay + 1.2}s`} repeatCount="indefinite" />
      </circle>
    </g>
  );
};

/* Wyrify W-logo */
const WyrifyLogo = ({ x, y, size = 1, color = p.accent }) => (
  <g transform={`translate(${x}, ${y}) scale(${size})`}>
    <path d="M-16,-8 C-16,6 -10,10 -4,10 C2,10 2,6 2,0" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M-2,-6 C-2,6 4,10 10,10 C16,10 18,6 18,0" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M18,0 C18,8 18,18 10,22" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </g>
);

/* Telefon-ikon */
const Phone = ({ x, y, label }) => (
  <g transform={`translate(${x}, ${y})`}>
    <rect x="-28" y="-48" width="56" height="96" rx="10" fill={p.text} />
    <rect x="-24" y="-40" width="48" height="76" rx="4" fill={p.bg} />
    {/* Skjerminnhold */}
    <circle cx="0" cy="-18" r="10" fill={`${p.accent}18`} stroke={p.accent} strokeWidth="1" />
    <WyrifyLogo x="0" y="-18" size={0.4} color={p.accent} />
    <rect x="-14" y="0" width="28" height="4" rx="2" fill={p.border} />
    <rect x="-10" y="8" width="20" height="4" rx="2" fill={p.border} />
    <rect x="-12" y="18" width="24" height="10" rx="5" fill={p.accent} />
    {/* Hjemknapp */}
    <rect x="-10" y="40" width="20" height="3" rx="1.5" fill={p.chainLight} />
    {/* Label */}
    <text x="0" y="68" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="10" fill={p.textMuted} letterSpacing="0.1em">{label}</text>
  </g>
);

export default function NetworkIllustration({ lang = "no" }) {
  const il = translations[lang].illustrations;

  // Posisjoner for de fire nodene (trekant + bunn)
  const cloud = { x: 400, y: 65 };
  const merchant = { x: 130, y: 290 };
  const customer = { x: 670, y: 290 };
  const payment = { x: 400, y: 420 };

  return (
    <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 720, height: "auto", display: "block", margin: "0 auto" }}>
      <defs>
        <filter id="nGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="flowArrow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={p.flow} stopOpacity="0.2" />
          <stop offset="50%" stopColor={p.flow} stopOpacity="0.6" />
          <stop offset="100%" stopColor={p.flow} stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* === ANIMERTE KJEDER === */}
      {/* Sky -> Forhandler */}
      <AnimatedChain x1={cloud.x - 30} y1={cloud.y + 40} x2={merchant.x + 40} y2={merchant.y - 50} id="chain1" delay={0} />
      {/* Sky -> Kunde */}
      <AnimatedChain x1={cloud.x + 30} y1={cloud.y + 40} x2={customer.x - 40} y2={customer.y - 50} id="chain2" delay={0.8} />
      {/* Forhandler -> Kunde (horisontal) */}
      <AnimatedChain x1={merchant.x + 55} y1={merchant.y} x2={customer.x - 55} y2={customer.y} id="chain3" delay={0.4} />

      {/* === BUEDE FLYT-PILER (forhandler <-> betaling <-> kunde) === */}
      <path d={`M${merchant.x + 20},${merchant.y + 40} Q${merchant.x + 60},${payment.y + 10} ${payment.x - 40},${payment.y}`}
        stroke={p.flow} strokeWidth="2" fill="none" strokeDasharray="6,4" opacity="0.5">
        <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.5s" repeatCount="indefinite" />
      </path>
      <path d={`M${payment.x + 40},${payment.y} Q${customer.x - 60},${payment.y + 10} ${customer.x - 20},${customer.y + 40}`}
        stroke={p.flow} strokeWidth="2" fill="none" strokeDasharray="6,4" opacity="0.5">
        <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.5s" repeatCount="indefinite" />
      </path>

      {/* === KRYPTO-NODENETTVERK (sky med lås) === */}
      <g transform={`translate(${cloud.x}, ${cloud.y})`}>
        {/* Sky-form */}
        <ellipse cx="0" cy="0" rx="60" ry="35" fill={p.light} stroke={p.border} strokeWidth="1.5" />
        <ellipse cx="-25" cy="-8" rx="25" ry="22" fill={p.light} stroke={p.border} strokeWidth="1.5" />
        <ellipse cx="25" cy="-8" rx="25" ry="22" fill={p.light} stroke={p.border} strokeWidth="1.5" />
        {/* Fyll midten */}
        <ellipse cx="0" cy="-2" rx="40" ry="24" fill={p.light} />

        {/* Lås-ikon */}
        <rect x="-8" y="-6" width="16" height="14" rx="3" fill={p.accent} />
        <path d="M-5,-6 C-5,-14 5,-14 5,-6" stroke={p.accent} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="0" cy="2" r="2" fill={p.bg} />

        {/* Pulserende ring */}
        <ellipse cx="0" cy="0" rx="55" ry="32" fill="none" stroke={p.accent} strokeWidth="1" opacity="0.2">
          <animate attributeName="rx" values="55;70;55" dur="3s" repeatCount="indefinite" />
          <animate attributeName="ry" values="32;42;32" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.25;0;0.25" dur="3s" repeatCount="indefinite" />
        </ellipse>

        {/* Label */}
        <text x="0" y="55" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="9.5" fill={p.textMuted} letterSpacing="0.08em">{il.cryptoNetwork}</text>
      </g>

      {/* === FORHANDLER (venstre) === */}
      <g transform={`translate(${merchant.x}, ${merchant.y})`}>
        {/* Butikk-ikon */}
        <rect x="-35" y="-30" width="70" height="50" rx="4" fill={p.bgCard || "#FFFFFF"} stroke={p.border} strokeWidth="1.5" />
        {/* Tak */}
        <path d="M-40,-30 L0,-48 L40,-30" fill={p.light} stroke={p.border} strokeWidth="1.5" />
        {/* Dør */}
        <rect x="-8" y="0" width="16" height="20" rx="2" fill={p.light} stroke={p.border} strokeWidth="1" />
        {/* Vindu */}
        <rect x="-28" y="-18" width="16" height="12" rx="1" fill={p.accent} opacity="0.15" stroke={p.accent} strokeWidth="0.8" />
        <rect x="12" y="-18" width="16" height="12" rx="1" fill={p.accent} opacity="0.15" stroke={p.accent} strokeWidth="0.8" />

        {/* Wyrify-logo ved siden av butikken */}
        <g transform="translate(-55, -15)">
          <circle r="16" fill={`${p.accent}12`} stroke={p.accent} strokeWidth="1" />
          <WyrifyLogo x="0" y="0" size={0.5} color={p.accent} />
        </g>

        {/* Label */}
        <text x="0" y="42" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="10" fill={p.accent} fontWeight="600" letterSpacing="0.12em">{il.merchant}</text>
      </g>

      {/* === KUNDENS MOBILTELEFON (høyre) === */}
      <Phone x={customer.x} y={customer.y} label={il.customerMobile} />

      {/* === BETALING / LOMMEBOK (bunn) === */}
      <g transform={`translate(${payment.x}, ${payment.y})`}>
        {/* Telefon med betaling */}
        <rect x="-22" y="-35" width="44" height="70" rx="8" fill={p.text} />
        <rect x="-18" y="-28" width="36" height="52" rx="3" fill={p.bg} />

        {/* Valutasymboler på skjerm */}
        <text x="0" y="-8" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="14" fill={p.accent} fontWeight="700">$</text>
        <text x="-10" y="8" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="8" fill={p.textMuted}>€</text>
        <text x="10" y="8" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="8" fill={p.textMuted}>₿</text>
        <rect x="-12" y="14" width="24" height="3" rx="1.5" fill={p.border} />

        {/* Penger/verdi-indikator */}
        <g transform="translate(30, -15)">
          <rect x="0" y="0" width="28" height="18" rx="3" fill={p.accent} opacity="0.12" stroke={p.accent} strokeWidth="1" />
          <text x="14" y="13" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="9" fill={p.accent} fontWeight="600">→</text>
        </g>

        {/* Label */}
        <text x="0" y="55" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="10" fill={p.textMuted} letterSpacing="0.08em">{il.digitalWallet}</text>
      </g>

      {/* === FORKLARENDE TEKSTER === */}
      <g>
        {/* Ved kjede sky->forhandler */}
        <text x="225" y="155" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="8" fill={p.textMuted} transform="rotate(-35, 225, 155)">
          {il.blockchain}
        </text>
        {/* Ved kjede sky->kunde */}
        <text x="575" y="155" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="8" fill={p.textMuted} transform="rotate(35, 575, 155)">
          {il.blockchain}
        </text>
        {/* Ved horisontal kjede */}
        <text x="400" y="278" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="8" fill={p.textMuted}>
          {il.secureTransaction}
        </text>
      </g>
    </svg>
  );
}
