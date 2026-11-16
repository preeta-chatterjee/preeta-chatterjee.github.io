import { C, S_BODY } from "../theme";
import { useReveal, useMobile } from "../hooks";
import CardCta from "./CardCta";

export default function PubCard({ p }) {
  // Reveal fades the card's content only; the card surface itself is drawn at once
  const ref = useReveal();
  const mobile = useMobile();

  return (
    <div ref={ref} className="ix-card" style={{
      "--accent": C.green,
      padding: mobile ? "1.8rem 1.5rem" : "2.5rem 3rem",
      position: "relative", overflow: "hidden",
      borderBottom: `1.5px solid ${C.border}`,
      transition: "background .3s, translate .25s ease, box-shadow .25s ease, outline-color .25s",
    }}>

      <div className="rv" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", flexWrap: "wrap", gap: ".5rem" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", padding: ".22rem .7rem", background: C.greenBg, border: `1px solid ${C.green}44` }}>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".58rem", letterSpacing: ".1em", color: C.green }}>{p.type}</span>
        </div>
        <div className="ix-card-num" aria-hidden="true" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.5rem", lineHeight: 1, transition: "color .3s" }}>{p.num}</div>
      </div>

      <div className="rv" style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 2fr", gap: mobile ? "1rem" : "3rem", alignItems: "start" }}>
        <div>
          <h3 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "1.2rem", color: C.dark, lineHeight: 1.25, marginBottom: ".5rem", fontWeight: 400, fontStyle: "italic" }}>{p.title}</h3>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".62rem", color: C.muted, marginBottom: ".4rem" }}>{p.authors}</div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".6rem", color: C.green, letterSpacing: ".06em" }}>{p.venue}</div>
        </div>
        <div>
          <p style={{ ...S_BODY, color: C.desc, marginBottom: "1.3rem" }}>{p.desc}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", flexWrap: "wrap" }}>
            {p.links.map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="ix-link ix-colored ix-above"
                style={{ fontFamily: "'DM Mono',monospace", fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", color: l.color, display: "inline-flex", alignItems: "center", gap: ".35rem", textDecoration: "none" }}>{l.label} ↗</a>
            ))}
            <CardCta p={p} color={C.green} paper />
          </div>
        </div>
      </div>
      <div className="ix-card-bar" style={{ position: "absolute", bottom: 0, left: 0, height: 3, background: C.green, transition: "width .4s ease" }} />
    </div>
  );
}
