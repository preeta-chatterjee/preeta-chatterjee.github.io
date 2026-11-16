import { T, GROUP_TONES } from "../theme";
import { PROJECT_GROUPS } from "../content";

// ── Typographic project thumbnail (home carousel, Phase 2 PR 6/7) ─────────────
// A solid 16:10 panel in the project's group color with white text: a small DM Mono label
// (group · year), the short title in Bebas Neue and the hook in DM Sans. No images, so it can't
// be mistaken for a screenshot of the project. Every size is in container units (cqw), so all
// seven thumbnails share one layout at any width, with pixel floors so text stays readable on phones.
// The panel never animates (loading rules in CLAUDE.md); the carousel may fade only what's inside.
export default function ProjThumb({ p }) {
  const group = PROJECT_GROUPS.find(g => g.id === p.group);
  return (
    <div style={{ containerType: "inline-size", width: "100%", aspectRatio: "16 / 10", background: GROUP_TONES[p.group], color: "#FFFFFF", position: "relative", overflow: "hidden" }}>
      {/* Decorative project number, cropped into the bottom-right corner (like the contact "HELLO") */}
      <div aria-hidden="true" style={{ position: "absolute", right: "-1cqw", bottom: "-9cqw", fontFamily: T.display, fontSize: "40cqw", lineHeight: 1, color: "rgba(255,255,255,.06)", pointerEvents: "none" }}>{p.num}</div>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "max(16px, 6cqw) max(16px, 7cqw)" }}>
        <div style={{ fontFamily: T.mono, fontSize: "max(10px, 2.3cqw)", letterSpacing: ".06em", textTransform: "uppercase", color: "rgba(255,255,255,.8)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {group?.label} · {p.year}
        </div>
        <div>
          <div aria-hidden="true" style={{ width: "8cqw", height: "max(2px, .5cqw)", background: "rgba(255,255,255,.55)", marginBottom: "max(8px, 2.4cqw)" }} />
          <div style={{ fontFamily: T.display, fontSize: "max(30px, 11cqw)", lineHeight: .92, letterSpacing: ".02em" }}>{p.thumbTitle}</div>
          <div style={{ fontFamily: T.sans, fontSize: "max(13px, 3.4cqw)", lineHeight: 1.35, color: "rgba(255,255,255,.88)", marginTop: "max(6px, 1.8cqw)", maxWidth: "88%" }}>{p.hook}</div>
        </div>
      </div>
    </div>
  );
}
