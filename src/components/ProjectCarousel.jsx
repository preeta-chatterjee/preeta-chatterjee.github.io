import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { C, T, S_BODY } from "../theme";
import { PROJECTS } from "../content";
import { primaryLink } from "../projectLinks";
import ProjThumb from "./ProjThumb";

// ── Home projects carousel (Phase 2 PR 7) ─────────────────────────────────────
// One horizontal row of every project. The row slides left as it advances; the center card is
// clear and the others sit under an off-white veil that grows with their distance from the center,
// so cards fade out past the left edge and fade in from the right as they move. The veil and the
// offset are both computed from one continuous position, so the fade follows the motion exactly.
// Infinite loop: cards are keyed by an unbounded "slot" number and slot s shows project s mod N, so
// after the last project the next slot is simply the first project again, in both directions.
//
// Motion: slow auto-advance (5.5s per card, 0.9s slide). It pauses on hover, keyboard focus, touch,
// when the carousel is less than half on screen and when the tab is hidden. Any arrow, dot, arrow
// key or swipe stops auto-advance for good. prefers-reduced-motion: no auto-advance and no sliding;
// the arrows and dots switch cards instantly.
// Only the center card is reachable: the others are aria-hidden and inert (their veiled text is
// below AA by design). Loading rules: nothing animates on first paint; the first render already
// has every offset and veil in place.
const N = PROJECTS.length;
const DWELL = 5500, SLIDE = 900, REACH = 4; // REACH: slots rendered on each side of the center
const SURFACE = "#F2F1EF";                  // section background = veil color
const mod = (a, n) => ((a % n) + n) % n;
// Veil by distance from the center: 0 → 0, 1 → .5, 2 → .82, 2.6+ → fully hidden (linear in between)
const veilAt = dist => {
  const d = Math.abs(dist);
  if (d <= 1) return .5 * d;
  if (d <= 2) return .5 + .32 * (d - 1);
  if (d <= 2.6) return .82 + .18 * (d - 2) / .6;
  return 1;
};
const ease = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const metrics = (width, mobile) => {
  const w = mobile ? Math.round(width * .8) : Math.min(580, Math.round(width * .46));
  const gap = mobile ? 12 : 24;
  return { w, gap, step: w + gap };
};

