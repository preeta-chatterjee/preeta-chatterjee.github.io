import { C, revealStyle } from "../theme";
import { useInView } from "../hooks";
import { SITE } from "../content";

export default function ResumeBlock({ mobile }) {
  const [ref, inV] = useInView();
  return (
    <div ref={ref} style={{ marginTop: "4rem", padding: mobile ? "1.5rem" : "2.5rem", background: C.dark, display: "flex", alignItems: mobile ? "flex-start" : "center", justifyContent: "space-between", flexDirection: mobile ? "column" : "row", gap: "1.5rem", ...revealStyle(inV) }}>
      <div>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.8rem", color: "#F2F2F2", letterSpacing: ".02em" }}>Want the full picture?</div>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".7rem", color: "rgba(242,242,242,.5)", marginTop: ".3rem" }}>Download my résumé for complete work history and publications.</div>
      </div>
      <a href={SITE.resume} target="_blank" rel="noreferrer"
        style={{ display: "inline-block", padding: ".85rem 2rem", background: C.green, color: "#F2F2F2", fontFamily: "'DM Mono',monospace", fontSize: ".73rem", letterSpacing: ".12em", textTransform: "uppercase", border: `2px solid ${C.green}`, transition: "all .2s", textDecoration: "none", flexShrink: 0 }}
        onMouseEnter={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.green; }}
        onMouseLeave={e => { e.currentTarget.style.background = C.green; e.currentTarget.style.color = "#F2F2F2"; }}>Download Résumé ↓</a>
    </div>
  );
}
