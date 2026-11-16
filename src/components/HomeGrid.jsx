import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { C, T, S_BODY, NAV_HEIGHT, TAG_TONES, homeThemeVars } from "../theme";
import { useMobile } from "../hooks";
import { SITE, HOME_INTRO, STATS, SKILLS } from "../content";
import { CONTACT_PATH } from "../routes";
import HeroCanvas from "./HeroCanvas";

// ── Home grid ─────────────────────────────────────────────────────────────────
// Desktop: 2×2 grid filling the first screen. Top row = name | about, sharing one
// horizontal fade (CSS variables from SITE.theme). Bottom row = skills | bubble game.
// Phone: name, a fade band, about, skills, game, stacked.
const LINE = "#DEDAD4"; // hairline between the boxes

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function HomeGrid() {
  const mobile = useMobile();
  const [mounted, setMounted] = useState(reducedMotion());
  useEffect(() => { if (!mounted) { const id = setTimeout(() => setMounted(true), 120); return () => clearTimeout(id); } }, [mounted]);
  const f = d => reducedMotion()
    ? {}
    : { opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: `opacity .8s ease ${d}s, transform .8s ease ${d}s` };

  const padX = mobile ? "1.5rem" : "3rem";
  const btn = (bg, fg) => ({ display: "inline-block", padding: ".75rem 1.8rem", background: bg, color: fg, fontFamily: T.mono, fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", border: `2px solid ${bg}`, transition: "all .2s", textDecoration: "none" });

  const name = (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: mobile ? `2.5rem ${padX} 1rem` : `1.5rem ${padX}` }}>
      <h1 style={{ fontFamily: T.display, fontWeight: 400, fontSize: mobile ? "clamp(3.5rem,17vw,5rem)" : "clamp(4rem,8.9vw,8rem)", lineHeight: .9, letterSpacing: ".02em", margin: 0, ...f(.15) }}>
        <span style={{ display: "block", color: "#111111" }}>{SITE.firstName.toUpperCase()}</span>
        <span style={{ display: "block", color: "#5A1A1C" }}>{SITE.lastName.toUpperCase()}</span>
      </h1>
      <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", marginTop: mobile ? "1.5rem" : "1.8rem", ...f(.4) }}>
        <Link to="/projects" className="ix-btn-dark" style={btn(C.dark, C.bg)}>Explore Work</Link>
        <Link to={CONTACT_PATH} className="ix-btn-red" style={btn(C.red, "#F2F2F2")}>Get in Touch</Link>
      </div>
    </div>
  );

  const about = (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center",
      padding: mobile ? `1rem ${padX} 2.5rem` : `1rem ${padX} 1rem clamp(3rem, 6.67vw, 6rem)`, background: mobile ? "var(--home-end)" : "transparent", ...f(.3) }}>
      <h2 style={{ fontFamily: T.display, fontWeight: 400, fontSize: mobile ? "clamp(2.2rem,11vw,3rem)" : "clamp(2rem,3.9vw,3.5rem)", lineHeight: .92, letterSpacing: ".02em", margin: mobile ? "0 0 1rem" : "0 0 .75rem" }}>
        <span style={{ color: "var(--about-headline)" }}>{HOME_INTRO.headline.lead}</span>
        <span style={{ color: "var(--about-green)" }}>{HOME_INTRO.headline.accent}</span><br />
        <span style={{ color: "var(--about-red)" }}>{HOME_INTRO.headline.tail}</span>
      </h2>
      <p style={{ ...S_BODY, color: "var(--about-blurb)", margin: mobile ? "0 0 1.25rem" : "0 0 .85rem", maxWidth: "36rem" }}>
        {HOME_INTRO.blurb}
      </p>
      {/* Stats: one row of four on desktop, 2×2 on phone */}
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)", borderTop: "1px solid var(--stat-border)", borderLeft: "1px solid var(--stat-border)", maxWidth: "36rem" }}>
        {STATS.map(([n, l, accent]) => (
          <div key={l} style={{ padding: mobile ? ".8rem 1rem" : ".55rem .9rem", borderRight: "1px solid var(--stat-border)", borderBottom: "1px solid var(--stat-border)" }}>
            <div style={{ fontFamily: T.display, fontSize: mobile ? "2rem" : "1.8rem", color: `var(--about-${accent})`, lineHeight: 1 }}>{n}</div>
            <div style={{ fontFamily: T.mono, fontSize: ".52rem", letterSpacing: ".14em", color: "var(--stat-label)", textTransform: "uppercase", marginTop: ".25rem" }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: mobile ? "1.25rem" : ".85rem" }}>
        <Link to="/about" className="ix-readmore" style={{ fontFamily: T.mono, fontSize: ".65rem", letterSpacing: ".12em", textTransform: "uppercase", color: "#FFFFFF", background: "var(--readmore-bg)", border: "1.5px solid var(--readmore-bg)", padding: ".55rem 1.2rem", textDecoration: "none", display: "inline-block", transition: "all .2s" }}>Read More →</Link>
      </div>
    </div>
  );

  const skills = (
    <div style={{ background: "var(--home-base)", padding: mobile ? `2rem ${padX}` : `1.1rem ${padX}`, display: "flex", flexDirection: "column", justifyContent: "center", borderTop: `1px solid ${LINE}` }}>
      <div style={{ fontFamily: T.mono, fontSize: ".72rem", letterSpacing: ".2em", color: C.green, textTransform: "uppercase", marginBottom: mobile ? "1rem" : ".45rem" }}>Technical Arsenal</div>
      {SKILLS.map(s => (
        <div key={s.name} style={{ borderBottom: `1px solid ${LINE}`, padding: mobile ? ".8rem 0" : ".42rem 0", display: "flex", justifyContent: "space-between", alignItems: mobile ? "flex-start" : "center", flexDirection: mobile ? "column" : "row", gap: mobile ? ".5rem" : "1.25rem" }}>
          {/* Long labels may wrap after a slash on desktop (Game Engines/ Simulation) to leave room for the tags */}
          <span style={{ fontFamily: T.serif, fontSize: "1.1rem", lineHeight: 1.2, color: C.dark, fontStyle: "italic", flexShrink: 0, maxWidth: mobile ? "none" : "9rem" }}>
            {s.name.split("/").map((part, i) => <span key={part}>{i > 0 && <>/<wbr /></>}{part}</span>)}
          </span>
          <div style={{ display: "flex", gap: ".3rem", flexWrap: "wrap", justifyContent: mobile ? "flex-start" : "flex-end" }}>
            {s.tags.map(t => (
              <span key={t} style={{ fontFamily: T.mono, fontSize: ".8125rem", letterSpacing: ".02em", padding: ".28rem .65rem", whiteSpace: "nowrap", border: "1px solid", ...TAG_TONES[s.tone] }}>{t}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const game = (
    <div style={{
      // Phone needs a definite height: the canvas sizes itself to 100% of this box
      position: "relative", overflow: "hidden", height: mobile ? "min(80vw, 340px)" : "auto", minHeight: 0,
      background: `radial-gradient(circle, ${C.border} 1px, transparent 1px)`, backgroundSize: "22px 22px", backgroundColor: "var(--home-base)",
      borderTop: `1px solid ${LINE}`, borderLeft: mobile ? "none" : `1px solid ${LINE}`,
      WebkitTapHighlightColor: "transparent", // no tap flash over the game box on phones (game only; see HeroCanvas)
    }}>
      <HeroCanvas />
    </div>
  );

  if (mobile) {
    return (
      <section style={{ ...homeThemeVars(SITE.theme), paddingTop: NAV_HEIGHT, background: "var(--home-base)" }}>
        {name}
        {/* The fade sits between the buttons and the about headline */}
        <div aria-hidden="true" style={{ height: "5rem", background: "var(--home-fade-y)" }} />
        {about}
        {skills}
        {game}
      </section>
    );
  }

  return (
    <section style={{ ...homeThemeVars(SITE.theme), paddingTop: NAV_HEIGHT, background: "var(--home-base)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", minHeight: `calc(100vh - ${NAV_HEIGHT}px)` }}>
        {/* Top row: one shared background fading from the name box into the about box */}
        <div style={{ gridColumn: "1 / span 2", display: "grid", gridTemplateColumns: "1fr 1fr", background: "var(--home-fade-x)" }}>
          {name}
          {about}
        </div>
        {skills}
        {game}
      </div>
    </section>
  );
}
