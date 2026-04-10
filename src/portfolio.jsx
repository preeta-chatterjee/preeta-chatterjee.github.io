// ─────────────────────────────────────────────────────────────────────────────
// SETUP INSTRUCTIONS
// 1. npm install @formspree/react react-router-dom
// 2. Place your resume PDF at: public/Resume_Preeta_Chatterjee_03042026.pdf
// 3. Replace src/App.jsx with this file
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { useForm, ValidationError } from "@formspree/react";

const C = {
  bg: "#F2F2F2", surface: "#ffffff", border: "#d0d0d0", border2: "#e8e8e8",
  green: "#174D38", greenL: "#1e6347", greenMid: "#2d7a57", greenBg: "#e4ede8",
  red: "#4D1717", redL: "#7a2424", redMid: "#8b3a3a", redBg: "#f5e8e8",
  dark: "#111111", mid: "#444444", muted: "#777777",
  amber: "#b8860b", amberBg: "#fdf3e0", amberDk: "#7a5a08",
};

const PALETTE = [C.green, C.red, C.greenL, C.redL, "#CBCBCB", C.redMid, C.greenMid];

const SKILLS = [
  { name: "Languages", tags: ["Python", "C++", "C#", "Java", "MATLAB", "TypeScript"] },
  { name: "3D & Graphics", tags: ["Unity", "Unreal Engine", "Simulink", "OpenGL"] },
  { name: "ML / AI", tags: ["PyTorch", "Hugging Face", "FAISS", "scikit-learn"] },
  { name: "Concepts", tags: ["RAG", "NLP", "Simulation Modeling", "Real-Time Systems", "OOP"] },
  { name: "Tools", tags: ["Git", "Azure Cosmos DB", "React.js", "CI/CD"] },
];

const PROJECTS = [
  {
    id: 1, num: "01", full: true,
    title: "RAG Research Engine", sub: "NLP · Machine Learning",
    status: "Completed", statusColor: C.green, statusBg: C.greenBg,
    year: "2025",
    desc: "End-to-end retrieval-augmented generation pipeline querying 30+ research papers on fairness and bias in LLMs. FAISS vector indexing, E5-Base-v2 embeddings, and FLAN-T5-XL for natural language generation. Evaluation framework across 124 QA pairs with ablation studies.",
    stack: ["Python", "Hugging Face", "FAISS", "PyTorch", "FLAN-T5-XL", "E5-Base-v2"],
    links: [{ label: "GitHub", href: "https://github.com/NorthChat/NLP_Final_Project", color: C.green }],
    accent: C.green,
  },
  {
    id: 2, num: "02", full: false,
    title: "Roll — A Ball", sub: "Game Development · Unity",
    status: "Live", statusColor: C.redL, statusBg: C.redBg, statusDot: C.red,
    year: "2025",
    desc: "Physics-driven 3D ball-maze game built in Unity. Real-time rigid-body dynamics, collision handling, and game state management. Fully playable and deployed on itch.io.",
    stack: ["Unity", "C#", "Physics Engine", "3D Modeling"],
    links: [
      { label: "GitHub", href: "https://github.com/preeta-chatterjee/roll-a-ball-maze", color: C.green },
      { label: "Play on itch.io", href: "https://lunosstar.itch.io/roll-a-ball", color: C.red },
    ],
    accent: C.red,
  },
  {
    id: 3, num: "03", full: false,
    title: "Apartment 101", sub: "Game Development · Simulation",
    status: "In Progress", statusColor: C.amberDk, statusBg: C.amberBg, statusDot: C.amber,
    year: "2026–",
    desc: "An ongoing game exploring physics interactions and interactive systems within a domestic setting. Regularly updated.",
    stack: ["C++", "Unreal Engine", "Physics Engine"],
    links: [],
    accent: C.red,
  },
  {
    id: 4, num: "04", full: false,
    title: "Haunted Hallway", sub: "Game Development · Unity 2D",
    status: "Live", statusColor: C.redL, statusBg: C.redBg, statusDot: C.red,
    year: "2026",
    desc: "A 2D browser-based survival game built in Unity playable both on computers and mobiles. A rigged zombie — assembled from six individually generated and cleaned limb sprites with custom pivot points — walks toward the player while thirteen glowing keys spawn at random screen positions. Click all thirteen before the zombie reaches you. Companion piece to Hallway Hunters, the main final project.",
    stack: ["Unity", "C#", "WebGL", "Input System", "Google Gemini"],
    links: [
      { label: "Play on itch.io", href: "https://lunosstar.itch.io/haunted-hallway", color: C.red },
      { label: "GitHub", href: "https://github.com/preeta-chatterjee/HauntedHallway", color: C.green },
    ],
    accent: C.red,
  },
];

const PUBLICATIONS = [
  {
    id: "p1", num: "P1",
    title: "Automated Hybrid Stair Climber for Physically Challenged People",
    authors: "P. Chatterjee; N. Lahiri; A. Bhattacharjee; A. Chakraborty",
    venue: "IEEE 5th IEMENTech 2021",
    type: "Conference Paper",
    desc: "Survey and proposal of a cost-effective hybrid stair-climbing device for people with neurological disorders, combining wheel clusters, tracks, and rotating legs. Aimed at making stair navigation safe and accessible for users across different financial backgrounds in India.",
    links: [
      { label: "IEEE Xplore", href: "https://ieeexplore.ieee.org/document/9614713", color: C.green },
      { label: "PDF", href: "/Hybrid_Stair_Climber.pdf", color: C.red },
    ],
  },
  {
    id: "p2", num: "P2",
    title: "A Brief Study on Quantum Computing",
    authors: "P. Chatterjee, R. Chakraborty",
    venue: "International Journal of Innovative Research in Physics (IJIIP), Vol. 1, Issue 4, 2020, pp. 58–63",
    type: "Journal Article",
    desc: "Overview of quantum computing fundamentals including qubits, quantum parallelism, and experimental realisation methods such as ion trap and quantum dot technologies. Examines limitations of classical computers and the trajectory of quantum computing toward practical applications.",
    links: [
	  { label: "PDF", href: "https://ijiip.smartsociety.org/vol1_issue4/issue4_paper7.pdf", color: C.red },
	],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useMobile(bp = 768) {
  const [mobile, setMobile] = useState(typeof window !== "undefined" ? window.innerWidth < bp : false);
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < bp);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [bp]);
  return mobile;
}

