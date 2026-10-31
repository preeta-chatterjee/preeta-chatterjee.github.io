import { C, T, revealStyle } from "../theme";
import { useInView } from "../hooks";
import { EXPERIENCE } from "../content";

export default function ExperienceBlock({ mobile }) {
  const [ref, inV] = useInView();
  return (
    <div ref={ref} style={{ ...revealStyle(inV) }}>
      {EXPERIENCE.map((job, ji) => (
        <div key={job.company} style={{ borderBottom: `1px solid ${C.border2}`, padding: "1.5rem 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: ".5rem", marginBottom: ".8rem" }}>
            <div>
              <div style={{ fontFamily: T.serif, fontSize: "1rem", color: C.dark, fontStyle: "italic", marginBottom: ".2rem" }}>{job.role}</div>
              <div style={{ fontFamily: T.mono, fontSize: ".68rem", color: C.muted }}>{job.company} · {job.loc}</div>
            </div>
            <div style={{ fontFamily: T.mono, fontSize: ".62rem", color: C.green, flexShrink: 0 }}>{job.dates}</div>
          </div>
          <ul style={{ paddingLeft: "1.1rem", margin: 0 }}>
            {job.bullets.map((b, bi) => (
              <li key={bi} style={{ fontFamily: T.serif, fontSize: ".92rem", color: C.mid, lineHeight: 1.75, fontStyle: "italic", marginBottom: ".3rem" }}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
