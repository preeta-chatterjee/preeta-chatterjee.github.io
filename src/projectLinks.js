// Where a project (or publication) card points, and how its call-to-action is labelled.
// Shared by the card CTA (CardCta.jsx) and the home carousel slides (ProjectCarousel.jsx).
// - Project with a case study: "View project →" (in-site).
// - Project with only external links: labelled by where its first link goes, new tab.
// - Publication (`paper`): "Read paper ↗" to its PDF (or its first link), new tab.
// - No links: null (no call-to-action).
const externalLabel = l => {
  if (/github\.com/.test(l.href)) return "View on GitHub ↗";
  if (/itch\.io/.test(l.href)) return "Play on itch.io ↗";
  if (/demo/i.test(l.label)) return "Live demo ↗";
  return `${l.label} ↗`;
};

export function primaryLink(p, { paper = false } = {}) {
  const target = paper
    ? p.links.find(l => /pdf/i.test(l.label)) || p.links[0]
    : p.links.find(l => l.to) || p.links[0];
  if (!target) return null;
  if (target.to) return { to: target.to, label: "View project →" };
  const label = paper ? "Read paper ↗" : externalLabel(target);
  return { href: target.href, label, ariaLabel: `${label.replace(" ↗", "")} (opens in a new tab)` };
}
