import { useForm, ValidationError } from "@formspree/react";
import { C } from "../theme";

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID ?? "xzdkjqpb";

// ── Contact Form ──────────────────────────────────────────────────────────────
export default function ContactForm() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID);
  const iStyle = {
    width: "100%", background: "transparent", border: "none",
    borderBottom: `1.5px solid ${C.border}`, color: C.dark,
    padding: ".7rem 0", fontFamily: "'DM Mono', monospace",
    fontSize: ".85rem", outline: "none", transition: "border-color .2s",
    display: "block", marginBottom: "1.4rem",
  };
  if (state.succeeded) return (
    <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1.4rem", color: C.dark, fontStyle: "italic", padding: "2rem 0" }}>
      Message sent.<br />
      <span style={{ fontSize: ".8rem", color: C.muted, fontStyle: "normal", fontFamily: "'DM Mono', monospace" }}>I'll be in touch soon.</span>
    </div>
  );
  return (
    <form onSubmit={handleSubmit}>
      {[["name", "Name", "text"], ["email", "Email", "email"]].map(([n, l, t]) => (
        <div key={n} style={{ marginBottom: "1.4rem" }}>
          <label style={{ fontFamily: "'DM Mono', monospace", fontSize: ".6rem", letterSpacing: ".14em", color: C.muted, textTransform: "uppercase", display: "block", marginBottom: ".4rem" }}>{l}</label>
          <input id={n} type={t} name={n} required style={iStyle}
            onFocus={e => e.target.style.borderColor = C.green}
            onBlur={e => e.target.style.borderColor = C.border} />
          <ValidationError prefix={l} field={n} errors={state.errors} style={{ fontFamily: "'DM Mono', monospace", fontSize: ".65rem", color: C.red }} />
        </div>
      ))}
      <div style={{ marginBottom: "1.4rem" }}>
        <label style={{ fontFamily: "'DM Mono', monospace", fontSize: ".6rem", letterSpacing: ".14em", color: C.muted, textTransform: "uppercase", display: "block", marginBottom: ".4rem" }}>Message</label>
        <textarea id="message" name="message" required rows={5}
          style={{ ...iStyle, resize: "none", minHeight: 120, marginBottom: 0 }}
          onFocus={e => e.target.style.borderColor = C.green}
          onBlur={e => e.target.style.borderColor = C.border} />
        <ValidationError prefix="Message" field="message" errors={state.errors} style={{ fontFamily: "'DM Mono', monospace", fontSize: ".65rem", color: C.red }} />
      </div>
      <button type="submit" disabled={state.submitting} style={{
        display: "inline-block", padding: ".85rem 2.5rem",
        background: C.green, color: "#F2F2F2", border: `2px solid ${C.green}`,
        fontFamily: "'DM Mono', monospace", fontSize: ".73rem",
        letterSpacing: ".14em", textTransform: "uppercase",
        cursor: state.submitting ? "not-allowed" : "pointer",
        opacity: state.submitting ? .7 : 1, transition: "all .2s", marginTop: ".5rem",
      }}
        onMouseEnter={e => { if (!state.submitting) { e.target.style.background = "transparent"; e.target.style.color = C.green; } }}
        onMouseLeave={e => { e.target.style.background = C.green; e.target.style.color = "#F2F2F2"; }}>
        {state.submitting ? "Sending..." : "Send Message →"}
      </button>
    </form>
  );
}
