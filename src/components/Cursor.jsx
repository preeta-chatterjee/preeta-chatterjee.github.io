import { useEffect, useRef } from "react";
import { C } from "../theme";
import { useMobile } from "../hooks";

const CURSOR_LERP     = 0.12; // cursor ring lag: 0 = instant, 1 = never moves

// ── Cursor (desktop only) ─────────────────────────────────────────────────────
export default function Cursor() {
  const dot = useRef(null), ring = useRef(null);
  const mouse = useRef({ x: -999, y: -999 }), pos = useRef({ x: -999, y: -999 });
  const mobile = useMobile();
  useEffect(() => {
    if (mobile) {
      document.body.style.cursor = "auto";
      return () => { document.body.style.cursor = "auto"; };
    }
    const move = e => { mouse.current = { x: e.clientX, y: e.clientY }; };
    document.addEventListener("mousemove", move);
    document.body.style.cursor = "none";
    let raf;
    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * CURSOR_LERP;
      pos.current.y += (mouse.current.y - pos.current.y) * CURSOR_LERP;
      if (dot.current) { dot.current.style.left = mouse.current.x + "px"; dot.current.style.top = mouse.current.y + "px"; }
      if (ring.current) { ring.current.style.left = pos.current.x + "px"; ring.current.style.top = pos.current.y + "px"; }
      raf = requestAnimationFrame(tick);
    };
    tick();
    const grow = () => { if (dot.current) dot.current.style.transform = "translate(-50%,-50%) scale(2.5)"; if (ring.current) ring.current.style.opacity = "0"; };
    const shrink = () => { if (dot.current) dot.current.style.transform = "translate(-50%,-50%) scale(1)"; if (ring.current) ring.current.style.opacity = "1"; };
    const attach = () => document.querySelectorAll("a,button").forEach(el => { el.addEventListener("mouseenter", grow); el.addEventListener("mouseleave", shrink); });
    attach();
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { document.removeEventListener("mousemove", move); cancelAnimationFrame(raf); document.body.style.cursor = "auto"; mo.disconnect(); };
  }, [mobile]);
  if (mobile) return null;
  return (
    <>
      <div ref={dot} style={{ position: "fixed", width: 10, height: 10, background: C.red, borderRadius: "50%", pointerEvents: "none", zIndex: 9999, transform: "translate(-50%,-50%)", transition: "transform .15s" }} />
      <div ref={ring} style={{ position: "fixed", width: 34, height: 34, border: `1.5px solid ${C.red}`, borderRadius: "50%", pointerEvents: "none", zIndex: 9998, transform: "translate(-50%,-50%)" }} />
    </>
  );
}
