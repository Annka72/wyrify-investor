const palette = {
  bg: "#1B2A2E",
  bgCard: "#223538",
  accent: "#4DB897",
  accentDim: "#3EA384",
  border: "#2E4245",
  text: "#C8D5D0",
  textMuted: "#8A9E97",
  textBright: "#E4EBE8",
};

export default function BlockchainHero() {
  const blocks = [
    { x: 40, y: 30 },
    { x: 130, y: 80 },
    { x: 220, y: 40 },
    { x: 310, y: 90 },
    { x: 400, y: 50 },
  ];

  const blockW = 56;
  const blockH = 40;

  return (
    <svg viewBox="0 0 460 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 420, height: "auto" }}>
      <defs>
        <linearGradient id="blockGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.bgCard} />
          <stop offset="100%" stopColor={palette.bg} />
        </linearGradient>
        <filter id="blockGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Kjedelinker mellom blokkene */}
      {blocks.slice(0, -1).map((b, i) => {
        const next = blocks[i + 1];
        const x1 = b.x + blockW;
        const y1 = b.y + blockH / 2;
        const x2 = next.x;
        const y2 = next.y + blockH / 2;

        return (
          <g key={`chain-${i}`}>
            {/* Linje */}
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={palette.border} strokeWidth="1.5" />

            {/* Animert puls langs linjen */}
            <circle r="3.5" fill={palette.accent} opacity="0">
              <animateMotion
                dur="2s"
                begin={`${i * 0.5}s`}
                repeatCount="indefinite"
                path={`M${x1},${y1} L${x2},${y2}`}
              />
              <animate attributeName="opacity" values="0;0.9;0.9;0" dur="2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
            </circle>
            <circle r="3.5" fill={palette.accent} opacity="0">
              <animateMotion
                dur="2s"
                begin={`${i * 0.5 + 1}s`}
                repeatCount="indefinite"
                path={`M${x1},${y1} L${x2},${y2}`}
              />
              <animate attributeName="opacity" values="0;0.6;0.6;0" dur="2s" begin={`${i * 0.5 + 1}s`} repeatCount="indefinite" />
            </circle>
          </g>
        );
      })}

      {/* Blokker */}
      {blocks.map((b, i) => (
        <g key={`block-${i}`}>
          {/* Blokk-kropp */}
          <rect
            x={b.x} y={b.y}
            width={blockW} height={blockH}
            rx="6"
            fill="url(#blockGrad)"
            stroke={palette.accent}
            strokeWidth="1"
            opacity="0.9"
          />

          {/* 3D-effekt (topp) */}
          <path
            d={`M${b.x + 6},${b.y} L${b.x + 10},${b.y - 8} L${b.x + blockW - 4},${b.y - 8} L${b.x + blockW},${b.y}`}
            fill={palette.bgCard}
            stroke={palette.accent}
            strokeWidth="0.8"
            opacity="0.5"
          />
          {/* 3D-effekt (høyre side) */}
          <path
            d={`M${b.x + blockW},${b.y} L${b.x + blockW + 6},${b.y - 8} L${b.x + blockW + 6},${b.y + blockH - 8} L${b.x + blockW},${b.y + blockH}`}
            fill={palette.bg}
            stroke={palette.accent}
            strokeWidth="0.8"
            opacity="0.4"
          />

          {/* Hash-linjer inne i blokken */}
          <rect x={b.x + 8} y={b.y + 10} width={blockW - 16} height="3" rx="1.5" fill={palette.accent} opacity="0.3" />
          <rect x={b.x + 8} y={b.y + 17} width={blockW - 24} height="3" rx="1.5" fill={palette.accent} opacity="0.2" />
          <rect x={b.x + 8} y={b.y + 24} width={blockW - 20} height="3" rx="1.5" fill={palette.accent} opacity="0.15" />

          {/* Blokknummer */}
          <text
            x={b.x + blockW / 2} y={b.y + blockH + 14}
            textAnchor="middle"
            fontFamily="'Space Mono', monospace"
            fontSize="7"
            fill={palette.textMuted}
            letterSpacing="0.08em"
          >
            #{String(i + 1).padStart(3, "0")}
          </text>

          {/* Pulserende indikator på aktiv blokk */}
          <circle cx={b.x + blockW - 8} cy={b.y + 8} r="3" fill={palette.accent} opacity="0.6">
            <animate
              attributeName="opacity"
              values="0.3;0.8;0.3"
              dur={`${1.5 + i * 0.3}s`}
              begin={`${i * 0.2}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}

      {/* Subtil glød bak hele kjeden */}
      <ellipse cx="230" cy="70" rx="200" ry="60" fill={palette.accent} opacity="0.03" filter="url(#blockGlow)" />
    </svg>
  );
}
