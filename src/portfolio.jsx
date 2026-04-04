import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0e0e0e",
  surface: "#161616",
  card: "#1a1a1a",
  border: "#2a2a2a",
  green: "#174D38",
  greenLight: "#1e6347",
  red: "#4D1717",
  redLight: "#6b2020",
  silver: "#CBCBCB",
  fog: "#F2F2F2",
  muted: "#888888",
  text: "#f0ede8",
};

const NAV_LINKS = ["About", "Projects", "Contact"];

const PROJECTS = [
  {
    id: 1,
    title: "RAG Research Engine",
    tag: "NLP · Machine Learning",
    status: "Completed",
    statusColor: COLORS.green,
    year: "2025",
    description:
      "End-to-end retrieval-augmented generation pipeline querying 30+ research papers on fairness and bias in LLMs. Built with FAISS vector indexing, E5-Base-v2 embeddings, and FLAN-T5-XL for natural language generation. Evaluation framework across 124 QA pairs with ablation studies.",
    stack: ["Python", "Hugging Face", "FAISS", "PyTorch", "FLAN-T5-XL"],
    github: "https://github.com/preeta-chatterjee",
    accent: COLORS.green,
  },
  {
    id: 2,
    title: "Roll — A Ball",
    tag: "Game Development · Unity",
    status: "Live",
    statusColor: COLORS.greenLight,
    year: "2025",
    description:
      "A physics-driven 3D ball game built in Unity. Demonstrates real-time rigid-body dynamics, collision handling, and game state management. First shipped game project — fully playable and deployed.",
    stack: ["Unity", "C#", "Physics Engine", "3D Modeling"],
    github: "https://github.com/preeta-chatterjee",
    accent: COLORS.red,
  },
  {
    id: 3,
    title: "Untitled Game Project",
    tag: "Game Development · In Progress",
    status: "In Progress",
    statusColor: "#b8860b",
    year: "2025–",
    description:
      "An ongoing game development project currently in active development. Exploring simulation mechanics, environment design, and interactive systems. Updates pushed regularly to GitHub.",
    stack: ["Unity", "C#", "Unreal Engine", "Simulation"],
    github: "https://github.com/preeta-chatterjee",
    accent: COLORS.red,
  },
];

