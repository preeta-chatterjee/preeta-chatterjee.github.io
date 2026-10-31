import { Link } from "react-router-dom";
import { C, NAV_HEIGHT } from "../theme";
import { useMobile } from "../hooks";
import { PROJECTS, PUBLICATIONS } from "../content";
import ProjCardFull from "../components/ProjCardFull";
import PubCard from "../components/PubCard";
import Footer from "../components/Footer";

// ══════════════════════════════════════════════════════════════════════════════
// PAGE: ALL PROJECTS
// ══════════════════════════════════════════════════════════════════════════════
export default function ProjectsPage() {
  const mobile = useMobile();
  const pad = mobile ? "1.5rem" : "3rem";

  return (
  <div style={{ paddingTop: NAV_HEIGHT, minHeight: "100vh", background: C.bg }}>
    <div style={{ background: C.dark, padding: `4rem ${pad} 3rem` }}>
      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".65rem", letterSpacing: ".2em", color: C.red, textTransform: "uppercase", marginBottom: ".8rem" }}>02 / Work</div>
      <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(3rem,8vw,7rem)", color: "#F2F2F2", lineHeight: .92, letterSpacing: ".02em" }}>All Projects.</h1>
    </div>

    {/* Projects */}
    <div style={{ borderTop: `1.5px solid ${C.border}` }}>
      {PROJECTS.map((p, i) => <ProjCardFull key={p.id} p={p} i={i} />)}
    </div>

    {/* Publications */}
    <div style={{ background: C.surface, padding: `4rem ${pad} 0` }}>
      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".65rem", letterSpacing: ".18em", color: C.red, textTransform: "uppercase", marginBottom: ".5rem" }}>Research</div>
      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.5rem,6vw,5rem)", color: C.dark, letterSpacing: ".02em", lineHeight: .92, marginBottom: "2.5rem" }}>Publications.</div>
    </div>
    <div style={{ background: C.surface, borderTop: `1.5px solid ${C.border}` }}>
      {PUBLICATIONS.map((p, i) => <PubCard key={p.id} p={p} i={i} />)}
    </div>

    {/* Back to home */}
    <div style={{ padding: `3rem ${pad}`, background: C.surface }}>
      <Link to="/" style={{ fontFamily: "'DM Mono',monospace", fontSize: ".68rem", letterSpacing: ".12em", textTransform: "uppercase", color: C.muted, textDecoration: "none", transition: "color .2s" }}
        onMouseEnter={e => e.currentTarget.style.color = C.dark}
        onMouseLeave={e => e.currentTarget.style.color = C.muted}>← Back to Home</Link>
    </div>

    <Footer />
  </div>
);
}
