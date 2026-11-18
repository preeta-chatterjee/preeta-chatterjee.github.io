import { C, T, S_BODY } from "../theme";
import { useReveal } from "../hooks";
import ExperienceBlock from "./ExperienceBlock";
import VideoEmbed from "./VideoEmbed";

// ── About sub-components (hooks must be at component top level) ───────────────
// `s.body` null renders the experience list. Optional `s.video` (click-to-load YouTube preview)
// and `s.links` (external, new tab) follow the body.
const linkStyle = color => ({ fontFamily: T.mono, fontSize: ".78rem", letterSpacing: ".04em", color, textDecoration: "none" });

export default function AboutSection({ s, mobile, rule = true }) {
  const ref = useReveal();
  return (
    <div className="rv" ref={ref} style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "160px 1fr", gap: mobile ? "1rem" : "3rem", marginBottom: "3rem", borderTop: rule ? `1px solid ${C.border2}` : "none", paddingTop: "2rem" }}>
      <div>
        <div style={{ width: 24, height: 3, background: s.accent, marginBottom: ".8rem" }} />
        <div style={{ fontFamily: T.display, fontSize: "1.3rem", color: C.dark, letterSpacing: ".02em" }}>{s.heading}</div>
      </div>
      {s.body
        ? <div style={{ minWidth: 0 }}>
            <p style={{ ...S_BODY, color: C.mid }}>{s.body}</p>
            {s.video && <div style={{ marginTop: "1.5rem" }}><VideoEmbed {...s.video} clickToLoad /></div>}
            {s.links && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem 1.6rem", marginTop: "1rem" }}>
                {s.links.map(l => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="ix-link ix-colored"
                    aria-label={`${l.label.replace(" ↗", "")} (opens in a new tab)`} style={linkStyle(l.color)}>{l.label}</a>
                ))}
              </div>
            )}
          </div>
        : <ExperienceBlock />
      }
    </div>
  );
}
