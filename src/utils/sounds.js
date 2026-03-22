/* ── SOUND ───────────────────────────────────────────────────── */

let _ctx = null;
const AC = () => { 
  if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)(); 
  return _ctx; 
};

const tone = (hz, type, vol, dur, delay = 0) => {
  try {
    const c = AC(), o = c.createOscillator(), g = c.createGain();
    o.connect(g); 
    g.connect(c.destination);
    o.type = type; 
    o.frequency.value = hz;
    const t = c.currentTime + delay;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.start(t); 
    o.stop(t + dur + 0.06);
  } catch (_) {}
};

export const SFX = {
  key:     () => tone(700, "sine", 0.06, 0.055),
  wrong:   () => { 
    tone(220, "sawtooth", 0.16, 0.3); 
    tone(170, "sawtooth", 0.12, 0.25, 0.1); 
  },
  correct: () => [523, 659, 784].forEach((f, i) => tone(f, "sine", 0.15, 0.18, i * 0.08)),
  hop:     () => { 
    tone(350, "triangle", 0.13, 0.12); 
    tone(500, "sine", 0.07, 0.09, 0.07); 
  },
  win:     () => [523, 659, 784, 1047, 1319, 1568, 2093].forEach((f, i) =>
                   tone(f, i % 2 ? "triangle" : "sine", 0.17, 0.22, i * 0.1)),
};
