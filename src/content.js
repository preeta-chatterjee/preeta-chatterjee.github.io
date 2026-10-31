import { C } from "./theme";

// ── Site-wide details ─────────────────────────────────────────────────────────
export const SITE = {
  firstName: "Preeta",
  lastName: "Chatterjee",
  name: "Preeta Chatterjee",
  email: "chatterjee.pre@northeastern.edu",
  linkedin: "linkedin.com/in/preeta-chatterjee",
  resume: "/Preeta_Chatterjee_Resume.pdf",
  availability: "summer 2026",
  copyrightYear: "2025",
};

// ── Home: hero ────────────────────────────────────────────────────────────────
export const HERO = {
  badge: "MS CS · Northeastern · 4.0 GPA · 2 Publications",
  tagline: "Building intelligent systems and playable worlds where AI meets real-time 3D.",
  // [label, variant] — variant "green" / "red" is a filled chip, "o" is outlined
  chips: [["ML Engineer", "green"], ["Game Developer", "red"], ["NLP", "o"], ["Unity", "o"], ["Simulation", "o"]],
};

// Floating labels drawn on the hero canvas (x/y are fractions of canvas size, s is font px)
export const CANVAS_LABS = [
  { t: "UNITY",   x: .55, y: .2,  s: 11 }, { t: "C#",     x: .8,  y: .35, s: 13 },
  { t: "PYTHON",  x: .58, y: .62, s: 10 }, { t: "NLP",    x: .74, y: .74, s: 12 },
  { t: "PyTorch", x: .5,  y: .44, s: 10 }, { t: "FAISS",  x: .84, y: .54, s: 9  },
  { t: "RAG",     x: .62, y: .82, s: 11 },
];

export const MARQUEE_ITEMS = ["NLP", "✦", "Game Development", "✦", "Machine Learning", "✦", "Unity", "✦", "RAG Pipelines", "✦", "Simulation", "✦", "C++", "✦", "Real-Time Systems", "✦"];

// ── Home: about strip ─────────────────────────────────────────────────────────
// Headline renders as: lead + accent (green), line break, tail (red)
export const HOME_INTRO = {
  headline: { lead: "ML meets ", accent: "game dev", tail: "& beyond." },
  blurb: "Master's student at Northeastern building at the intersection of intelligent systems and interactive experiences.",
};

// [value, label, colour]
export const STATS = [["4.0", "GPA", C.green], ["3+", "Projects Shipped", C.redMid], ["2", "Publications", C.greenMid], ["5+", "Years Coding", C.redMid]];

// ── Home: contact ─────────────────────────────────────────────────────────────
export const CONTACT_BLURB = `Open to co-op and internship opportunities in AI/ML, game development, and simulation. Boston-based, available ${SITE.availability}.`;

export const SKILLS = [
  { name: "Languages", tags: ["Python", "C++", "C#", "Java", "MATLAB", "TypeScript"] },
  { name: "3D & Graphics", tags: ["Unity", "Unreal Engine", "Simulink", "OpenGL"] },
  { name: "ML / AI", tags: ["PyTorch", "Hugging Face", "FAISS", "scikit-learn"] },
  { name: "Concepts", tags: ["RAG", "NLP", "Simulation Modeling", "Real-Time Systems", "OOP"] },
  { name: "Tools", tags: ["Git", "Azure Cosmos DB", "React.js", "CI/CD"] },
];

