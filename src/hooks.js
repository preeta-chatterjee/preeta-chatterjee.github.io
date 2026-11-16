import { useState, useEffect, useLayoutEffect, useRef } from "react";

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Scroll reveal, following the loading rules in CLAUDE.md:
// - Anything on screen when the page first lays out shows immediately (no entrance animation).
//   The check runs in a layout effect, before the first paint, so nothing flashes.
// - Below the fold: a short fade-up (0.45s, 12px, see reveal.css) when it scrolls into view;
//   never staggered.
// - prefers-reduced-motion (or no IntersectionObserver): always shown, no animation.
// Usage: put the returned ref on the element to measure, and className="rv" on the CONTENT to
// fade: the measured element itself (if it paints no background) and/or elements inside it.
// Never put "rv" on an element that paints a background: surfaces are drawn at once.
// Everything inside one measured element appears together.
// The hook sets data-reveal="hidden" | "shown" on the measured element (DOM only, no re-render).
export function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || typeof IntersectionObserver === "undefined") return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return; // on screen at load: leave it alone
    el.dataset.reveal = "hidden";
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.dataset.reveal = "shown"; obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

export function useMobile(bp = 768) {
  const [mobile, setMobile] = useState(typeof window !== "undefined" ? window.innerWidth < bp : false);
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < bp);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [bp]);
  return mobile;
}
