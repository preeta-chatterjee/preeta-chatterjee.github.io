export const C = {
  bg: "#F2F2F2", surface: "#ffffff", border: "#d0d0d0", border2: "#e8e8e8",
  green: "#174D38", greenL: "#1e6347", greenMid: "#2d7a57", greenBg: "#e4ede8",
  red: "#4D1717", redL: "#7a2424", redMid: "#8b3a3a", redBg: "#f5e8e8",
  dark: "#111111", mid: "#444444", muted: "#777777",
  desc: "#595959", // project/publication descriptions and captions (6.26:1 on #F2F2F2, passes AA)
  amber: "#b8860b", amberBg: "#fdf3e0", amberDk: "#7a5a08",
};

// ── Layout constants ──────────────────────────────────────────────────────────
export const NAV_HEIGHT = 60; // px — update here if nav height changes

// ── Typography tokens ─────────────────────────────────────────────────────────
export const T = {
  mono:    "'DM Mono', monospace",
  serif:   "'DM Serif Display', Georgia, serif",
  display: "'Bebas Neue', sans-serif",
  sans:    "'DM Sans', system-ui, -apple-system, 'Segoe UI', sans-serif", // body text
};

// ── Reusable style patterns ───────────────────────────────────────────────────
// Tiny monospace label (section numbers, tags, captions)
export const S_LABEL = { fontFamily: T.mono, fontSize: ".6rem", letterSpacing: ".18em", textTransform: "uppercase" };
// Body / paragraph text: DM Sans, upright. 17px on desktop, ~16px on phone.
export const S_BODY = { fontFamily: T.sans, fontSize: "clamp(1rem, .95rem + .25vw, 1.0625rem)", lineHeight: 1.6, fontStyle: "normal", fontWeight: 400 };
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

// ── Home themes (Phase 2) ─────────────────────────────────────────────────────
// SITE.theme ("dark" | "light") picks one; HomeGrid applies it as CSS variables, so that one
// setting switches the whole top of the home page on desktop and phone.
// fade: the name box and about box share one background that fades from `base` to `end`,
// between `start`% and `stop`% across (desktop) or across a band between them (phone).
export const HOME_THEMES = {
  dark: {
    base: "#F2F1EF", end: "#121212", start: 26, stop: 60,
    headline: "#F2F1EF", green: "#3D8A66", red: "#C0504F", blurb: "#D9D6D1", statLabel: "#B8B4AE", statBorder: "#4A4C50",
    readMore: "#2F6B50", // darker than the accent green so white button text passes AA
  },
  light: {
    base: "#F2F1EF", end: "#DDDAD5", start: 30, stop: 60,
    headline: "#111111", green: "#1E4D3B", red: "#5A1A1C", blurb: "#2E2E2E", statLabel: "#4A4A4A", statBorder: "#B5B1AB",
    readMore: "#1E4D3B",
  },
};

// Skill tag colors, by row (same in both themes)
export const TAG_TONES = {
  maroon:   { background: "#5A1A1C", color: "#FFFFFF", borderColor: "#5A1A1C" },
  green:    { background: "#1E4D3B", color: "#FFFFFF", borderColor: "#1E4D3B" },
  charcoal: { background: "#2F3135", color: "#FFFFFF", borderColor: "#2F3135" },
  outline:  { background: "#FFFFFF", color: "#111111", borderColor: "#111111" },
};

const hexToRgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mixHex = (a, b, t) => {
  const [x, y] = [hexToRgb(a), hexToRgb(b)];
  return "#" + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, "0")).join("");
};
// Gradient from `from` to `to` between start% and stop%, with many eased stops so it stays gradual.
export function fadeGradient(direction, from, to, start, stop, steps = 14) {
  const stops = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps, eased = t * t * (3 - 2 * t); // smoothstep
    stops.push(`${mixHex(from, to, eased)} ${(start + (stop - start) * t).toFixed(1)}%`);
  }
  return `linear-gradient(${direction}, ${stops.join(", ")})`;
}

export function homeThemeVars(name) {
  const th = HOME_THEMES[name] || HOME_THEMES.dark;
  return {
    "--home-base": th.base,
    "--home-end": th.end,
    "--home-fade-x": fadeGradient("to right", th.base, th.end, th.start, th.stop),
    "--home-fade-y": fadeGradient("to bottom", th.base, th.end, 0, 100),
    "--about-headline": th.headline,
    "--about-green": th.green,
    "--readmore-bg": th.readMore,
    "--about-red": th.red,
    "--about-blurb": th.blurb,
    "--stat-label": th.statLabel,
    "--stat-border": th.statBorder,
  };
}
