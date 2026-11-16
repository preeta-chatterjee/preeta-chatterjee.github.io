import { T, GROUP_TONES } from "../theme";
import { PROJECT_GROUPS } from "../content";

// ── Typographic project thumbnail (home carousel, Phase 2 PR 6/7) ─────────────
// A 16:10 card: a short DM Mono label (group · year), the short title in Bebas Neue and the hook in
// DM Sans. No images, so it can't be mistaken for a screenshot of the project.
// Sizes are in container units (cqw), so every card has the same layout at any width. Titles are
// sized so the longest one ("3D Reconstruction", 6.59em wide in Bebas Neue) fits on one line, and
// never wrap. Content is vertically centered. The card never animates (loading rules in CLAUDE.md).
//
// Variants (Preeta picks one in the PR 6 review):
//   "light": white card, a top band in the group color, title in the group color, hook in dark text
//   "solid": solid group-color card, centered content, white text
//   "split": a narrow group-color strip with the label on the left, text on white on the right
const DARK_TEXT = "#2E2E2E";   // hook on light cards: 13.4:1 on white
const HAIRLINE = "#DEDAD4";

export default function ProjThumb({ p, variant = "light" }) {
  const group = PROJECT_GROUPS.find(g => g.id === p.group);
  const tone = GROUP_TONES[p.group];
  const label = `${group?.short} · ${p.year}`;
  const labelStyle = { fontFamily: T.mono, fontSize: "max(10px, 2.3cqw)", letterSpacing: ".08em", textTransform: "uppercase", whiteSpace: "nowrap" };
  const titleStyle = { fontFamily: T.display, fontWeight: 400, lineHeight: .95, letterSpacing: ".02em", whiteSpace: "nowrap" };
  const hookStyle = { fontFamily: T.sans, lineHeight: 1.4 };
  const box = { containerType: "inline-size", width: "100%", aspectRatio: "16 / 10", position: "relative", overflow: "hidden" };

  if (variant === "solid") {
    return (
      <div style={{ ...box, background: tone, color: "#FFFFFF" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 7cqw" }}>
          <div style={{ ...labelStyle, color: "rgba(255,255,255,.8)" }}>{label}</div>
          <div aria-hidden="true" style={{ width: "6cqw", height: "max(2px, .4cqw)", background: "rgba(255,255,255,.5)", margin: "max(10px, 3.2cqw) 0" }} />
          <div style={{ ...titleStyle, fontSize: "12cqw" }}>{p.thumbTitle}</div>
          <div style={{ ...hookStyle, fontSize: "max(13px, 3.4cqw)", color: "rgba(255,255,255,.88)", marginTop: "max(8px, 2.6cqw)", maxWidth: "82%" }}>{p.hook}</div>
        </div>
      </div>
    );
  }

  if (variant === "split") {
    return (
      <div style={{ ...box, background: "#FFFFFF", border: `1px solid ${HAIRLINE}`, display: "grid", gridTemplateColumns: "24% 1fr" }}>
        <div style={{ background: tone, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Label reads bottom to top along the strip: group and year in two columns so it fits short cards */}
          <div style={{ ...labelStyle, color: "rgba(255,255,255,.88)", writingMode: "vertical-rl", transform: "rotate(180deg)", display: "flex", flexDirection: "column", gap: "max(4px, 1.2cqw)", lineHeight: 1.2 }}>
            <span>{group?.short}</span><span>{p.year}</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 6cqw" }}>
          <div style={{ ...titleStyle, fontSize: "9.2cqw", color: tone }}>{p.thumbTitle}</div>
          <div aria-hidden="true" style={{ width: "6cqw", height: "max(2px, .4cqw)", background: tone, margin: "max(8px, 2.4cqw) 0" }} />
          <div style={{ ...hookStyle, fontSize: "max(13px, 3.1cqw)", color: DARK_TEXT }}>{p.hook}</div>
        </div>
      </div>
    );
  }

  // "light"
  return (
    <div style={{ ...box, background: "#FFFFFF", border: `1px solid ${HAIRLINE}` }}>
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "max(6px, 2.2cqw)", background: tone }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "2.2cqw 7cqw 0" }}>
        <div style={{ ...labelStyle, color: tone }}>{label}</div>
        <div style={{ ...titleStyle, fontSize: "12cqw", color: tone, marginTop: "max(8px, 2.4cqw)" }}>{p.thumbTitle}</div>
        <div style={{ ...hookStyle, fontSize: "max(13px, 3.4cqw)", color: DARK_TEXT, marginTop: "max(8px, 2.4cqw)", maxWidth: "88%" }}>{p.hook}</div>
      </div>
    </div>
  );
}
