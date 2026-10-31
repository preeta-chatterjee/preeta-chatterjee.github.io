import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { C, NAV_HEIGHT } from "../theme";
import { useMobile } from "../hooks";
import { SITE } from "../content";

// ── Nav ───────────────────────────────────────────────────────────────────────
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const mobile = useMobile();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Close the menu on every navigation. Comparing during render (instead of in an
  // effect) avoids an extra render pass: https://react.dev/learn/you-might-not-need-an-effect
  const [prevLocation, setPrevLocation] = useState(location);
  if (location !== prevLocation) {
    setPrevLocation(location);
    setMenuOpen(false);
  }

  const navBg = scrolled || !isHome || menuOpen ? "rgba(242,242,242,.97)" : "transparent";
  const navBorder = scrolled || !isHome ? `1px solid ${C.border}` : "none";

  const linkStyle = {
    color: C.muted, textDecoration: "none", fontSize: ".68rem",
    letterSpacing: ".16em", textTransform: "uppercase",
    fontFamily: "'DM Mono',monospace", transition: "color .2s",
  };

  const mobileLinkStyle = {
    ...linkStyle, fontSize: ".9rem", padding: "1rem 0",
    borderBottom: `1px solid ${C.border2}`, display: "block", color: C.dark,
  };

  const activeColor = path => location.pathname === path ? C.dark : C.muted;

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: NAV_HEIGHT, padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", background: navBg, backdropFilter: "blur(12px)", borderBottom: navBorder, transition: "all .4s" }}>
        <Link to="/" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.6rem", letterSpacing: ".05em", background: `linear-gradient(135deg,${C.green},${C.red})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textDecoration: "none" }}>PC</Link>

        {mobile ? (
          <button onClick={() => setMenuOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", padding: ".5rem", display: "flex", flexDirection: "column", gap: "5px" }}>
            <span style={{ display: "block", width: 22, height: 2, background: menuOpen ? C.red : C.dark, transition: "all .3s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ display: "block", width: 22, height: 2, background: menuOpen ? C.red : C.dark, transition: "all .3s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: 22, height: 2, background: menuOpen ? C.red : C.dark, transition: "all .3s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        ) : (
          <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
            <Link to="/about" style={{ ...linkStyle, color: activeColor("/about") }}
              onMouseEnter={e => e.currentTarget.style.color = C.dark}
              onMouseLeave={e => e.currentTarget.style.color = activeColor("/about")}>About</Link>
            <Link to="/projects" style={{ ...linkStyle, color: activeColor("/projects") }}
              onMouseEnter={e => e.currentTarget.style.color = C.dark}
              onMouseLeave={e => e.currentTarget.style.color = activeColor("/projects")}>Projects</Link>
            {isHome
              ? <a href="#contact" style={linkStyle} onMouseEnter={e => e.currentTarget.style.color = C.dark} onMouseLeave={e => e.currentTarget.style.color = C.muted}>Contact</a>
              : <Link to="/#contact" style={linkStyle} onMouseEnter={e => e.currentTarget.style.color = C.dark} onMouseLeave={e => e.currentTarget.style.color = C.muted}>Contact</Link>
            }
            <a href={SITE.resume} target="_blank" rel="noreferrer"
              style={{ fontFamily: "'DM Mono',monospace", fontSize: ".68rem", letterSpacing: ".16em", textTransform: "uppercase", padding: ".4rem 1rem", border: `1.5px solid ${C.red}`, color: C.red, textDecoration: "none", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = C.red; e.currentTarget.style.color = "#F2F2F2"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.red; }}>Résumé ↗</a>
          </div>
        )}
      </nav>

      {mobile && menuOpen && (
        <div style={{ position: "fixed", top: NAV_HEIGHT, left: 0, right: 0, zIndex: 199, background: "rgba(242,242,242,.97)", backdropFilter: "blur(12px)", padding: "0 1.5rem 1.5rem", borderBottom: `1px solid ${C.border}` }}>
          <Link to="/about" style={mobileLinkStyle} onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/projects" style={mobileLinkStyle} onClick={() => setMenuOpen(false)}>Projects</Link>
          <a href={isHome ? "#contact" : "/#contact"} style={mobileLinkStyle} onClick={() => setMenuOpen(false)}>Contact</a>
          <a href={SITE.resume} target="_blank" rel="noreferrer"
            style={{ ...mobileLinkStyle, color: C.red, borderBottom: "none" }}
            onClick={() => setMenuOpen(false)}>Résumé ↗</a>
        </div>
      )}
    </>
  );
}
