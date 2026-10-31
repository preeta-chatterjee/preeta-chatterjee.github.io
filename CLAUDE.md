# CLAUDE.md

Personal portfolio site for Preeta Chatterjee, served at https://preeta-chatterjee.github.io.

This file is the source of truth for the site restructure. Follow the rules and the PR plan below in every session.

## Repo orientation

- Vite + React 19, react-router-dom with `HashRouter` (routes look like `/#/about`). Styling is inline style objects; `src/index.css` is only a reset.
- Layout of `src/`:
  - `content.js`: all site copy and data (SITE, HERO, CANVAS_LABS, MARQUEE_ITEMS, HOME_INTRO, STATS, CONTACT_BLURB, SKILLS, PROJECT_GROUPS, FEATURED_PROJECT_IDS, PROJECTS, PUBLICATIONS, ABOUT_QUOTE, ABOUT_SECTIONS, EXPERIENCE, EDUCATION, CASE_STUDIES). Content edits go here.
  - `theme.js`: colors (`C`), fonts (`T`), layout constants, shared style helpers. `hooks.js`: `useInView`, `useMobile`.
  - `components/`: one component per file. `pages/`: HomePage, ProjectsPage, AboutPage, CaseStudyPage. `App.jsx`: router. `main.jsx` mounts `App`.
  - Case studies: add an entry to `CASE_STUDIES` keyed by slug and it renders at `/#/projects/<slug>`. Link to it from a project with `links: [{ label: "Case Study", to: "/projects/<slug>" }]`.
  - `routes.js`: shared route paths (`CONTACT_PATH`). Link to the contact section with `<Link to={CONTACT_PATH}>`; plain `#id` anchors don't work under HashRouter.
  - UI chrome (section labels like "02 / Selected Work", button text, form labels) still lives inline in components and pages.
