import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { C, NAV_HEIGHT } from "../theme";
import { useMobile } from "../hooks";
import { CONTACT_PATH, isHomePath } from "../routes";

// ── Nav ───────────────────────────────────────────────────────────────────────
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = isHomePath(location.pathname);
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

  // While the phone menu is open: lock page scroll, and Escape closes it
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = e => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

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
        <Link to="/" aria-label="Home" className="ix-logo" style={{ transition: "filter .2s", fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.6rem", letterSpacing: ".05em", background: `linear-gradient(135deg,${C.green},${C.red})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textDecoration: "none" }}>PC</Link>

        {mobile ? (
          <button type="button" onClick={() => setMenuOpen(o => !o)} className="ix-menu-btn" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-menu" style={{ transition: "background .2s", background: "none", border: "none", cursor: "pointer", padding: ".5rem", display: "flex", flexDirection: "column", gap: "5px" }}>
            <span style={{ display: "block", width: 22, height: 2, background: menuOpen ? C.red : C.dark, transition: "all .3s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ display: "block", width: 22, height: 2, background: menuOpen ? C.red : C.dark, transition: "all .3s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: 22, height: 2, background: menuOpen ? C.red : C.dark, transition: "all .3s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        ) : (
          <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
            <Link to="/about" className="ix-link ix-muted" style={{ ...linkStyle, color: activeColor("/about") }}>About</Link>
            <Link to="/projects" className="ix-link ix-muted" style={{ ...linkStyle, color: activeColor("/projects") }}>Projects</Link>
            <Link to={CONTACT_PATH} className="ix-link ix-muted" style={linkStyle}>Contact</Link>
          </div>
        )}
      </nav>

      {mobile && menuOpen && (
        // Covers the whole page below the nav (solid background, page scroll locked)
        <div id="mobile-menu" style={{ position: "fixed", top: NAV_HEIGHT, left: 0, right: 0, bottom: 0, zIndex: 199, background: C.bg, padding: "0 1.5rem 1.5rem", overflowY: "auto", borderTop: `1px solid ${C.border}` }}>
          <Link to="/about" className="ix-menu-link" style={mobileLinkStyle} onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/projects" className="ix-menu-link" style={mobileLinkStyle} onClick={() => setMenuOpen(false)}>Projects</Link>
          <Link to={CONTACT_PATH} className="ix-menu-link" style={{ ...mobileLinkStyle, borderBottom: "none" }} onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </>
  );
}
