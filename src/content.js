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

// ── Projects ──────────────────────────────────────────────────────────────────
// Groups shown on the Projects page, in order. `tab: true` groups get a filter tab;
// the others only appear under "All".
export const PROJECT_GROUPS = [
  { id: "cv",    label: "Computer Vision & ML",      tab: true },
  { id: "sim",   label: "Simulation & Game Engines", tab: true },
  { id: "other", label: "Other",                     tab: false },
];

// Projects on the home page, in display order.
export const FEATURED_PROJECT_IDS = ["hallway-hunters", "stone-and-soul", "reconstruction"];

// `status` is optional: when omitted, the badge shows only the dates.
// `desc` is a string, or an array of strings and { text, to } internal links.
// A link with `to` is an in-site route; a link with `href` opens in a new tab.
export const PROJECTS = [
  {
    id: "reconstruction", num: "01", group: "cv", full: false,
    title: "When Geometry Breaks: 3D Reconstruction under Motion and Image Degradation", sub: "Computer Vision · Course Project",
    status: "In Progress", statusColor: C.amberDk, statusBg: C.amberBg, statusDot: C.amber,
    year: "Oct 2026–present",
    desc: "Course project for Pattern Recognition & Computer Vision at Northeastern, with a classmate. Studies how scene motion and image degradation (blur, haze, low light) get confused in feed-forward 3D reconstruction, using VGGT as the backbone with VGGT4D and Easi3R as baselines. The aim is a degradation-aware masking method that separates real motion from image degradation. My role: motion experiments and the geometric consistency score. Research in progress.",
    stack: ["VGGT", "VGGT4D", "Easi3R", "3D Reconstruction"],
    links: [],
    accent: C.green,
  },
  {
    id: "rag", num: "02", group: "cv", full: false,
    title: "RAG Research Engine", sub: "NLP · Machine Learning",
    status: "Completed", statusColor: C.green, statusBg: C.greenBg,
    year: "2025",
    desc: "End-to-end retrieval-augmented generation pipeline querying 20+ research papers on fairness and bias in LLMs. Responsible for the retrieval module (E5-Base-v2 embeddings, FAISS vector indexing, caching), generation module (FLAN-T5-XL, prompt engineering), and the full evaluation framework: Precision@K, Recall@K, MRR, and ROUGE. Ablation study across three embedding models: E5-base achieved the best ROUGE-L (0.154) while BGE-small led on Precision@5 (0.160). Evaluated on 124 custom-annotated QA pairs.",
    stack: ["Python", "Hugging Face", "FAISS", "PyTorch", "FLAN-T5-XL", "E5-Base-v2", "spaCy"],
    links: [{ label: "GitHub (group repo)", href: "https://github.com/NorthChat/NLP_Final_Project", color: C.green }],
    accent: C.green,
  },
  {
    id: "stone-and-soul", num: "03", group: "sim", full: false,
    title: "Stone & Soul: 2D Game and Custom C++ Game Engine", sub: "Game Engine · C++",
    statusColor: C.redL, statusBg: C.redBg, statusDot: C.red,
    year: "May–Aug 2026",
    desc: "Built a custom 2D game engine in C++ and SDL3 on an Entity-Component-System architecture, with swappable collision strategies (grid and quadtree), Lua scripting, A* pathfinding, and a unit and property test suite. On top of the engine, built a three-level tile-based puzzle game (a villager-rescue game with boulder-pushing puzzles), with enemy AI that switches from patrolling to live A* pursuit when the player gets close.",
    stack: ["C++", "SDL3", "Entity-Component-System", "Lua", "A* Pathfinding", "Unit & Property Testing"],
    links: [],
    accent: C.red,
  },
  {
    id: "hallway-hunters", num: "04", group: "sim", full: true,
    title: "Hallway Hunters: First-Person Survival Horror (Unreal Engine 5.7)", sub: "Game Development · Unreal Engine",
    statusColor: C.redL, statusBg: C.redBg, statusDot: C.red,
    year: "Jan–May 2026",
    desc: "A first-person survival horror game in Unreal Engine 5.7. Trapped on a zombie-infected apartment floor, the player uses doors as tactical barriers to reach a rooftop evacuation before time runs out. Features a three-layer enemy AI (Behavior Tree, Animation Blueprint, Character Blueprint) and was rebuilt from scratch mid-development into a modular codebase.",
    stack: ["Unreal Engine 5.7", "Blueprints", "Behavior Trees", "Niagara", "UMG"],
    links: [{ label: "Case Study", to: "/projects/hallway-hunters", color: C.red }],
    accent: C.red,
  },
  {
    id: "roll-a-ball", num: "05", group: "sim", full: false,
    title: "Roll-a-Ball", sub: "Game Development · Unity",
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
    id: "haunted-hallway", num: "06", group: "sim", full: false,
    title: "Haunted Hallway", sub: "Game Development · Unity 2D",
    status: "Live", statusColor: C.redL, statusBg: C.redBg, statusDot: C.red,
    year: "2026",
    desc: [
      "A 2D browser-based survival game built in Unity playable both on computers and mobiles. A rigged zombie, assembled from six individually generated and cleaned limb sprites with custom pivot points, walks toward the player while thirteen glowing keys spawn at random screen positions. Click all thirteen before the zombie reaches you. Companion piece to ",
      { text: "Hallway Hunters", to: "/projects/hallway-hunters" },
      ", the main final project.",
    ],
    stack: ["Unity", "C#", "WebGL", "Input System", "Google Gemini"],
    links: [
      { label: "Play on itch.io", href: "https://lunosstar.itch.io/haunted-hallway", color: C.red },
      { label: "GitHub", href: "https://github.com/preeta-chatterjee/HauntedHallway", color: C.green },
    ],
    accent: C.red,
  },
  {
    id: "job-tracker", num: "07", group: "other", full: false,
    title: "Job Tracker", sub: "Full Stack · AI · Web Development",
    status: "Completed", statusColor: C.green, statusBg: C.greenBg,
    year: "2026",
    desc: "A full-stack job application tracker with AI-powered prioritization using Google Gemini. Features include auto-fill from job URLs, drag-and-drop reordering, follow-up notifications, analytics dashboard, contact tracking per application, and a public demo mode. Built with a serverless backend on Vercel and a PostgreSQL database with Row Level Security.",
    stack: ["React", "Vite", "Supabase", "PostgreSQL", "Google Gemini", "Vercel", "Resend"],
    links: [{ label: "Live Demo", href: "https://job-tracker-rho-ecru.vercel.app/demo", color: C.green }],
    accent: C.green,
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

// ── Case studies ──────────────────────────────────────────────────────────────
// Keyed by URL slug: /#/projects/<slug>. Each section can combine, in this order:
//   body (paragraphs) · list { heading?, items } · layers [{ heading, text, image? }]
//   · gallery [{ image, caption }] · video (YouTube id)
// Images: `src` is the display version (max 1600px wide); `full` opens in the lightbox.
const HH_IMG = "/projects/hallway-hunters";

export const CASE_STUDIES = {
  "hallway-hunters": {
    projectId: "hallway-hunters",
    title: "Hallway Hunters",
    subtitle: "First-Person Survival Horror (Unreal Engine 5.7)",
    year: "Jan–May 2026",
    hero: {
      video: { id: "9aV8TK9dP9I", title: "Hallway Hunters gameplay video" },
      pitch: "You're a detective trapped on a zombie-infected apartment floor. Zombies can't open doors. Reach the rooftop helicopter before time runs out.",
      tags: ["Unreal Engine 5.7", "Blueprints", "Behavior Trees", "Niagara", "UMG"],
    },
    sections: [
      {
        heading: "Overview",
        body: [
          "Hallway Hunters is a first-person survival horror game built in Unreal Engine 5.7. You play a detective trapped on one floor of an apartment building during a viral outbreak, with five zombie-occupied rooms off a central hallway. To survive, you manage your health, fight or evade zombies with a metal pipe, and reach the rooftop evacuation helicopter before the timer runs out. Zombies cannot open doors, so every closed door is a tactical decision.",
        ],
        list: {
          heading: "Features",
          items: [
            "Door interaction with on-screen prompts; doors act as tactical barriers because zombies cannot open them",
            "Zombie AI with sight-based perception and patrol, chase, and attack states",
            "Zombie attacks timed to the animation's hit frame",
            "Player health bar, evacuation countdown timer, and an independent world-space health bar above each zombie",
            "Main menu, plus win and lose screens with restart",
            "Six-state zombie animation system (idle, patrol walk, chase walk, attack, hit reaction, death) with a ragdoll death",
            "Niagara effects: blood splatter on attacks and falling electric sparks",
            "Flickering lights with randomized, non-repeating timing and occasional full blackouts",
            "PBR and emissive flicker materials, with 3D spatial audio for zombie alerts",
            "Melee combat with a metal pipe (see Known Issues)",
          ],
        },
      },
      {
        heading: "Enemy AI Architecture",
        body: [
          "The zombie AI is split into three layers that never bypass each other: the Behavior Tree decides, the Animation Blueprint displays, and the Character Blueprint handles gameplay.",
        ],
        layers: [
          {
            heading: "Behavior Tree & Blackboard",
            image: { src: `${HH_IMG}/behavior-tree.webp`, full: `${HH_IMG}/behavior-tree-full.webp`, width: 1600, height: 952, alt: "Behavior Tree and Blackboard for the zombie AI in Unreal Engine" },
            text: "Makes every decision. Three branches run in priority order: a dead state, chase-and-attack when the zombie can see the player, and random patrol as the fallback. The AI controller's sight perception (1200-unit radius, 60-degree peripheral angle, 1500-unit lose-sight radius) writes the player reference and a can-see-player flag to the Blackboard.",
          },
          {
            heading: "Animation Blueprint",
            image: { src: `${HH_IMG}/anim-blueprint.webp`, full: `${HH_IMG}/anim-blueprint-full.webp`, width: 1600, height: 951, alt: "Zombie Animation Blueprint locomotion state machine in Unreal Engine" },
            text: "Handles all visual output. A six-state locomotion state machine is driven by speed and the can-see-player flag. Attack, hit reaction, and death play as montages so they blend and interrupt cleanly, and death uses a highest-priority global transition. An Anim Notify on the attack's hit frame fires the damage trace.",
          },
          {
            heading: "Character Blueprint (BP_Zombie)",
            text: "Owns health, damage, and the per-zombie health bar, and exposes the state variables the Animation Blueprint reads every frame. Each zombie tracks its own health independently.",
          },
        ],
        gallery: [
          {
            image: { src: `${HH_IMG}/ai-debugger.webp`, full: `${HH_IMG}/ai-debugger-full.webp`, width: 1600, height: 895, alt: "Unreal AI debugger showing a zombie's patrol task and Blackboard values" },
            caption: "Unreal's AI debugger during play. The zombie is running its patrol task, with live Blackboard values and the 1200 / 1500-unit sight ranges visible.",
          },
          {
            image: { src: `${HH_IMG}/perception.webp`, full: `${HH_IMG}/perception-full.webp`, width: 1600, height: 878, alt: "Perception event graph branching on Successfully Sensed" },
            caption: "The perception fix. The event branches on Successfully Sensed: when a zombie loses sight of the player, the false path sets the can-see-player flag to false and clears the player reference, so the Blackboard never holds a stale value.",
          },
          {
            image: { src: `${HH_IMG}/anim-update.webp`, full: `${HH_IMG}/anim-update-full.webp`, width: 1600, height: 951, alt: "Animation Blueprint event graph with the animation-update path and attack Anim Notify" },
            caption: "The single animation-update path. Every frame, one cast to BP_Zombie reads speed and the four state flags. Below it, the attack Anim Notify fires the damage trace on the exact hit frame.",
          },
        ],
      },
      {
        heading: "Development: The Rebuild",
        body: [
          "All of my semester coursework had been built in a single Unreal project. By mid-development it held several generations of the same zombie Blueprints, duplicate state-machine transitions, and inconsistent Blackboard keys, and the AI behaved unpredictably: attacking out of range, ignoring the player up close, and getting stuck mid-animation. Every fix broke something else, so I started a new project, migrated only confirmed-working assets, and rebuilt every Blueprint system from a written architecture plan. The rebuild took about two days and produced a stable codebase where each system has one responsibility: cleanly separated Behavior Tree branches, a single animation-update path, montage-end callbacks instead of fixed delays, and consistent asset naming.",
        ],
        video: { id: "LqsOFARvTSs", title: "Hallway Hunters project walkthrough video" },
      },
      {
        heading: "Known Issues & Next Steps",
        list: {
          items: [
            "Weapon hit detection: the pipe's line trace reaches every zombie (confirmed with debug drawing), but damage registers on some instances and not others. Next step: switch to a multi line trace that processes every hit, and audit the collision channel settings on each zombie instance.",
            "Level dressing: room layouts, doors, and enemy placement are final, but the apartments lack furniture and props. Next step: dress each room with marketplace props so they read as lived-in homes.",
          ],
        },
      },
      {
        heading: "What I Learned",
        list: {
          items: [
            "Project organization drives code quality. A semester of experiments in one project file became unmaintainable, and rebuilding with a clean architecture worked better than patching.",
            "Implementation should serve design. A looping timeline would have been quicker for the flickering lights, but randomized recursion creates the unpredictability horror needs.",
            "Building the full pipeline from perception to Behavior Tree to Animation Blueprint taught me game AI at the systems level. Understanding why the three layers are separated made debugging much faster after the rebuild.",
          ],
        },
      },
    ],
  },
};
