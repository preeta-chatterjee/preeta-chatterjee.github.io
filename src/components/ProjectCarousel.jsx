import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { C, T, S_BODY } from "../theme";
import { PROJECTS, CAROUSEL_PROJECT_IDS } from "../content";
import { primaryLink } from "../projectLinks";
import ProjThumb from "./ProjThumb";

// ── Home projects carousel (Phase 2 PR 7) ─────────────────────────────────────
// One horizontal row of every project, in CAROUSEL_PROJECT_IDS order. The row slides left as it
// advances; the center card is clear and the others sit under an off-white veil that grows with
// their distance from the center, so cards fade out past the left edge and fade in from the right
// as they move. One continuous position drives both the offset and the veil, so the fade follows
// the motion exactly. Infinite loop: slides are keyed by an unbounded slot number and slot s shows
// project s mod N, so after the last project the next slot is simply the first one again.
//
// Auto-advance (TIMING below):
// - Pauses while the mouse is over the carousel, while it has keyboard focus, while it is less than
//   half on screen and while the tab is hidden.
// - Desktop (mouse/keyboard): arrows, dots, arrow keys and side-card clicks also pause it; it resumes
//   TIMING.resumeAfter ms after the last interaction and the mouse leaving.
// - Touch: any touch (swipe, tap, arrow, dot) stops it for good.
// - The pause/play toggle stops it entirely until play is pressed (play also restarts after a touch).
// - prefers-reduced-motion: no auto-advance and no sliding; the toggle is hidden.
// Only the center card is reachable: it is one link (thumbnail + overview + destination hint);
// the other slides are aria-hidden and contain nothing focusable (their veiled text is below AA by
// design). Clicking a side card brings it to the center. Loading rules: nothing animates on first
// paint; the first render already has every offset and veil in place.
const TIMING = { rest: 3500, slide: 700, resumeAfter: 5000, maxJump: 1400 }; // ms; tune here
// Touch-device arrows: "subtle" (small, always visible) or "none" (swipe only)
const TOUCH_ARROWS = "subtle";

