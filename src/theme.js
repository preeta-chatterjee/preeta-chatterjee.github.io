export const C = {
  bg: "#F2F2F2", surface: "#ffffff", border: "#d0d0d0", border2: "#e8e8e8",
  green: "#174D38", greenL: "#1e6347", greenMid: "#2d7a57", greenBg: "#e4ede8",
  red: "#4D1717", redL: "#7a2424", redMid: "#8b3a3a", redBg: "#f5e8e8",
  dark: "#111111", mid: "#444444", muted: "#777777",
  amber: "#b8860b", amberBg: "#fdf3e0", amberDk: "#7a5a08",
};

// ── Layout constants ──────────────────────────────────────────────────────────
export const NAV_HEIGHT = 60; // px — update here if nav height changes

// ── Typography tokens ─────────────────────────────────────────────────────────
export const T = {
  mono:    "'DM Mono', monospace",
  serif:   "'DM Serif Display', Georgia, serif",
  display: "'Bebas Neue', sans-serif",
};

// ── Reusable style patterns ───────────────────────────────────────────────────
// Tiny monospace label (section numbers, tags, captions)
export const S_LABEL = { fontFamily: T.mono, fontSize: ".6rem", letterSpacing: ".18em", textTransform: "uppercase" };
// Standard nav / button mono text
export const S_MONO_SM = { fontFamily: T.mono, fontSize: ".68rem", letterSpacing: ".14em", textTransform: "uppercase" };
// Ghost outline button base (colour overridden per use)
export const S_BTN_GHOST = (color) => ({
  ...S_MONO_SM, display: "inline-block", padding: ".5rem 1.2rem",
  border: `1.5px solid ${color}`, color, textDecoration: "none", transition: "all .2s",
});
// Filled button base
export const S_BTN_FILLED = (bg, fg = "#F2F2F2") => ({
  ...S_MONO_SM, display: "inline-block", padding: ".75rem 1.8rem",
  background: bg, color: fg, border: `2px solid ${bg}`, textDecoration: "none", transition: "all .2s",
});

export const PALETTE = [C.green, C.red, C.greenL, C.redL, "#CBCBCB", C.redMid, C.greenMid];

// Returns inline style for scroll-triggered fade-up animation
export const revealStyle = (inView, delay = 0) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? "translateY(0)" : "translateY(28px)",
  transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
});
