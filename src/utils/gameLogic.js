import React from 'react';

/* ── GAME LOGIC ──────────────────────────────────────────────── */

// Generate a random math question
export function genQ() {
  const ops = ["+", "-", "×"];
  const op = ops[Math.floor(Math.random() * 3)];
  let a = Math.floor(Math.random() * 10) + 1, b = Math.floor(Math.random() * 10) + 1;
  if (op === "-" && b > a) [a, b] = [b, a];
  const ans = op === "+" ? a + b : op === "-" ? a - b : a * b;
  return { a, b, op, ans };
}

// Create a new player state
export function mkP() {
  return { q: genQ(), input: "", pos: 0 };
}

// Fullscreen button utility
export function FullscreenButton() {
  const [fs, setFs] = React.useState(false);
  
  React.useEffect(() => {
    const h = () => setFs(!!(document.fullscreenElement || document.webkitFullscreenElement));
    document.addEventListener("fullscreenchange", h);
    document.addEventListener("webkitfullscreenchange", h);
    return () => {
      document.removeEventListener("fullscreenchange", h);
      document.removeEventListener("webkitfullscreenchange", h);
    };
  }, []);
  
  const go = () => {
    const el = document.documentElement;
    const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
    if (!isFs) {
      (el.requestFullscreen || el.webkitRequestFullscreen || function() {}).call(el).catch(() => {});
    } else {
      (document.exitFullscreen || document.webkitExitFullscreen || function() {}).call(document).catch(() => {});
    }
  };
  
  return React.createElement('button', {
    onClick: go,
    title: fs ? "Exit Fullscreen" : "Fullscreen",
    style: {
      position: "fixed",
      bottom: 20,
      right: 20,
      zIndex: 600,
      width: 48,
      height: 48,
      borderRadius: "50%",
      border: "2.5px solid rgba(255,255,255,.75)",
      background: "rgba(255,255,255,.28)",
      backdropFilter: "blur(12px)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 4px 18px rgba(0,0,0,.15)",
      transition: "background .2s,transform .2s"
    },
    onMouseEnter: (e) => {
      e.currentTarget.style.background = "rgba(255,255,255,.55)";
      e.currentTarget.style.transform = "scale(1.12)";
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.background = "rgba(255,255,255,.28)";
      e.currentTarget.style.transform = "scale(1)";
    }
  }, 
    fs
      ? React.createElement('svg', { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "#1e293b", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" },
          React.createElement('path', { d: "M8 3v3a2 2 0 01-2 2H3" }),
          React.createElement('path', { d: "M21 8h-3a2 2 0 01-2-2V3" }),
          React.createElement('path', { d: "M3 16h3a2 2 0 012 2v3" }),
          React.createElement('path', { d: "M16 21v-3a2 2 0 012-2h3" })
        )
      : React.createElement('svg', { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "#1e293b", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" },
          React.createElement('path', { d: "M8 3H5a2 2 0 00-2 2v3" }),
          React.createElement('path', { d: "M21 8V5a2 2 0 00-2-2h-3" }),
          React.createElement('path', { d: "M3 16v3a2 2 0 002 2h3" }),
          React.createElement('path', { d: "M16 21h3a2 2 0 002-2v-3" })
        )
  );
}
