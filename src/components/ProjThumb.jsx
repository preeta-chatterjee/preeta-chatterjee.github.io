import { T, GROUP_TONES } from "../theme";
import { PROJECT_GROUPS } from "../content";

// ── Typographic project thumbnail (home carousel, Phase 2 PR 6/7) ─────────────
// Light card (Preeta's pick, variant A): a white 16:10 card with a 6px band in the project's group
// color along the top, a 1px border and a soft shadow so it separates from the off-white page.
// Inside, vertically centered: a short DM Mono label (group · year) and the short title in Bebas Neue,
// both in the group color, and the hook in DM Sans dark text. No images, so it can't be mistaken for
// a screenshot of the project.
// Sizes are in container units (cqw), so every card has the same layout at any width. The title size
// is set so the longest title ("3D Reconstruction", 6.59em wide in Bebas Neue) fits on one line, and
// titles never wrap. The card never animates (loading rules in CLAUDE.md).
const DARK_TEXT = "#2E2E2E"; // hook: 13.58:1 on white
const BORDER = "#D6D2CB";
const THUMB_SHADOW = "0 1px 2px rgba(17,17,17,.06), 0 2px 8px rgba(17,17,17,.07)"; // reaches ~10px

export default function ProjThumb({ p }) {
  const group = PROJECT_GROUPS.find(g => g.id === p.group);
  const tone = GROUP_TONES[p.group];
  return (
    <div className="proj-thumb" style={{ containerType: "inline-size", width: "100%", aspectRatio: "16 / 10", position: "relative", overflow: "hidden", background: "#FFFFFF", border: `1px solid ${BORDER}`, boxShadow: THUMB_SHADOW }}>
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: tone }} />
      <div style={{ position: "absolute", inset: "6px 0 0", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 7cqw" }}>
        <div style={{ fontFamily: T.mono, fontSize: "max(10px, 2.3cqw)", letterSpacing: ".08em", textTransform: "uppercase", whiteSpace: "nowrap", color: tone }}>
          {group?.short} · {p.year}
        </div>
        <div style={{ fontFamily: T.display, fontWeight: 400, fontSize: "12cqw", lineHeight: .95, letterSpacing: ".02em", whiteSpace: "nowrap", color: tone, marginTop: "max(8px, 2.4cqw)" }}>{p.thumbTitle}</div>
        <div style={{ fontFamily: T.sans, fontSize: "max(13px, 3.4cqw)", lineHeight: 1.4, color: DARK_TEXT, marginTop: "max(8px, 2.4cqw)", maxWidth: "88%" }}>{p.hook}</div>
      </div>
    </div>
  );
}
