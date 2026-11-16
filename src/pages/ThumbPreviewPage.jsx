import { C, T, S_BODY, NAV_HEIGHT, homeThemeVars } from "../theme";
import { useMobile } from "../hooks";
import { SITE, PROJECTS } from "../content";
import ProjThumb from "../components/ProjThumb";

// ── Temporary review page for the typographic thumbnails (Phase 2 PR 6) ───────
// Unlinked: only reachable at /#/preview/thumbnails. Shows every thumbnail with its hook and
// the slide overview side by side, on the current SITE.theme home surface. Remove it in PR 7
// once the carousel uses the thumbnails.
export default function ThumbPreviewPage() {
  const mobile = useMobile();
  const pad = mobile ? "1.5rem" : "3rem";
  return (
    <div style={{ ...homeThemeVars(SITE.theme), paddingTop: NAV_HEIGHT, minHeight: "100vh", background: "var(--home-base)" }}>
      <div style={{ padding: `2rem ${pad} 1rem` }}>
        <div style={{ fontFamily: T.mono, fontSize: ".7rem", letterSpacing: ".18em", textTransform: "uppercase", color: C.muted }}>Preview (not linked) · theme: {SITE.theme}</div>
        <h1 style={{ fontFamily: T.display, fontWeight: 400, fontSize: "clamp(2.2rem,5vw,3.5rem)", color: C.dark, letterSpacing: ".02em", lineHeight: 1, marginTop: ".4rem" }}>Project thumbnails</h1>
      </div>
      <div style={{ padding: `1rem ${pad} 4rem`, display: "grid", gap: "2.5rem" }}>
        {PROJECTS.map(p => (
          <div key={p.id} style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "minmax(0, 560px) minmax(0, 1fr)", gap: mobile ? "1rem" : "2.5rem", alignItems: "center" }}>
            <ProjThumb p={p} />
            <div>
              <div style={{ fontFamily: T.mono, fontSize: ".65rem", letterSpacing: ".16em", textTransform: "uppercase", color: C.muted }}>Hook (thumbnail)</div>
              <p style={{ ...S_BODY, color: C.dark, margin: ".2rem 0 1rem" }}>{p.hook}</p>
              <div style={{ fontFamily: T.mono, fontSize: ".65rem", letterSpacing: ".16em", textTransform: "uppercase", color: C.muted }}>Overview (slide)</div>
              <p style={{ ...S_BODY, color: C.mid, margin: ".2rem 0 0" }}>{p.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
