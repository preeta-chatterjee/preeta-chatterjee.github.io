import { useState } from "react";
import { C } from "../theme";
import { useInView, useMobile } from "../hooks";
import RichText from "./RichText";
import ProjLinks from "./ProjLinks";

// ── Project Card — list layout (projects page, full width stacked) ────────────
export default function ProjCardFull({ p, i }) {
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
        <div style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", padding: ".22rem .7rem", background: p.statusBg, border: `1px solid ${(p.statusDot || p.statusColor) + "44"}` }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: p.statusDot || p.statusColor, display: "inline-block" }} />
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".58rem", letterSpacing: ".1em", color: p.statusColor }}>{p.status ? `${p.status} · ${p.year}` : p.year}</span>
        </div>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.5rem", color: hov ? C.border : C.border2, lineHeight: 1, transition: "color .3s" }}>{p.num}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 2fr", gap: mobile ? "1rem" : "3rem", alignItems: "start" }}>
        <div>
          <h3 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "1.55rem", color: C.dark, lineHeight: 1.15, marginBottom: ".4rem", fontWeight: 400 }}>{p.title}</h3>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".63rem", letterSpacing: ".14em", color: C.muted, textTransform: "uppercase", marginBottom: "1rem" }}>{p.sub}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem" }}>
            {p.stack.map(s => <span key={s} style={{ fontFamily: "'DM Mono',monospace", fontSize: ".6rem", letterSpacing: ".07em", color: C.dark, padding: ".18rem .55rem", border: `1px solid ${C.border}`, background: C.surface }}>{s}</span>)}
          </div>
        </div>
        <div>
          <p style={{ fontFamily: "Georgia,serif", fontSize: ".9rem", lineHeight: 1.8, color: C.muted, marginBottom: "1.3rem" }}><RichText value={p.desc} /></p>
          {p.links.length > 0 && <ProjLinks links={p.links} />}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, width: hov ? "100%" : "0%", height: 3, background: p.accent, transition: "width .4s ease" }} />
    </div>
  );
}
