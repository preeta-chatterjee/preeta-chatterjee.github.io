import { C, NAV_HEIGHT } from "../theme";
import { useMobile } from "../hooks";
import { ABOUT_QUOTE, ABOUT_SECTIONS } from "../content";
import AboutSection from "../components/AboutSection";
import EducationBlock from "../components/EducationBlock";
import ResumeBlock from "../components/ResumeBlock";
import Footer from "../components/Footer";

// ══════════════════════════════════════════════════════════════════════════════
// PAGE: ABOUT
// ══════════════════════════════════════════════════════════════════════════════
export default function AboutPage() {
  const mobile = useMobile();
  const pad = mobile ? "1.5rem" : "3rem";

  const sections = ABOUT_SECTIONS;

  return (
    <div style={{ paddingTop: NAV_HEIGHT, minHeight: "100vh", background: C.bg }}>
      <div style={{ background: C.dark, padding: `4rem ${pad} 3rem` }}>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".65rem", letterSpacing: ".2em", color: C.red, textTransform: "uppercase", marginBottom: ".8rem" }}>01 / About</div>
        <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(3rem,8vw,7rem)", color: "#F2F2F2", lineHeight: .92, letterSpacing: ".02em" }}>About Me.</h1>
      </div>
      <div style={{ padding: `3rem ${pad}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ borderLeft: `4px solid ${C.red}`, paddingLeft: "1.5rem", marginBottom: "3rem" }}>
            <p style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "clamp(1rem,2.5vw,1.5rem)", color: C.dark, lineHeight: 1.65, fontStyle: "italic" }}>
              "{ABOUT_QUOTE}"
            </p>
          </div>

          {sections.map((s, i) => (
            <AboutSection key={s.heading} s={s} i={i} mobile={mobile} />
          ))}

          <EducationBlock mobile={mobile} />
          <ResumeBlock mobile={mobile} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
