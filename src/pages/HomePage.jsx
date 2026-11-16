import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { C, S_BODY, NAV_HEIGHT } from "../theme";
import { useReveal, useMobile } from "../hooks";
import { SITE, CONTACT_BLURB, PROJECTS, PUBLICATIONS } from "../content";
import HomeGrid from "../components/HomeGrid";
import ProjectCarousel from "../components/ProjectCarousel";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import { CONTACT_PATH } from "../routes";

// ══════════════════════════════════════════════════════════════════════════════
// PAGE: HOME
// ══════════════════════════════════════════════════════════════════════════════
export default function HomePage() {
  const mobile = useMobile();
  const refP = useReveal();
  // The contact row's two panels share one reveal, so their content appears together;
  // the green and grey panel backgrounds themselves are never animated.
  const refC = useReveal();
  const pad = mobile ? "1.5rem" : "3rem";

  // On /contact, scroll to the contact section. Keyed on the whole location so a repeat
  // click on Contact (same path, new history entry) scrolls again.
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== CONTACT_PATH) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = requestAnimationFrame(() =>
      document.getElementById("contact")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }));
    return () => cancelAnimationFrame(id);
  }, [location]);

  return (
    <>
      <HomeGrid />

      {/* ── Projects carousel (all projects; off-white surface = the carousel's veil color) ── */}
      <section id="projects" style={{ padding: "4rem 0 3.5rem", background: "#F2F1EF" }}>
        <div className="rv" ref={refP} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem", padding: `0 ${pad}` }}>
          <div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".65rem", letterSpacing: ".18em", color: C.red, textTransform: "uppercase", marginBottom: ".5rem" }}>02 / Selected Work</div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.5rem,6vw,5rem)", color: C.dark, letterSpacing: ".02em", lineHeight: .92 }}>Projects.</div>
          </div>
          <Link to="/projects" className="ix-btn-outline" style={{
            fontFamily: "'DM Mono',monospace", fontSize: ".68rem", letterSpacing: ".12em",
            textTransform: "uppercase", color: C.green, border: `1.5px solid ${C.green}`,
            padding: ".5rem 1.2rem", textDecoration: "none", display: "inline-block", transition: "all .2s",
          }}>
            View All ({PROJECTS.length + PUBLICATIONS.length}) →
          </Link>
        </div>
        <ProjectCarousel mobile={mobile} />
      </section>

      {/* ── Contact ── */}
      <section id="contact" ref={refC} style={{ scrollMarginTop: NAV_HEIGHT, display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr" }}>
        <div style={{ background: C.green, padding: `3.5rem ${pad}`, display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: mobile ? "6rem" : "12rem", color: "rgba(255,255,255,.05)", position: "absolute", bottom: "-1rem", left: "-1rem", lineHeight: 1, pointerEvents: "none" }}>HELLO</div>
          <div className="rv" style={{ fontFamily: "'DM Mono', monospace", fontSize: ".65rem", letterSpacing: ".2em", color: "rgba(242,242,242,.7)", textTransform: "uppercase", marginBottom: ".8rem", position: "relative" }}>03 / Contact</div>
          <div className="rv" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem,6vw,5.5rem)", color: "#F2F2F2", lineHeight: .92, letterSpacing: ".02em", marginBottom: "1.5rem", position: "relative" }}>
            Let's<br />build<br />something.
          </div>
          <p className="rv" style={{ ...S_BODY, color: "rgba(242,242,242,.72)", marginBottom: "2rem", position: "relative" }}>
            {CONTACT_BLURB}
          </p>
          <div className="rv" style={{ position: "relative" }}>
            {[["Email", SITE.email], ["LinkedIn", SITE.linkedin]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", gap: "1rem", alignItems: "baseline", marginBottom: ".7rem", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: ".6rem", letterSpacing: ".16em", color: "rgba(242,242,242,.7)", textTransform: "uppercase", minWidth: 65, flexShrink: 0 }}>{l}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: ".68rem", color: "rgba(242,242,242,.82)", wordBreak: "break-all" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: C.bg, padding: `3.5rem ${pad}`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="rv">
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: ".62rem", letterSpacing: ".2em", color: C.green, textTransform: "uppercase", marginBottom: "2rem" }}>Drop me a message</div>
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
