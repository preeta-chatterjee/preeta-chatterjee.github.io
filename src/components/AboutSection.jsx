import { C, T, revealStyle } from "../theme";
import { useInView } from "../hooks";
import ExperienceBlock from "./ExperienceBlock";

// ── About sub-components (hooks must be at component top level) ───────────────
export default function AboutSection({ s, i, mobile }) {
  const [ref, inV] = useInView();
  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "160px 1fr", gap: mobile ? "1rem" : "3rem", marginBottom: "3rem", borderTop: `1px solid ${C.border2}`, paddingTop: "2rem", ...revealStyle(inV, i * .1) }}>
      <div>
        <div style={{ width: 24, height: 3, background: s.accent, marginBottom: ".8rem" }} />
        <div style={{ fontFamily: T.display, fontSize: "1.3rem", color: C.dark, letterSpacing: ".02em" }}>{s.heading}</div>
      </div>
      {s.body
        ? <p style={{ fontFamily: T.serif, fontSize: "1rem", color: C.mid, lineHeight: 1.85, fontStyle: "italic" }}>{s.body}</p>
        : <ExperienceBlock />
      }
    </div>
  );
}
