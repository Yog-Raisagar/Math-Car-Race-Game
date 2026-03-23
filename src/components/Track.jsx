import Car from './Car';
import './Track.css';

const F = "'Fredoka One', cursive";

function Track({ p1Pos, p2Pos, p1Bounce, p2Bounce }) {
  const STEPS = 10;
  // Cover more visual distance (4% to 88% = 84% spread -> 8.4% per step)
  const topOf = pos => 88 - pos * 8.4; 

  return (
    <div className="track-container">
      {/* FINISH banner */}
      <div className="finish-banner">
        FINISH LINE
      </div>

      {/* ── THE TRACK SCENE ── */}
      <div className="track-scene">
        
        {/* GRASS background */}
        <div className="grass-bg" />

        {/* ASHPALT TRACK */}
        <div className="asphalt-track">
          {/* Rumble Strips on edges */}
          <div className="rumble-strip left-rumble" />
          <div className="rumble-strip right-rumble" />
          
          {/* Center Dashed Line */}
          <div className="center-line" />

          {/* FINISH checkered stripe */}
          <div className="finish-stripe" style={{ top: '2%' }} />

          {/* START stripe */}
          <div className="start-stripe" style={{ bottom: '9%' }} />

          {/* Step markers inside each lane */}
          {Array.from({length:STEPS+1}).map((_,i)=>{
            const top = `${4 + i * 8.4}%`;
            return (
              <div key={i} className="step-markers" style={{top}}>
                {/* left lane marker */}
                <div className="lane-marker">
                  <div className="marker-line"/>
                </div>
                {/* gap */}
                <div className="marker-gap"/>
                {/* right lane marker */}
                <div className="lane-marker">
                  <div className="marker-line"/>
                </div>
              </div>
            );
          })}

          {/* ── P1 CAR ── positioned at left lane centre */}
          <div className="car-wrapper car-p1" style={{top:`${topOf(p1Pos)}%`}}>
            <Car isP1={true} bounce={p1Bounce}/>
          </div>

          {/* ── P2 CAR ── positioned at right lane centre */}
          <div className="car-wrapper car-p2" style={{top:`${topOf(p2Pos)}%`}}>
            <Car isP1={false} bounce={p2Bounce}/>
          </div>
        </div>

        {/* lane labels */}
        <div className="lane-label lane-p1-label">P1 🔵</div>
        <div className="lane-label lane-p2-label">🔴 P2</div>

      </div>
      {/* end scene */}

      {/* START label */}
      <div className="start-label">
        START
      </div>

      {/* progress bars */}
      <div className="progress-bars">
        {[
          {label:"🔵 P1",pos:p1Pos,color:"#3b82f6",bg:"#dbeafe"},
          {label:"🔴 P2",pos:p2Pos,color:"#ef4444",bg:"#fee2e2"},
        ].map(({label,pos,color,bg})=>(
          <div key={label} className="progress-item">
            <div className="progress-label">{label}</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{
                width:`${pos*10}%`,
                background:color,
                boxShadow:`0 0 10px ${color}aa`,
              }}/>
            </div>
            <div className="progress-text">{pos}/10</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Track;