const SKILLS = [
  { label: "Languages", items: "Python · C++ · Java · C# · MATLAB · TypeScript" },
  { label: "3D / Graphics", items: "Unity · Unreal Engine · Simulink · OpenGL" },
  { label: "ML / AI", items: "PyTorch · Hugging Face · FAISS · scikit-learn · FLAN-T5" },
  { label: "Tools", items: "Git · Azure Cosmos DB · React.js · CI/CD" },
  { label: "Concepts", items: "Simulation Modeling · RAG · NLP · Real-Time Systems · OOP" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Noise() {
  return (
    <svg style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, opacity: 0.03 }}>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}

function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 2.5rem",
      height: "64px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(14,14,14,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${COLORS.border}` : "none",
      transition: "all 0.4s ease",
    }}>
      <span style={{
        fontFamily: "'DM Serif Display', Georgia, serif",
        fontSize: "1.15rem",
        color: COLORS.text,
        letterSpacing: "0.02em",
      }}>PC</span>
      <div style={{ display: "flex", gap: "2.5rem" }}>
        {NAV_LINKS.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            color: active === l.toLowerCase() ? COLORS.fog : COLORS.muted,
            textDecoration: "none",
            fontSize: "0.8rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: "'DM Mono', 'Courier New', monospace",
            transition: "color 0.2s",
          }}
            onMouseEnter={e => e.target.style.color = COLORS.fog}
            onMouseLeave={e => e.target.style.color = active === l.toLowerCase() ? COLORS.fog : COLORS.muted}
          >{l}</a>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  return (
    <section id="about" style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "0 2.5rem",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background accent blobs */}
      <div style={{
        position: "absolute", top: "15%", right: "8%",
        width: "340px", height: "340px", borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.green}22 0%, transparent 70%)`,
        filter: "blur(40px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "20%", left: "5%",
        width: "260px", height: "260px", borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.red}18 0%, transparent 70%)`,
        filter: "blur(50px)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "900px", position: "relative", zIndex: 1 }}>
        {/* Eyebrow */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.6rem",
          marginBottom: "1.8rem",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.7s ease 0.1s",
        }}>
          <span style={{ width: "28px", height: "1px", background: COLORS.green, display: "inline-block" }} />
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.72rem", letterSpacing: "0.18em",
            color: COLORS.green, textTransform: "uppercase",
          }}>Computer Science · Northeastern University</span>
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: "clamp(3.2rem, 8vw, 7rem)",
          fontWeight: 400,
          lineHeight: 0.95,
          color: COLORS.text,
          margin: "0 0 0.15em",
          letterSpacing: "-0.02em",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease 0.2s",
        }}>
          Preeta<br />
          <span style={{ color: COLORS.silver, fontStyle: "italic" }}>Chatterjee</span>
        </h1>

        {/* Tagline */}
        <p style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "clamp(0.85rem, 1.8vw, 1.05rem)",
          color: COLORS.muted,
          maxWidth: "540px",
          lineHeight: 1.7,
          marginTop: "1.8rem",
          marginBottom: "2.8rem",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.8s ease 0.35s",
        }}>
          ML engineer & game developer. Building intelligent systems and real-time 3D experiences — from RAG pipelines to physics-driven games.
        </p>

        {/* CTA row */}
        <div style={{
          display: "flex", gap: "1rem", flexWrap: "wrap",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.8s ease 0.5s",
        }}>
          <a href="#projects" style={{
            padding: "0.75rem 2rem",
            background: COLORS.green,
            color: COLORS.fog,
            textDecoration: "none",
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase",
            border: "none", cursor: "pointer",
            transition: "background 0.2s",
          }}
            onMouseEnter={e => e.target.style.background = COLORS.greenLight}
            onMouseLeave={e => e.target.style.background = COLORS.green}
          >View Projects</a>
          <a href="https://github.com/preeta-chatterjee" target="_blank" rel="noreferrer" style={{
            padding: "0.75rem 2rem",
            background: "transparent",
            color: COLORS.silver,
            textDecoration: "none",
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase",
            border: `1px solid ${COLORS.border}`,
            cursor: "pointer",
            transition: "border-color 0.2s, color 0.2s",
          }}
            onMouseEnter={e => { e.target.style.borderColor = COLORS.silver; e.target.style.color = COLORS.fog; }}
            onMouseLeave={e => { e.target.style.borderColor = COLORS.border; e.target.style.color = COLORS.silver; }}
          >GitHub ↗</a>
        </div>

        {/* Skills strip */}
        <div style={{
          marginTop: "5rem",
          paddingTop: "2.5rem",
          borderTop: `1px solid ${COLORS.border}`,
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.8s ease 0.7s",
        }}>
          {SKILLS.map(s => (
            <div key={s.label} style={{
              display: "flex", gap: "1.5rem", alignItems: "baseline",
              marginBottom: "0.55rem",
            }}>
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.68rem", letterSpacing: "0.12em",
                color: COLORS.green, textTransform: "uppercase",
                minWidth: "110px",
              }}>{s.label}</span>
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.75rem", color: COLORS.muted,
              }}>{s.items}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(30px)",
      transition: `all 0.7s ease ${index * 0.12}s`,
    }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? COLORS.card : COLORS.surface,
          border: `1px solid ${hovered ? project.accent + "55" : COLORS.border}`,
          padding: "2rem 2.2rem",
          transition: "all 0.3s ease",
          cursor: "default",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top accent line */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: hovered ? project.accent : "transparent",
          transition: "background 0.3s",
        }} />

        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.2rem" }}>
          <div>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.65rem", letterSpacing: "0.15em",
              color: COLORS.muted, textTransform: "uppercase",
              marginBottom: "0.4rem",
            }}>{project.tag}</div>
            <h3 style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: "1.55rem", fontWeight: 400,
              color: COLORS.text, margin: 0, letterSpacing: "-0.01em",
            }}>{project.title}</h3>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "1rem" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              padding: "0.25rem 0.7rem",
              background: project.statusColor + "22",
              border: `1px solid ${project.statusColor}44`,
              marginBottom: "0.4rem",
            }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: project.statusColor, display: "inline-block" }} />
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: project.statusColor, letterSpacing: "0.1em" }}>
                {project.status}
              </span>
            </div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: COLORS.muted }}>{project.year}</div>
          </div>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: "Georgia, serif",
          fontSize: "0.88rem", lineHeight: 1.75,
          color: COLORS.muted, margin: "0 0 1.5rem",
        }}>{project.description}</p>

        {/* Stack pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
          {project.stack.map(s => (
            <span key={s} style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.65rem", letterSpacing: "0.08em",
              color: COLORS.silver,
              padding: "0.2rem 0.6rem",
              border: `1px solid ${COLORS.border}`,
              background: COLORS.bg,
            }}>{s}</span>
          ))}
        </div>

        {/* GitHub link */}
        <a href={project.github} target="_blank" rel="noreferrer" style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.72rem", letterSpacing: "0.1em",
          color: project.accent === COLORS.green ? COLORS.green : "#c0392b",
          textDecoration: "none", textTransform: "uppercase",
          display: "inline-flex", alignItems: "center", gap: "0.4rem",
          transition: "opacity 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          View on GitHub <span style={{ fontSize: "0.9rem" }}>↗</span>
        </a>
      </div>
    </div>
  );
}

