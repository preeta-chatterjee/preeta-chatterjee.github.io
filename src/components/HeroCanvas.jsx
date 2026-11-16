import { useEffect, useRef, useState } from "react";
import { C, T, PALETTE, TAG_TONES } from "../theme";
import { CANVAS_LABS, SKILLS } from "../content";
import { useMobile } from "../hooks";

// ── Bubble game (home grid, bottom right) ─────────────────────────────────────
// Idle: ambient bubbles drift behind a start card. Playing: skill-name bubbles rise
// from the bottom for 20 seconds; pop as many as you can. Best score is kept in
// localStorage. Under prefers-reduced-motion nothing drifts: bubbles sit still and
// a popped bubble is replaced at a new spot.
const GAME_SECONDS = 20;
const BEST_KEY = "pc-bubble-best";

const BALL_INIT_COUNT = 18;   // ambient balls on mount
const BALL_MIN_COUNT  = 10;   // replenish when ambient balls drop below this
const BALL_MAX_TOTAL  = 70;   // cap total balls (ambient + burst) to avoid perf issues

// Bubble labels: skills from the skills list (short enough to fit in a bubble) plus the canvas labels
const BUBBLE_LABELS = (() => {
  const seen = new Set(), out = [];
  for (const t of [...SKILLS.flatMap(s => s.tags), ...CANVAS_LABS.map(l => l.t)]) {
    const k = t.toUpperCase();
    if (t.length <= 12 && !seen.has(k)) { seen.add(k); out.push(k); }
  }
  return out;
})();
const BUBBLE_FILLS = [TAG_TONES.maroon.background, TAG_TONES.green.background, TAG_TONES.charcoal.background];
const BUBBLE_FONT = "500 12px 'DM Mono',monospace";

const readBest = () => { try { return Number(localStorage.getItem(BEST_KEY)) || 0; } catch { return 0; } };
const saveBest = n => { try { localStorage.setItem(BEST_KEY, String(n)); } catch { /* storage unavailable */ } };
const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function makeBall(W, H, burst, x, y) {
  return {
    x:       x ?? (W * .1 + Math.random() * W * .8),
    y:       y ?? (Math.random() * H * .8 + H * .1),
    r:       burst ? 3 + Math.random() * 8 : 5 + Math.random() * 16,
    vx:      (Math.random() - .5) * (burst ? 8 : 2.5),
    vy:      (Math.random() - .5) * (burst ? 8 : 2.5),
    color:   PALETTE[Math.floor(Math.random() * PALETTE.length)],
    alpha:   burst ? .7 : .12 + Math.random() * .5,
    outline: !burst && Math.random() > .6,
    gravity: burst ? .15 : 0,
    life:    burst ? 1 : Infinity,
  };
}

function drawGrid(ctx, W, H) {
  ctx.strokeStyle = "rgba(77,23,23,.05)"; ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
}

function drawLabels(ctx, frame, W, H, still) {
  CANVAS_LABS.forEach((l, i) => {
    ctx.font = `500 ${l.s}px 'DM Mono',monospace`;
    const a = still ? .08 : .08 + Math.sin(frame * .02 + i) * .04;
    ctx.fillStyle = i % 2 === 0 ? `rgba(23,77,56,${a})` : `rgba(77,23,23,${a})`;
    ctx.fillText(l.t, l.x * W, l.y * H + (still ? 0 : Math.sin(frame * .018 + i) * 8));
  });
}

function drawCornerAccents(ctx, W, H) {
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = "rgba(23,77,56,.28)";
  ctx.beginPath(); ctx.moveTo(W - 40, 60); ctx.lineTo(W - 40, 40); ctx.lineTo(W - 60, 40); ctx.stroke();
  ctx.strokeStyle = "rgba(77,23,23,.28)";
  ctx.beginPath(); ctx.moveTo(40, H - 60); ctx.lineTo(40, H - 40); ctx.lineTo(60, H - 40); ctx.stroke();
}

