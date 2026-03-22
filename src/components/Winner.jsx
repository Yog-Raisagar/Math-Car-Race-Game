import './Winner.css';

function Winner({ who, onReset }) {
  const pieces = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 1.5}s`,
    dur: `${1.8 + Math.random() * 1.2}s`,
    color: ["#facc15", "#f472b6", "#60a5fa", "#34d399", "#fb923c", "#a78bfa"][i % 6],
    size: 8 + Math.random() * 10,
  }));
  
  return (
    <div className="winner-overlay">
      {/* confetti */}
      {pieces.map(p => (
        <div key={p.id} className="confetti-piece" style={{
          left: p.left,
          animationDelay: p.delay,
          animationDuration: p.dur,
          background: p.color,
          width: p.size,
          height: p.size / 1.5,
        }}/>
      ))}
      
      {/* card */}
      <div className="winner-card" style={{
        background: who === 1
          ? "linear-gradient(135deg,#1e40af,#3b82f6,#60a5fa)"
          : "linear-gradient(135deg,#991b1b,#dc2626,#f87171)",
      }}>
        <div className="trophy-icon">🏆</div>
        <div className="winner-title">Player {who} Wins!</div>
        <div className="winner-subtitle">Amazing math skills! 🎉</div>
        <button onClick={onReset} className="play-again-button">
          🔄 Play Again!
        </button>
      </div>
    </div>
  );
}

export default Winner;
