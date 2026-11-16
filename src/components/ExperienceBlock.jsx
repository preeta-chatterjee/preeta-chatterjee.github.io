import { C, T, S_BODY } from "../theme";
import { EXPERIENCE } from "../content";

export default function ExperienceBlock() {
  // No reveal of its own: it sits inside an AboutSection, which fades as one unit
  return (
    <div>
      {EXPERIENCE.map(job => (
        <div key={`${job.role} · ${job.company}`} style={{ borderBottom: `1px solid ${C.border2}`, padding: "1.5rem 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: ".5rem", marginBottom: ".8rem" }}>
            <div>
              <div style={{ fontFamily: T.serif, fontSize: "1.15rem", color: C.dark, fontStyle: "italic", marginBottom: ".2rem" }}>{job.role}</div>
              <div style={{ fontFamily: T.mono, fontSize: ".68rem", color: C.muted }}>{job.company} · {job.loc}</div>
              {job.note && <div style={{ fontFamily: T.mono, fontSize: ".62rem", color: C.muted, marginTop: ".25rem" }}>{job.note}</div>}
            </div>
            <div style={{ fontFamily: T.mono, fontSize: ".62rem", color: C.green, flexShrink: 0 }}>{job.dates}</div>
          </div>
          <ul style={{ paddingLeft: "1.1rem", margin: 0 }}>
            {job.bullets.map((b, bi) => (
              <li key={bi} style={{ ...S_BODY, color: C.mid, marginBottom: ".3rem" }}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
