import { useState, useEffect, useRef } from "react";

// ── Colours ──────────────────────────────────────────────────────────
const C = {
  bg: "#F2F2F2", surface: "#ffffff", border: "#d0d0d0", border2: "#e8e8e8",
  green: "#174D38", greenL: "#1e6347", greenBg: "#e4ede8",
  red: "#4D1717", redBg: "#f0e5e5",
  dark: "#111111", mid: "#444444", muted: "#777777",
  amber: "#b8860b", amberBg: "#fdf3e0", amberDark: "#7a5a08",
};

const PALETTE = [C.green, C.red, C.greenL, "#CBCBCB", "#d0d0d0", C.green, C.amber];

const SKILLS = [
  { name: "Languages", tags: ["Python", "C++", "C#", "Java", "MATLAB", "TypeScript"] },
  { name: "3D & Graphics", tags: ["Unity", "Unreal Engine", "Simulink", "OpenGL"] },
  { name: "ML / AI", tags: ["PyTorch", "Hugging Face", "FAISS", "scikit-learn"] },
  { name: "Concepts", tags: ["RAG", "NLP", "Simulation Modeling", "Real-Time Systems", "OOP"] },
  { name: "Tools", tags: ["Git", "Azure Cosmos DB", "React.js", "CI/CD"] },
];

const PROJECTS = [
  {
    id: 1, num: "01",
    title: "RAG Research Engine",
    sub: "NLP · Machine Learning",
    status: "Completed", statusColor: C.green, statusBg: C.greenBg,
    desc: "End-to-end retrieval-augmented generation pipeline querying 30+ research papers on fairness and bias in LLMs. FAISS vector indexing, E5-Base-v2 embeddings, and FLAN-T5-XL generation. Evaluation framework across 124 QA pairs with ablation studies.",
    stack: ["Python", "Hugging Face", "FAISS", "PyTorch", "FLAN-T5-XL", "E5-Base-v2"],
    accentColor: C.green, full: true,
  },
  {
    id: 2, num: "02",
    title: "Roll — A Ball",
    sub: "Game Development · Unity",
    status: "Live", statusColor: C.greenL, statusBg: C.greenBg,
    desc: "Physics-driven 3D ball game demonstrating real-time rigid-body dynamics, collision handling, and game state management. First shipped game — fully playable.",
    stack: ["Unity", "C#", "Physics Engine", "3D Modeling"],
    accentColor: C.red, full: false,
  },
  {
    id: 3, num: "03",
    title: "Untitled Game Project",
    sub: "Game Development · Simulation",
    status: "In Progress", statusColor: C.amberDark, statusBg: C.amberBg, statusDot: C.amber,
    desc: "Ongoing game exploring simulation mechanics, environment design, and interactive systems. Active development — updates pushed regularly.",
    stack: ["Unity", "C#", "Unreal Engine", "Simulation"],
    accentColor: C.red, full: false,
  },
];

// ── useInView hook ───────────────────────────────────────────────────
function useInView(threshold = 0.12) {
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

// ── Custom Cursor ────────────────────────────────────────────────────
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const mouse = useRef({ x: -999, y: -999 });
  const pos = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const move = e => { mouse.current = { x: e.clientX, y: e.clientY }; };
    document.addEventListener("mousemove", move);
    let raf;
    function tick() {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.12;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.12;
      if (dot.current) { dot.current.style.left = mouse.current.x + "px"; dot.current.style.top = mouse.current.y + "px"; }
      if (ring.current) { ring.current.style.left = pos.current.x + "px"; ring.current.style.top = pos.current.y + "px"; }
      raf = requestAnimationFrame(tick);
    }
    tick();
    return () => { document.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  const dotStyle = {
    position: "fixed", width: "12px", height: "12px", background: C.green,
    borderRadius: "50%", pointerEvents: "none", zIndex: 9999,
    transform: "translate(-50%,-50%)", transition: "transform 0.15s",
  };
  const ringStyle = {
    position: "fixed", width: "36px", height: "36px",
    border: `1.5px solid ${C.green}`, borderRadius: "50%",
    pointerEvents: "none", zIndex: 9998, transform: "translate(-50%,-50%)",
  };
  return <><div ref={dot} style={dotStyle} /><div ref={ring} style={ringStyle} /></>;
}

// ── Nav ──────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: "60px", padding: "0 3rem",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(242,242,242,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "none",
      transition: "all 0.4s ease",
    }}>
      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.6rem", color: C.green, letterSpacing: "0.05em" }}>PC</span>
      <div style={{ display: "flex", gap: "2.5rem" }}>
        {["About", "Projects", "Contact"].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            color: C.muted, textDecoration: "none",
            fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase",
            fontFamily: "'DM Mono', monospace", transition: "color 0.2s",
          }}
            onMouseEnter={e => e.target.style.color = C.dark}
            onMouseLeave={e => e.target.style.color = C.muted}
          >{l}</a>
        ))}
      </div>
    </nav>
  );
}

