import { Link } from "react-router-dom";
import { T } from "../theme";

// "View project →" on a project card: shown on hover / keyboard focus (see .ix-card in
// interactions.css), and on hover-capable screens its link covers the whole card.
// Goes to the project's case study if it has one, otherwise its first link.
// Projects with no links get no label.
export default function CardCta({ p }) {
  const target = p.links.find(l => l.to) || p.links[0];
  if (!target) return null;
  const style = { fontFamily: T.mono, fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", color: p.accent, textDecoration: "none", whiteSpace: "nowrap", marginLeft: "auto" };
  return target.to
    ? <Link to={target.to} className="ix-card-cta" style={style}>View project →</Link>
    : <a href={target.href} target="_blank" rel="noreferrer" className="ix-card-cta" style={style} aria-label={`View project (${target.label}, opens in a new tab)`}>View project →</a>;
}
