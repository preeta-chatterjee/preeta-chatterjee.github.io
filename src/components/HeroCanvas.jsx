import { useEffect, useRef } from "react";
import { C, T, PALETTE } from "../theme";
import { CANVAS_LABS } from "../content";

// ── Hero Canvas helpers (plain functions — easier to debug than inline closures) ──
const BALL_INIT_COUNT = 18;   // persistent balls on mount
const BALL_MIN_COUNT  = 10;   // replenish when persistent balls drop below this
const BALL_MAX_TOTAL  = 70;   // cap total balls (persistent + burst) to avoid perf issues

function makeBall(canvasW, canvasH, burst, x, y) {
  return {
    x:       x   ?? (canvasW * .1 + Math.random() * canvasW * .8),
    y:       y   ?? (Math.random() * canvasH * .8 + canvasH * .1),
    r:       burst ? 3  + Math.random() * 8  : 5 + Math.random() * 16,
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

function drawLabels(ctx, frame, W, H) {
  CANVAS_LABS.forEach((l, i) => {
    ctx.font = `500 ${l.s}px 'DM Mono',monospace`;
    const a = .08 + Math.sin(frame * .02 + i) * .04;
    ctx.fillStyle = i % 2 === 0 ? `rgba(23,77,56,${a})` : `rgba(77,23,23,${a})`;
    ctx.fillText(l.t, l.x * W, l.y * H + Math.sin(frame * .018 + i) * 8);
  });
}

function drawCornerAccents(ctx, W, H) {
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = "rgba(23,77,56,.28)";
  ctx.beginPath(); ctx.moveTo(W - 40, 60); ctx.lineTo(W - 40, 40); ctx.lineTo(W - 60, 40); ctx.stroke();
  ctx.strokeStyle = "rgba(77,23,23,.28)";
  ctx.beginPath(); ctx.moveTo(40, H - 60); ctx.lineTo(40, H - 40); ctx.lineTo(60, H - 40); ctx.stroke();
}

function getTouchOrMousePos(e, canvasRect) {
  if (e.changedTouches?.length > 0)
    return { x: e.changedTouches[0].clientX - canvasRect.left, y: e.changedTouches[0].clientY - canvasRect.top };
  if (e.touches?.length > 0)
    return { x: e.touches[0].clientX - canvasRect.left, y: e.touches[0].clientY - canvasRect.top };
  return { x: e.clientX - canvasRect.left, y: e.clientY - canvasRect.top };
}

// ── Hero Canvas ───────────────────────────────────────────────────────────────
export default function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext("2d");
    let balls = [], frame = 0;

    const resize = () => {
      if (canvas.offsetWidth > 0 && canvas.offsetHeight > 0) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas);

    const nb = (x, y, burst) => makeBall(canvas.width, canvas.height, burst, x, y);
    for (let i = 0; i < BALL_INIT_COUNT; i++) balls.push(nb());

    let score = 0, floaters = [];

    const getPos = e => getTouchOrMousePos(e, canvas.getBoundingClientRect());

    const onCl = e => {
      const { x: cx, y: cy } = getPos(e);
      let hit = false;
      balls = balls.map(b => {
        if (!hit) {
          const dx = b.x - cx, dy = b.y - cy;
          if (Math.sqrt(dx * dx + dy * dy) < b.r + 6) {
            hit = true; score++;
            floaters.push({ x: cx, y: cy, text: "+1", life: 1, vy: -2 });
            for (let i = 0; i < 8; i++) balls.push(nb(b.x, b.y, true));
            return null;
          }
        }
        return b;
      }).filter(Boolean);
      if (!hit) { for (let i = 0; i < 4; i++) balls.push(nb(cx, cy, true)); }
      if (balls.filter(b => b.life === Infinity).length < BALL_MIN_COUNT) {
        for (let i = 0; i < 3; i++) balls.push(nb());
      }
      if (balls.length > BALL_MAX_TOTAL)
        balls = balls.filter((b, idx) => b.life === Infinity || idx > balls.length - 20);
    };

    // touchstart + preventDefault stops the browser's delayed synthetic click,
    // preventing each tap from firing both touchstart and click (double-score bug).
    const onTouch = e => { e.preventDefault(); onCl(e); };

    canvas.addEventListener("click", onCl);
    canvas.addEventListener("touchstart", onTouch, { passive: false });

    let raf;
    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      drawGrid(ctx, W, H);
      drawLabels(ctx, frame, W, H);

      // Update and draw persistent + burst balls
      balls = balls.filter(b => b.life > 0);
      balls.forEach(b => {
        b.vx *= .98; b.vy *= .98;
        b.vy += b.gravity || 0;
        b.x += b.vx; b.y += b.vy;
        if (b.life !== Infinity) { b.life -= .02; b.alpha = b.life * .7; }
        if (b.x > W - b.r) { b.vx *= -1; b.x = W - b.r; }
        if (b.y < b.r)     { b.vy *= -1; b.y = b.r; }
        if (b.y > H - b.r) { b.vy *= -.8; b.y = H - b.r; }
        if (b.x < b.r)     { b.vx *= -1; b.x = b.r; }
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.globalAlpha = Math.max(0, b.alpha);
        if (b.outline) { ctx.strokeStyle = b.color; ctx.lineWidth = 1.5; ctx.stroke(); }
        else { ctx.fillStyle = b.color; ctx.fill(); }
        ctx.globalAlpha = 1;
      });

      // Score floaters (+1 popups)
      floaters = floaters.filter(f => f.life > 0);
      floaters.forEach(f => {
        f.y += f.vy; f.life -= .03;
        ctx.font = "bold 14px 'DM Mono',monospace";
        ctx.fillStyle = `rgba(23,77,56,${f.life})`;
        ctx.fillText(f.text, f.x, f.y);
      });

      if (score > 0) {
        ctx.font = "500 11px 'DM Mono',monospace";
        ctx.fillStyle = `rgba(77,23,23,.4)`;
        ctx.fillText(`SCORE: ${score}`, W - 100, 80);
      }

      drawCornerAccents(ctx, W, H);
      frame++; raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("click", onCl);
      canvas.removeEventListener("touchstart", onTouch);
      ro.disconnect();
    };
  }, []);
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      <span style={{ position: "absolute", bottom: "1rem", right: "1rem", fontFamily: T.mono, fontSize: ".55rem", letterSpacing: ".12em", color: C.muted, textTransform: "uppercase" }}>tap the bubbles</span>
    </div>
  );
}
