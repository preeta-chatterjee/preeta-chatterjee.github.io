import { Link, useSearchParams } from "react-router-dom";
import { C, T, NAV_HEIGHT } from "../theme";
import { useMobile } from "../hooks";
import { PROJECTS, PROJECT_GROUPS, PUBLICATIONS } from "../content";
import ProjCardFull from "../components/ProjCardFull";
import PubCard from "../components/PubCard";
import Footer from "../components/Footer";

// ══════════════════════════════════════════════════════════════════════════════
// PAGE: ALL PROJECTS
// ══════════════════════════════════════════════════════════════════════════════
export default function ProjectsPage() {
  const mobile = useMobile();
  const pad = mobile ? "1.5rem" : "3rem";

  // Active filter lives in the URL (/#/projects?group=sim) so it survives back/forward and can be linked.
  const [params, setParams] = useSearchParams();
  const tabs = [{ id: "all", label: "All" }, ...PROJECT_GROUPS.filter(g => g.tab)];
  const active = tabs.some(t => t.id === params.get("group")) ? params.get("group") : "all";
  const setActive = id => setParams(id === "all" ? {} : { group: id }, { replace: true });
  const groups = PROJECT_GROUPS.filter(g => active === "all" || g.id === active);

  return (
  <div style={{ paddingTop: NAV_HEIGHT, minHeight: "100vh", background: C.bg }}>
    <div style={{ background: C.dark, padding: `4rem ${pad} 3rem` }}>
      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".65rem", letterSpacing: ".2em", color: C.red, textTransform: "uppercase", marginBottom: ".8rem" }}>02 / Work</div>
      <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(3rem,8vw,7rem)", color: "#F2F2F2", lineHeight: .92, letterSpacing: ".02em" }}>All Projects.</h1>
    </div>

    {/* Filter tabs */}
    <div style={{ padding: `1.5rem ${pad}`, display: "flex", gap: ".5rem", flexWrap: "wrap", borderBottom: `1.5px solid ${C.border}` }}>
      {tabs.map(t => {
        const on = t.id === active;
        return (
          <button key={t.id} type="button" aria-pressed={on} onClick={() => setActive(t.id)}
            style={{ fontFamily: T.mono, fontSize: ".65rem", letterSpacing: ".12em", textTransform: "uppercase", padding: ".5rem 1rem", border: `1.5px solid ${on ? C.dark : C.border}`, background: on ? C.dark : "transparent", color: on ? C.bg : C.mid, cursor: "pointer", transition: "all .2s" }}>
            {t.label}
          </button>
        );
      })}
    </div>

    {/* Projects, grouped */}
    {groups.map(g => {
      const items = PROJECTS.filter(p => p.group === g.id);
      if (!items.length) return null;
      return (
        <section key={g.id}>
          <div style={{ padding: g.tab ? `2.5rem ${pad} 1rem` : `2rem ${pad} .8rem`, borderBottom: `1.5px solid ${C.border}` }}>
            {g.tab
              ? <h2 style={{ fontFamily: T.display, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: C.dark, letterSpacing: ".02em", lineHeight: 1, fontWeight: 400 }}>{g.label}</h2>
              : <h2 style={{ fontFamily: T.mono, fontSize: ".65rem", letterSpacing: ".18em", color: C.muted, textTransform: "uppercase", fontWeight: 400 }}>{g.label}</h2>}
          </div>
          {items.map((p, i) => <ProjCardFull key={p.id} p={p} i={i} />)}
        </section>
      );
    })}

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
