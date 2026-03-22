import { useState, useEffect, useCallback } from "react";
import Track from './components/Track';
import Panel from './components/PlayerPanel';
import Winner from './components/Winner';
import { genQ, mkP, FullscreenButton } from './utils/gameLogic';
import { SFX } from './utils/sounds';
import './styles/global.css';

const F = "'Fredoka One', cursive";
const B = "'Nunito', sans-serif";

export default function App() {
  const [p1, setP1] = useState(mkP);
  const [p2, setP2] = useState(mkP);
  const [winner, setWinner] = useState(null);
  const [p1Shake, setP1Shake] = useState(false);
  const [p2Shake, setP2Shake] = useState(false);
  const [p1Bounce, setP1Bounce] = useState(false);
  const [p2Bounce, setP2Bounce] = useState(false);

  const shake = s => {
    if (s === "l") { 
      setP1Shake(true); 
      setTimeout(() => setP1Shake(false), 400); 
    } else { 
      setP2Shake(true); 
      setTimeout(() => setP2Shake(false), 400); 
    }
  };
  
  const bounce = s => {
    if (s === "l") { 
      setP1Bounce(true); 
      setTimeout(() => setP1Bounce(false), 900); 
    } else { 
      setP2Bounce(true); 
      setTimeout(() => setP2Bounce(false), 900); 
    }
  };

  const handleKey = useCallback((side, key) => {
    if (winner) return;
    SFX.key();
    const setP = side === "l" ? setP1 : setP2;
    const ps = side === "l" ? p1 : p2;
    
    if (key === "C") { 
      setP(p => ({ ...p, input: "" })); 
      return; 
    }
    
    if (key === "Go") {
      const ans = parseInt(ps.input, 10);
      if (!isNaN(ans) && ans === ps.q.ans) {
        const np = ps.pos + 1;
        SFX.correct(); 
        setTimeout(() => SFX.hop(), 130);
        bounce(side);
        if (np >= 10) { 
          setTimeout(() => SFX.win(), 220); 
          setWinner(side === "l" ? 1 : 2); 
          setP(p => ({ ...p, pos: np, input: "" })); 
        } else {
          setP({ q: genQ(), input: "", pos: np });
        }
      } else {
        SFX.wrong(); 
        shake(side); 
        setP(p => ({ ...p, input: "" }));
      }
      return;
    }
    
    setP(p => { 
      if (p.input.length >= 3) return p; 
      return { ...p, input: p.input + key }; 
    });
  }, [winner, p1, p2]);

  const reset = () => {
    setP1(mkP()); 
    setP2(mkP()); 
    setWinner(null);
    setP1Shake(false); 
    setP2Shake(false); 
    setP1Bounce(false); 
    setP2Bounce(false);
  };

  return (
    <>
      {winner && <Winner who={winner} onReset={reset} />}
      <FullscreenButton />

      {/* ── ROOT: fills the entire screen, no scroll ── */}
      <div className="app-root">
        {/* ── TITLE ── */}
        <div className="game-title">
          🏎️ Math Car Race! 🏁
        </div>

        {/* ── MAIN ROW: panel ─── gap ─── track ─── gap ─── panel ── */}
        <div className="main-row">
          {/* P1 panel — vertically centered in its column */}
          <div className="panel-container">
            <Panel 
              player={p1} 
              isP1={true}
              onKey={k => handleKey("l", k)} 
              disabled={!!winner} 
              shake={p1Shake}
            />
          </div>

          {/* Track — fills the full row height in the centre */}
          <div className="track-container">
            <Track
              p1Pos={p1.pos} 
              p2Pos={p2.pos}
              p1Bounce={p1Bounce} 
              p2Bounce={p2Bounce}
            />
          </div>

          {/* P2 panel — same width as P1 */}
          <div className="panel-container">
            <Panel 
              player={p2} 
              isP1={false}
              onKey={k => handleKey("r", k)} 
              disabled={!!winner} 
              shake={p2Shake}
            />
          </div>
        </div>

        {/* ── FOOTER HINT ── */}
        <div className="footer-hint">
          Solve your question ➜ speed UP the track ➜ first over the finish line wins! 🏆
        </div>
      </div>
    </>
  );
}
