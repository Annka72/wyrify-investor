import translations from "./translations.js";

const palette = {
  bg: "#1B2A2E",
  bgCard: "#223538",
  teal: "#4DB897",
  tealBright: "#5CCAA6",
  accent: "#4DB897",
  border: "#2E4245",
  text: "#C8D5D0",
  textMuted: "#8A9E97",
  light: "#192527",
};

export default function BeaconIllustration({ lang = "no" }) {
  const il = translations[lang].illustrations;

  return (
    <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 680, height: "auto", display: "block", margin: "0 auto" }}>
      <defs>
        <linearGradient id="phoneGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.text} />
          <stop offset="100%" stopColor="#1A2E28" />
        </linearGradient>
        <linearGradient id="screenGradL" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.tealBright} stopOpacity="0.15" />
          <stop offset="100%" stopColor={palette.bg} />
        </linearGradient>
        <linearGradient id="screenGradR" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.accent} stopOpacity="0.12" />
          <stop offset="100%" stopColor={palette.bg} />
        </linearGradient>
        <linearGradient id="beaconGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor={palette.light} />
        </linearGradient>
        <linearGradient id="signalGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={palette.accent} stopOpacity="0.6" />
          <stop offset="100%" stopColor={palette.accent} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="signalGradR" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor={palette.accent} stopOpacity="0.6" />
          <stop offset="100%" stopColor={palette.accent} stopOpacity="0" />
        </linearGradient>
        <filter id="phoneShadow" x="-10%" y="-5%" width="120%" height="115%">
          <feDropShadow dx="0" dy="4" stdDeviation="12" floodColor="#1A2E28" floodOpacity="0.12" />
        </filter>
        <filter id="beaconShadow" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="8" floodColor={palette.accent} floodOpacity="0.15" />
        </filter>
        <filter id="glowPulse" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* === VENSTRE TELEFON (Forhandler) === */}
      <g filter="url(#phoneShadow)" transform="translate(80, 40)">
        {/* Telefonkropp */}
        <rect x="0" y="0" width="160" height="310" rx="20" fill="url(#phoneGrad)" />
        <rect x="6" y="6" width="148" height="298" rx="16" fill={palette.bg} />

        {/* Skjerm */}
        <rect x="12" y="45" width="136" height="220" rx="4" fill="url(#screenGradL)" />

        {/* Topplinje */}
        <rect x="55" y="14" width="50" height="4" rx="2" fill={palette.border} />

        {/* Skjerminnhold — forhandler */}
        <circle cx="80" cy="80" r="16" fill={palette.accent} fillOpacity="0.12" stroke={palette.accent} strokeWidth="1.5" />
        <text x="80" y="85" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="700" fill={palette.accent}>W</text>

        <text x="80" y="118" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="9" fill={palette.textMuted} letterSpacing="0.1em">{il.merchant}</text>

        {/* Beløp */}
        <text x="80" y="160" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="32" fontWeight="300" fill={palette.text}>10.00</text>
        <text x="80" y="178" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="10" fill={palette.textMuted}>USD</text>

        {/* Send-knapp */}
        <rect x="30" y="200" width="100" height="34" rx="17" fill={palette.accent} />
        <text x="80" y="221" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="600" fill="#FFFFFF" letterSpacing="0.05em">{il.send}</text>

        {/* Status-indikator */}
        <circle cx="80" cy="250" r="3" fill={palette.accent} opacity="0.6">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Hjemknapp-linje */}
        <rect x="55" y="280" width="50" height="4" rx="2" fill={palette.border} />
      </g>

      {/* === BLE-SIGNAL VENSTRE → BEACON === */}
      <g transform="translate(265, 175)">
        <path d="M0,20 Q30,-5 60,20" stroke={palette.accent} strokeWidth="1.2" fill="none" opacity="0.2">
          <animate attributeName="opacity" values="0.1;0.4;0.1" dur="2s" repeatCount="indefinite" />
        </path>
        <path d="M8,15 Q30,0 52,15" stroke={palette.accent} strokeWidth="1.2" fill="none" opacity="0.35">
          <animate attributeName="opacity" values="0.15;0.5;0.15" dur="2s" begin="0.3s" repeatCount="indefinite" />
        </path>
        <path d="M16,10 Q30,2 44,10" stroke={palette.accent} strokeWidth="1.5" fill="none" opacity="0.5">
          <animate attributeName="opacity" values="0.2;0.7;0.2" dur="2s" begin="0.6s" repeatCount="indefinite" />
        </path>
      </g>

      {/* === BEACON (sentrum) === */}
      <g filter="url(#beaconShadow)" transform="translate(340, 130)">
        {/* Beacon-kropp */}
        <ellipse cx="60" cy="75" rx="48" ry="12" fill={palette.border} opacity="0.3" />
        <rect x="10" y="15" width="100" height="60" rx="28" fill="url(#beaconGrad)" stroke={palette.border} strokeWidth="1.5" />

        {/* Wyrify W-logo på beacon — to U-er opp + J-hale ned */}
        <g transform="translate(38, 25)">
          {/* Venstre U (åpen opp) */}
          <path d="M6,6 C6,18 12,22 18,22 C24,22 24,18 24,12" stroke={palette.accent} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Høyre U (åpen opp) */}
          <path d="M20,8 C20,18 26,22 32,22 C38,22 40,18 40,12" stroke={palette.accent} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* J-hale som kurver ned fra høyre U */}
          <path d="M40,12 C40,18 40,28 32,32" stroke={palette.accent} strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>

        {/* Pulserende ring rundt beacon */}
        <ellipse cx="60" cy="45" rx="40" ry="22" fill="none" stroke={palette.accent} strokeWidth="1" opacity="0.15">
          <animate attributeName="rx" values="40;56;40" dur="3s" repeatCount="indefinite" />
          <animate attributeName="ry" values="22;30;22" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="60" cy="45" rx="32" ry="18" fill="none" stroke={palette.accent} strokeWidth="1" opacity="0.25">
          <animate attributeName="rx" values="32;48;32" dur="3s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="ry" values="18;26;18" dur="3s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" begin="0.5s" repeatCount="indefinite" />
        </ellipse>

        {/* Label under beacon */}
        <text x="60" y="102" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="9" fill={palette.textMuted} letterSpacing="0.15em">{il.beacon}</text>
      </g>

      {/* === BLE-SIGNAL BEACON → HØYRE === */}
      <g transform="translate(475, 175)">
        <path d="M0,20 Q30,-5 60,20" stroke={palette.accent} strokeWidth="1.2" fill="none" opacity="0.2">
          <animate attributeName="opacity" values="0.1;0.4;0.1" dur="2s" begin="1s" repeatCount="indefinite" />
        </path>
        <path d="M8,15 Q30,0 52,15" stroke={palette.accent} strokeWidth="1.2" fill="none" opacity="0.35">
          <animate attributeName="opacity" values="0.15;0.5;0.15" dur="2s" begin="1.3s" repeatCount="indefinite" />
        </path>
        <path d="M16,10 Q30,2 44,10" stroke={palette.accent} strokeWidth="1.5" fill="none" opacity="0.5">
          <animate attributeName="opacity" values="0.2;0.7;0.2" dur="2s" begin="1.6s" repeatCount="indefinite" />
        </path>
      </g>

      {/* === HØYRE TELEFON (Kunde) === */}
      <g filter="url(#phoneShadow)" transform="translate(560, 40)">
        {/* Telefonkropp */}
        <rect x="0" y="0" width="160" height="310" rx="20" fill="url(#phoneGrad)" />
        <rect x="6" y="6" width="148" height="298" rx="16" fill={palette.bg} />

        {/* Skjerm */}
        <rect x="12" y="45" width="136" height="220" rx="4" fill="url(#screenGradR)" />

        {/* Topplinje */}
        <rect x="55" y="14" width="50" height="4" rx="2" fill={palette.border} />

        {/* Skjerminnhold — kunde */}
        <circle cx="80" cy="80" r="16" fill={palette.tealBright} fillOpacity="0.12" stroke={palette.tealBright} strokeWidth="1.5" />
        <text x="80" y="85" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="700" fill={palette.tealBright}>W</text>

        <text x="80" y="118" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="9" fill={palette.textMuted} letterSpacing="0.1em">{il.customer}</text>

        {/* Beløp */}
        <text x="80" y="160" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="32" fontWeight="300" fill={palette.text}>10.00</text>
        <text x="80" y="178" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="10" fill={palette.textMuted}>USD</text>

        {/* Bekreft-knapp */}
        <rect x="30" y="200" width="100" height="34" rx="17" fill={palette.tealBright} />
        <text x="80" y="221" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="600" fill="#FFFFFF" letterSpacing="0.05em">{il.confirm}</text>

        {/* Hake-animasjon */}
        <g transform="translate(68, 242)">
          <circle r="8" cx="12" cy="8" fill={palette.tealBright} opacity="0.15" />
          <path d="M6,8 L10,12 L18,4" stroke={palette.tealBright} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Hjemknapp-linje */}
        <rect x="55" y="280" width="50" height="4" rx="2" fill={palette.border} />
      </g>

      {/* === FLOW-PILER UNDER === */}
      <g transform="translate(240, 360)">
        <line x1="0" y1="0" x2="320" y2="0" stroke={palette.border} strokeWidth="1" />
        <polygon points="316,-4 324,0 316,4" fill={palette.accent} />

        <text x="60" y="20" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="8" fill={palette.textMuted} letterSpacing="0.1em">{il.ble}</text>
        <text x="160" y="20" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="8" fill={palette.accent} letterSpacing="0.1em">{il.transactionTime}</text>
        <text x="260" y="20" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="8" fill={palette.textMuted} letterSpacing="0.1em">{il.ble}</text>
      </g>
    </svg>
  );
}