export const PROJECTS = [
  {
    id: 1, num: "01", full: true,
    title: "RAG Research Engine", sub: "NLP · Machine Learning",
    status: "Completed", statusColor: C.green, statusBg: C.greenBg,
    year: "2025",
    desc: "End-to-end retrieval-augmented generation pipeline querying 20+ research papers on fairness and bias in LLMs. Responsible for the retrieval module (E5-Base-v2 embeddings, FAISS vector indexing, caching), generation module (FLAN-T5-XL, prompt engineering), and the full evaluation framework — Precision@K, Recall@K, MRR, and ROUGE. Ablation study across three embedding models: E5-base achieved the best ROUGE-L (0.154) while BGE-small led on Precision@5 (0.160). Evaluated on 124 custom-annotated QA pairs.",
    stack: ["Python", "Hugging Face", "FAISS", "PyTorch", "FLAN-T5-XL", "E5-Base-v2", "spaCy"],
    links: [{ label: "GitHub (group repo)", href: "https://github.com/NorthChat/NLP_Final_Project", color: C.green }],
    accent: C.green,
  },
  {
    id: 2, num: "02", full: false,
    title: "Job Tracker", sub: "Full Stack · AI · Web Development",
    status: "Completed", statusColor: C.green, statusBg: C.greenBg,
    year: "2026",
    desc: "A full-stack job application tracker with AI-powered prioritization using Google Gemini. Features include auto-fill from job URLs, drag-and-drop reordering, follow-up notifications, analytics dashboard, contact tracking per application, and a public demo mode. Built with a serverless backend on Vercel and a PostgreSQL database with Row Level Security.",
    stack: ["React", "Vite", "Supabase", "PostgreSQL", "Google Gemini", "Vercel", "Resend"],
    links: [{ label: "Live Demo", href: "https://job-tracker-rho-ecru.vercel.app/demo", color: C.green }],
    accent: C.green,
  },
  {
    id: 3, num: "03", full: false,
    title: "Apartment 101", sub: "Game Development · Unreal Engine",
    status: "In Progress", statusColor: C.amberDk, statusBg: C.amberBg, statusDot: C.amber,
    year: "2026–",
    desc: "A first-person physics game set in a domestic environment. Currently solving a blueprint collision channel inheritance bug — weapons correctly register hits on one zombie instance but pass through others built from the same blueprint, pointing to a per-actor physics asset override issue. Gameplay video coming soon.",
    stack: ["C++", "Unreal Engine", "Blueprint", "Physics Assets", "Collision Channels"],
    links: [
      // TODO: replace href with YouTube link once uploaded
      // { label: "Gameplay Video", href: "https://youtu.be/PLACEHOLDER", color: C.red },
    ],
    accent: C.red,
  },
  {
    id: 4, num: "04", full: false,
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
    id: 5, num: "05", full: false,
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

export const PUBLICATIONS = [
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

// ── About page ────────────────────────────────────────────────────────────────
export const ABOUT_QUOTE = "I want to build systems that think, and worlds that feel real.";

export const ABOUT_SECTIONS = [
  {
    heading: "Background",
    body: "I'm a Master's student in Computer Science at Northeastern University (GPA: 4.0), specialising in NLP and generative AI. My undergraduate background in Electronics and Communication Engineering gives me an unusually hardware-aware perspective on software systems.",
    accent: C.green,
  },
  {
    heading: "What I Build",
    body: "I work across two axes — machine learning systems and interactive 3D environments. On the ML side I design retrieval and generation pipelines; on the game side I build physics-driven experiences in Unity and Unreal. The overlap between the two — intelligent, simulated worlds — is where I want to go.",
    accent: C.red,
  },
  {
    heading: "Experience",
    body: null, // rendered separately by ExperienceBlock
    accent: C.green,
  },
  {
    heading: "Publications",
    body: "I've presented at IEEE IEMENTech (Automated Hybrid Stair Climber for Physically Challenged People) and published in the International Journal of Innovative Research in Physics on Quantum Computing.",
    accent: C.red,
  },
];

export const EXPERIENCE = [
  {
    role: "Graduate Engineer Trainee — Simulation & Software Testing",
    company: "SMS India Pvt Ltd.",
    loc: "Kolkata, India",
    dates: "Aug 2023 – Jun 2024",
    bullets: [
      "Built and integrated MATLAB/Simulink models for rolling mill simulation, cutting project commissioning time by 25%.",
      "Conducted on-site hardware/software testing across client sites; handled customer demos and progress reporting.",
      "Led technical onboarding of interns, providing hands-on mentorship in simulation workflows.",
      "Preceded by a 4-month internship (Jan–Apr 2023) focused on rolling mill simulation and hardware-software testing.",
    ],
  },
  {
    role: "Software Development Intern",
    company: "Caravel Labs Inc.",
    loc: "WA, USA",
    dates: "Jun 2022 – Aug 2022",
    bullets: [
      "Built and deployed a full-stack web application in TypeScript and React.js with an Azure Cosmos DB backend.",
      "Collaborated in weekly Agile sprints using Git, code review, and CI/CD pipelines in a production environment.",
    ],
  },
];

export const EDUCATION = [
  { deg: "MS Computer Science", school: "Northeastern University",                    loc: "Boston, MA",    year: "Expected May 2027", gpa: "4.0",     col: C.green },
  { deg: "BTech Electronics & Communication Engineering", school: "Institute of Engineering and Management", loc: "Kolkata, India", year: "Apr 2023",          gpa: "9.38/10", col: C.red },
];