// ── Hero Canvas ──────────────────────────────────────────────────────
function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let balls = [], frame = 0, mouse = { x: -999, y: -999 };
    const LABELS = [
      { text: "UNITY", x: 0.55, y: 0.2, size: 11 },
      { text: "C#", x: 0.8, y: 0.35, size: 13 },
      { text: "PYTHON", x: 0.6, y: 0.65, size: 10 },
      { text: "NLP", x: 0.75, y: 0.75, size: 12 },
      { text: "PyTorch", x: 0.52, y: 0.45, size: 10 },
      { text: "FAISS", x: 0.85, y: 0.55, size: 9 },
      { text: "RAG", x: 0.63, y: 0.82, size: 11 },
    ];

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();

    function newBall(x, y, burst = false) {
      const W = canvas.width, H = canvas.height;
      return {
        x: x ?? (W * 0.35 + Math.random() * W * 0.6),
        y: y ?? (Math.random() * H * 0.8 + H * 0.1),
        r: burst ? 4 + Math.random() * 10 : 6 + Math.random() * 18,
        vx: burst ? (Math.random() - 0.5) * 6 : (Math.random() - 0.5) * 2.5,
        vy: burst ? (Math.random() - 0.5) * 6 : (Math.random() - 0.5) * 2.5,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        alpha: 0.15 + Math.random() * 0.5,
        outline: Math.random() > 0.6,
      };
    }
    for (let i = 0; i < 22; i++) balls.push(newBall());

    const onMove = e => {
      const r = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouse = { x: -999, y: -999 }; };
    const onClick = e => {
      const r = canvas.getBoundingClientRect();
      const cx = e.clientX - r.left, cy = e.clientY - r.top;
      for (let i = 0; i < 5; i++) balls.push(newBall(cx, cy, true));
      if (balls.length > 55) balls.splice(0, 5);
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("click", onClick);

    let raf;
    function draw() {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // grid
      ctx.strokeStyle = "rgba(23,77,56,0.06)";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      // floating labels
      LABELS.forEach((l, i) => {
        ctx.font = `500 ${l.size}px 'DM Mono', monospace`;
        ctx.fillStyle = `rgba(23,77,56,${0.1 + Math.sin(frame * 0.02 + i) * 0.04})`;
        ctx.fillText(l.text, l.x * W, l.y * H + Math.sin(frame * 0.018 + i) * 8);
      });

      // balls
      balls.forEach(b => {
        const dx = b.x - mouse.x, dy = b.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) { b.vx += (dx / dist) * 1.2; b.vy += (dy / dist) * 1.2; }
        b.vx *= 0.98; b.vy *= 0.98;
        b.x += b.vx; b.y += b.vy;
        if (b.x < W * 0.35) b.vx += 0.5;
        if (b.x > W - b.r) { b.vx *= -1; b.x = W - b.r; }
        if (b.y < b.r) { b.vy *= -1; b.y = b.r; }
        if (b.y > H - b.r) { b.vy *= -1; b.y = H - b.r; }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.globalAlpha = b.alpha;
        if (b.outline) { ctx.strokeStyle = b.color; ctx.lineWidth = 1.5; ctx.stroke(); }
        else { ctx.fillStyle = b.color; ctx.fill(); }
        ctx.globalAlpha = 1;
      });

      // corner brackets
      ctx.strokeStyle = "rgba(23,77,56,0.25)"; ctx.lineWidth = 1.5;
      const s = 20;
      ctx.beginPath(); ctx.moveTo(W - 40, 40 + s); ctx.lineTo(W - 40, 40); ctx.lineTo(W - 40 - s, 40); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(40, H - 40 - s); ctx.lineTo(40, H - 40); ctx.lineTo(40 + s, H - 40); ctx.stroke();

      frame++;
      raf = requestAnimationFrame(draw);
    }
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("click", onClick);
      ro.disconnect();
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", cursor: "crosshair" }} />
      <span style={{
        position: "absolute", bottom: "2.5rem", right: "2.5rem",
        fontFamily: "'DM Mono', monospace", fontSize: "0.6rem",
        letterSpacing: "0.16em", color: C.muted, textTransform: "uppercase",
      }}>interactive · click to play</span>
    </div>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────
