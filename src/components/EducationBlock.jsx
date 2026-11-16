import { C, T, S_BODY } from "../theme";
import { useReveal } from "../hooks";
import { EDUCATION } from "../content";

export default function EducationBlock({ mobile }) {
  const ref = useReveal();
  return (
    <div className="rv" ref={ref} style={{ marginTop: "2rem" }}>
      <div style={{ fontFamily: T.mono, fontSize: ".62rem", letterSpacing: ".2em", color: C.green, textTransform: "uppercase", marginBottom: "1.5rem" }}>Education</div>
      {EDUCATION.map(e => (
        <div key={e.school} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: `1px solid ${C.border2}`, padding: "1.5rem 0", flexWrap: mobile ? "wrap" : "nowrap", gap: "1rem" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: T.serif, fontSize: "1.2rem", color: C.dark, fontStyle: "italic", marginBottom: ".3rem" }}>{e.deg}</div>
            <div style={{ fontFamily: T.mono, fontSize: ".7rem", color: C.muted }}>{e.school} · {e.loc}</div>
            {e.details?.map(d => <div key={d} style={{ ...S_BODY, color: C.mid, marginTop: ".5rem" }}>{d}</div>)}
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontFamily: T.display, fontSize: "1.4rem", color: e.col }}>{e.gpa}</div>
            <div style={{ fontFamily: T.mono, fontSize: ".62rem", color: C.muted }}>{e.year}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
