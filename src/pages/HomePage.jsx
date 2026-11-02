import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { C, NAV_HEIGHT, revealStyle } from "../theme";
import { useInView, useMobile } from "../hooks";
import { SITE, HERO, HOME_INTRO, STATS, CONTACT_BLURB, SKILLS, PROJECTS, FEATURED_PROJECT_IDS, PUBLICATIONS } from "../content";
import HeroCanvas from "../components/HeroCanvas";
import Marquee from "../components/Marquee";
import ProjCard from "../components/ProjCard";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import { CONTACT_PATH } from "../routes";

// ══════════════════════════════════════════════════════════════════════════════
// PAGE: HOME
// ══════════════════════════════════════════════════════════════════════════════
export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const mobile = useMobile();
  useEffect(() => { setTimeout(() => setMounted(true), 120); }, []);
  const f = d => ({ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: `all .8s ease ${d}s` });
  const [refP, inP] = useInView();
  const [refC, inC] = useInView();
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

  // Featured projects, in the order listed in FEATURED_PROJECT_IDS
  const featuredProjects = FEATURED_PROJECT_IDS.map(id => PROJECTS.find(p => p.id === id));

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ minHeight: "85vh", display: "grid", gridTemplateColumns: mobile ? "1fr" : "55% 45%", gridTemplateRows: mobile ? "auto 55vw" : "1fr", background: C.bg, overflow: "hidden" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: mobile ? "5rem 1.5rem 3rem" : "6rem 3rem 5rem", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: ".7rem", marginBottom: "1.5rem", ...f(.1) }}>
            <span style={{ width: 30, height: 1.5, background: `linear-gradient(to right,${C.green},${C.red})`, display: "inline-block", flexShrink: 0 }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".6rem", letterSpacing: ".18em", color: C.green, textTransform: "uppercase" }}>{HERO.badge}</span>
          </div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: mobile ? "clamp(3.5rem,15vw,5rem)" : "clamp(4rem,8.5vw,7.5rem)", lineHeight: .92, letterSpacing: ".02em", ...f(.15) }}>
            <div style={{ color: C.dark }}>{SITE.firstName.toUpperCase()}</div>
            <div style={{ color: C.red }}>{SITE.lastName.toUpperCase()}</div>
          </div>
          <p style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "clamp(.9rem,1.8vw,1.2rem)", color: C.mid, lineHeight: 1.65, fontStyle: "italic", margin: "1.5rem 0 1.8rem", maxWidth: 420, ...f(.3) }}>
            {HERO.tagline}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", marginBottom: "2rem", ...f(.4) }}>
            {HERO.chips.map(([label, t]) => (
              <span key={label} style={{ fontFamily: "'DM Mono',monospace", fontSize: ".58rem", letterSpacing: ".1em", textTransform: "uppercase", padding: ".3rem .75rem", border: `1.5px solid ${t === "green" ? C.green : t === "red" ? C.red : C.border}`, background: t === "green" ? C.green : t === "red" ? C.red : "transparent", color: t === "o" ? C.mid : "#F2F2F2" }}>{label}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", ...f(.5) }}>
            <Link to="/projects" style={{ display: "inline-block", padding: ".75rem 1.8rem", background: C.dark, color: C.bg, fontFamily: "'DM Mono',monospace", fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", border: `2px solid ${C.dark}`, transition: "all .2s", textDecoration: "none" }}
              onMouseEnter={e => { e.target.style.background = "transparent"; e.target.style.color = C.dark; }}
              onMouseLeave={e => { e.target.style.background = C.dark; e.target.style.color = C.bg; }}>Explore Work</Link>
            <Link to={CONTACT_PATH} style={{ display: "inline-block", padding: ".75rem 1.8rem", background: C.red, color: "#F2F2F2", fontFamily: "'DM Mono',monospace", fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", border: `2px solid ${C.red}`, transition: "all .2s", textDecoration: "none" }}
              onMouseEnter={e => { e.target.style.background = "transparent"; e.target.style.color = C.red; }}
              onMouseLeave={e => { e.target.style.background = C.red; e.target.style.color = "#F2F2F2"; }}>Get in Touch</Link>
          </div>
        </div>

        {/* Canvas panel — dot-grid background so it never looks like blank space */}
        <div style={{
          position: "relative", overflow: "hidden",
          minHeight: mobile ? "55vw" : "auto",
          background: `radial-gradient(circle, ${C.border} 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
          backgroundColor: C.bg,
          borderLeft: mobile ? "none" : `1px solid ${C.border2}`,
        }}>
          <HeroCanvas />
        </div>
      </section>

      {/* Thin gradient accent rule — bridges hero to marquee */}
      <div style={{ height: 3, background: `linear-gradient(to right, ${C.green}, ${C.red})` }} />

      <Marquee />

      {/* ── About strip ── */}
      <section style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr" }}>
        <div style={{ background: C.dark, padding: `3.5rem ${pad}`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2rem,5vw,4.5rem)", lineHeight: .92, letterSpacing: ".02em", marginBottom: "1.5rem" }}>
            <span style={{ color: "#F2F2F2" }}>{HOME_INTRO.headline.lead}</span><span style={{ color: C.green }}>{HOME_INTRO.headline.accent}</span><br /><span style={{ color: C.redMid }}>{HOME_INTRO.headline.tail}</span>
          </div>
          <p style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: ".98rem", color: "rgba(242,242,242,.65)", lineHeight: 1.8, fontStyle: "italic", marginBottom: "2rem" }}>
            {HOME_INTRO.blurb}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.08)" }}>
            {STATS.map(([n, l, col]) => (
              <div key={l} style={{ background: C.dark, padding: "1rem 1.2rem" }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.2rem", color: col, lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".55rem", letterSpacing: ".14em", color: "rgba(242,242,242,.4)", textTransform: "uppercase", marginTop: ".2rem" }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1.5rem" }}>
            <Link to="/about" style={{ fontFamily: "'DM Mono',monospace", fontSize: ".65rem", letterSpacing: ".12em", textTransform: "uppercase", color: C.green, border: `1.5px solid ${C.green}`, padding: ".5rem 1.2rem", textDecoration: "none", display: "inline-block", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = C.green; e.currentTarget.style.color = "#F2F2F2"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.green; }}>Read More →</Link>
          </div>
        </div>
        <div style={{ background: C.bg, padding: `3.5rem ${pad}`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".62rem", letterSpacing: ".2em", color: C.green, textTransform: "uppercase", marginBottom: "1.5rem" }}>Technical Arsenal</div>
          {SKILLS.map(s => (
            <div key={s.name} style={{ borderBottom: `1px solid ${C.border2}`, padding: ".8rem 0", display: "flex", justifyContent: "space-between", alignItems: mobile ? "flex-start" : "center", flexDirection: mobile ? "column" : "row", gap: mobile ? ".5rem" : 0 }}>
              <span style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: ".95rem", color: C.dark, fontStyle: "italic" }}>{s.name}</span>
              <div style={{ display: "flex", gap: ".35rem", flexWrap: "wrap", justifyContent: mobile ? "flex-start" : "flex-end" }}>
                {s.tags.map(t => <span key={t} style={{ fontFamily: "'DM Mono',monospace", fontSize: ".55rem", letterSpacing: ".07em", color: C.muted, padding: ".15rem .5rem", border: `1px solid ${C.border}` }}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section id="projects" style={{ padding: `4rem ${pad}`, background: C.surface }}>
        <div ref={refP} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem", ...revealStyle(inP) }}>
          <div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".65rem", letterSpacing: ".18em", color: C.red, textTransform: "uppercase", marginBottom: ".5rem" }}>02 / Selected Work</div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.5rem,6vw,5rem)", color: C.dark, letterSpacing: ".02em", lineHeight: .92 }}>Projects.</div>
          </div>
          <Link to="/projects" style={{
            fontFamily: "'DM Mono',monospace", fontSize: ".68rem", letterSpacing: ".12em",
            textTransform: "uppercase", color: C.green, border: `1.5px solid ${C.green}`,
            padding: ".5rem 1.2rem", textDecoration: "none", display: "inline-block", transition: "all .2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = C.green; e.currentTarget.style.color = "#F2F2F2"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.green; }}>
            View All ({PROJECTS.length + PUBLICATIONS.length}) →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: "1.5px", background: C.border }}>
          {/* Number by position on the home page, not by place in the full list */}
          {featuredProjects.map((p, i) => <ProjCard key={p.id} p={{ ...p, num: String(i + 1).padStart(2, "0") }} i={i} />)}
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" style={{ scrollMarginTop: NAV_HEIGHT, display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr" }}>
        <div ref={refC} style={{ background: C.green, padding: `3.5rem ${pad}`, display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden", ...revealStyle(inC) }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: mobile ? "6rem" : "12rem", color: "rgba(255,255,255,.05)", position: "absolute", bottom: "-1rem", left: "-1rem", lineHeight: 1, pointerEvents: "none" }}>HELLO</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: ".65rem", letterSpacing: ".2em", color: "rgba(242,242,242,.5)", textTransform: "uppercase", marginBottom: ".8rem", position: "relative" }}>03 / Contact</div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem,6vw,5.5rem)", color: "#F2F2F2", lineHeight: .92, letterSpacing: ".02em", marginBottom: "1.5rem", position: "relative" }}>
            Let's<br />build<br />something.
          </div>
          <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1rem", color: "rgba(242,242,242,.72)", lineHeight: 1.75, fontStyle: "italic", marginBottom: "2rem", position: "relative" }}>
            {CONTACT_BLURB}
          </p>
          <div style={{ position: "relative" }}>
            {[["Email", SITE.email], ["LinkedIn", SITE.linkedin]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", gap: "1rem", alignItems: "baseline", marginBottom: ".7rem", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: ".6rem", letterSpacing: ".16em", color: "rgba(242,242,242,.45)", textTransform: "uppercase", minWidth: 65, flexShrink: 0 }}>{l}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: ".68rem", color: "rgba(242,242,242,.82)", wordBreak: "break-all" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: C.bg, padding: `3.5rem ${pad}`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: ".62rem", letterSpacing: ".2em", color: C.green, textTransform: "uppercase", marginBottom: "2rem" }}>Drop me a message</div>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </>
  );
}