function Hero() {
  const [m, setM] = useState(false);
  useEffect(() => { setTimeout(() => setM(true), 120); }, []);
  const fade = (delay) => ({
    opacity: m ? 1 : 0, transform: m ? "translateY(0)" : "translateY(20px)",
    transition: `all 0.8s ease ${delay}s`,
  });

  return (
    <section id="about" style={{
      minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr",
      position: "relative", overflow: "hidden", background: C.bg,
    }}>
      {/* Left */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "7rem 3rem 4rem", position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "2rem", ...fade(0.1) }}>
          <span style={{ width: "30px", height: "1.5px", background: C.green, display: "inline-block" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em", color: C.green, textTransform: "uppercase" }}>MS Computer Science · Northeastern</span>
        </div>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(4.5rem, 9vw, 8rem)",
          lineHeight: 0.92, letterSpacing: "0.02em",
          ...fade(0.15),
        }}>
          <div style={{ color: C.dark }}>PREETA</div>
          <div style={{ WebkitTextStroke: `2px ${C.dark}`, color: "transparent" }}>CHAT-</div>
          <div style={{ color: C.green }}>TERJEE</div>
        </div>
        <p style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
          color: C.mid, lineHeight: 1.65, fontStyle: "italic",
          marginTop: "1.8rem", marginBottom: "2rem", maxWidth: "400px",
          ...fade(0.3),
        }}>Building intelligent systems and playable worlds — where machine learning meets real-time 3D.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.5rem", ...fade(0.4) }}>
          {["ML Engineer", "Game Developer", "NLP", "Unity", "Simulation"].map((t, i) => (
            <span key={t} style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "0.3rem 0.8rem",
              border: `1.5px solid ${i < 2 ? C.green : C.border}`,
              color: i < 2 ? C.surface : C.mid,
              background: i < 2 ? C.green : "transparent",
            }}>{t}</span>
          ))}
        </div>
        <div style={fade(0.5)}>
          <a href="#projects" style={{
            display: "inline-block", padding: "0.85rem 2.2rem",
            background: C.dark, color: C.bg,
            fontFamily: "'DM Mono', monospace", fontSize: "0.75rem",
            letterSpacing: "0.12em", textTransform: "uppercase",
            border: `2px solid ${C.dark}`, transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.target.style.background = "transparent"; e.target.style.color = C.dark; }}
            onMouseLeave={e => { e.target.style.background = C.dark; e.target.style.color = C.bg; }}
          >Explore Work</a>
        </div>
        {/* scroll hint */}
        <div style={{ position: "absolute", bottom: "2.5rem", left: "3rem", display: "flex", alignItems: "center", gap: "0.7rem", ...fade(1) }}>
          <div style={{ width: "1px", height: "50px", background: `linear-gradient(to bottom, ${C.green}, transparent)` }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.18em", color: C.muted, textTransform: "uppercase", writingMode: "vertical-rl" }}>Scroll</span>
        </div>
      </div>
      {/* Right canvas */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <HeroCanvas />
      </div>
    </section>
  );
}

// ── Marquee ──────────────────────────────────────────────────────────
function Marquee() {
  const items = ["NLP", "✦", "Game Development", "✦", "Machine Learning", "✦", "Unity", "✦", "RAG Pipelines", "✦", "Simulation", "✦", "C++", "✦", "Real-Time Systems", "✦"];
  const doubled = [...items, ...items];
  return (
    <div style={{ background: C.green, padding: "0.75rem 0", overflow: "hidden", whiteSpace: "nowrap" }}>
      <div style={{ display: "inline-flex", animation: "marquee 18s linear infinite" }}>
        {doubled.map((t, i) => (
          <span key={i} style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.1rem", letterSpacing: "0.12em",
            color: t === "✦" ? "rgba(242,242,242,0.4)" : "#F2F2F2",
            padding: "0 2rem",
          }}>{t}</span>
        ))}
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}