// A game bubble: a skill name in a filled circle. `still` places it anywhere (reduced motion);
// otherwise it starts below the box (or, for the first wave, spread over the lower part).
// Labels come from a shuffled deck so the same skill doesn't show up twice in a row
let deck = [];
const nextLabel = () => {
  if (!deck.length) {
    deck = [...BUBBLE_LABELS];
    for (let i = deck.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [deck[i], deck[j]] = [deck[j], deck[i]]; }
  }
  return deck.pop();
};

// Of a few random spots, it takes the one farthest from the other bubbles, so they rarely overlap.
function makeBubble(ctx, W, H, still, firstWave, others = []) {
  const label = nextLabel();
  ctx.font = BUBBLE_FONT;
  const r = Math.max(30, ctx.measureText(label).width / 2 + 12);
  const spot = () => ({ x: r + Math.random() * Math.max(1, W - 2 * r),
    y: still ? r + Math.random() * Math.max(1, H - 2 * r)
      : firstWave ? H * .35 + Math.random() * (H * .65 + r) : H + r + Math.random() * H * .4 });
  const gap = c => others.reduce((m, o) => Math.min(m, Math.hypot(o.x - c.x, o.y - c.y) - o.r - r), Infinity);
  let best = spot();
  for (let k = 0; k < 12 && gap(best) < 8; k++) { const c = spot(); if (gap(c) > gap(best)) best = c; }
  const { x, y } = best;
  return { label, r, x, y, baseX: x, speed: 45 + Math.random() * 45, sway: Math.random() * Math.PI * 2,
    color: BUBBLE_FILLS[Math.floor(Math.random() * BUBBLE_FILLS.length)] };
}

function drawBubble(ctx, b) {
  ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
  ctx.fillStyle = b.color; ctx.fill();
  ctx.lineWidth = 2; ctx.strokeStyle = "#F2F1EF"; ctx.stroke();   // ring in the box color keeps overlapping bubbles distinct
  ctx.font = BUBBLE_FONT; ctx.fillStyle = "#FFFFFF"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText(b.label, b.x, b.y + 1);
  ctx.textAlign = "start"; ctx.textBaseline = "alphabetic";
}

