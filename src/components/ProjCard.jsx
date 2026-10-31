import { useState } from "react";
import { C } from "../theme";
import { useInView, useMobile } from "../hooks";
import RichText from "./RichText";
import ProjLinks from "./ProjLinks";

// ── Project Card — grid layout (homepage) ─────────────────────────────────────
export default function ProjCard({ p, i }) {
  const [ref, inV] = useInView();
  const [hov, setHov] = useState(false);
  const mobile = useMobile();
  return (
    <div ref={ref} style={{
      gridColumn: mobile ? "span 2" : p.full ? "span 2" : "span 1",
      background: hov ? "#fff" : C.bg, padding: mobile ? "1.5rem" : "2.5rem",
      position: "relative", overflow: "hidden",
      opacity: inV ? 1 : 0, transform: inV ? "none" : "translateY(28px)",
      transition: `background .3s, opacity .7s ease ${i * .1}s, transform .7s ease ${i * .1}s`,
    }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: mobile ? "3rem" : "4rem", color: hov ? C.border : C.border2, lineHeight: 1, position: "absolute", top: "1rem", right: "1.2rem", transition: "color .3s" }}>{p.num}</div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", padding: ".22rem .7rem", background: p.statusBg, border: `1px solid ${(p.statusDot || p.statusColor) + "44"}`, marginBottom: "1rem" }}>
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: p.statusDot || p.statusColor, display: "inline-block" }} />
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".58rem", letterSpacing: ".1em", color: p.statusColor }}>{p.status ? `${p.status} · ${p.year}` : p.year}</span>
      </div>
      <h3 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: mobile ? "1.3rem" : "1.55rem", color: C.dark, lineHeight: 1.15, marginBottom: ".5rem", fontWeight: 400 }}>{p.title}</h3>
      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".63rem", letterSpacing: ".14em", color: C.muted, textTransform: "uppercase", marginBottom: ".8rem" }}>{p.sub}</div>
      <p style={{ fontFamily: "Georgia,serif", fontSize: ".86rem", lineHeight: 1.8, color: C.muted, marginBottom: "1.3rem" }}><RichText value={p.desc} /></p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem", marginBottom: p.links.length ? "1.3rem" : 0 }}>
        {p.stack.map(s => <span key={s} style={{ fontFamily: "'DM Mono',monospace", fontSize: ".6rem", letterSpacing: ".07em", color: C.dark, padding: ".18rem .55rem", border: `1px solid ${C.border}`, background: C.surface }}>{s}</span>)}
      </div>
      {p.links.length > 0 && <ProjLinks links={p.links} />}
      <div style={{ position: "absolute", bottom: 0, left: 0, width: hov ? "100%" : "0%", height: 3, background: p.accent, transition: "width .4s ease" }} />
    </div>
  );
}
