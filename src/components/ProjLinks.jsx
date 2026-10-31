import { Link } from "react-router-dom";

// Project card links: `to` is an in-site route (→), `href` opens in a new tab (↗).
export default function ProjLinks({ links }) {
  const style = color => ({ fontFamily: "'DM Mono',monospace", fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", color, display: "inline-flex", alignItems: "center", gap: ".35rem", textDecoration: "none" });
  return (
    <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
      {links.map(l => l.to
        ? <Link key={l.label} to={l.to} style={style(l.color)}>{l.label} →</Link>
        : <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={style(l.color)}>{l.label} ↗</a>
      )}
    </div>
  );
}
