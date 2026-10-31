import { Link, Navigate, useParams } from "react-router-dom";
import { C, T, NAV_HEIGHT, revealStyle } from "../theme";
import { useInView, useMobile } from "../hooks";
import { CASE_STUDIES } from "../content";
import VideoEmbed from "../components/VideoEmbed";
import ZoomImage from "../components/ZoomImage";
import Footer from "../components/Footer";

// ══════════════════════════════════════════════════════════════════════════════
// PAGE: PROJECT CASE STUDY  (/#/projects/:slug, data in CASE_STUDIES)
// ══════════════════════════════════════════════════════════════════════════════
const S_PARA = { fontFamily: T.serif, fontSize: "1rem", color: C.mid, lineHeight: 1.85 };
const S_CAPTION = { fontFamily: "Georgia,serif", fontSize: ".86rem", lineHeight: 1.75, color: C.muted, marginTop: ".8rem" };
const S_TAG = { fontFamily: T.mono, fontSize: ".6rem", letterSpacing: ".07em", color: C.dark, padding: ".18rem .55rem", border: `1px solid ${C.border}`, background: C.surface };

function CaseSection({ s, n, mobile }) {
  const [ref, inV] = useInView();
  return (
    <section ref={ref} style={{ borderTop: `1px solid ${C.border2}`, paddingTop: "2.5rem", marginBottom: "3.5rem", ...revealStyle(inV) }}>
      <div style={{ fontFamily: T.mono, fontSize: ".62rem", letterSpacing: ".18em", color: C.red, textTransform: "uppercase", marginBottom: ".5rem" }}>{String(n).padStart(2, "0")}</div>
      <h2 style={{ fontFamily: T.display, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: C.dark, letterSpacing: ".02em", lineHeight: 1, fontWeight: 400, marginBottom: "1.5rem" }}>{s.heading}</h2>

      {s.body?.map((para, i) => <p key={i} style={{ ...S_PARA, marginBottom: "1.2rem" }}>{para}</p>)}

      {s.list && (
        <div style={{ marginTop: s.body ? "1.8rem" : 0 }}>
          {s.list.heading && <h3 style={{ fontFamily: T.mono, fontSize: ".65rem", letterSpacing: ".18em", color: C.green, textTransform: "uppercase", fontWeight: 400, marginBottom: "1rem" }}>{s.list.heading}</h3>}
          <ul style={{ paddingLeft: "1.1rem", margin: 0 }}>
            {s.list.items.map((item, i) => <li key={i} style={{ ...S_PARA, fontSize: ".95rem", marginBottom: ".55rem" }}>{item}</li>)}
          </ul>
        </div>
      )}

      {s.layers?.map(layer => (
        <div key={layer.heading} style={{ marginTop: "2.5rem" }}>
          <h3 style={{ fontFamily: T.serif, fontSize: "1.3rem", color: C.dark, fontStyle: "italic", fontWeight: 400, marginBottom: "1rem" }}>{layer.heading}</h3>
          {layer.image
            ? <figure style={{ margin: 0 }}>
                <ZoomImage image={layer.image} />
                <figcaption style={{ ...S_CAPTION, fontSize: ".92rem", color: C.mid }}>{layer.text}</figcaption>
              </figure>
            : <p style={S_PARA}>{layer.text}</p>}
        </div>
      ))}

      {s.gallery && (
        <div style={{ marginTop: "2.5rem", display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)", gap: "1.5rem", alignItems: "start" }}>
          {s.gallery.map(g => (
            <figure key={g.image.src} style={{ margin: 0 }}>
              <ZoomImage image={g.image} thumb />
              <figcaption style={S_CAPTION}>{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      )}

      {s.video && <div style={{ marginTop: "1.8rem" }}><VideoEmbed {...s.video} /></div>}
    </section>
  );
}

export default function CaseStudyPage() {
  const { slug } = useParams();
  const mobile = useMobile();
  const pad = mobile ? "1.5rem" : "3rem";
  const cs = CASE_STUDIES[slug];
  if (!cs) return <Navigate to="/projects" replace />;

  return (
    <div style={{ paddingTop: NAV_HEIGHT, minHeight: "100vh", background: C.bg }}>
      <div style={{ background: C.dark, padding: `4rem ${pad} 3rem` }}>
        <div style={{ fontFamily: T.mono, fontSize: ".65rem", letterSpacing: ".2em", color: C.red, textTransform: "uppercase", marginBottom: ".8rem" }}>Case Study · {cs.year}</div>
        <h1 style={{ fontFamily: T.display, fontSize: "clamp(3rem,8vw,7rem)", color: "#F2F2F2", lineHeight: .92, letterSpacing: ".02em", fontWeight: 400 }}>{cs.title}</h1>
        {cs.subtitle && <div style={{ fontFamily: T.mono, fontSize: ".72rem", letterSpacing: ".12em", color: "rgba(242,242,242,.55)", textTransform: "uppercase", marginTop: "1rem" }}>{cs.subtitle}</div>}
      </div>

      <div style={{ padding: `3rem ${pad}` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          {/* Hero */}
          <div style={{ marginBottom: "3.5rem" }}>
            {cs.hero.video && <VideoEmbed {...cs.hero.video} />}
            <p style={{ fontFamily: T.serif, fontSize: "clamp(1.05rem,2.2vw,1.4rem)", color: C.dark, lineHeight: 1.6, fontStyle: "italic", borderLeft: `4px solid ${C.red}`, paddingLeft: "1.5rem", margin: "2rem 0 1.5rem" }}>{cs.hero.pitch}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem" }}>
              {cs.hero.tags.map(t => <span key={t} style={S_TAG}>{t}</span>)}
            </div>
          </div>

          {cs.sections.map((s, i) => <CaseSection key={s.heading} s={s} n={i + 1} mobile={mobile} />)}

          <Link to="/projects" style={{ fontFamily: T.mono, fontSize: ".68rem", letterSpacing: ".12em", textTransform: "uppercase", color: C.muted, textDecoration: "none", transition: "color .2s" }}
            onMouseEnter={e => e.currentTarget.style.color = C.dark}
            onMouseLeave={e => e.currentTarget.style.color = C.muted}>← All Projects</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
