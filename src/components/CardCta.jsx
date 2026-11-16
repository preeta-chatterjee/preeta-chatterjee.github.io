import { Link } from "react-router-dom";
import { T } from "../theme";
import { primaryLink } from "../projectLinks";

// Card call-to-action, shown on hover / keyboard focus (see .ix-card in interactions.css);
// on hover-capable screens its link covers the whole card. Target and label: see projectLinks.js.
export default function CardCta({ p, color = p.accent, paper = false }) {
  const link = primaryLink(p, { paper });
  if (!link) return null;
  const style = { fontFamily: T.mono, fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", color, textDecoration: "none", whiteSpace: "nowrap", marginLeft: "auto" };
  if (link.to) return <Link to={link.to} className="ix-card-cta" style={style}>{link.label}</Link>;
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className="ix-card-cta" style={style} aria-label={link.ariaLabel}>{link.label}</a>
  );
}
