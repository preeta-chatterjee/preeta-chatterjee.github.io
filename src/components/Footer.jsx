import { Link } from "react-router-dom";
import { C } from "../theme";
import { SITE } from "../content";
import { CONTACT_PATH } from "../routes";

// ── Footer ────────────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer style={{ background: C.dark, padding: "2rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".6rem", letterSpacing: ".1em", color: "rgba(242,242,242,.3)", textTransform: "uppercase" }}>© {new Date().getFullYear()} {SITE.name}</span>
      <div style={{ display: "flex", gap: "2rem" }}>
        <Link to="/about" style={{ fontFamily: "'DM Mono',monospace", fontSize: ".6rem", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(242,242,242,.3)", textDecoration: "none", transition: "color .2s" }}
          onMouseEnter={e => e.currentTarget.style.color = "rgba(242,242,242,.8)"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(242,242,242,.3)"}>About</Link>
        <Link to="/projects" style={{ fontFamily: "'DM Mono',monospace", fontSize: ".6rem", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(242,242,242,.3)", textDecoration: "none", transition: "color .2s" }}
          onMouseEnter={e => e.currentTarget.style.color = "rgba(242,242,242,.8)"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(242,242,242,.3)"}>Projects</Link>
        <Link to={CONTACT_PATH} style={{ fontFamily: "'DM Mono',monospace", fontSize: ".6rem", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(242,242,242,.3)", textDecoration: "none", transition: "color .2s" }}
          onMouseEnter={e => e.currentTarget.style.color = "rgba(242,242,242,.8)"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(242,242,242,.3)"}>Contact</Link>
      </div>
    </footer>
  );
}
