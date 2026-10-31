import { C } from "../theme";
import { MARQUEE_ITEMS } from "../content";

// ── Marquee ───────────────────────────────────────────────────────────────────
export default function Marquee() {
  const items = MARQUEE_ITEMS;
  return (
    <div style={{ background: C.red, padding: ".75rem 0", overflow: "hidden", whiteSpace: "nowrap" }}>
      <div style={{ display: "inline-flex", animation: "mq 20s linear infinite" }}>
        {[...items, ...items].map((t, i) => (
          <span key={i} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem", letterSpacing: ".12em", color: t === "✦" ? "rgba(242,242,242,.3)" : "rgba(242,242,242,.9)", padding: "0 1.8rem" }}>{t}</span>
        ))}
      </div>
      <style>{`@keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}
