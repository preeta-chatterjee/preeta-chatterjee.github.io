import { C, T, S_BODY } from "../theme";
import { useReveal, useMobile } from "../hooks";
import ExperienceBlock from "./ExperienceBlock";
import VideoEmbed from "./VideoEmbed";

// ── About sub-components (hooks must be at component top level) ───────────────
// `s.body` null renders the experience list. Optional `s.video` (click-to-load YouTube preview)
// and `s.links` (external, new tab, outline buttons). A section with a video uses its own layout:
// from 900px two columns (heading, text and links on the left; the video on the right, max
// 480px), below that one stack (heading, text, full-width video, links).
const TONES = { green: C.green, red: C.red };
const linkStyle = tone => ({
  fontFamily: T.mono, fontSize: "15px", letterSpacing: ".02em", lineHeight: 1.3, color: TONES[tone],
  border: `1.5px solid ${TONES[tone]}`, padding: ".55rem 1rem", minHeight: 44, boxSizing: "border-box",
  display: "inline-flex", alignItems: "center", textDecoration: "none", transition: "background .2s, color .2s",
});

function Links({ links, nowrap }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: ".75rem", marginTop: "1.5rem" }}>
      {links.map(l => (
        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
          className={l.tone === "red" ? "ix-btn-outline-red" : "ix-btn-outline"}
          aria-label={`${l.label.replace(" ↗", "")} (opens in a new tab)`} style={{ ...linkStyle(l.tone), whiteSpace: nowrap ? "nowrap" : "normal" }}>{l.label}</a>
      ))}
    </div>
  );
}

export default function AboutSection({ s, mobile, rule = true }) {
  const ref = useReveal();
  const split = !useMobile(900);
  const heading = (
    <div>
      <div style={{ width: 24, height: 3, background: s.accent, marginBottom: ".8rem" }} />
      <div style={{ fontFamily: T.display, fontSize: "1.3rem", color: C.dark, letterSpacing: ".02em" }}>{s.heading}</div>
    </div>
  );
  const frame = { marginBottom: "3rem", borderTop: rule ? `1px solid ${C.border2}` : "none", paddingTop: "2rem" };
  if (s.video) return (
    <div className="rv" ref={ref} style={split
      ? { ...frame, display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,480px)", gap: "3rem", alignItems: "start" }
      : frame}>
      <div style={{ minWidth: 0 }}>
        {heading}
        <p style={{ ...S_BODY, color: C.mid, marginTop: "1rem" }}>{s.body}</p>
        {split && s.links && <Links links={s.links} nowrap />}
      </div>
      <div style={{ minWidth: 0, marginTop: split ? 0 : "1.5rem" }}>
        <VideoEmbed {...s.video} clickToLoad />
        {!split && s.links && <Links links={s.links} />}
      </div>
    </div>
  );
  return (
    <div className="rv" ref={ref} style={{ ...frame, display: "grid", gridTemplateColumns: mobile ? "1fr" : "160px 1fr", gap: mobile ? "1rem" : "3rem" }}>
      {heading}
      {s.body
        ? <p style={{ ...S_BODY, color: C.mid }}>{s.body}</p>
        : <ExperienceBlock />
      }
    </div>
  );
}