- Meta, Open Graph and Twitter tags are in `index.html`.
- Static files (résumé PDF, paper PDF, favicon) live in `public/` and are copied to the build as-is.
- Project images: deployed WebP files live in `public/projects/<slug>/` (`<name>.webp` max 1600px wide for display, `<name>-full.webp` for the lightbox). Original PNGs are kept in `assets-src/<slug>/`, which is not deployed.
- Contact form uses Formspree. The ID comes from `VITE_FORMSPREE_ID`, with a hardcoded fallback in `src/components/ContactForm.jsx`.
- Commands: `npm ci`, `npm run dev`, `npm run build`, `npm run lint`, `npm run preview`.
- Deployment: `.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push to `main` (requires Settings → Pages → Source set to "GitHub Actions"). The old manual path (`npm run deploy`, which pushes `dist/` to the `gh-pages` branch) is kept as a fallback. Do not delete either.

## Workflow

- Do one PR at a time, in order. After each PR, stop and wait for Preeta to review and merge before starting the next one.
- Run `npm run build` before handing over every PR and report the result.

### PR status

- [x] PR 1: CLAUDE.md + automatic deployment (merged)
- [x] PR 2: Refactor with zero visual change (merged)
- [x] PR 3: Projects (merged)
- [x] PR 4: Fix the 5 existing lint problems (merged)
- [x] PR 5: Fix Contact links (merged)
- [ ] PR 6: Copy, metadata, experience, skills, about
- [ ] PR 7: Visuals and cleanup

## Rules for all work

- Never invent content. Don't list any tool, metric, result, feature or claim Preeta hasn't given you. If something is unclear, leave a clearly marked placeholder like [TODO: Preeta] and tell Preeta. Don't guess.
- Text provided in quotes or marked "use verbatim" goes on the site exactly as written. Don't rewrite or expand it.
- No em dashes (—) anywhere in visible site text, including meta tags. En dashes in date ranges (Jan–May 2026) are fine.
- Tools Preeta has NOT used, so never list them: Isaac Sim, ROS 2, or any others not in the skills list below.
- Use "built" for projects, never "shipped" (especially for Hallway Hunters).
- Publications must read exactly as: one IEEE conference paper (IEMENTech 2021) and one journal article in IJIIP (2020). Never "two IEEE publications."
- Every PR must pass `npm run build` before handover. Report the result.
- Keep each PR scoped to its own section. No drive-by changes.
- Use US spelling throughout. The current site uses "specialising"; change it.

## Decisions

1. Availability: replace "Summer 2026 co-op" everywhere with "Seeking a co-op/internship, January–August 2027." Graduation: May 2027. Update the education entry to match.
2. Projects: see the PR 3 section below. Use only the facts given there.
3. The refactor is its own PR. Automatic deployment comes first.

## Positioning

Focus: computer vision, simulation and game engines, with long-term interests in physical AI and digital twins. RAG stays as evidence of ML evaluation rigor, not a headline and not "Other work."

## PR 1: CLAUDE.md + automatic deployment (no content or visual changes)

- Add CLAUDE.md containing this whole plan.
- Add a GitHub Actions workflow that builds with Vite and deploys to GitHub Pages on every push to main (actions/upload-pages-artifact + actions/deploy-pages).
- Pass VITE_FORMSPREE_ID from a repository secret if one exists, but keep the existing hardcoded fallback so the contact form works either way.
- Don't delete the gh-pages branch or the `deploy` npm script. They stay as a fallback.
- In the summary, remind Preeta to change Settings → Pages → Source to "GitHub Actions" after merging.

## PR 2: Refactor with zero visual change

- Move all content (SKILLS, PROJECTS, PUBLICATIONS, EXPERIENCE, EDUCATION, ABOUT_SECTIONS, hero copy, canvas labels, marquee items, contact blurb, stats, a SITE object for name/email/links/availability) into src/content.js.
- Split components into src/components/ and pages into src/pages/.
- The rendered site must look identical. List anything you weren't sure how to move.

## PR 3: Projects

Restructure PROJECTS into two groups with filter tabs on the Projects page:

- "Computer Vision & ML": 3D reconstruction, RAG
- "Simulation & Game Engines": Stone & Soul, Hallway Hunters, Roll-a-Ball, Haunted Hallway
- The stair climber moves to the Publications section.
- Keep the Job Tracker under a small "Other" heading.
- Home page: feature Hallway Hunters, Stone & Soul, and 3D reconstruction instead of PROJECTS.slice(0, 3).

New or updated entries (use only these facts):

**When Geometry Breaks: 3D Reconstruction under Motion and Image Degradation** (Oct 2026–present, status: In Progress)

- Course project for Pattern Recognition & Computer Vision at Northeastern, with a classmate.
- Studies how scene motion and image degradation (blur, haze, low light) get confused in feed-forward 3D reconstruction. Uses VGGT as the backbone, with VGGT4D and Easi3R as baselines. Aims to build a degradation-aware masking method that separates real motion from image degradation.
- Preeta's role: motion experiments and the geometric consistency score.
- Research in progress. Claim no results.

**Stone & Soul: 2D Game and Custom C++ Game Engine** (May–Aug 2026)

- Built a custom 2D game engine in C++ and SDL3 on an Entity-Component-System architecture, with swappable collision strategies (grid and quadtree), Lua scripting, A* pathfinding, and a unit and property test suite.
- Built a three-level tile-based puzzle game on the engine (a villager-rescue game with boulder-pushing puzzles), with enemy AI that switches from patrolling to live A* pursuit when the player gets close.

**Hallway Hunters: First-Person Survival Horror (Unreal Engine 5.7)** (Jan–May 2026)

- This is the same project as "Apartment 101" (its earlier name). Merge them into one entry and remove the separate Apartment 101 entry, including the "currently solving a collision bug" and "video coming soon" text and the commented-out video TODO.
- Card summary (use verbatim): "A first-person survival horror game in Unreal Engine 5.7. Trapped on a zombie-infected apartment floor, the player uses doors as tactical barriers to reach a rooftop evacuation before time runs out. Features a three-layer enemy AI (Behavior Tree, Animation Blueprint, Character Blueprint) and was rebuilt from scratch mid-development into a modular codebase."
- No playable build or download link.
- Fix the Haunted Hallway text so its "companion piece to Hallway Hunters" line links to the Hallway Hunters page.

**Hallway Hunters case-study page** at /#/projects/hallway-hunters (the project card links here). Make the layout reusable so other projects can get one later. Embed videos responsively (16:9, lazy-loaded); don't commit video files. Use all section text below verbatim.

**1. Hero**
- Embedded gameplay video: https://youtu.be/9aV8TK9dP9I
- Pitch: "You're a detective trapped on a zombie-infected apartment floor. Zombies can't open doors. Reach the rooftop helicopter before time runs out."
- Tags: Unreal Engine 5.7, Blueprints, Behavior Trees, Niagara, UMG

**2. Overview**
"Hallway Hunters is a first-person survival horror game built in Unreal Engine 5.7. You play a detective trapped on one floor of an apartment building during a viral outbreak, with five zombie-occupied rooms off a central hallway. To survive, you manage your health, fight or evade zombies with a metal pipe, and reach the rooftop evacuation helicopter before the timer runs out. Zombies cannot open doors, so every closed door is a tactical decision."

Then a "Features" list:
- Door interaction with on-screen prompts; doors act as tactical barriers because zombies cannot open them
- Zombie AI with sight-based perception and patrol, chase, and attack states
- Zombie attacks timed to the animation's hit frame
- Player health bar, evacuation countdown timer, and an independent world-space health bar above each zombie
- Main menu, plus win and lose screens with restart
- Six-state zombie animation system (idle, patrol walk, chase walk, attack, hit reaction, death) with a ragdoll death
- Niagara effects: blood splatter on attacks and falling electric sparks
- Flickering lights with randomized, non-repeating timing and occasional full blackouts
- PBR and emissive flicker materials, with 3D spatial audio for zombie alerts
- Melee combat with a metal pipe (see Known Issues)

**3. Enemy AI Architecture**
Intro: "The zombie AI is split into three layers that never bypass each other: the Behavior Tree decides, the Animation Blueprint displays, and the Character Blueprint handles gameplay."
One subsection per layer, each with its blueprint screenshot (click-to-enlarge with a simple lightbox, no heavy dependencies) and this text as the caption:
- Behavior Tree & Blackboard: "Makes every decision. Three branches run in priority order: a dead state, chase-and-attack when the zombie can see the player, and random patrol as the fallback. The AI controller's sight perception (1200-unit radius, 60-degree peripheral angle, 1500-unit lose-sight radius) writes the player reference and a can-see-player flag to the Blackboard."
- Animation Blueprint: "Handles all visual output. A six-state locomotion state machine is driven by speed and the can-see-player flag. Attack, hit reaction, and death play as montages so they blend and interrupt cleanly, and death uses a highest-priority global transition. An Anim Notify on the attack's hit frame fires the damage trace."
- Character Blueprint (BP_Zombie): "Owns health, damage, and the per-zombie health bar, and exposes the state variables the Animation Blueprint reads every frame. Each zombie tracks its own health independently."
Images are in public/projects/hallway-hunters/. Match files to layers by filename and report how they were matched. If a layer has no image, use a labelled placeholder. Show any remaining images in a small gallery with [TODO: Preeta] captions.

**4. Development: The Rebuild**
"All of my semester coursework had been built in a single Unreal project. By mid-development it held several generations of the same zombie Blueprints, duplicate state-machine transitions, and inconsistent Blackboard keys, and the AI behaved unpredictably: attacking out of range, ignoring the player up close, and getting stuck mid-animation. Every fix broke something else, so I started a new project, migrated only confirmed-working assets, and rebuilt every Blueprint system from a written architecture plan. The rebuild took about two days and produced a stable codebase where each system has one responsibility: cleanly separated Behavior Tree branches, a single animation-update path, montage-end callbacks instead of fixed delays, and consistent asset naming."
Then the embedded project walkthrough video: https://youtu.be/LqsOFARvTSs

**5. Known Issues & Next Steps**
- "Weapon hit detection: the pipe's line trace reaches every zombie (confirmed with debug drawing), but damage registers on some instances and not others. Next step: switch to a multi line trace that processes every hit, and audit the collision channel settings on each zombie instance."
- "Level dressing: room layouts, doors, and enemy placement are final, but the apartments lack furniture and props. Next step: dress each room with marketplace props so they read as lived-in homes."

**6. What I Learned**
- "Project organization drives code quality. A semester of experiments in one project file became unmaintainable, and rebuilding with a clean architecture worked better than patching."
- "Implementation should serve design. A looping timeline would have been quicker for the flickering lights, but randomized recursion creates the unpredictability horror needs."
- "Building the full pipeline from perception to Behavior Tree to Animation Blueprint taught me game AI at the systems level. Understanding why the three layers are separated made debugging much faster after the rebuild."

## PR 4: Fix the 5 existing lint problems (done)

- Fix only the lint problems; no visible or behavioral changes. `npm run lint` must report 0 problems.

## PR 5: Fix Contact links

- Every Contact link (desktop nav, mobile menu, footer, hero "Get in Touch") goes to the home page and scrolls smoothly to the contact section, from every page.
- Clicking Contact while already on the home page just scrolls: no blank page, no reload.
- Shareable route `/#/contact` renders the home page and scrolls to the contact section, including on a fresh page load and with back/forward.
- The mobile menu still closes after tapping Contact. No other visible or behavioral changes.

