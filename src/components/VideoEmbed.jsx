import { useState, useEffect, useRef } from "react";
import { C } from "../theme";

// Responsive 16:9 YouTube embed (youtube-nocookie.com). The iframe is lazy-loaded by the browser.
// `clickToLoad`: show the video's thumbnail with a play button first and load the player only when
// it's clicked (keeps the page fast; no YouTube request until then except the thumbnail image).
// The player then starts playing and takes focus, so keyboard users stay in place. If the
// thumbnail can't load, the dark box with the play button still reads as a video.
// Keyboard focus ring: focus goes straight into the cross-origin player, which draws no ring
// and fires no focus events in this page (only a window blur), so the box draws the ring
// itself when the iframe takes focus from the keyboard (like :focus-visible, not on click).
export default function VideoEmbed({ id, title, clickToLoad = false }) {
  const frame = useRef(null);
  const [focused, setFocused] = useState(false);
  const [loaded, setLoaded] = useState(!clickToLoad);
  const [thumbOk, setThumbOk] = useState(true);
  const keyboard = useRef(false);
  useEffect(() => {
    const onKey = () => { keyboard.current = true; };
    const onPointer = () => { keyboard.current = false; };
    const onBlur = () => { if (document.activeElement === frame.current) setFocused(keyboard.current); };
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
  // After a click-to-load, hand focus to the player that replaced the button. If the button was
  // activated from the keyboard (click with detail 0), show the ring right away; it clears when
  // focus comes back to the page.
  const viaKeyboard = useRef(false);
  useEffect(() => {
    if (!loaded || !clickToLoad) return;
    frame.current?.focus();
    if (viaKeyboard.current) requestAnimationFrame(() => setFocused(document.activeElement === frame.current));
  }, [loaded, clickToLoad]);

  return (
    <div style={{ outline: focused ? "2px solid #111111" : "none", outlineOffset: 3, position: "relative", width: "100%", aspectRatio: "16 / 9", background: C.dark, border: `1px solid ${C.border}` }}>
      {loaded ? (
        <iframe
          ref={frame}
          src={`https://www.youtube-nocookie.com/embed/${id}?rel=0${clickToLoad ? "&autoplay=1" : ""}`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        />
      ) : (
        <button type="button" className="ix-video-play" onClick={e => { viaKeyboard.current = e.detail === 0; setLoaded(true); }} aria-label={`Play video: ${title}`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", padding: 0, border: 0, background: C.dark, cursor: "pointer", display: "block" }}>
          {thumbOk && (
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" onError={() => setThumbOk(false)}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          )}
          {/* Soft darkening so the play button reads on any thumbnail */}
          <span aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(17,17,17,.25)" }} />
          <span aria-hidden="true" className="ix-video-play-icon" style={{ position: "absolute", left: "50%", top: "50%", width: 68, height: 68, marginLeft: -34, marginTop: -34, borderRadius: "50%", background: "rgba(255,255,255,.92)", color: "#111111", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .2s, color .2s" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" style={{ marginLeft: 4 }}><path d="M5 3l16 9-16 9z" fill="currentColor" /></svg>
          </span>
        </button>
      )}
    </div>
  );
}
