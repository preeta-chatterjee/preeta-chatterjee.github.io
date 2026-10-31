import { C } from "../theme";

// Responsive 16:9 YouTube embed. The iframe is lazy-loaded by the browser.
export default function VideoEmbed({ id, title }) {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", background: C.dark, border: `1px solid ${C.border}` }}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
        title={title}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
      />
    </div>
  );
}
