import { C, T, S_BODY, NAV_HEIGHT, homeThemeVars } from "../theme";
import { useMobile } from "../hooks";
import { SITE, PROJECTS } from "../content";
import ProjThumb from "../components/ProjThumb";

// ── Temporary review page for the typographic thumbnails (Phase 2 PR 6) ───────
// Unlinked: only reachable at /#/preview/thumbnails. Each variant is shown as a static carousel row:
// all seven cards side by side, the center card clear and the others veiled more the further they
// are from the center (the PR 7 look, without the motion). Below: each project's hook and overview.
// Remove this page in PR 7 once the carousel uses the thumbnails.
const THUMB_VARIANTS = ["light", "solid", "split"];
const VARIANT_NAMES = { light: "A. Light card", solid: "B. Solid, restrained", split: "C. Split card" };
const VEIL = [0, .5, .82, 1]; // off-white cover by distance from the center card (3+ fully hidden)
const CENTER = 3;             // Hallway Hunters sits in the middle of the seven

function Row({ variant, mobile }) {
  const w = mobile ? "78vw" : "400px", gap = mobile ? "14px" : "24px";
  return (
    <div style={{ position: "relative", overflow: "hidden", padding: "4px 0" }}>
      <div style={{ "--w": w, "--gap": gap, display: "flex", gap: "var(--gap)", width: "max-content", position: "relative", left: "50%",
        transform: `translateX(calc(-${CENTER} * (var(--w) + var(--gap)) - var(--w) / 2))` }}>
        {PROJECTS.map((p, i) => (
          <div key={p.id} style={{ width: "var(--w)", flexShrink: 0, position: "relative" }}>
            <ProjThumb p={p} variant={variant} />
            <div aria-hidden="true" style={{ position: "absolute", inset: -1, background: "var(--home-base)", opacity: VEIL[Math.min(3, Math.abs(i - CENTER))], pointerEvents: "none" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ThumbPreviewPage() {
  const mobile = useMobile();
  const pad = mobile ? "1.5rem" : "3rem";
  const small = { fontFamily: T.mono, fontSize: ".65rem", letterSpacing: ".16em", textTransform: "uppercase", color: C.muted };
  return (
    <div style={{ ...homeThemeVars(SITE.theme), paddingTop: NAV_HEIGHT, minHeight: "100vh", background: "var(--home-base)" }}>
      <div style={{ padding: `2rem ${pad} 0` }}>
        <div style={small}>Preview (not linked) · theme: {SITE.theme}</div>
        <h1 style={{ fontFamily: T.display, fontWeight: 400, fontSize: "clamp(2.2rem,5vw,3.5rem)", color: C.dark, letterSpacing: ".02em", lineHeight: 1, marginTop: ".4rem" }}>Project thumbnails</h1>
      </div>
      {THUMB_VARIANTS.map(v => (
        <section key={v} style={{ padding: "2rem 0 1rem" }}>
          <h2 style={{ fontFamily: T.mono, fontWeight: 400, fontSize: ".75rem", letterSpacing: ".18em", textTransform: "uppercase", color: C.dark, padding: `0 ${pad} 1rem` }}>{VARIANT_NAMES[v]}</h2>
          <Row variant={v} mobile={mobile} />
          {/* All seven unveiled, smaller, so every card can be judged */}
          <div style={{ padding: `1.2rem ${pad} 0`, display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: mobile ? "12px" : "20px", maxWidth: 1240 }}>
            {PROJECTS.map(p => <ProjThumb key={p.id} p={p} variant={v} />)}
          </div>
        </section>
      ))}
      <div style={{ padding: `2.5rem ${pad} 4rem`, display: "grid", gap: "1.4rem", maxWidth: 1100 }}>
        <h2 style={{ fontFamily: T.mono, fontWeight: 400, fontSize: ".75rem", letterSpacing: ".18em", textTransform: "uppercase", color: C.dark }}>Hooks and overviews</h2>
        {PROJECTS.map(p => (
          <div key={p.id} style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "180px 1fr 1.4fr", gap: mobile ? ".3rem" : "1.5rem", borderTop: `1px solid ${C.border2}`, paddingTop: "1rem" }}>
            <div style={{ fontFamily: T.display, fontSize: "1.3rem", color: C.dark }}>{p.thumbTitle}</div>
            <div><div style={small}>Hook</div><p style={{ ...S_BODY, color: C.dark }}>{p.hook}</p></div>
            <div><div style={small}>Overview</div><p style={{ ...S_BODY, color: C.mid }}>{p.overview}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}
