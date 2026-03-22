import './PlayerPanel.css';

const F = "'Fredoka One', cursive";
const B = "'Nunito', sans-serif";

function QBox({ q, isP1 }) {
  const sym = q.op === "×" ? "×" : q.op;
  return (
    <div className={`question-box ${isP1 ? 'player1' : 'player2'}`}>
      <div className="question-text">
        {q.a} {sym} {q.b} = ?
      </div>
    </div>
  );
}

function IBox({ val, isP1 }) {
  return (
    <div className={`input-box ${isP1 ? 'player1' : 'player2'} ${val ? 'has-value' : ''}`}>
      {val || <span className="input-placeholder">_ _</span>}
    </div>
  );
}

function Pad({ onKey, disabled, isP1 }) {
  return (
    <div className={`number-pad ${isP1 ? 'player1' : 'player2'}`}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0, "Go"].map(k => {
        const go = k === "Go", cl = k === "C";
        return (
          <button 
            key={k} 
            disabled={disabled} 
            onClick={() => !disabled && onKey(String(k))}
            className={`pad-button ${go ? 'go-button' : ''} ${cl ? 'clear-button' : ''}`}
          >
            {k}
          </button>
        );
      })}
    </div>
  );
}

function Panel({ player, isP1, onKey, disabled, shake }) {
  const bg = isP1 ? "linear-gradient(160deg,#eff6ff,#dbeafe)" : "linear-gradient(160deg,#fff5f5,#fee2e2)";
  const border = isP1 ? "#93c5fd" : "#fca5a5";
  const tc = isP1 ? "#1d4ed8" : "#b91c1c";
  
  return (
    <div className="player-panel" style={{
      background: bg,
      borderColor: border,
      animation: shake ? "shake .35s" : "none",
    }}>
      {/* player name */}
      <div className="player-name" style={{ color: tc }}>
        {isP1 ? "🔵 Player 1" : "Player 2 🔴"}
      </div>
      
      <QBox q={player.q} isP1={isP1} />
      <IBox val={player.input} isP1={isP1} />
      <Pad onKey={onKey} disabled={disabled} isP1={isP1} />
      
      {/* step indicator */}
      <div className="step-indicator" style={{
        color: tc,
        borderColor: border,
      }}>
        Step: {player.pos} / 10
      </div>
    </div>
  );
}

export default Panel;
