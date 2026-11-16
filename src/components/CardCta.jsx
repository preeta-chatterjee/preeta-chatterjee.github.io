import { Link } from "react-router-dom";
import { T } from "../theme";

// Card call-to-action, shown on hover / keyboard focus (see .ix-card in interactions.css);
// on hover-capable screens its link covers the whole card.
// - Project with a case study: "View project →" (in-site).
// - Project with only external links: labelled by where its first link goes
//   ("View on GitHub ↗", "Play on itch.io ↗", "Live demo ↗"), new tab.
// - Publication (`paper`): "Read paper ↗" to its PDF (or its first link), new tab.
// No links: no label.
const externalLabel = l => {
  if (/github\.com/.test(l.href)) return "View on GitHub ↗";
  if (/itch\.io/.test(l.href)) return "Play on itch.io ↗";
  if (/demo/i.test(l.label)) return "Live demo ↗";
  return `${l.label} ↗`;
};

export default function CardCta({ p, color = p.accent, paper = false }) {
  const target = paper
    ? p.links.find(l => /pdf/i.test(l.label)) || p.links[0]
    : p.links.find(l => l.to) || p.links[0];
  if (!target) return null;
  const style = { fontFamily: T.mono, fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", color, textDecoration: "none", whiteSpace: "nowrap", marginLeft: "auto" };
  if (target.to) return <Link to={target.to} className="ix-card-cta" style={style}>View project →</Link>;
  const label = paper ? "Read paper ↗" : externalLabel(target);
  return (
    <a href={target.href} target="_blank" rel="noopener noreferrer" className="ix-card-cta" style={style}
      aria-label={`${label.replace(" ↗", "")} (opens in a new tab)`}>{label}</a>
  );
}