## PR 6: Copy, metadata, experience, skills, about

**index.html** (title, description, og:*, twitter:*):

- Title: "Preeta Chatterjee | Computer Vision · Simulation · Game Engines"
- Description: "MS CS @ Northeastern · Computer vision, simulation, and game engines. Seeking a co-op/internship, January–August 2027."
- Remove the "Two IEEE publications" claim.
- Stop overwriting document.title at runtime, or make it match.

**Hero:** chips "Computer Vision · Simulation · Game Engines". Update the tagline to match, and offer 2–3 options to choose from.

**Canvas labels and marquee:** use only the skills list below.

**Home stats:** remove "3+ Projects Shipped" and "5+ Years Coding". Replace with [TODO: Preeta] placeholders and suggest 2–3 verifiable options (e.g. publications count, GPA).

**About:** rewrite ABOUT_SECTIONS and the pull quote around the positioning above, using only facts in this file. Remove "specialising in NLP and generative AI." Put the draft in the PR summary for review.

**Skills** (only these):

- Languages: Python, C++, C#, Java, MATLAB/Simulink
- ML/AI: PyTorch, NumPy, Hugging Face Transformers, scikit-learn, FAISS, vector search
- Game Engines/Simulation: Unreal Engine (Blueprints, Behavior Trees), Unity, SDL3, ECS architecture, Lua scripting
- Tools & Practices: Git/GitHub, CI/CD, unit & property testing, React.js, Azure Cosmos DB, Agile/Scrum

