import { C } from "./theme";

// ── Site-wide details ─────────────────────────────────────────────────────────
export const SITE = {
  firstName: "Preeta",
  lastName: "Chatterjee",
  name: "Preeta Chatterjee",
  email: "chatterjee.pre@northeastern.edu",
  linkedin: "linkedin.com/in/preeta-chatterjee",
  resume: "/Preeta_Chatterjee_Resume.pdf",
  availability: "January–August 2027",
};

// ── Home: hero ────────────────────────────────────────────────────────────────
export const HERO = {
  badge: "MS CS · Northeastern · 4.0 GPA · 2 Publications",
  // [TODO: Preeta] pick a tagline; options are listed in the PR 6 summary (option A shown)
  tagline: "Building computer vision systems, simulations, and game engines, with long-term interests in physical AI and digital twins.",
  // [label, variant] — variant "green" / "red" is a filled chip, "o" is outlined
  chips: [["Computer Vision", "green"], ["Simulation", "red"], ["Game Engines", "o"]],
};

// Floating labels drawn on the hero canvas (x/y are fractions of canvas size, s is font px).
// Text comes only from SKILLS.
export const CANVAS_LABS = [
  { t: "UNREAL",  x: .55, y: .2,  s: 11 }, { t: "C++",    x: .8,  y: .35, s: 13 },
  { t: "PYTHON",  x: .58, y: .62, s: 10 }, { t: "ECS",    x: .74, y: .74, s: 12 },
  { t: "PyTorch", x: .5,  y: .44, s: 10 }, { t: "SDL3",   x: .84, y: .54, s: 9  },
  { t: "UNITY",   x: .62, y: .82, s: 11 },
];

// Marquee text comes only from SKILLS.
export const MARQUEE_ITEMS = ["Unreal Engine", "✦", "PyTorch", "✦", "C++", "✦", "Unity", "✦", "Python", "✦", "SDL3", "✦", "Behavior Trees", "✦", "MATLAB/Simulink", "✦", "ECS Architecture", "✦", "Lua Scripting", "✦"];

// ── Home: about strip ─────────────────────────────────────────────────────────
// Headline renders as: lead + accent (green), line break, tail (red)
export const HOME_INTRO = {
  headline: { lead: "ML meets ", accent: "game dev", tail: "& beyond." },
  blurb: "Master's student at Northeastern building at the intersection of intelligent systems and interactive experiences.",
};

// [value, label, colour]. [TODO: Preeta] two stats to choose; options are listed in the PR 6 summary.
export const STATS = [["4.0", "GPA", C.green], ["TODO", "[TODO: Preeta]", C.redMid], ["2", "Publications", C.greenMid], ["TODO", "[TODO: Preeta]", C.redMid]];

// ── Home: contact ─────────────────────────────────────────────────────────────
export const CONTACT_BLURB = `Open to co-op and internship opportunities in computer vision, ML, simulation, and game engines. Boston-based, available ${SITE.availability}.`;

export const SKILLS = [
  { name: "Languages", tags: ["Python", "C++", "C#", "Java", "MATLAB/Simulink"] },
  { name: "ML/AI", tags: ["PyTorch", "NumPy", "Hugging Face Transformers", "scikit-learn", "FAISS", "vector search"] },
  { name: "Game Engines/Simulation", tags: ["Unreal Engine (Blueprints, Behavior Trees)", "Unity", "SDL3", "ECS architecture", "Lua scripting"] },
  { name: "Tools & Practices", tags: ["Git/GitHub", "CI/CD", "unit & property testing", "React.js", "Azure Cosmos DB", "Agile/Scrum"] },
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
    venue: "IEEE IEMENTech 2021",
    type: "Conference Paper",
    desc: "Survey and proposal of a cost-effective hybrid stair-climbing device for people with neurological disorders, combining wheel clusters, tracks, and rotating legs. Aimed at making stair navigation safe and accessible for users across different financial backgrounds in India. The research was later built into a physical prototype and presented as my final-year B.Tech project (2023).",
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
    desc: "Overview of quantum computing fundamentals including qubits, quantum parallelism, and experimental realization methods such as ion trap and quantum dot technologies. Examines limitations of classical computers and the trajectory of quantum computing toward practical applications.",
    links: [
	  { label: "PDF", href: "https://ijiip.smartsociety.org/vol1_issue4/issue4_paper7.pdf", color: C.red },
	],
  },
];

