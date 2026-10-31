import { useState } from "react";
import { C } from "../theme";
import { useInView, useMobile } from "../hooks";

export default function PubCard({ p, i }) {
  const [ref, inV] = useInView();
  const [hov, setHov] = useState(false);
  const mobile = useMobile();

  return (
    <div ref={ref} style={{
      background: hov ? "#fff" : C.bg,
      padding: mobile ? "1.8rem 1.5rem" : "2.5rem 3rem",
      position: "relative", overflow: "hidden",
      borderBottom: `1.5px solid ${C.border}`,
      opacity: inV ? 1 : 0, transform: inV ? "none" : "translateY(28px)",
      transition: `background .3s, opacity .7s ease ${i * .1}s, transform .7s ease ${i * .1}s`,
    }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", flexWrap: "wrap", gap: ".5rem" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", padding: ".22rem .7rem", background: C.greenBg, border: `1px solid ${C.green}44` }}>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".58rem", letterSpacing: ".1em", color: C.green }}>{p.type}</span>
        </div>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.5rem", color: hov ? C.border : C.border2, lineHeight: 1, transition: "color .3s" }}>{p.num}</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 2fr", gap: mobile ? "1rem" : "3rem", alignItems: "start" }}>
        <div>
          <h3 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "1.2rem", color: C.dark, lineHeight: 1.25, marginBottom: ".5rem", fontWeight: 400, fontStyle: "italic" }}>{p.title}</h3>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".62rem", color: C.muted, marginBottom: ".4rem" }}>{p.authors}</div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".6rem", color: C.green, letterSpacing: ".06em" }}>{p.venue}</div>
        </div>
        <div>
          <p style={{ fontFamily: "Georgia,serif", fontSize: ".9rem", lineHeight: 1.8, color: C.muted, marginBottom: "1.3rem" }}>{p.desc}</p>
          <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
            {p.links.map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                style={{ fontFamily: "'DM Mono',monospace", fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", color: l.color, display: "inline-flex", alignItems: "center", gap: ".35rem", textDecoration: "none" }}>{l.label} ↗</a>
            ))}
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, width: hov ? "100%" : "0%", height: 3, background: C.green, transition: "width .4s ease" }} />
    </div>
  );
}
