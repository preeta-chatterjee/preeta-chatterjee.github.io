import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { C, T } from "../theme";

// Image that opens its full-resolution version in a lightbox when clicked.
// Close with a click anywhere, the close button, or Escape.
// The lightbox is portalled to <body>: ancestors with a CSS transform (the scroll-reveal
// animation) would otherwise trap the position:fixed overlay inside them.
// `thumb` crops the preview to a uniform 16:9 (the lightbox always shows the whole image).
export default function ZoomImage({ image, thumb = false }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = e => { if (e.key === "Escape") setOpen(false); };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prevOverflow; };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label={`Enlarge image: ${image.alt}`}
        style={{ display: "block", width: "100%", padding: 0, border: `1px solid ${C.border}`, background: C.dark, cursor: "zoom-in", position: "relative" }}>
        <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async"
          style={{ display: "block", width: "100%", height: "auto", aspectRatio: thumb ? "16 / 9" : undefined, objectFit: thumb ? "cover" : undefined, objectPosition: "top left" }} />
        <span style={{ position: "absolute", right: ".6rem", bottom: ".6rem", fontFamily: T.mono, fontSize: ".55rem", letterSpacing: ".12em", textTransform: "uppercase", color: "#F2F2F2", background: "rgba(17,17,17,.75)", padding: ".25rem .5rem" }}>Click to enlarge</span>
      </button>
      {open && createPortal(
        <div role="dialog" aria-modal="true" aria-label={image.alt} onClick={() => setOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(17,17,17,.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: "3.5rem 1rem 1rem", cursor: "zoom-out" }}>
          <button type="button" onClick={() => setOpen(false)} autoFocus aria-label="Close"
            style={{ position: "absolute", top: "1rem", right: "1rem", fontFamily: T.mono, fontSize: ".68rem", letterSpacing: ".14em", textTransform: "uppercase", color: "#F2F2F2", background: "transparent", border: "1.5px solid rgba(242,242,242,.6)", padding: ".4rem .9rem", cursor: "pointer" }}>Close ✕</button>
          <img src={image.full || image.src} alt={image.alt}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }} />
        </div>,
        document.body
      )}
    </>
  );
}