// ── About page ────────────────────────────────────────────────────────────────
// [TODO: Preeta] review the pull quote and sections below (draft, see PR 6 summary).
export const ABOUT_QUOTE = "I want to build systems that see the world, and simulations that let machines learn from it.";

export const ABOUT_SECTIONS = [
  {
    heading: "Background",
    body: "I'm a Master's student in Computer Science at Northeastern University (GPA 4.0, graduating May 2027), focused on computer vision, simulation, and game engines. My coursework includes Machine Learning, Pattern Recognition & Computer Vision, Natural Language Processing, Algorithms, Building Game Engines, and Building Virtual Environments. My undergraduate degree in Electronics & Communication Engineering gives me a hardware-aware perspective on software systems.",
    accent: C.green,
  },
  {
    heading: "What I Build",
    body: "I build perception systems, simulations, and the engines that run them. In computer vision, I'm working on a course project on 3D reconstruction under motion and image degradation, using VGGT as the backbone. On the engine side, I built Stone & Soul, a custom 2D game engine in C++ and SDL3 on an Entity-Component-System architecture, and Hallway Hunters, a survival horror game in Unreal Engine 5.7 with a three-layer enemy AI. In ML, my RAG research engine included a full evaluation framework (Precision@K, Recall@K, MRR, and ROUGE) and an ablation study across three embedding models. Simulation goes back to my first job: building and validating MATLAB/Simulink models for rolling mill automation at SMS India. Long term, I'm interested in physical AI and digital twins.",
    accent: C.red,
  },
  {
    heading: "Experience",
    body: null, // rendered separately by ExperienceBlock
    accent: C.green,
  },
  {
    heading: "Publications",
    body: "I've published one IEEE conference paper, \"Automated Hybrid Stair Climber for Physically Challenged People\" (IEEE IEMENTech 2021), and one journal article, \"A Brief Study on Quantum Computing\" (IJIIP, 2020). The stair climber research was later built into a physical prototype and presented as my final-year B.Tech project (2023).",
    accent: C.red,
  },
];

// `note` is an optional line under the company.
export const EXPERIENCE = [
  {
    role: "Teaching Assistant, CS5800 Algorithms",
    company: "Northeastern University",
    loc: "Boston",
    dates: "Aug 2026–present",
    bullets: [
      "Hold office hours guiding students through dynamic programming, greedy, and graph algorithms",
      "Grade homework and exams with written feedback on correctness; proctor quizzes and exams",
    ],
  },
  {
    role: "Notetaker, Disability Accommodation Services",
    company: "Northeastern University",
    loc: "Boston",
    dates: "May–Aug 2026",
    bullets: [
      "Provided structured lecture notes for a student in CS5850: Building Game Engines, a graduate C++ course covering rendering pipelines and engine architecture",
    ],
  },
  {
    role: "Graduate Engineer Trainee (Simulation and Software Testing)",
    company: "SMS India Pvt Ltd.",
    loc: "Kolkata",
    dates: "Aug 2023–Jun 2024",
    note: "Joined after a 4-month internship, Jan–Apr 2023",
    bullets: [
      "Built and validated MATLAB/Simulink mathematical models for rolling mill automation; coordinated cross-departmental simulation outputs, reducing project commissioning time by 25%",
      "Conducted on-site I/O and integration testing during plant commissioning; troubleshot hardware-software mismatches using system diagrams",
      "Led recruitment and onboarding of interns; mentored junior team members on simulation workflows",
    ],
  },
  {
    role: "Software Development Intern",
    company: "Caravel Labs Inc.",
    loc: "WA, USA",
    dates: "Jun–Aug 2022",
    bullets: [
      "Developed and deployed a full-stack web application using TypeScript and React.js with an Azure Cosmos DB backend in production",
      "Collaborated in weekly Agile sprints using Git for version control, code review, and CI/CD",
    ],
  },
];

// `details` are optional lines under the school (coursework, awards).
export const EDUCATION = [
  { deg: "MS Computer Science", school: "Northeastern University", loc: "Boston, MA", year: "Expected May 2027", gpa: "4.0", col: C.green,
    details: ["Coursework: Machine Learning, Pattern Recognition & Computer Vision, Natural Language Processing, Algorithms, Building Game Engines, Building Virtual Environments"] },
  { deg: "B.Tech Electronics & Communication Engineering", school: "Institute of Engineering & Management", loc: "Kolkata", year: "Apr 2023", gpa: "3.75", col: C.red,
    details: ["Mrs. Maya Chakraborty Award for Academic Excellence (2023)"] },
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
