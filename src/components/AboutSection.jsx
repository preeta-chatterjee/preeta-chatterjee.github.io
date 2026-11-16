import { C, T, S_BODY } from "../theme";
import { useReveal } from "../hooks";
import ExperienceBlock from "./ExperienceBlock";

// ── About sub-components (hooks must be at component top level) ───────────────
export default function AboutSection({ s, mobile }) {
  const ref = useReveal();
  return (
    <div className="rv" ref={ref} style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "160px 1fr", gap: mobile ? "1rem" : "3rem", marginBottom: "3rem", borderTop: `1px solid ${C.border2}`, paddingTop: "2rem" }}>
      <div>
        <div style={{ width: 24, height: 3, background: s.accent, marginBottom: ".8rem" }} />
        <div style={{ fontFamily: T.display, fontSize: "1.3rem", color: C.dark, letterSpacing: ".02em" }}>{s.heading}</div>
      </div>
      {s.body
        ? <p style={{ ...S_BODY, color: C.mid }}>{s.body}</p>
        : <ExperienceBlock />
      }
    </div>
  );
}