// ── About ────────────────────────────────────────────────────────────
function About() {
  const [refL, inL] = useInView();
  const [refR, inR] = useInView();
  const reveal = (inView, delay = 0) => ({
    opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)",
    transition: `all 0.7s ease ${delay}s`,
  });
  return (
    <section id="about-detail" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      {/* Dark left */}
      <div ref={refL} style={{ background: C.dark, padding: "5rem 3rem", display: "flex", flexDirection: "column", justifyContent: "center", ...reveal(inL) }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem,5vw,4.5rem)", color: "#F2F2F2", lineHeight: 0.95, letterSpacing: "0.02em", marginBottom: "1.5rem" }}>
          ML meets<br /><span style={{ color: C.green }}>game dev.</span>
        </div>
        <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1rem", color: "rgba(242,242,242,0.7)", lineHeight: 1.8, fontStyle: "italic", marginBottom: "2rem" }}>
          Master's student at Northeastern building at the intersection of intelligent systems and interactive experiences. From transformer-powered pipelines to physics-driven 3D worlds.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.1)" }}>
          {[["4.0", "GPA"], ["3+", "Projects Shipped"], ["2", "Publications"], ["5+", "Years Coding"]].map(([n, l]) => (
            <div key={l} style={{ background: C.dark, padding: "1.2rem 1.5rem" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.5rem", color: C.green, lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.14em", color: "rgba(242,242,242,0.45)", textTransform: "uppercase", marginTop: "0.2rem" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Light right */}
      <div ref={refR} style={{ background: C.bg, padding: "5rem 3rem", display: "flex", flexDirection: "column", justifyContent: "center", ...reveal(inR, 0.15) }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.2em", color: C.green, textTransform: "uppercase", marginBottom: "1.5rem" }}>Technical Arsenal</div>
        {SKILLS.map(s => (
          <div key={s.name} style={{ borderBottom: `1px solid ${C.border2}`, padding: "0.9rem 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "0.95rem", color: C.dark, fontStyle: "italic" }}>{s.name}</span>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: "flex-end", maxWidth: "60%" }}>
              {s.tags.map(t => (
                <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.08em", color: C.muted, padding: "0.15rem 0.5rem", border: `1px solid ${C.border}` }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Projects ─────────────────────────────────────────────────────────
function Projects() {
  const [refH, inH] = useInView();
  return (
    <section id="projects" style={{ padding: "6rem 3rem", background: C.surface }}>
      <div ref={refH} style={{
        display: "flex", alignItems: "flex-end", justifyContent: "space-between",
        marginBottom: "3.5rem",
        opacity: inH ? 1 : 0, transform: inH ? "none" : "translateY(20px)",
        transition: "all 0.6s ease",
      }}>
        <div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.18em", color: C.green, textTransform: "uppercase", marginBottom: "0.5rem" }}>02 / Selected Work</div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem,6vw,5rem)", color: C.dark, letterSpacing: "0.02em", lineHeight: 0.95 }}>Projects.</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5px", background: C.border }}>
        {PROJECTS.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
      </div>
    </section>
  );
}

function ProjectCard({ p, i }) {
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} style={{
      gridColumn: p.full ? "span 2" : "span 1",
      background: hov ? "#fff" : C.bg,
      padding: "2.5rem", position: "relative", overflow: "hidden",
      transition: "background 0.3s",
      opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(28px)",
      transition: `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s, background 0.3s`,
    }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* big num */}
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "4rem", color: hov ? C.border : C.border2, lineHeight: 1, position: "absolute", top: "1.5rem", right: "2rem", transition: "color 0.3s" }}>{p.num}</div>

      {/* status badge */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.22rem 0.65rem", background: p.statusBg, border: `1px solid ${p.statusColor}33`, marginBottom: "1rem" }}>
        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: p.statusDot || p.statusColor, display: "inline-block" }} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", color: p.statusColor }}>{p.status} · {p.id === 1 ? "2025" : p.id === 2 ? "2025" : "2025–"}</span>
      </div>

      <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1.6rem", color: C.dark, lineHeight: 1.15, marginBottom: "0.5rem", fontWeight: 400 }}>{p.title}</h3>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.14em", color: C.muted, textTransform: "uppercase", marginBottom: "0.8rem" }}>{p.sub}</div>
      <p style={{ fontFamily: "Georgia, serif", fontSize: "0.87rem", lineHeight: 1.8, color: C.muted, marginBottom: "1.5rem" }}>{p.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
        {p.stack.map(s => <span key={s} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.07em", color: C.dark, padding: "0.18rem 0.55rem", border: `1px solid ${C.border}`, background: C.surface }}>{s}</span>)}
      </div>

      {/* bottom accent bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, width: hov ? "100%" : "0%", height: "3px", background: p.accentColor, transition: "width 0.4s ease" }} />
    </div>
  );
}

// ── Contact ──────────────────────────────────────────────────────────
function Contact() {
  const [refL, inL] = useInView();
  const [refR, inR] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const inputStyle = {
    width: "100%", background: "transparent", border: "none",
    borderBottom: `1.5px solid ${C.border}`, color: C.dark,
    padding: "0.7rem 0", fontFamily: "'DM Mono', monospace",
    fontSize: "0.85rem", outline: "none", transition: "border-color 0.2s",
    marginBottom: "1.5rem", display: "block",
  };

  return (
    <section id="contact" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      {/* Green left */}
      <div ref={refL} style={{
        background: C.green, padding: "5rem 3rem",
        display: "flex", flexDirection: "column", justifyContent: "center",
        position: "relative", overflow: "hidden",
        opacity: inL ? 1 : 0, transform: inL ? "none" : "translateY(28px)", transition: "all 0.7s ease",
      }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "12rem", color: "rgba(255,255,255,0.05)", position: "absolute", bottom: "-2rem", left: "-1rem", lineHeight: 1, pointerEvents: "none", letterSpacing: "0.02em" }}>HELLO</div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem,6vw,5.5rem)", color: "#F2F2F2", lineHeight: 0.92, letterSpacing: "0.02em", marginBottom: "1.5rem", position: "relative" }}>Let's<br />build<br />something.</div>
        <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1rem", color: "rgba(242,242,242,0.75)", lineHeight: 1.75, fontStyle: "italic", marginBottom: "2.5rem", position: "relative" }}>
          Open to co-op and internship opportunities in AI/ML engineering, game development, and simulation. Boston-based, available summer 2026.
        </p>
        <div style={{ position: "relative" }}>
          {[["Email", "chatterjee.pre@northeastern.edu"], ["LinkedIn", "linkedin.com/in/preeta-chatterjee"]].map(([l, v]) => (
            <div key={l} style={{ display: "flex", gap: "1rem", alignItems: "baseline", marginBottom: "0.7rem" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.16em", color: "rgba(242,242,242,0.5)", textTransform: "uppercase", minWidth: "60px" }}>{l}</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "rgba(242,242,242,0.85)" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form right */}
      <div ref={refR} style={{
        background: C.bg, padding: "5rem 3rem",
        display: "flex", flexDirection: "column", justifyContent: "center",
        opacity: inR ? 1 : 0, transform: inR ? "none" : "translateY(28px)", transition: "all 0.7s ease 0.15s",
      }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.2em", color: C.green, textTransform: "uppercase", marginBottom: "2rem" }}>03 / Get in touch</div>
        {sent ? (
          <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1.4rem", color: C.dark, fontStyle: "italic", padding: "2rem 0" }}>
            Message sent.<br />
            <span style={{ fontSize: "0.8rem", color: C.muted, fontStyle: "normal", fontFamily: "'DM Mono', monospace" }}>I'll be in touch soon.</span>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSent(true); }}>
            {[["name", "Name", "text"], ["email", "Email", "email"]].map(([n, l, t]) => (
              <div key={n}>
                <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.14em", color: C.muted, textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>{l}</label>
                <input name={n} type={t} value={form[n]} onChange={handle} required style={inputStyle}
                  onFocus={e => e.target.style.borderColor = C.green}
                  onBlur={e => e.target.style.borderColor = C.border}
                />
              </div>
            ))}
            <div>
              <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.14em", color: C.muted, textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>Message</label>
              <textarea name="message" value={form.message} onChange={handle} required rows={4}
                style={{ ...inputStyle, resize: "none", minHeight: "100px" }}
                onFocus={e => e.target.style.borderColor = C.green}
                onBlur={e => e.target.style.borderColor = C.border}
              />
            </div>
            <button type="submit" style={{
              display: "inline-block", padding: "0.85rem 2.5rem",
              background: C.dark, color: "#F2F2F2", border: `2px solid ${C.dark}`,
              fontFamily: "'DM Mono', monospace", fontSize: "0.75rem",
              letterSpacing: "0.14em", textTransform: "uppercase",
              cursor: "pointer", transition: "all 0.2s", marginTop: "0.5rem",
            }}
              onMouseEnter={e => { e.target.style.background = "transparent"; e.target.style.color = C.dark; }}
              onMouseLeave={e => { e.target.style.background = C.dark; e.target.style.color = "#F2F2F2"; }}
            >Send Message →</button>
          </form>
        )}
      </div>
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: C.dark, padding: "1.5rem 3rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.1em", color: "rgba(242,242,242,0.35)", textTransform: "uppercase" }}>© 2025 Preeta Chatterjee</span>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.1em", color: "rgba(242,242,242,0.35)", textTransform: "uppercase" }}>MS Computer Science · Northeastern University</span>
    </footer>
  );
}

// ── Cursor mount on body ─────────────────────────────────────────────
function GlobalCursor() {
  useEffect(() => { document.body.style.cursor = "none"; return () => { document.body.style.cursor = "auto"; }; }, []);
  return <Cursor />;
}

// ── App ──────────────────────────────────────────────────────────────
export default function Portfolio() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", overflowX: "hidden" }}>
      <GlobalCursor />
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