export default function ProjectCarousel({ mobile }) {
  const track = useRef(null);
  const [width, setWidth] = useState(() => document.documentElement.clientWidth);
  const { w, step } = metrics(width, mobile);
  // view.cur: slot in focus. view.from: where the row rests (differs from cur only while sliding)
  const [view, setView] = useState({ cur: 0, from: 0 });
  const [stopped, setStopped] = useState(false);
  const [pauseTick, setPauseTick] = useState(0);
  const pos = useRef(0);                       // animated position (float, in slots)
  const stepRef = useRef(step);
  const items = useRef(new Map());             // slot → slide element
  const anim = useRef(0);
  const paused = useRef({ hover: false, focus: false, touch: false, offscreen: true });
  const drag = useRef(null);

  // Write each rendered slide's offset and veil for position p (no React render)
  const place = useCallback(p => {
    items.current.forEach((el, slot) => {
      const d = slot - p;
      el.style.transform = `translateX(${d * stepRef.current}px)`;
      el.lastChild.style.opacity = veilAt(d);
    });
  }, []);

  useLayoutEffect(() => {
    const el = track.current;
    const ro = new ResizeObserver(([e]) => setWidth(Math.round(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  useLayoutEffect(() => { stepRef.current = step; place(pos.current); }, [step, view, place]);

  // Animate (or jump, under reduced motion) to a slot
  const go = useCallback((target, user = false) => {
    if (user) setStopped(true);
    cancelAnimationFrame(anim.current);
    const from = pos.current;
    if (target === from) return;
    setView({ cur: target, from });
    if (reducedMotion()) {
      pos.current = target; place(target); setView({ cur: target, from: target });
      return;
    }
    const dur = Math.min(1600, SLIDE * (.6 + .4 * Math.abs(target - from)));
    const t0 = performance.now();
    const frame = now => {
      const t = Math.min(1, (now - t0) / dur);
      pos.current = from + (target - from) * ease(t);
      place(pos.current);
      if (t < 1) anim.current = requestAnimationFrame(frame);
      else setView({ cur: target, from: target });
    };
    anim.current = requestAnimationFrame(frame);
  }, [place]);
  useEffect(() => () => cancelAnimationFrame(anim.current), []);

  // Auto-advance
  const setPause = (k, v) => { if (paused.current[k] !== v) { paused.current[k] = v; setPauseTick(t => t + 1); } };
  useEffect(() => {
    if (stopped || reducedMotion()) return;
    const pz = paused.current;
    if (pz.hover || pz.focus || pz.touch || pz.offscreen || document.hidden) return;
    const id = setTimeout(() => go(view.cur + 1), DWELL);
    return () => clearTimeout(id);
  }, [view.cur, stopped, pauseTick, go]);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setPause("offscreen", e.intersectionRatio < .5), { threshold: [0, .5, 1] });
    io.observe(track.current);
    const onVis = () => setPauseTick(t => t + 1);
    document.addEventListener("visibilitychange", onVis);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  // Controls
  const active = mod(view.cur, N);
  const prev = () => go(view.cur - 1, true);
  const next = () => go(view.cur + 1, true);
  const toProject = i => { let d = mod(i - mod(view.cur, N), N); if (d > N / 2) d -= N; go(view.cur + d, true); };
  const onKeyDown = e => {
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
  };

  // Swipe (touch/pen): the row follows the finger; release past 15% of a card moves one card
  const onPointerDown = e => {
    if (e.pointerType === "mouse") return;
    setPause("touch", true);
    drag.current = { x: e.clientX, y: e.clientY, id: e.pointerId, start: pos.current, moving: false };
  };
  const onPointerMove = e => {
    const g = drag.current; if (!g || e.pointerId !== g.id) return;
    const dx = e.clientX - g.x, dy = e.clientY - g.y;
    if (!g.moving) {
      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { drag.current = null; setPause("touch", false); return; } // vertical scroll
      if (Math.abs(dx) < 8) return;
      g.moving = true; cancelAnimationFrame(anim.current); track.current.setPointerCapture?.(e.pointerId);
    }
    const shift = Math.max(-1, Math.min(1, -dx / stepRef.current));
    pos.current = g.start + shift; place(pos.current);
  };
  const onPointerEnd = e => {
    const g = drag.current; drag.current = null;
    setPause("touch", false);
    if (!g || !g.moving) return;
    const dx = e.clientX - g.x, base = Math.round(g.start);
    const target = Math.abs(dx) > stepRef.current * .15 ? base + (dx < 0 ? 1 : -1) : base;
    go(target, true);
  };

  const lo = Math.floor(Math.min(view.from, view.cur)) - REACH, hi = Math.ceil(Math.max(view.from, view.cur)) + REACH;
  const slots = []; for (let s = lo; s <= hi; s++) slots.push(s);
  const tag = { fontFamily: T.mono, fontSize: ".66rem", letterSpacing: ".06em", color: C.dark, padding: ".2rem .55rem", border: `1px solid ${C.border}`, background: C.surface, whiteSpace: "nowrap" };
  const current = PROJECTS[active];

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Projects" onKeyDown={onKeyDown}
      onPointerEnter={e => e.pointerType === "mouse" && setPause("hover", true)}
      onPointerLeave={e => e.pointerType === "mouse" && setPause("hover", false)}
      onFocus={() => setPause("focus", true)}
      onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setPause("focus", false); }}>
      <div ref={track} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerEnd} onPointerCancel={onPointerEnd}
        style={{ overflow: "hidden", padding: "14px 0", display: "grid", justifyItems: "center", touchAction: "pan-y" }}>
        {slots.map(s => {
          const p = PROJECTS[mod(s, N)], isCur = s === view.cur, d = s - view.from;
          const link = primaryLink(p);
          return (
            <div key={s} ref={el => { if (el) items.current.set(s, el); else items.current.delete(s); }}
              role="group" aria-roledescription="slide" aria-label={`${mod(s, N) + 1} of ${N}: ${p.thumbTitle}`}
              aria-hidden={!isCur} inert={!isCur}
              style={{ gridArea: "1 / 1", width: w, position: "relative", transform: `translateX(${d * step}px)` }}>
              <ProjThumb p={p} />
              <div style={{ paddingTop: "1.1rem" }}>
                <p style={{ ...S_BODY, fontSize: ".95rem", lineHeight: 1.55, color: C.mid, margin: 0 }}>{p.overview}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem", marginTop: ".9rem" }}>
                  {p.stack.slice(0, 4).map(t => <span key={t} style={tag}>{t}</span>)}
                </div>
                {link && (
                  <div style={{ marginTop: "1rem" }}>
                    {link.to
                      ? <Link to={link.to} className="ix-link ix-colored" style={{ fontFamily: T.mono, fontSize: ".7rem", letterSpacing: ".1em", textTransform: "uppercase", color: p.accent, textDecoration: "none" }}>{link.label}</Link>
                      : <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.ariaLabel} className="ix-link ix-colored" style={{ fontFamily: T.mono, fontSize: ".7rem", letterSpacing: ".1em", textTransform: "uppercase", color: p.accent, textDecoration: "none" }}>{link.label}</a>}
                  </div>
                )}
              </div>
              {/* Veil: covers the card, its shadow and its text; opacity grows with distance from the center */}
              <div aria-hidden="true" style={{ position: "absolute", inset: -11, background: SURFACE, opacity: veilAt(d), pointerEvents: "none" }} />
            </div>
          );
        })}
      </div>

      {/* Controls: previous, one dot per project, next */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: mobile ? ".5rem" : "1rem", marginTop: "1.2rem", padding: "0 1rem" }}>
        <button type="button" className="ix-arrow" onClick={prev} aria-label="Previous project" style={arrowStyle}>←</button>
        <div style={{ display: "flex", gap: mobile ? 0 : ".15rem" }}>
          {PROJECTS.map((p, i) => (
            <button key={p.id} type="button" className="ix-dot" onClick={() => toProject(i)} aria-label={`Show project ${i + 1}: ${p.thumbTitle}`} aria-current={i === active ? "true" : undefined}
              style={{ width: 28, height: 28, padding: 0, background: "transparent", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", border: `1.5px solid ${C.dark}`, background: i === active ? C.dark : "transparent", transition: "background .2s" }} />
            </button>
          ))}
        </div>
        <button type="button" className="ix-arrow" onClick={next} aria-label="Next project" style={arrowStyle}>→</button>
      </div>
      {/* Announces the card in focus once the visitor has taken control (silent while auto-advancing) */}
      <div aria-live={stopped ? "polite" : "off"} style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
        {`Project ${active + 1} of ${N}: ${current.thumbTitle}`}
      </div>
    </div>
  );
}

const arrowStyle = { width: 44, height: 44, display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: T.mono, fontSize: "1.1rem", color: C.dark, background: "transparent", border: `1.5px solid ${C.dark}`, cursor: "pointer", transition: "all .2s" };