function Projects() {
  const [ref, inView] = useInView();
  return (
    <section id="projects" style={{ padding: "7rem 2.5rem", position: "relative" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div ref={ref} style={{
          display: "flex", alignItems: "center", gap: "1.5rem",
          marginBottom: "3.5rem",
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease",
        }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: COLORS.green, letterSpacing: "0.18em", textTransform: "uppercase" }}>02 / Projects</span>
          <div style={{ flex: 1, height: "1px", background: COLORS.border }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <a href="https://github.com/preeta-chatterjee" target="_blank" rel="noreferrer"
            style={{
              fontFamily: "'DM Mono', monospace", fontSize: "0.72rem",
              color: COLORS.muted, textDecoration: "none", letterSpacing: "0.1em",
              textTransform: "uppercase",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.target.style.color = COLORS.fog}
            onMouseLeave={e => e.target.style.color = COLORS.muted}
          >All projects at github.com/preeta-chatterjee ↗</a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = e => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle = {
    width: "100%", boxSizing: "border-box",
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    color: COLORS.fog,
    padding: "0.85rem 1rem",
    fontFamily: "'DM Mono', monospace",
    fontSize: "0.82rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section id="contact" style={{ padding: "7rem 2.5rem 6rem", position: "relative" }}>
      {/* Background accent */}
      <div style={{
        position: "absolute", top: "30%", right: "10%",
        width: "300px", height: "300px", borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.red}15 0%, transparent 70%)`,
        filter: "blur(50px)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div ref={ref} style={{
          display: "flex", alignItems: "center", gap: "1.5rem",
          marginBottom: "3.5rem",
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease",
        }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: COLORS.green, letterSpacing: "0.18em", textTransform: "uppercase" }}>03 / Contact</span>
          <div style={{ flex: 1, height: "1px", background: COLORS.border }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          {/* Left copy */}
          <div>
            <h2 style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400, color: COLORS.text,
              margin: "0 0 1rem", lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}>
              Let's build<br /><span style={{ fontStyle: "italic", color: COLORS.silver }}>something.</span>
            </h2>
            <p style={{
              fontFamily: "Georgia, serif",
              fontSize: "0.9rem", lineHeight: 1.8,
              color: COLORS.muted, margin: "0 0 2rem",
            }}>
              Open to internship and co-op opportunities in AI/ML engineering, game development, and simulation. Based in Boston — available summer 2026.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { label: "Email", value: "chatterjee.pre@northeastern.edu" },
                { label: "LinkedIn", value: "linkedin.com/in/preeta-chatterjee" },
                { label: "GitHub", value: "github.com/preeta-chatterjee" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: COLORS.green, letterSpacing: "0.12em", textTransform: "uppercase", minWidth: "60px" }}>{item.label}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: COLORS.muted }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div>
            {sent ? (
              <div style={{
                padding: "3rem 2rem", textAlign: "center",
                border: `1px solid ${COLORS.green}44`,
                background: COLORS.green + "11",
              }}>
                <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1.5rem", color: COLORS.text, marginBottom: "0.5rem" }}>Message sent.</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: COLORS.muted }}>I'll be in touch soon.</div>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: COLORS.muted, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>Name</label>
                  <input name="name" value={form.name} onChange={handle} required
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = COLORS.green}
                    onBlur={e => e.target.style.borderColor = COLORS.border}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: COLORS.muted, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handle} required
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = COLORS.green}
                    onBlur={e => e.target.style.borderColor = COLORS.border}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: COLORS.muted, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>Message</label>
                  <textarea name="message" value={form.message} onChange={handle} required rows={5}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={e => e.target.style.borderColor = COLORS.green}
                    onBlur={e => e.target.style.borderColor = COLORS.border}
                  />
                </div>
                <button type="submit" style={{
                  padding: "0.85rem 2rem",
                  background: COLORS.green,
                  color: COLORS.fog,
                  border: "none", cursor: "pointer",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase",
                  transition: "background 0.2s",
                  alignSelf: "flex-start",
                }}
                  onMouseEnter={e => e.target.style.background = COLORS.greenLight}
                  onMouseLeave={e => e.target.style.background = COLORS.green}
                >Send Message →</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      borderTop: `1px solid ${COLORS.border}`,
      padding: "1.8rem 2.5rem",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: COLORS.muted }}>© 2025 Preeta Chatterjee</span>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: COLORS.muted }}>Boston, MA · MS Computer Science</span>
    </footer>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);

    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.4 }
    );
    document.querySelectorAll("section[id]").forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", color: COLORS.text, position: "relative" }}>
      <Noise />
      <Nav active={activeSection} />
      <Hero />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