const rv = (inView, delay = 0) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? "translateY(0)" : "translateY(28px)",
  transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
});

// ── Cursor (desktop only) ─────────────────────────────────────────────────────
function Cursor() {
  const dot = useRef(null), ring = useRef(null);
  const mouse = useRef({ x: -999, y: -999 }), pos = useRef({ x: -999, y: -999 });
  const mobile = useMobile();
  useEffect(() => {
    if (mobile) return;
    const move = e => { mouse.current = { x: e.clientX, y: e.clientY }; };
    document.addEventListener("mousemove", move);
    document.body.style.cursor = "none";
    let raf;
    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.12;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.12;
      if (dot.current) { dot.current.style.left = mouse.current.x + "px"; dot.current.style.top = mouse.current.y + "px"; }
      if (ring.current) { ring.current.style.left = pos.current.x + "px"; ring.current.style.top = pos.current.y + "px"; }
      raf = requestAnimationFrame(tick);
    };
    tick();
    const grow = () => { if (dot.current) dot.current.style.transform = "translate(-50%,-50%) scale(2.5)"; if (ring.current) ring.current.style.opacity = "0"; };
    const shrink = () => { if (dot.current) dot.current.style.transform = "translate(-50%,-50%) scale(1)"; if (ring.current) ring.current.style.opacity = "1"; };
    const attach = () => document.querySelectorAll("a,button").forEach(el => { el.addEventListener("mouseenter", grow); el.addEventListener("mouseleave", shrink); });
    attach();
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { document.removeEventListener("mousemove", move); cancelAnimationFrame(raf); document.body.style.cursor = "auto"; mo.disconnect(); };
  }, [mobile]);
  if (mobile) return null;
  return (
    <>
      <div ref={dot} style={{ position: "fixed", width: 10, height: 10, background: C.red, borderRadius: "50%", pointerEvents: "none", zIndex: 9999, transform: "translate(-50%,-50%)", transition: "transform .15s" }} />
      <div ref={ring} style={{ position: "fixed", width: 34, height: 34, border: `1.5px solid ${C.red}`, borderRadius: "50%", pointerEvents: "none", zIndex: 9998, transform: "translate(-50%,-50%)" }} />
    </>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const mobile = useMobile();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const navBg = scrolled || !isHome || menuOpen ? "rgba(242,242,242,.97)" : "transparent";
  const navBorder = scrolled || !isHome ? `1px solid ${C.border}` : "none";

  const linkStyle = {
    color: C.muted, textDecoration: "none", fontSize: ".68rem",
    letterSpacing: ".16em", textTransform: "uppercase",
    fontFamily: "'DM Mono',monospace", transition: "color .2s",
  };

  const mobileLinkStyle = {
    ...linkStyle, fontSize: ".9rem", padding: "1rem 0",
    borderBottom: `1px solid ${C.border2}`, display: "block", color: C.dark,
  };

  const activeColor = path => location.pathname === path ? C.dark : C.muted;

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: 60, padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", background: navBg, backdropFilter: "blur(12px)", borderBottom: navBorder, transition: "all .4s" }}>
        <Link to="/" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.6rem", letterSpacing: ".05em", background: `linear-gradient(135deg,${C.green},${C.red})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textDecoration: "none" }}>PC</Link>

        {mobile ? (
          <button onClick={() => setMenuOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", padding: ".5rem", display: "flex", flexDirection: "column", gap: "5px" }}>
            <span style={{ display: "block", width: 22, height: 2, background: menuOpen ? C.red : C.dark, transition: "all .3s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ display: "block", width: 22, height: 2, background: menuOpen ? C.red : C.dark, transition: "all .3s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: 22, height: 2, background: menuOpen ? C.red : C.dark, transition: "all .3s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        ) : (
          <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
            <Link to="/about" style={{ ...linkStyle, color: activeColor("/about") }}
              onMouseEnter={e => e.target.style.color = C.dark}
              onMouseLeave={e => e.target.style.color = activeColor("/about")}>About</Link>
            <Link to="/projects" style={{ ...linkStyle, color: activeColor("/projects") }}
              onMouseEnter={e => e.target.style.color = C.dark}
              onMouseLeave={e => e.target.style.color = activeColor("/projects")}>Projects</Link>
            {isHome
              ? <a href="#contact" style={linkStyle} onMouseEnter={e => e.target.style.color = C.dark} onMouseLeave={e => e.target.style.color = C.muted}>Contact</a>
              : <Link to="/#contact" style={linkStyle} onMouseEnter={e => e.target.style.color = C.dark} onMouseLeave={e => e.target.style.color = C.muted}>Contact</Link>
            }
            <a href="/Resume_Preeta_Chatterjee_03042026.pdf" target="_blank" rel="noreferrer"
              style={{ fontFamily: "'DM Mono',monospace", fontSize: ".68rem", letterSpacing: ".16em", textTransform: "uppercase", padding: ".4rem 1rem", border: `1.5px solid ${C.red}`, color: C.red, textDecoration: "none", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = C.red; e.currentTarget.style.color = "#F2F2F2"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.red; }}>Résumé ↗</a>
          </div>
        )}
      </nav>

      {mobile && menuOpen && (
        <div style={{ position: "fixed", top: 60, left: 0, right: 0, zIndex: 199, background: "rgba(242,242,242,.97)", backdropFilter: "blur(12px)", padding: "0 1.5rem 1.5rem", borderBottom: `1px solid ${C.border}` }}>
          <Link to="/about" style={mobileLinkStyle} onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/projects" style={mobileLinkStyle} onClick={() => setMenuOpen(false)}>Projects</Link>
          <a href={isHome ? "#contact" : "/#contact"} style={mobileLinkStyle} onClick={() => setMenuOpen(false)}>Contact</a>
          <a href="/Resume_Preeta_Chatterjee_03042026.pdf" target="_blank" rel="noreferrer"
            style={{ ...mobileLinkStyle, color: C.red, borderBottom: "none" }}
            onClick={() => setMenuOpen(false)}>Résumé ↗</a>
        </div>
      )}
    </>
  );
}

// ── Hero Canvas ───────────────────────────────────────────────────────────────
function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext("2d");
    let balls = [], frame = 0, mouse = { x: -999, y: -999 };
    const LABS = [
      { t: "UNITY", x: .55, y: .2, s: 11 }, { t: "C#", x: .8, y: .35, s: 13 },
      { t: "PYTHON", x: .58, y: .62, s: 10 }, { t: "NLP", x: .74, y: .74, s: 12 },
      { t: "PyTorch", x: .5, y: .44, s: 10 }, { t: "FAISS", x: .84, y: .54, s: 9 },
      { t: "RAG", x: .62, y: .82, s: 11 },
    ];
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas);

    const nb = (x, y, burst) => ({
      x: x ?? (canvas.width * .1 + Math.random() * canvas.width * .8),
      y: y ?? (Math.random() * canvas.height * .8 + canvas.height * .1),
      r: burst ? 3 + Math.random() * 8 : 5 + Math.random() * 16,
      vx: (Math.random() - .5) * (burst ? 8 : 2.5),
      vy: (Math.random() - .5) * (burst ? 8 : 2.5),
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      alpha: burst ? .7 : .12 + Math.random() * .5,
      outline: !burst && Math.random() > .6,
      gravity: burst ? .15 : 0,
      life: burst ? 1 : Infinity,
    });
    for (let i = 0; i < 18; i++) balls.push(nb());

    let score = 0, floaters = [];

    const getPos = e => {
	  const r = canvas.getBoundingClientRect();
	  if (e.changedTouches && e.changedTouches.length > 0) {
		return { x: e.changedTouches[0].clientX - r.left, y: e.changedTouches[0].clientY - r.top };
	  }
	  if (e.touches && e.touches.length > 0) {
		return { x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top };
	  }
	  return { x: e.clientX - r.left, y: e.clientY - r.top };
	};

    const onMv = e => { mouse = getPos(e); };
    const onLv = () => { mouse = { x: -999, y: -999 }; };
    const onCl = e => {
      const { x: cx, y: cy } = getPos(e);
      let hit = false;
      balls = balls.map(b => {
        if (!hit) {
          const dx = b.x - cx, dy = b.y - cy;
          const isTouch = (e.changedTouches && e.changedTouches.length > 0);
		  const hitRadius = isTouch ? b.r + 22 : b.r + 4;
		  if (Math.sqrt(dx * dx + dy * dy) < hitRadius) {
            hit = true; score++;
            floaters.push({ x: cx, y: cy, text: "+1", life: 1, vy: -2 });
            for (let i = 0; i < 8; i++) balls.push(nb(b.x, b.y, true));
            return null;
          }
        }
        return b;
      }).filter(Boolean);
      if (!hit) { for (let i = 0; i < 4; i++) balls.push(nb(cx, cy, true)); }
      if (balls.filter(b => b.life === Infinity).length < 10) { for (let i = 0; i < 3; i++) balls.push(nb()); }
      if (balls.length > 70) balls = balls.filter((b, idx) => b.life === Infinity || idx > balls.length - 20);
    };

    canvas.addEventListener("mousemove", onMv);
    canvas.addEventListener("mouseleave", onLv);
    canvas.addEventListener("click", onCl);
    canvas.addEventListener("touchend", onCl, { passive: true });

    let raf;
    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(77,23,23,.05)"; ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      LABS.forEach((l, i) => {
        ctx.font = `500 ${l.s}px 'DM Mono',monospace`;
        const a = .08 + Math.sin(frame * .02 + i) * .04;
        ctx.fillStyle = i % 2 === 0 ? `rgba(23,77,56,${a})` : `rgba(77,23,23,${a})`;
        ctx.fillText(l.t, l.x * W, l.y * H + Math.sin(frame * .018 + i) * 8);
      });
      balls = balls.filter(b => b.life > 0);
      balls.forEach(b => {
        const dx = b.x - mouse.x, dy = b.y - mouse.y, d = Math.sqrt(dx * dx + dy * dy);
        //if (d < 30 && b.life === Infinity) { b.vx += dx / d * 0.8; b.vy += dy / d * 0.8; }
        b.vx *= .98; b.vy *= .98;
        b.vy += b.gravity || 0;
        b.x += b.vx; b.y += b.vy;
        if (b.life !== Infinity) { b.life -= .02; b.alpha = b.life * .7; }
        if (b.x > W - b.r) { b.vx *= -1; b.x = W - b.r; }
        if (b.y < b.r) { b.vy *= -1; b.y = b.r; }
        if (b.y > H - b.r) { b.vy *= -.8; b.y = H - b.r; }
        if (b.x < b.r) { b.vx *= -1; b.x = b.r; }
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.globalAlpha = Math.max(0, b.alpha);
        if (b.outline) { ctx.strokeStyle = b.color; ctx.lineWidth = 1.5; ctx.stroke(); }
        else { ctx.fillStyle = b.color; ctx.fill(); }
        ctx.globalAlpha = 1;
      });
      floaters = floaters.filter(f => f.life > 0);
      floaters.forEach(f => {
        f.y += f.vy; f.life -= .03;
        ctx.font = "bold 14px 'DM Mono',monospace";
        ctx.fillStyle = `rgba(23,77,56,${f.life})`;
        ctx.fillText(f.text, f.x, f.y);
      });
      if (score > 0) {
        ctx.font = "500 11px 'DM Mono',monospace";
        ctx.fillStyle = `rgba(77,23,23,.4)`;
        ctx.fillText(`SCORE: ${score}`, W - 100, 80);
      }
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(23,77,56,.28)";
      ctx.beginPath(); ctx.moveTo(W - 40, 60); ctx.lineTo(W - 40, 40); ctx.lineTo(W - 60, 40); ctx.stroke();
      ctx.strokeStyle = "rgba(77,23,23,.28)";
      ctx.beginPath(); ctx.moveTo(40, H - 60); ctx.lineTo(40, H - 40); ctx.lineTo(60, H - 40); ctx.stroke();
      frame++; raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMv);
      canvas.removeEventListener("mouseleave", onLv);
      canvas.removeEventListener("click", onCl);
      canvas.removeEventListener("touchend", onCl);
      ro.disconnect();
    };
  }, []);
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", cursor: "crosshair" }} />
      <span style={{ position: "absolute", bottom: "1rem", right: "1rem", fontFamily: "'DM Mono',monospace", fontSize: ".55rem", letterSpacing: ".12em", color: C.muted, textTransform: "uppercase" }}>tap the bubbles</span>
    </div>
  );
}

