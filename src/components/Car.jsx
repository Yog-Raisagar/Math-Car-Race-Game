import './Car.css';

function Car({ isP1, bounce }) {
  /* color palette for kids: bright, vibrant */
  const bodyColor = isP1 ? "#3b82f6" : "#ef4444"; // Vivid Blue or Vivid Red
  const highlight = isP1 ? "#93c5fd" : "#fca5a5"; 
  const shadowColor = isP1 ? "#1e3a8a" : "#7f1d1d";
  const windowColor = "#bae6fd"; // bright shiny glass
  const n = isP1 ? "A" : "B";

  const idleAnim = `carIdle${n} 2s ease-in-out infinite`;
  const zoomAnim = `carZoom${n} 0.6s cubic-bezier(.34,1.2,.64,1) both`;

  return (
    <div style={{ position: 'relative', width: 76, height: 110 }}>
      {/* ── exhaust flames and stars on acceleration ── */}
      {bounce && [-18, 0, 18].map((dx, i) => (
        <div key={i} style={{
          position: 'absolute',
          bottom: 0,
          left: 38 + dx - 8,
          width: 16,
          height: 16,
          background: i === 1 ? '#fb923c' : '#facc15', // orange/yellow flames
          borderRadius: '50%',
          animation: `exhaust 0.6s ease forwards`,
          animationDelay: `${i * 0.05}s`,
          pointerEvents: 'none',
          filter: 'blur(2px)'
        }} />
      ))}

      {/* ── CAR SVG ── cartoonish 3D top-down view for kids */}
      <svg width="76" height="110" viewBox="0 0 76 110" overflow="visible" style={{
        animation: bounce ? zoomAnim : idleAnim,
        transformOrigin: "center center"
      }}>
        {/* Shadow */}
        <rect x="14" y="16" width="48" height="84" rx="14" fill="rgba(0,0,0,0.4)" filter="blur(3px)" />

        {/* Big Chunky Wheels */}
        <rect x="8" y="22" width="14" height="22" rx="4" fill="#1e293b" />
        <rect x="54" y="22" width="14" height="22" rx="4" fill="#1e293b" />
        <rect x="8" y="70" width="14" height="22" rx="4" fill="#1e293b" />
        <rect x="54" y="70" width="14" height="22" rx="4" fill="#1e293b" />

        {/* Wheel Highlights (Rims/Tread) */}
        <rect x="11" y="24" width="4" height="18" rx="2" fill="#475569" />
        <rect x="61" y="24" width="4" height="18" rx="2" fill="#475569" />
        <rect x="11" y="72" width="4" height="18" rx="2" fill="#475569" />
        <rect x="61" y="72" width="4" height="18" rx="2" fill="#475569" />

        {/* Main Body (Chubby & Cute) */}
        <path d="M 18 30 C 18 10, 58 10, 58 30 L 58 80 C 58 100, 18 100, 18 80 Z" fill={shadowColor} />
        <path d="M 18 28 C 18 8, 58 8, 58 28 L 58 78 C 58 98, 18 98, 18 78 Z" fill={bodyColor} />
        
        {/* Shiny Body Highlight */}
        <path d="M 24 24 C 24 16, 52 16, 52 24 L 52 74 C 52 82, 24 82, 24 74 Z" fill="none" stroke={highlight} strokeWidth="3" opacity="0.6" strokeLinecap="round" />

        {/* Racing Stripes - Dual */}
        <rect x="30" y="8" width="6" height="88" fill="#ffffff" opacity="0.95" />
        <rect x="40" y="8" width="6" height="88" fill="#ffffff" opacity="0.95" />

        {/* Front Bumper / Grill (Smiley/Cute) */}
        <path d="M 24 16 C 38 22, 52 16, 52 16 L 48 10 L 28 10 Z" fill="#0f172a" />
        <path d="M 30 14 C 38 18, 46 14, 46 14" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />

        {/* Rear Big Spoiler */}
        <path d="M 10 92 C 10 88, 66 88, 66 92 L 64 96 C 64 98, 12 98, 12 96 Z" fill={shadowColor} />
        <rect x="24" y="85" width="6" height="8" fill="#334155" />
        <rect x="46" y="85" width="6" height="8" fill="#334155" />

        {/* Cartoon Windshield */}
        <path d="M 22 42 C 38 32, 54 42, 54 42 L 56 56 C 56 60, 20 60, 20 56 Z" fill="#0284c7" />
        {/* Windshield Shine */}
        <path d="M 26 44 C 36 38, 44 42, 44 42 L 46 48 C 36 44, 28 48, 28 48 Z" fill="#bae6fd" opacity="0.8" />

        {/* Driver Helmet (Cute face inside!) */}
        <circle cx="38" cy="48" r="7" fill={isP1 ? "#ffffff" : "#fef08a"} />
        <rect x="33" y="45" width="10" height="4" rx="2" fill="#0f172a" />
        <circle cx="35" cy="47" r="1.5" fill="#bae6fd" />
        <circle cx="41" cy="47" r="1.5" fill="#bae6fd" />

        {/* Rear Window */}
        <path d="M 26 70 C 38 80, 50 70, 50 70 L 48 60 C 38 56, 28 60, 28 60 Z" fill="#0284c7" />

        {/* Huge Cartoon Headlights */}
        <circle cx="24" cy="18" r="5" fill="#fef08a" />
        <circle cx="24" cy="18" r="3" fill="#ffffff" />
        <circle cx="52" cy="18" r="5" fill="#fef08a" />
        <circle cx="52" cy="18" r="3" fill="#ffffff" />
        
        {/* Headlight Beams (only visible on bounce) */}
        {bounce && (
          <g opacity="0.6">
            <polygon points="24,14 10,-20 38,-20" fill="url(#beamGrad)" />
            <polygon points="52,14 38,-20 66,-20" fill="url(#beamGrad)" />
          </g>
        )}

        {/* Big Taillights */}
        <circle cx="24" cy="90" r="4" fill="#ef4444" />
        <circle cx="52" cy="90" r="4" fill="#ef4444" />
        <circle cx="24" cy="90" r="1.5" fill="#fca5a5" />
        <circle cx="52" cy="90" r="1.5" fill="#fca5a5" />

        {/* Side Mirrors (Ears!) */}
        <ellipse cx="14" cy="48" rx="4" ry="6" fill={shadowColor} />
        <ellipse cx="62" cy="48" rx="4" ry="6" fill={shadowColor} />

        {/* Car Number Badge - Star shape or big circle */}
        <circle cx="38" cy="62" r="10" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
        <text x="38" y="66.5" fontSize="14" fill="#713f12" textAnchor="middle" fontWeight="900" fontFamily="'Fredoka One', cursive, sans-serif">
          {isP1 ? "1" : "2"}
        </text>

        <defs>
          <linearGradient id="beamGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default Car;