const ORDER = CAROUSEL_PROJECT_IDS.map(id => PROJECTS.find(p => p.id === id));
const N = ORDER.length;
const REACH = 4;               // slots rendered on each side of the center
const SURFACE = "#F2F1EF";     // section background = veil color
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
const clock = () => Date.now(); // read only from handlers and effects
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
  const [stopped, setStopped] = useState(false);     // touch interaction: no auto-advance until play
  const [userPaused, setUserPaused] = useState(false); // pause/play toggle
  const [manual, setManual] = useState(false);       // visitor has navigated (live region speaks)
  const [tick, setTick] = useState(0);               // re-evaluates the auto-advance timer
  const [reduce, setReduce] = useState(() => reducedMotion());
  const pos = useRef(0);                              // animated position (float, in slots)
  const stepRef = useRef(step);
  const items = useRef(new Map());                    // slot → slide element
  const anim = useRef(0);
  const paused = useRef({ hover: false, focus: false, offscreen: true });
  const holdUntil = useRef(0);                        // desktop: no auto-advance before this time
  const drag = useRef(null);
  const suppressClick = useRef(false);

  // Write each rendered slide's offset and veil for position p (no React render)
  const place = useCallback(p => {
    items.current.forEach((el, slot) => {
      const d = slot - p;
      el.style.transform = `translateX(${d * stepRef.current}px)`;
      el.lastChild.style.opacity = veilAt(d);
    });
  }, []);

  useLayoutEffect(() => {
    const ro = new ResizeObserver(([e]) => setWidth(Math.round(e.contentRect.width)));
    ro.observe(track.current);
    return () => ro.disconnect();
  }, []);
  useLayoutEffect(() => { stepRef.current = step; place(pos.current); }, [step, view, place]);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduce(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // Animate (or jump, under reduced motion) to a slot
  const go = useCallback(target => {
    cancelAnimationFrame(anim.current);
    const from = pos.current;
    if (target === from) return;
    setView({ cur: target, from });
    if (reducedMotion()) { pos.current = target; place(target); setView({ cur: target, from: target }); return; }
    const dur = Math.min(TIMING.maxJump, TIMING.slide * (.6 + .4 * Math.abs(target - from)));
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

  // Pause bookkeeping
  const setPause = (k, v) => { if (paused.current[k] !== v) { paused.current[k] = v; setTick(t => t + 1); } };
  const hold = () => { holdUntil.current = clock() + TIMING.resumeAfter; setTick(t => t + 1); };
  // A visitor moved the carousel: desktop → pause, resume later; touch → stop for good
  const userGo = (target, pointerType) => {
    setManual(true);
    if (pointerType && pointerType !== "mouse") setStopped(true); else hold();
    go(target);
  };

  // Auto-advance: one rest per card once it has settled in the center
  const resting = view.from === view.cur;
  useEffect(() => {
    if (!resting || stopped || userPaused || reduce) return;
    const pz = paused.current;
    if (pz.hover || pz.focus || pz.offscreen || document.hidden) return;
    const wait = holdUntil.current - clock();
    // After a desktop interaction: advance once the hold ends (the card has already rested meanwhile)
    if (wait > 0) { const id = setTimeout(() => { holdUntil.current = 0; go(view.cur + 1); }, wait); return () => clearTimeout(id); }
    const id = setTimeout(() => go(view.cur + 1), TIMING.rest);
    return () => clearTimeout(id);
  }, [resting, view.cur, stopped, userPaused, reduce, tick, go]);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setPause("offscreen", e.intersectionRatio < .5), { threshold: [0, .5, 1] });
    io.observe(track.current);
    const onVis = () => setTick(t => t + 1);
    document.addEventListener("visibilitychange", onVis);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  // Controls
  const active = mod(view.cur, N);
  const toProject = (i, pt) => { let d = mod(i - active, N); if (d > N / 2) d -= N; userGo(view.cur + d, pt); };
  const onKeyDown = e => {
    if (e.key === "ArrowLeft") { e.preventDefault(); userGo(view.cur - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); userGo(view.cur + 1); }
  };
  const playing = !stopped && !userPaused;
  const toggle = () => {
    if (playing) setUserPaused(true);
    else { setUserPaused(false); setStopped(false); holdUntil.current = 0; setTick(t => t + 1); }
  };

  // Swipe (touch/pen): the row follows the finger; release past 15% of a card moves one card
  const onPointerDown = e => {
    if (e.pointerType === "mouse") return;
    // Any touch stops auto-advance for good (play restarts it); the toggle handles itself
    if (!e.target.closest(".ix-carr-toggle")) setStopped(true);
    drag.current = { x: e.clientX, y: e.clientY, id: e.pointerId, start: pos.current, moving: false };
  };
  const onPointerMove = e => {
    const g = drag.current; if (!g || e.pointerId !== g.id) return;
    const dx = e.clientX - g.x, dy = e.clientY - g.y;
    if (!g.moving) {
      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { drag.current = null; return; } // vertical scroll
      if (Math.abs(dx) < 8) return;
      g.moving = true; cancelAnimationFrame(anim.current); track.current.setPointerCapture?.(e.pointerId);
    }
    pos.current = g.start + Math.max(-1, Math.min(1, -dx / stepRef.current)); place(pos.current);
  };
  const onPointerEnd = e => {
    const g = drag.current; drag.current = null;
    if (!g || !g.moving) return;
    suppressClick.current = true; // the click that follows a swipe must not open a card
    const dx = e.clientX - g.x, base = Math.round(g.start);
    userGo(Math.abs(dx) > stepRef.current * .15 ? base + (dx < 0 ? 1 : -1) : base, "touch");
  };
  const onClickCapture = e => { if (suppressClick.current) { suppressClick.current = false; e.preventDefault(); e.stopPropagation(); } };

  const lo = Math.floor(Math.min(view.from, view.cur)) - REACH, hi = Math.ceil(Math.max(view.from, view.cur)) + REACH;
  const slots = []; for (let s = lo; s <= hi; s++) slots.push(s);
  const tag = { fontFamily: T.mono, fontSize: ".66rem", letterSpacing: ".06em", color: C.dark, padding: ".2rem .55rem", border: `1px solid ${C.border}`, background: C.surface, whiteSpace: "nowrap" };
  const arrowTop = 14 + w / 1.6 / 2; // vertically centered on the card image
  const current = ORDER[active];

  const slideBody = (p, link) => (
    <>
      <ProjThumb p={p} />
      <div style={{ paddingTop: "1.1rem" }}>
        <p style={{ ...S_BODY, fontSize: ".95rem", lineHeight: 1.55, color: C.mid, margin: 0 }}>{p.overview}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem", marginTop: ".9rem" }}>
          {p.stack.slice(0, 4).map(t => <span key={t} style={tag}>{t}</span>)}
        </div>
        {link && <div className="ix-slide-hint" style={{ marginTop: "1rem", fontFamily: T.mono, fontSize: ".7rem", letterSpacing: ".1em", textTransform: "uppercase", color: p.accent, textUnderlineOffset: 3 }}>{link.label}</div>}
      </div>
    </>
  );

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Projects" className="ix-carousel" data-touch-arrows={TOUCH_ARROWS}
      onKeyDown={onKeyDown} onPointerDownCapture={onPointerDown}
      onPointerEnter={e => e.pointerType === "mouse" && setPause("hover", true)}
      onPointerLeave={e => { if (e.pointerType === "mouse") { paused.current.hover = false; hold(); } }}
      onFocus={e => { if (e.target.matches(":focus-visible")) setPause("focus", true); }}
      onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget) && paused.current.focus) { paused.current.focus = false; hold(); } }}>
      <div ref={track} onPointerMove={onPointerMove} onPointerUp={onPointerEnd} onPointerCancel={onPointerEnd} onClickCapture={onClickCapture}
        style={{ position: "relative", overflow: "hidden", padding: "14px 0", display: "grid", justifyItems: "center", touchAction: "pan-y" }}>
        {slots.map(s => {
          const p = ORDER[mod(s, N)], isCur = s === view.cur, d = s - view.from;
          const link = primaryLink(p);
          const name = link ? `${p.thumbTitle}: ${link.label.replace(/ [→↗]$/, "")}${link.href ? " (opens in a new tab)" : ""}` : p.thumbTitle;
          let body;
          if (isCur && link?.to) body = <Link to={link.to} className="ix-slide-link" aria-label={name} style={slideLink}>{slideBody(p, link)}</Link>;
          else if (isCur && link) body = <a href={link.href} target="_blank" rel="noopener noreferrer" className="ix-slide-link" aria-label={name} style={slideLink}>{slideBody(p, link)}</a>;
          else body = <div>{slideBody(p, link)}</div>; // no destination, or a side card
          return (
            <div key={s} ref={el => { if (el) items.current.set(s, el); else items.current.delete(s); }}
              role="group" aria-roledescription="slide" aria-label={`${mod(s, N) + 1} of ${N}: ${p.thumbTitle}`} aria-hidden={!isCur}
              onClick={isCur ? undefined : e => userGo(s, e.nativeEvent.pointerType)}
              style={{ gridArea: "1 / 1", width: w, position: "relative", transform: `translateX(${d * step}px)`, cursor: isCur ? "default" : "pointer" }}>
              {body}
              {/* Veil: covers the card, its shadow and its text; opacity grows with distance from the center */}
              <div aria-hidden="true" style={{ position: "absolute", inset: -11, background: SURFACE, opacity: veilAt(d), pointerEvents: "none" }} />
            </div>
          );
        })}
        {/* Arrows on the row's edges, over the veiled side cards (desktop: shown on hover / keyboard focus) */}
        <button type="button" className="ix-carr-arrow" aria-label="Previous project" onClick={e => userGo(view.cur - 1, e.nativeEvent.pointerType)}
          style={{ ...arrowStyle, top: arrowTop, left: mobile ? 2 : 28 }}>←</button>
        <button type="button" className="ix-carr-arrow" aria-label="Next project" onClick={e => userGo(view.cur + 1, e.nativeEvent.pointerType)}
          style={{ ...arrowStyle, top: arrowTop, right: mobile ? 2 : 28 }}>→</button>
      </div>

      {/* Dots (one per project) and the pause/play toggle */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: ".6rem", marginTop: "1rem", padding: "0 1rem" }}>
        <div style={{ display: "flex" }}>
          {ORDER.map((p, i) => (
            <button key={p.id} type="button" className="ix-dot" onClick={e => toProject(i, e.nativeEvent.pointerType)} aria-label={`Show project ${i + 1}: ${p.thumbTitle}`} aria-current={i === active ? "true" : undefined}
              style={{ width: 28, height: 28, padding: 0, background: "transparent", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", border: `1.5px solid ${C.dark}`, background: i === active ? C.dark : "transparent", transition: "background .2s" }} />
            </button>
          ))}
        </div>
        {!reduce && (
          <button type="button" className="ix-carr-toggle" onClick={toggle} aria-label={playing ? "Pause carousel" : "Play carousel"}
            style={{ height: 28, padding: "0 .6rem", display: "inline-flex", alignItems: "center", gap: ".4rem", fontFamily: T.mono, fontSize: ".62rem", letterSpacing: ".12em", textTransform: "uppercase", color: C.muted, background: "transparent", border: `1px solid ${C.border}`, cursor: "pointer", transition: "all .2s" }}>
            <span aria-hidden="true" style={{ fontSize: ".7rem", letterSpacing: 0 }}>{playing ? "❚❚" : "▶"}</span>{playing ? "Pause" : "Play"}
          </button>
        )}
      </div>
      {/* Announces the card in focus once the visitor has taken control (silent while auto-advancing) */}
      <div aria-live={manual || !playing ? "polite" : "off"} style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
        {`Project ${active + 1} of ${N}: ${current.thumbTitle}`}
      </div>
    </div>
  );
}

const slideLink = { display: "block", color: "inherit", textDecoration: "none", transition: "translate .25s ease" };
const arrowStyle = { position: "absolute", zIndex: 2, transform: "translateY(-50%)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: T.mono, color: C.dark, cursor: "pointer", transition: "opacity .2s, background .2s, color .2s" };