**Experience** (in this order):

1. Teaching Assistant, CS5800 Algorithms, Northeastern University, Boston (Aug 2026–present)
    - Hold office hours guiding students through dynamic programming, greedy, and graph algorithms
    - Grade homework and exams with written feedback on correctness; proctor quizzes and exams
2. Notetaker, Disability Accommodation Services, Northeastern University, Boston (May–Aug 2026)
    - Provided structured lecture notes for a student in CS5850: Building Game Engines, a graduate C++ course covering rendering pipelines and engine architecture
3. Graduate Engineer Trainee (Simulation and Software Testing), SMS India Pvt Ltd., Kolkata (Aug 2023–Jun 2024; joined after a 4-month internship, Jan–Apr 2023)
    - Built and validated MATLAB/Simulink mathematical models for rolling mill automation; coordinated cross-departmental simulation outputs, reducing project commissioning time by 25%
    - Conducted on-site I/O and integration testing during plant commissioning; troubleshot hardware-software mismatches using system diagrams
    - Led recruitment and onboarding of interns; mentored junior team members on simulation workflows
4. Software Development Intern, Caravel Labs Inc., WA, USA (Jun–Aug 2022)
    - Developed and deployed a full-stack web application using TypeScript and React.js with an Azure Cosmos DB backend in production
    - Collaborated in weekly Agile sprints using Git for version control, code review, and CI/CD

**Education:**

- MS Computer Science, Northeastern University, GPA 4.0, Expected May 2027. Coursework: Machine Learning, Pattern Recognition & Computer Vision, Natural Language Processing, Algorithms, Building Game Engines, Building Virtual Environments.
- B.Tech Electronics & Communication Engineering, Institute of Engineering & Management, Kolkata, GPA 3.75, Apr 2023. Mrs. Maya Chakraborty Award for Academic Excellence (2023).

**Publications:**

- "A Brief Study on Quantum Computing," International Journal of Innovative Research in Physics (IJIIP), 2020
- "Automated Hybrid Stair Climber for Physically Challenged People," IEEE IEMENTech 2021. The research was later built into a physical prototype and presented as my final-year B.Tech project (2023).

**Contact blurb:** "Open to co-op and internship opportunities in computer vision, ML, simulation, and game engines. Boston-based, available January–August 2027."

**Footer:** make the © year dynamic.

## PR 7: Visuals and cleanup

- Add optional `media` (image or video embed) support to project cards. Move gameplay.png into public/ (compressed to WebP, max ~1600px wide) and use it on the most fitting card. Ask Preeta which one.
- Create public/og-preview.png (1200×630): name plus the three focus areas, matching the site's fonts and colors.
- Delete unused scaffolding: src/assets/hero.png, react.svg, vite.svg.
- Replace README.md with a short description, the stack, local dev commands, and how deployment works.
- Don't touch public/Preeta_Chatterjee_Resume.pdf. Preeta will replace it.
