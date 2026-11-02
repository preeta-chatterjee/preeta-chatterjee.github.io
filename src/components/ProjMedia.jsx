import { Link } from "react-router-dom";
import { C } from "../theme";
import VideoEmbed from "./VideoEmbed";

// Optional project-card media: { type: "image", src, alt, width, height } or { type: "video", id, title }.
// Images use a uniform 16:10 crop (`fill` makes them fill their container's height instead).
// When `to` is set, the image links there (e.g. a case study).
export default function ProjMedia({ media, to, fill = false }) {
  if (media.type === "video") return <VideoEmbed id={media.id} title={media.title} />;
  const img = (
    <img src={media.src} alt={media.alt} width={media.width} height={media.height} loading="lazy" decoding="async"
      style={{ display: "block", width: "100%", height: fill ? "100%" : "auto", aspectRatio: fill ? undefined : "16 / 10", objectFit: "cover", background: C.dark }} />
  );
  const box = { display: "block", width: "100%", height: fill ? "100%" : "auto", overflow: "hidden", background: C.dark };
  return to
    ? <Link to={to} aria-label={`${media.alt} (open case study)`} style={box}>{img}</Link>
    : <div style={box}>{img}</div>;
}