// ── Marquee ───────────────────────────────────────────────────────────────────
function Marquee() {
  const items = ["NLP", "✦", "Game Development", "✦", "Machine Learning", "✦", "Unity", "✦", "RAG Pipelines", "✦", "Simulation", "✦", "C++", "✦", "Real-Time Systems", "✦"];
  return (
    <div style={{ background: C.red, padding: ".75rem 0", overflow: "hidden", whiteSpace: "nowrap" }}>
      <div style={{ display: "inline-flex", animation: "mq 20s linear infinite" }}>
        {[...items, ...items].map((t, i) => (
          <span key={i} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem", letterSpacing: ".12em", color: t === "✦" ? "rgba(242,242,242,.3)" : "rgba(242,242,242,.9)", padding: "0 1.8rem" }}>{t}</span>
        ))}
      </div>
      <style>{`@keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}

// ── Project Card — grid layout (homepage) ─────────────────────────────────────
function ProjCard({ p, i }) {
  const [ref, inV] = useInView();
  const [hov, setHov] = useState(false);
  const mobile = useMobile();
  return (
    <div ref={ref} style={{
      gridColumn: mobile ? "span 2" : p.full ? "span 2" : "span 1",
      background: hov ? "#fff" : C.bg, padding: mobile ? "1.5rem" : "2.5rem",
      position: "relative", overflow: "hidden",
      opacity: inV ? 1 : 0, transform: inV ? "none" : "translateY(28px)",
      transition: `background .3s, opacity .7s ease ${i * .1}s, transform .7s ease ${i * .1}s`,
    }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: mobile ? "3rem" : "4rem", color: hov ? C.border : C.border2, lineHeight: 1, position: "absolute", top: "1rem", right: "1.2rem", transition: "color .3s" }}>{p.num}</div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", padding: ".22rem .7rem", background: p.statusBg, border: `1px solid ${(p.statusDot || p.statusColor) + "44"}`, marginBottom: "1rem" }}>
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: p.statusDot || p.statusColor, display: "inline-block" }} />
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".58rem", letterSpacing: ".1em", color: p.statusColor }}>{p.status} · {p.year}</span>
      </div>
      <h3 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: mobile ? "1.3rem" : "1.55rem", color: C.dark, lineHeight: 1.15, marginBottom: ".5rem", fontWeight: 400 }}>{p.title}</h3>
      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".63rem", letterSpacing: ".14em", color: C.muted, textTransform: "uppercase", marginBottom: ".8rem" }}>{p.sub}</div>
      <p style={{ fontFamily: "Georgia,serif", fontSize: ".86rem", lineHeight: 1.8, color: C.muted, marginBottom: "1.3rem" }}>{p.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem", marginBottom: p.links.length ? "1.3rem" : 0 }}>
        {p.stack.map(s => <span key={s} style={{ fontFamily: "'DM Mono',monospace", fontSize: ".6rem", letterSpacing: ".07em", color: C.dark, padding: ".18rem .55rem", border: `1px solid ${C.border}`, background: C.surface }}>{s}</span>)}
      </div>
      {p.links.length > 0 && (
        <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
          {p.links.map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
              style={{ fontFamily: "'DM Mono',monospace", fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", color: l.color, display: "inline-flex", alignItems: "center", gap: ".35rem", textDecoration: "none" }}>{l.label} ↗</a>
          ))}
        </div>
      )}
      <div style={{ position: "absolute", bottom: 0, left: 0, width: hov ? "100%" : "0%", height: 3, background: p.accent, transition: "width .4s ease" }} />
    </div>
  );
}

// ── Project Card — list layout (projects page, full width stacked) ────────────
function ProjCardFull({ p, i }) {
  const [ref, inV] = useInView();
  const [hov, setHov] = useState(false);
  const mobile = useMobile();
  return (
    <div ref={ref} style={{
      background: hov ? "#fff" : C.bg,
      padding: mobile ? "1.8rem 1.5rem" : "2.5rem 3rem",
      position: "relative", overflow: "hidden",
      borderBottom: `1.5px solid ${C.border}`,
      opacity: inV ? 1 : 0, transform: inV ? "none" : "translateY(28px)",
      transition: `background .3s, opacity .7s ease ${i * .1}s, transform .7s ease ${i * .1}s`,
    }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", flexWrap: "wrap", gap: ".5rem" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", padding: ".22rem .7rem", background: p.statusBg, border: `1px solid ${(p.statusDot || p.statusColor) + "44"}` }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: p.statusDot || p.statusColor, display: "inline-block" }} />
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".58rem", letterSpacing: ".1em", color: p.statusColor }}>{p.status} · {p.year}</span>
        </div>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.5rem", color: hov ? C.border : C.border2, lineHeight: 1, transition: "color .3s" }}>{p.num}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 2fr", gap: mobile ? "1rem" : "3rem", alignItems: "start" }}>
        <div>
          <h3 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "1.55rem", color: C.dark, lineHeight: 1.15, marginBottom: ".4rem", fontWeight: 400 }}>{p.title}</h3>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".63rem", letterSpacing: ".14em", color: C.muted, textTransform: "uppercase", marginBottom: "1rem" }}>{p.sub}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem" }}>
            {p.stack.map(s => <span key={s} style={{ fontFamily: "'DM Mono',monospace", fontSize: ".6rem", letterSpacing: ".07em", color: C.dark, padding: ".18rem .55rem", border: `1px solid ${C.border}`, background: C.surface }}>{s}</span>)}
          </div>
        </div>
        <div>
          <p style={{ fontFamily: "Georgia,serif", fontSize: ".9rem", lineHeight: 1.8, color: C.muted, marginBottom: "1.3rem" }}>{p.desc}</p>
          {p.links.length > 0 && (
            <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
              {p.links.map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                  style={{ fontFamily: "'DM Mono',monospace", fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", color: l.color, display: "inline-flex", alignItems: "center", gap: ".35rem", textDecoration: "none" }}>{l.label} ↗</a>
              ))}
            </div>
          )}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, width: hov ? "100%" : "0%", height: 3, background: p.accent, transition: "width .4s ease" }} />
    </div>
  );
}

function PubCard({ p, i }) {
  const [ref, inV] = useInView();
  const [hov, setHov] = useState(false);
  const mobile = useMobile();

  return (
    <div ref={ref} style={{
      background: hov ? "#fff" : C.bg,
      padding: mobile ? "1.8rem 1.5rem" : "2.5rem 3rem",
      position: "relative", overflow: "hidden",
      borderBottom: `1.5px solid ${C.border}`,
      opacity: inV ? 1 : 0, transform: inV ? "none" : "translateY(28px)",
      transition: `background .3s, opacity .7s ease ${i * .1}s, transform .7s ease ${i * .1}s`,
    }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", flexWrap: "wrap", gap: ".5rem" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", padding: ".22rem .7rem", background: C.greenBg, border: `1px solid ${C.green}44` }}>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".58rem", letterSpacing: ".1em", color: C.green }}>{p.type}</span>
        </div>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.5rem", color: hov ? C.border : C.border2, lineHeight: 1, transition: "color .3s" }}>{p.num}</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 2fr", gap: mobile ? "1rem" : "3rem", alignItems: "start" }}>
        <div>
          <h3 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "1.2rem", color: C.dark, lineHeight: 1.25, marginBottom: ".5rem", fontWeight: 400, fontStyle: "italic" }}>{p.title}</h3>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".62rem", color: C.muted, marginBottom: ".4rem" }}>{p.authors}</div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".6rem", color: C.green, letterSpacing: ".06em" }}>{p.venue}</div>
        </div>
        <div>
          <p style={{ fontFamily: "Georgia,serif", fontSize: ".9rem", lineHeight: 1.8, color: C.muted, marginBottom: "1.3rem" }}>{p.desc}</p>
          <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
            {p.links.map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                style={{ fontFamily: "'DM Mono',monospace", fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", color: l.color, display: "inline-flex", alignItems: "center", gap: ".35rem", textDecoration: "none" }}>{l.label} ↗</a>
            ))}
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, width: hov ? "100%" : "0%", height: 3, background: C.green, transition: "width .4s ease" }} />
    </div>
  );
}

// ── Contact Form ──────────────────────────────────────────────────────────────
function ContactForm() {
  const [state, handleSubmit] = useForm("xzdkjqpb");
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

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: C.dark, padding: "2rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".6rem", letterSpacing: ".1em", color: "rgba(242,242,242,.3)", textTransform: "uppercase" }}>© 2025 Preeta Chatterjee</span>
      <div style={{ display: "flex", gap: "2rem" }}>
        {[["About", "/about"], ["Projects", "/projects"], ["Contact", "/#contact"]].map(([l, href]) => (
          <a key={l} href={href} style={{ fontFamily: "'DM Mono',monospace", fontSize: ".6rem", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(242,242,242,.3)", textDecoration: "none", transition: "color .2s" }}
            onMouseEnter={e => e.target.style.color = "rgba(242,242,242,.8)"}
            onMouseLeave={e => e.target.style.color = "rgba(242,242,242,.3)"}>{l}</a>
        ))}
      </div>
    </footer>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE: HOME
// ══════════════════════════════════════════════════════════════════════════════
function HomePage() {
  const [mounted, setMounted] = useState(false);
  const mobile = useMobile();
  useEffect(() => { setTimeout(() => setMounted(true), 120); }, []);
  const f = d => ({ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: `all .8s ease ${d}s` });
  const [refP, inP] = useInView();
  const [refC, inC] = useInView();
  const pad = mobile ? "1.5rem" : "3rem";

  // Only show first 3 projects on homepage
  const featuredProjects = PROJECTS.slice(0, 3);

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: mobile ? "1fr" : "55% 45%", gridTemplateRows: mobile ? "auto 40vw" : "1fr", background: C.bg, overflow: "hidden" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: mobile ? "5rem 1.5rem 2rem" : "7rem 3rem 4rem", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: ".7rem", marginBottom: "1.5rem", ...f(.1) }}>
            <span style={{ width: 30, height: 1.5, background: `linear-gradient(to right,${C.green},${C.red})`, display: "inline-block", flexShrink: 0 }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".6rem", letterSpacing: ".18em", color: C.green, textTransform: "uppercase" }}>MS Computer Science · Northeastern</span>
          </div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: mobile ? "clamp(3.5rem,15vw,5rem)" : "clamp(4rem,8.5vw,7.5rem)", lineHeight: .92, letterSpacing: ".02em", ...f(.15) }}>
            <div style={{ color: C.dark }}>PREETA</div>
            <div style={{ color: C.red }}>CHATTERJEE</div>
          </div>
          <p style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "clamp(.9rem,1.8vw,1.2rem)", color: C.mid, lineHeight: 1.65, fontStyle: "italic", margin: "1.5rem 0 1.8rem", maxWidth: 420, ...f(.3) }}>
            Building intelligent systems and playable worlds — where machine learning meets real-time 3D.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", marginBottom: "2rem", ...f(.4) }}>
            {[["ML Engineer", "green"], ["Game Developer", "red"], ["NLP", "o"], ["Unity", "o"], ["Simulation", "o"]].map(([label, t]) => (
              <span key={label} style={{ fontFamily: "'DM Mono',monospace", fontSize: ".58rem", letterSpacing: ".1em", textTransform: "uppercase", padding: ".3rem .75rem", border: `1.5px solid ${t === "green" ? C.green : t === "red" ? C.red : C.border}`, background: t === "green" ? C.green : t === "red" ? C.red : "transparent", color: t === "o" ? C.mid : "#F2F2F2" }}>{label}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", ...f(.5) }}>
            <a href="#projects" style={{ display: "inline-block", padding: ".75rem 1.8rem", background: C.dark, color: C.bg, fontFamily: "'DM Mono',monospace", fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", border: `2px solid ${C.dark}`, transition: "all .2s", textDecoration: "none" }}
              onMouseEnter={e => { e.target.style.background = "transparent"; e.target.style.color = C.dark; }}
              onMouseLeave={e => { e.target.style.background = C.dark; e.target.style.color = C.bg; }}>Explore Work</a>
            <a href="#contact" style={{ display: "inline-block", padding: ".75rem 1.8rem", background: C.red, color: "#F2F2F2", fontFamily: "'DM Mono',monospace", fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", border: `2px solid ${C.red}`, transition: "all .2s", textDecoration: "none" }}
              onMouseEnter={e => { e.target.style.background = "transparent"; e.target.style.color = C.red; }}
              onMouseLeave={e => { e.target.style.background = C.red; e.target.style.color = "#F2F2F2"; }}>Get in Touch</a>
          </div>
        </div>
        <div style={{ position: "relative", overflow: "hidden", minHeight: mobile ? "40vw" : "auto" }}>
          <HeroCanvas />
        </div>
      </section>

      <Marquee />

      {/* ── About strip ── */}
      <section style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr" }}>
        <div style={{ background: C.dark, padding: `3.5rem ${pad}`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2rem,5vw,4.5rem)", lineHeight: .92, letterSpacing: ".02em", marginBottom: "1.5rem" }}>
            <span style={{ color: "#F2F2F2" }}>ML meets </span><span style={{ color: C.green }}>game dev</span><br /><span style={{ color: C.redMid }}>&amp; beyond.</span>
          </div>
          <p style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: ".98rem", color: "rgba(242,242,242,.65)", lineHeight: 1.8, fontStyle: "italic", marginBottom: "2rem" }}>
            Master's student at Northeastern building at the intersection of intelligent systems and interactive experiences.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.08)" }}>
            {[["4.0", "GPA", C.green], ["3+", "Projects Shipped", C.redMid], ["2", "Publications", C.greenMid], ["5+", "Years Coding", C.redMid]].map(([n, l, col]) => (
              <div key={l} style={{ background: C.dark, padding: "1rem 1.2rem" }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.2rem", color: col, lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".55rem", letterSpacing: ".14em", color: "rgba(242,242,242,.4)", textTransform: "uppercase", marginTop: ".2rem" }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1.5rem" }}>
            <Link to="/about" style={{ fontFamily: "'DM Mono',monospace", fontSize: ".65rem", letterSpacing: ".12em", textTransform: "uppercase", color: C.green, border: `1.5px solid ${C.green}`, padding: ".5rem 1.2rem", textDecoration: "none", display: "inline-block", transition: "all .2s" }}
              onMouseEnter={e => { e.target.style.background = C.green; e.target.style.color = "#F2F2F2"; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = C.green; }}>Read More →</Link>
          </div>
        </div>
        <div style={{ background: C.bg, padding: `3.5rem ${pad}`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".62rem", letterSpacing: ".2em", color: C.green, textTransform: "uppercase", marginBottom: "1.5rem" }}>Technical Arsenal</div>
          {SKILLS.map(s => (
            <div key={s.name} style={{ borderBottom: `1px solid ${C.border2}`, padding: ".8rem 0", display: "flex", justifyContent: "space-between", alignItems: mobile ? "flex-start" : "center", flexDirection: mobile ? "column" : "row", gap: mobile ? ".5rem" : 0 }}>
              <span style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: ".95rem", color: C.dark, fontStyle: "italic" }}>{s.name}</span>
              <div style={{ display: "flex", gap: ".35rem", flexWrap: "wrap", justifyContent: mobile ? "flex-start" : "flex-end" }}>
                {s.tags.map(t => <span key={t} style={{ fontFamily: "'DM Mono',monospace", fontSize: ".55rem", letterSpacing: ".07em", color: C.muted, padding: ".15rem .5rem", border: `1px solid ${C.border}` }}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Projects (first 3 only) ── */}
      <section id="projects" style={{ padding: `4rem ${pad}`, background: C.surface }}>
        <div ref={refP} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem", ...rv(inP) }}>
          <div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".65rem", letterSpacing: ".18em", color: C.red, textTransform: "uppercase", marginBottom: ".5rem" }}>02 / Selected Work</div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.5rem,6vw,5rem)", color: C.dark, letterSpacing: ".02em", lineHeight: .92 }}>Projects.</div>
          </div>
          <Link to="/projects" style={{
            fontFamily: "'DM Mono',monospace", fontSize: ".68rem", letterSpacing: ".12em",
            textTransform: "uppercase", color: C.green, border: `1.5px solid ${C.green}`,
            padding: ".5rem 1.2rem", textDecoration: "none", display: "inline-block", transition: "all .2s",
          }}
            onMouseEnter={e => { e.target.style.background = C.green; e.target.style.color = "#F2F2F2"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = C.green; }}>
            View All ({PROJECTS.length + PUBLICATIONS.length}) →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: "1.5px", background: C.border }}>
          {featuredProjects.map((p, i) => <ProjCard key={p.id} p={p} i={i} />)}
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr" }}>
        <div ref={refC} style={{ background: C.green, padding: `3.5rem ${pad}`, display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden", ...rv(inC) }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: mobile ? "6rem" : "12rem", color: "rgba(255,255,255,.05)", position: "absolute", bottom: "-1rem", left: "-1rem", lineHeight: 1, pointerEvents: "none" }}>HELLO</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: ".65rem", letterSpacing: ".2em", color: "rgba(242,242,242,.5)", textTransform: "uppercase", marginBottom: ".8rem", position: "relative" }}>03 / Contact</div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem,6vw,5.5rem)", color: "#F2F2F2", lineHeight: .92, letterSpacing: ".02em", marginBottom: "1.5rem", position: "relative" }}>
            Let's<br />build<br />something.
          </div>
          <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1rem", color: "rgba(242,242,242,.72)", lineHeight: 1.75, fontStyle: "italic", marginBottom: "2rem", position: "relative" }}>
            Open to co-op and internship opportunities in AI/ML, game development, and simulation. Boston-based, available summer 2026.
          </p>
          <div style={{ position: "relative" }}>
            {[["Email", "chatterjee.pre@northeastern.edu"], ["LinkedIn", "linkedin.com/in/preeta-chatterjee"]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", gap: "1rem", alignItems: "baseline", marginBottom: ".7rem", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: ".6rem", letterSpacing: ".16em", color: "rgba(242,242,242,.45)", textTransform: "uppercase", minWidth: 65, flexShrink: 0 }}>{l}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: ".68rem", color: "rgba(242,242,242,.82)", wordBreak: "break-all" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: C.bg, padding: `3.5rem ${pad}`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: ".62rem", letterSpacing: ".2em", color: C.green, textTransform: "uppercase", marginBottom: "2rem" }}>Drop me a message</div>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE: ALL PROJECTS
// ══════════════════════════════════════════════════════════════════════════════
function ProjectsPage() {
  const mobile = useMobile();
  const pad = mobile ? "1.5rem" : "3rem";

  return (
  <div style={{ paddingTop: 60, minHeight: "100vh", background: C.bg }}>
    <div style={{ background: C.dark, padding: `4rem ${pad} 3rem` }}>
      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".65rem", letterSpacing: ".2em", color: C.red, textTransform: "uppercase", marginBottom: ".8rem" }}>02 / Work</div>
      <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(3rem,8vw,7rem)", color: "#F2F2F2", lineHeight: .92, letterSpacing: ".02em" }}>All Projects.</h1>
    </div>

    {/* Projects */}
    <div style={{ borderTop: `1.5px solid ${C.border}` }}>
      {PROJECTS.map((p, i) => <ProjCardFull key={p.id} p={p} i={i} />)}
    </div>

    {/* Publications */}
    <div style={{ background: C.surface, padding: `4rem ${pad} 0` }}>
      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".65rem", letterSpacing: ".18em", color: C.red, textTransform: "uppercase", marginBottom: ".5rem" }}>Research</div>
      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.5rem,6vw,5rem)", color: C.dark, letterSpacing: ".02em", lineHeight: .92, marginBottom: "2.5rem" }}>Publications.</div>
    </div>
    <div style={{ background: C.surface, borderTop: `1.5px solid ${C.border}` }}>
      {PUBLICATIONS.map((p, i) => <PubCard key={p.id} p={p} i={i} />)}
    </div>

    {/* Back to home */}
    <div style={{ padding: `3rem ${pad}`, background: C.surface }}>
      <Link to="/" style={{ fontFamily: "'DM Mono',monospace", fontSize: ".68rem", letterSpacing: ".12em", textTransform: "uppercase", color: C.muted, textDecoration: "none", transition: "color .2s" }}
        onMouseEnter={e => e.target.style.color = C.dark}
        onMouseLeave={e => e.target.style.color = C.muted}>← Back to Home</Link>
    </div>

    <Footer />
  </div>
);
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE: ABOUT
// ══════════════════════════════════════════════════════════════════════════════
function AboutPage() {
  const mobile = useMobile();
  const pad = mobile ? "1.5rem" : "3rem";

  const sections = [
    { heading: "Background", body: "I'm a Master's student in Computer Science at Northeastern University (GPA: 4.0), specialising in NLP and generative AI. My undergraduate background in Electronics and Communication Engineering gives me an unusually hardware-aware perspective on software systems.", accent: C.green },
    { heading: "What I Build", body: "I work across two axes — machine learning systems and interactive 3D environments. On the ML side I design retrieval and generation pipelines; on the game side I build physics-driven experiences in Unity and Unreal. The overlap between the two — intelligent, simulated worlds — is where I want to go.", accent: C.red },
    { heading: "Experience", body: "At SMS India I spent nearly two years in simulation and software testing, building MATLAB/Simulink models and doing hardware-software integration. Before that I worked on full-stack web apps at Caravel Labs (TypeScript, React, Azure) and Android development at Applex.in.", accent: C.green },
    { heading: "Publications", body: "I've presented at IEEE IEMENTech (Automated Hybrid Stair Climber for Physically Challenged People) and published in the International Journal of Innovative Research in Physics on Quantum Computing.", accent: C.red },
  ];

  return (
    <div style={{ paddingTop: 60, minHeight: "100vh", background: C.bg }}>
      <div style={{ background: C.dark, padding: `4rem ${pad} 3rem` }}>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".65rem", letterSpacing: ".2em", color: C.red, textTransform: "uppercase", marginBottom: ".8rem" }}>01 / About</div>
        <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(3rem,8vw,7rem)", color: "#F2F2F2", lineHeight: .92, letterSpacing: ".02em" }}>About Me.</h1>
      </div>
      <div style={{ padding: `3rem ${pad}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ borderLeft: `4px solid ${C.red}`, paddingLeft: "1.5rem", marginBottom: "3rem" }}>
            <p style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "clamp(1rem,2.5vw,1.5rem)", color: C.dark, lineHeight: 1.65, fontStyle: "italic" }}>
              "I want to build systems that think, and worlds that feel real."
            </p>
          </div>

          {sections.map((s, i) => {
            const [ref, inV] = useInView();
            return (
              <div key={s.heading} ref={ref} style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "160px 1fr", gap: mobile ? "1rem" : "3rem", marginBottom: "3rem", borderTop: `1px solid ${C.border2}`, paddingTop: "2rem", ...rv(inV, i * .1) }}>
                <div>
                  <div style={{ width: 24, height: 3, background: s.accent, marginBottom: ".8rem" }} />
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.3rem", color: C.dark, letterSpacing: ".02em" }}>{s.heading}</div>
                </div>
                <p style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "1rem", color: C.mid, lineHeight: 1.85, fontStyle: "italic" }}>{s.body}</p>
              </div>
            );
          })}

          {(() => {
            const [ref, inV] = useInView();
            return (
              <div ref={ref} style={{ marginTop: "2rem", ...rv(inV) }}>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".62rem", letterSpacing: ".2em", color: C.green, textTransform: "uppercase", marginBottom: "1.5rem" }}>Education</div>
                {[
                  { deg: "MS Computer Science", school: "Northeastern University", loc: "Boston, MA", year: "Expected May 2027", gpa: "4.0", col: C.green },
                  { deg: "BTech Electronics & Communication Engineering", school: "Institute of Engineering and Management", loc: "Kolkata, India", year: "Apr 2023", gpa: "9.38/10", col: C.red },
                ].map(e => (
                  <div key={e.school} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: `1px solid ${C.border2}`, padding: "1.5rem 0", flexWrap: mobile ? "wrap" : "nowrap", gap: "1rem" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: "1.05rem", color: C.dark, fontStyle: "italic", marginBottom: ".3rem" }}>{e.deg}</div>
                      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".7rem", color: C.muted }}>{e.school} · {e.loc}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.4rem", color: e.col }}>{e.gpa}</div>
                      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".62rem", color: C.muted }}>{e.year}</div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

          {(() => {
            const [ref, inV] = useInView();
            return (
              <div ref={ref} style={{ marginTop: "4rem", padding: mobile ? "1.5rem" : "2.5rem", background: C.dark, display: "flex", alignItems: mobile ? "flex-start" : "center", justifyContent: "space-between", flexDirection: mobile ? "column" : "row", gap: "1.5rem", ...rv(inV) }}>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.8rem", color: "#F2F2F2", letterSpacing: ".02em" }}>Want the full picture?</div>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".7rem", color: "rgba(242,242,242,.5)", marginTop: ".3rem" }}>Download my résumé for complete work history and publications.</div>
                </div>
                <a href="/Resume_Preeta_Chatterjee_03042026.pdf" target="_blank" rel="noreferrer"
                  style={{ display: "inline-block", padding: ".85rem 2rem", background: C.green, color: "#F2F2F2", fontFamily: "'DM Mono',monospace", fontSize: ".73rem", letterSpacing: ".12em", textTransform: "uppercase", border: `2px solid ${C.green}`, transition: "all .2s", textDecoration: "none", flexShrink: 0 }}
                  onMouseEnter={e => { e.target.style.background = "transparent"; e.target.style.color = C.green; }}
                  onMouseLeave={e => { e.target.style.background = C.green; e.target.style.color = "#F2F2F2"; }}>Download Résumé ↓</a>
              </div>
            );
          })()}
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ── App ────────────────────────────────────────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
    document.title = "Preeta Chatterjee";
  }, []);

  return (
    <BrowserRouter>
      <div style={{ background: C.bg, minHeight: "100vh", overflowX: "hidden" }}>
        <Cursor />
        <Nav />
        <ScrollToTop />   {/* ← add this line */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
);
}