export default function HeroCanvas() {
  const mobile = useMobile();
  const ref = useRef(null);
  const startBtn = useRef(null);
  const game = useRef({ phase: "idle" });          // shared with the canvas loop
  const [phase, setPhase] = useState("idle");      // idle | playing | over
  const [score, setScore] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(GAME_SECONDS);
  const [best, setBest] = useState(readBest);
  const bestRef = useRef(best);

  useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext("2d");
    const still = prefersReducedMotion();
    const g = game.current;
    let W = 0, H = 0, balls = [], floaters = [], frame = 0, last = performance.now(), shownSecs = GAME_SECONDS;

    const resize = () => {
      if (canvas.offsetWidth > 0 && canvas.offsetHeight > 0) {
        const dpr = window.devicePixelRatio || 1;
        W = canvas.offsetWidth; H = canvas.offsetHeight;
        canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas);

    const nb = (x, y, burst) => makeBall(W, H, burst, x, y);
    for (let i = 0; i < BALL_INIT_COUNT; i++) balls.push(nb());
    const burst = (x, y, n) => { if (!still) for (let i = 0; i < n; i++) balls.push(nb(x, y, true)); };

    g.start = () => {
      g.phase = "playing"; g.score = 0; g.endAt = performance.now() + GAME_SECONDS * 1000;
      const count = W < 500 ? 5 : 7;
      g.bubbles = [];
      for (let i = 0; i < count; i++) g.bubbles.push(makeBubble(ctx, W, H, still, true, g.bubbles));
      balls = []; floaters = []; shownSecs = GAME_SECONDS;
      setScore(0); setSecondsLeft(GAME_SECONDS); setPhase("playing");
    };
    const finish = () => {
      g.phase = "over"; g.bubbles = [];
      for (let i = 0; i < BALL_INIT_COUNT; i++) balls.push(nb());
      if (g.score > bestRef.current) { bestRef.current = g.score; saveBest(g.score); setBest(g.score); }
      setSecondsLeft(0); setPhase("over");
    };

    const onDown = e => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left, cy = e.clientY - rect.top;
      if (g.phase === "playing") {
        const slop = e.pointerType === "touch" ? 10 : 4;
        for (let i = g.bubbles.length - 1; i >= 0; i--) {     // topmost first
          const b = g.bubbles[i];
          if (Math.hypot(b.x - cx, b.y - cy) < b.r + slop) {
            g.score++; setScore(g.score);
            floaters.push({ x: b.x, y: b.y, life: 1 });
            burst(b.x, b.y, 8);
            g.bubbles[i] = makeBubble(ctx, W, H, still, false, g.bubbles.filter((_, j) => j !== i));
            return;
          }
        }
        return;
      }
      // Idle / over: the ambient bubbles can still be popped, just for fun (no score)
      let hit = false;
      balls = balls.filter(b => {
        if (!hit && b.life === Infinity && Math.hypot(b.x - cx, b.y - cy) < b.r + 6) { hit = true; burst(b.x, b.y, 8); return false; }
        return true;
      });
      if (!hit) burst(cx, cy, 4);
      if (balls.filter(b => b.life === Infinity).length < BALL_MIN_COUNT) for (let i = 0; i < 3; i++) balls.push(nb());
      if (balls.length > BALL_MAX_TOTAL) balls = balls.filter((b, idx) => b.life === Infinity || idx > balls.length - 20);
    };
    // pointerdown covers mouse and touch with one event (no double count from a synthetic click)
    canvas.addEventListener("pointerdown", onDown);

    let raf;
    const draw = now => {
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      ctx.clearRect(0, 0, W, H);
      drawGrid(ctx, W, H);

      if (g.phase === "playing") {
        if (now >= g.endAt) finish();
        else {
          const secs = Math.ceil((g.endAt - now) / 1000);
          if (secs !== shownSecs) { shownSecs = secs; setSecondsLeft(secs); }
          const pace = 1 + .6 * (1 - (g.endAt - now) / (GAME_SECONDS * 1000)); // a little faster as time runs out
          g.bubbles.forEach((b, i) => {
            if (!still) {
              b.y -= b.speed * pace * dt;
              b.sway += dt * 1.4;
              b.x = Math.min(W - b.r, Math.max(b.r, b.baseX + Math.sin(b.sway) * 14));
              if (b.y < -b.r) g.bubbles[i] = makeBubble(ctx, W, H, false, false, g.bubbles.filter((_, j) => j !== i));
            }
            drawBubble(ctx, g.bubbles[i]);
          });
        }
      } else {
        drawLabels(ctx, frame, W, H, still);
      }

      // Ambient + burst balls
      balls = balls.filter(b => b.life > 0);
      balls.forEach(b => {
        if (!still) {
          b.vx *= .98; b.vy *= .98; b.vy += b.gravity || 0;
          b.x += b.vx; b.y += b.vy;
          if (b.life !== Infinity) { b.life -= .02; b.alpha = b.life * .7; }
          if (b.x > W - b.r) { b.vx *= -1; b.x = W - b.r; }
          if (b.y < b.r)     { b.vy *= -1; b.y = b.r; }
          if (b.y > H - b.r) { b.vy *= -.8; b.y = H - b.r; }
          if (b.x < b.r)     { b.vx *= -1; b.x = b.r; }
        }
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.globalAlpha = Math.max(0, b.alpha);
        if (b.outline) { ctx.strokeStyle = b.color; ctx.lineWidth = 1.5; ctx.stroke(); }
        else { ctx.fillStyle = b.color; ctx.fill(); }
        ctx.globalAlpha = 1;
      });

      // "+1" popups (they hold still under reduced motion)
      floaters = floaters.filter(f => f.life > 0);
      floaters.forEach(f => {
        if (!still) f.y -= 1.5;
        f.life -= .03;
        ctx.font = "bold 14px 'DM Mono',monospace";
        ctx.fillStyle = `rgba(17,17,17,${f.life})`;
        ctx.fillText("+1", f.x - 8, f.y);
      });

      drawCornerAccents(ctx, W, H);
      frame++; raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", onDown);
      ro.disconnect();
    };
  }, []);

  // Keep keyboard focus on the card's button when a round ends
  useEffect(() => { if (phase === "over") startBtn.current?.focus({ preventScroll: true }); }, [phase]);

  const playing = phase === "playing";
  const chip = { fontFamily: T.mono, fontSize: ".72rem", letterSpacing: ".12em", textTransform: "uppercase", color: "#111111", background: "#FFFFFF", border: "1.5px solid #111111", padding: ".35rem .7rem", pointerEvents: "none" };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* During a round, touch-action none stops taps from scrolling or zooming the page */}
      <canvas ref={ref} aria-label="Bubble mini game" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", touchAction: playing ? "none" : "manipulation", cursor: "pointer" }} />

      {playing && (
        <>
          <div style={{ ...chip, position: "absolute", top: "1rem", left: "1rem" }} aria-label={`${secondsLeft} seconds left`}>0:{String(secondsLeft).padStart(2, "0")}</div>
          <div style={{ ...chip, position: "absolute", top: "1rem", right: "1rem" }}>Score {score}</div>
        </>
      )}

      {!playing && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", pointerEvents: "none" }}>
          <div style={{ pointerEvents: "auto", background: "#FFFFFF", border: "2px solid #111111", boxShadow: "6px 6px 0 #111111", padding: mobile ? "1rem 1.2rem 1.1rem" : "1.3rem 1.8rem 1.4rem", maxWidth: 340, width: "100%", textAlign: "center" }}>
            <div style={{ fontFamily: T.mono, fontSize: ".68rem", letterSpacing: ".2em", color: C.green, textTransform: "uppercase" }}>Mini Game</div>
            <div style={{ fontFamily: T.display, fontSize: mobile ? "2rem" : "2.4rem", color: "#111111", letterSpacing: ".02em", lineHeight: 1, margin: ".3rem 0 .5rem" }}>Pop the Skills</div>
            <p style={{ fontFamily: T.sans, fontSize: ".95rem", lineHeight: 1.45, color: C.mid, margin: "0 0 .9rem" }}>
              {mobile ? "Tap" : "Pop"} as many bubbles as you can in {GAME_SECONDS} seconds.
            </p>
            {phase === "over" && <div aria-live="polite" style={{ fontFamily: T.mono, fontSize: ".8rem", letterSpacing: ".1em", color: "#111111", textTransform: "uppercase", marginBottom: ".7rem" }}>Score: {score}</div>}
            {/* Hover swap only where a real hover exists, so a tap on a phone never leaves it inverted */}
            <style>{"@media (hover: hover) { .bubble-start:hover { background: #FFFFFF !important; color: #111111 !important; } }"}</style>
            <button ref={startBtn} type="button" className="bubble-start" onClick={() => game.current.start?.()}
              style={{ fontFamily: T.mono, fontSize: ".72rem", letterSpacing: ".14em", textTransform: "uppercase", background: "#111111", color: "#FFFFFF", border: "2px solid #111111", padding: ".65rem 1.6rem", cursor: "pointer", transition: "all .2s" }}>
              {phase === "over" ? "Play Again" : "Start"}
            </button>
            <div style={{ fontFamily: T.mono, fontSize: ".68rem", letterSpacing: ".12em", color: C.mid, textTransform: "uppercase", marginTop: ".7rem" }}>Best: {best}</div>
          </div>
        </div>
      )}
    </div>
  );
}
