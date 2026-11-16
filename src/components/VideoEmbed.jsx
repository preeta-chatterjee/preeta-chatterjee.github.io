import { useState, useEffect, useRef } from "react";
import { C } from "../theme";

// Responsive 16:9 YouTube embed. The iframe is lazy-loaded by the browser.
// Keyboard focus ring: focus goes straight into the cross-origin player, which draws no ring
// and fires no focus events in this page (only a window blur), so the box draws the ring
// itself when the iframe takes focus from the keyboard (like :focus-visible, not on click).
export default function VideoEmbed({ id, title }) {
  const frame = useRef(null);
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    let keyboard = false;
    const onKey = () => { keyboard = true; };
    const onPointer = () => { keyboard = false; };
    const onBlur = () => { if (document.activeElement === frame.current) setFocused(keyboard); };
    const onFocus = () => setFocused(false);
    document.addEventListener("keydown", onKey, true);
    document.addEventListener("pointerdown", onPointer, true);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("keydown", onKey, true);
      document.removeEventListener("pointerdown", onPointer, true);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("focusin", onFocus);
    };
  }, []);
  return (
    <div style={{ outline: focused ? "2px solid #111111" : "none", outlineOffset: 3, position: "relative", width: "100%", aspectRatio: "16 / 9", background: C.dark, border: `1px solid ${C.border}` }}>
      <iframe
        ref={frame}
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
