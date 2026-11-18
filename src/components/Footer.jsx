import { Link } from "react-router-dom";
import { C } from "../theme";
import { SITE } from "../content";
import { CONTACT_PATH } from "../routes";

// ── Footer ────────────────────────────────────────────────────────────────────
// Text at 60% (copyright) and 70% (links) of #F2F2F2 on #111111 passes AA; links go full white + underline on hover.
const link = { fontFamily: "'DM Mono',monospace", fontSize: ".6rem", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(242,242,242,.7)", textDecoration: "none" };

export default function Footer() {
  return (
    <footer className="on-dark" style={{ background: C.dark, padding: "2rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".6rem", letterSpacing: ".1em", color: "rgba(242,242,242,.6)", textTransform: "uppercase" }}>© {new Date().getFullYear()} {SITE.name}</span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: ".8rem 2rem" }}>
        <Link to="/about" className="ix-link ix-footer" style={link}>About</Link>
        <Link to="/projects" className="ix-link ix-footer" style={link}>Projects</Link>
        <Link to={CONTACT_PATH} className="ix-link ix-footer" style={link}>Contact</Link>
        <a href={SITE.youtube} target="_blank" rel="noopener noreferrer" className="ix-link ix-footer" style={link} aria-label="YouTube (opens in a new tab)">YouTube</a>
      </div>
    </footer>
  );
}
